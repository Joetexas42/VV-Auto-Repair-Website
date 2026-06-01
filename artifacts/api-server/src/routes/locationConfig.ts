import { Router, type IRouter, type Request, type Response } from "express";
import { db, locationConfigTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const LOCATIONS = ["dallas", "garland"] as const;
type LocationId = (typeof LOCATIONS)[number];

const ENV_KEYS: Record<
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

export function validateLocationConfigEnv(): void {
  const missing: string[] = [];

  for (const loc of LOCATIONS) {
    const keys = ENV_KEYS[loc];
    if (!process.env[keys.mapsUrl]) missing.push(keys.mapsUrl);
    if (!process.env[keys.writeReviewUrl]) missing.push(keys.writeReviewUrl);
  }

  if (missing.length > 0) {
    logger.warn(
      { missingEnvVars: missing },
      "Location config env vars are not set — map/review URLs will be null until configured in the database or environment",
    );
  }
}

function envFallback(locationId: LocationId): {
  mapsUrl: string | null;
  writeReviewUrl: string | null;
} {
  const keys = ENV_KEYS[locationId];
  return {
    mapsUrl: process.env[keys.mapsUrl] ?? null,
    writeReviewUrl: process.env[keys.writeReviewUrl] ?? null,
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
