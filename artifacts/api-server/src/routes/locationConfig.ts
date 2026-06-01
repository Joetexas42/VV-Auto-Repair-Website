import { Router, type IRouter, type Request, type Response } from "express";
import { db, locationConfigTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const HARDCODED_DEFAULTS = {
  dallas: {
    mapsUrl:
      "https://www.google.com/maps/place/V+V+Auto+Repair/@32.8488156,-96.6827611,17z/data=!4m8!3m7!1s0x864ea12237496ed3:0x44a59c7835f91535!8m2!3d32.8488156!4d-96.6827611!9m1!1b1",
    writeReviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJ025JNyKhToYRNRX5NXicpUQ",
  },
  garland: {
    mapsUrl:
      "https://www.google.com/maps/place/V+V+Auto+Body+Repair+Corporation/@32.9016826,-96.6874462,17z/data=!3m1!4b1!4m6!3m5!1s/g/11pzygbgln!8m2!3d32.9016826!4d-96.6874462!16s%2Fg%2F11pzygbgln!9m1!1b1",
    writeReviewUrl: null as string | null,
  },
} as const;

const LOCATIONS = ["dallas", "garland"] as const;
type LocationId = (typeof LOCATIONS)[number];

const ENV_OVERRIDES: Record<
  LocationId,
  { mapsUrl: string; writeReviewUrl: string }
> = {
  dallas: {
    mapsUrl: "DALLAS_MAPS_URL",
    writeReviewUrl: "DALLAS_WRITE_REVIEW_URL",
  },
  garland: {
    mapsUrl: "GARLAND_MAPS_URL",
    writeReviewUrl: "GARLAND_WRITE_REVIEW_URL",
  },
};

function envFallback(locationId: LocationId) {
  const keys = ENV_OVERRIDES[locationId];
  return {
    mapsUrl:
      process.env[keys.mapsUrl] ?? HARDCODED_DEFAULTS[locationId].mapsUrl,
    writeReviewUrl:
      process.env[keys.writeReviewUrl] ??
      HARDCODED_DEFAULTS[locationId].writeReviewUrl,
  };
}

async function readFromDb(): Promise<
  Record<LocationId, { mapsUrl: string | null; writeReviewUrl: string | null }>
> {
  const rows = await db.select().from(locationConfigTable);
  const byId = Object.fromEntries(rows.map((r) => [r.locationId, r]));

  const result = {} as Record<
    LocationId,
    { mapsUrl: string | null; writeReviewUrl: string | null }
  >;

  for (const loc of LOCATIONS) {
    const row = byId[loc];
    const fallback = envFallback(loc);
    result[loc] = {
      mapsUrl: row?.mapsUrl ?? fallback.mapsUrl,
      writeReviewUrl: row?.writeReviewUrl ?? fallback.writeReviewUrl,
    };
  }

  return result;
}

router.get("/location-config", async (_req: Request, res: Response) => {
  try {
    const config = await readFromDb();
    res.json(config);
  } catch (err) {
    logger.error({ err }, "Failed to read location config from DB");
    res.json({
      dallas: envFallback("dallas"),
      garland: envFallback("garland"),
    });
  }
});

function requireAdminKey(req: Request, res: Response): boolean {
  const adminKey = process.env["ADMIN_API_KEY"];
  if (!adminKey) {
    res.status(503).json({ error: "Admin API key not configured on server" });
    return false;
  }
  const provided = req.headers["x-admin-api-key"];
  if (provided !== adminKey) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

router.patch(
  "/location-config/:locationId",
  async (req: Request, res: Response) => {
    if (!requireAdminKey(req, res)) return;

    const locationId = String(req.params["locationId"]);
    if (!LOCATIONS.includes(locationId as LocationId)) {
      res.status(400).json({
        error: `Unknown locationId. Must be one of: ${LOCATIONS.join(", ")}`,
      });
      return;
    }

    const { mapsUrl, writeReviewUrl } = req.body as {
      mapsUrl?: string | null;
      writeReviewUrl?: string | null;
    };

    if (mapsUrl === undefined && writeReviewUrl === undefined) {
      res
        .status(400)
        .json({ error: "Provide at least one of: mapsUrl, writeReviewUrl" });
      return;
    }

    try {
      const update: Partial<{
        mapsUrl: string | null;
        writeReviewUrl: string | null;
        updatedAt: Date;
      }> = { updatedAt: new Date() };
      if (mapsUrl !== undefined) update.mapsUrl = mapsUrl;
      if (writeReviewUrl !== undefined) update.writeReviewUrl = writeReviewUrl;

      await db
        .insert(locationConfigTable)
        .values({
          locationId: locationId,
          mapsUrl: mapsUrl ?? null,
          writeReviewUrl: writeReviewUrl ?? null,
        })
        .onConflictDoUpdate({
          target: locationConfigTable.locationId,
          set: update,
        });

      const [row] = await db
        .select()
        .from(locationConfigTable)
        .where(eq(locationConfigTable.locationId, locationId));

      logger.info({ locationId, update }, "Location config updated");
      res.json(row);
    } catch (err) {
      logger.error({ err, locationId }, "Failed to update location config");
      res.status(500).json({ error: "Database error" });
    }
  },
);

export default router;
