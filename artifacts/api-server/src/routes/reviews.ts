import { Router, type IRouter } from "express";
import { getPlaceData } from "../services/googlePlaces.js";

const router: IRouter = Router();

router.get("/reviews", async (req, res) => {
  const location = req.query["location"] as string | undefined;

  if (location && location !== "dallas" && location !== "garland") {
    res.status(400).json({ error: "location must be 'dallas' or 'garland'" });
    return;
  }

  try {
    if (location === "dallas" || location === "garland") {
      const data = await getPlaceData(location);
      res.json({ location, data });
    } else {
      const [dallas, garland] = await Promise.all([
        getPlaceData("dallas"),
        getPlaceData("garland"),
      ]);
      res.json({ dallas, garland });
    }
  } catch {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

export default router;
