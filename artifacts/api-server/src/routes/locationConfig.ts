import { Router, type IRouter } from "express";

const router: IRouter = Router();

const DEFAULTS = {
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
};

router.get("/location-config", (_req, res) => {
  res.json({
    dallas: {
      mapsUrl: process.env["DALLAS_MAPS_URL"] ?? DEFAULTS.dallas.mapsUrl,
      writeReviewUrl:
        process.env["DALLAS_WRITE_REVIEW_URL"] ?? DEFAULTS.dallas.writeReviewUrl,
    },
    garland: {
      mapsUrl: process.env["GARLAND_MAPS_URL"] ?? DEFAULTS.garland.mapsUrl,
      writeReviewUrl:
        process.env["GARLAND_WRITE_REVIEW_URL"] ?? DEFAULTS.garland.writeReviewUrl,
    },
  });
});

export default router;
