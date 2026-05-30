import { Router, type IRouter } from "express";
import { getPlaceData, type PlaceReview } from "../services/googlePlaces.js";

const router: IRouter = Router();

const STATIC_REVIEWS: PlaceReview[] = [
  {
    author_name: "Michael T.",
    rating: 5,
    text: "Brought my car in for brake replacement and they did an incredible job at a fair price. The mechanic explained everything clearly and didn't try to upsell me on things I didn't need. Honest shop — I'll keep coming back.",
    time: 1710000000,
    relative_time_description: "a month ago",
  },
  {
    author_name: "Lan N.",
    rating: 5,
    text: "Excellent shop with skilled mechanics and very reasonable prices. I'm always satisfied with the service here. They fix the car quickly and on schedule — truly reliable!",
    time: 1707000000,
    relative_time_description: "2 months ago",
  },
  {
    author_name: "Carlos M.",
    rating: 5,
    text: "V.V. Auto is the only place I trust with my cars. They diagnosed an issue three other shops missed, fixed it fast, and charged a fair price. Wish I found them sooner.",
    time: 1704000000,
    relative_time_description: "3 months ago",
  },
  {
    author_name: "Thanh H.",
    rating: 5,
    text: "Professional and honest service. They checked the car for free and clearly explained the problem. Prices are fair — not inflated like other shops. I recommend them to all my friends.",
    time: 1701000000,
    relative_time_description: "4 months ago",
  },
  {
    author_name: "Jessica R.",
    rating: 5,
    text: "Had a fender bender and brought my car to the Garland body shop. The result was flawless — you can't even tell there was damage. They also handled my insurance claim and made the whole process easy.",
    time: 1698000000,
    relative_time_description: "5 months ago",
  },
];

router.get("/reviews", async (req, res) => {
  const location = req.query["location"] as string | undefined;

  if (location && location !== "dallas" && location !== "garland") {
    res.status(400).json({ error: "location must be 'dallas' or 'garland'" });
    return;
  }

  const fallback = {
    rating: 4.4,
    user_ratings_total: 65,
    reviews: STATIC_REVIEWS,
    isFallback: true,
  };

  try {
    if (location === "dallas" || location === "garland") {
      const data = await getPlaceData(location);
      res.json({ location, data: data ? { ...data, isFallback: false } : fallback });
    } else {
      const [dallas, garland] = await Promise.all([
        getPlaceData("dallas"),
        getPlaceData("garland"),
      ]);
      res.json({
        dallas: dallas ? { ...dallas, isFallback: false } : fallback,
        garland: garland ? { ...garland, isFallback: false } : fallback,
      });
    }
  } catch {
    res.json({
      dallas: fallback,
      garland: fallback,
    });
  }
});

export default router;
