import { Router, type IRouter } from "express";
import { getPlaceData } from "../services/googlePlaces.js";

const router: IRouter = Router();

interface Review {
  name: string;
  stars: number;
  lang: "en" | "vi" | "both";
  textEn: string;
  textVi?: string;
  location?: "dallas" | "garland";
}

const REVIEWS: Review[] = [
  {
    name: "Michael T.",
    stars: 5,
    lang: "en",
    textEn:
      "Brought my car in for brake replacement and they did an incredible job at a fair price. The mechanic explained everything clearly and didn't try to upsell me on things I didn't need. Honest shop — I'll keep coming back.",
    location: "dallas",
  },
  {
    name: "Lan N.",
    stars: 5,
    lang: "vi",
    textEn:
      "Excellent shop with skilled mechanics and very reasonable prices. I'm always satisfied with the service here. They fix the car quickly and on schedule — truly reliable!",
    textVi:
      "Tiệm sửa xe rất tốt, thợ tay nghề cao và giá cả hợp lý. Tôi luôn hài lòng với dịch vụ ở đây. Họ sửa xe nhanh và đúng lịch hẹn — rất đáng tin cậy!",
    location: "dallas",
  },
  {
    name: "Carlos M.",
    stars: 5,
    lang: "en",
    textEn:
      "V.V. Auto is the only place I trust with my cars. They diagnosed an issue three other shops missed, fixed it fast, and charged a fair price. Wish I found them sooner.",
    location: "dallas",
  },
  {
    name: "Thanh H.",
    stars: 5,
    lang: "both",
    textEn:
      "Professional and honest service. They checked the car for free and clearly explained the problem. Prices are fair — not inflated like other shops. I recommend them to all my friends.",
    textVi:
      "Dịch vụ chuyên nghiệp và trung thực. Họ kiểm tra xe miễn phí và giải thích rõ ràng vấn đề. Giá cả hợp lý, không chặt chém như nhiều tiệm khác. Tôi sẽ giới thiệu cho bạn bè.",
    location: "dallas",
  },
  {
    name: "Jessica R.",
    stars: 5,
    lang: "en",
    textEn:
      "Had a fender bender and brought my car to the Garland body shop. The result was flawless — you can't even tell there was damage. They also handled my insurance claim and made the whole process easy.",
    location: "garland",
  },
  {
    name: "Minh P.",
    stars: 5,
    lang: "vi",
    textEn:
      "I've been coming to V.V. Auto for years and always leave happy. The mechanics are experienced, friendly, and never make you feel rushed or pressured. Great family business.",
    textVi:
      "Tôi đã đến V.V. Auto nhiều năm và luôn hài lòng. Thợ sửa xe kinh nghiệm, thân thiện và không bao giờ tạo áp lực. Cơ sở gia đình tuyệt vời.",
    location: "dallas",
  },
  {
    name: "Sarah K.",
    stars: 5,
    lang: "en",
    textEn:
      "My engine light came on and I was scared it would be expensive. They ran the diagnostic, found the issue, and fixed it for way less than the dealer quoted. Friendly staff too — highly recommend!",
    location: "dallas",
  },
  {
    name: "Huong B.",
    stars: 5,
    lang: "both",
    textEn:
      "The body shop in Garland repaired my car after a collision and the paint match was perfect. The team was kind, kept me updated, and finished on time. I am very grateful.",
    textVi:
      "Tiệm đồng sơn ở Garland sửa xe cho tôi sau tai nạn và màu sơn khớp hoàn hảo. Đội ngũ thân thiện, thông báo tiến độ và hoàn thành đúng hẹn. Tôi rất biết ơn.",
    location: "garland",
  },
  {
    name: "David L.",
    stars: 4,
    lang: "en",
    textEn:
      "Great local mechanic shop. Took my truck in for an oil change and they noticed a couple other things that needed attention but didn't pressure me — just let me know and let me decide. That's the kind of honesty I appreciate.",
    location: "dallas",
  },
  {
    name: "Phuong T.",
    stars: 5,
    lang: "vi",
    textEn:
      "Very trustworthy and affordable. They explain everything in Vietnamese which makes it so much easier for my parents who don't speak English well. We won't go anywhere else.",
    textVi:
      "Rất đáng tin cậy và giá cả phải chăng. Họ giải thích mọi thứ bằng tiếng Việt, rất tiện lợi cho ba mẹ tôi. Gia đình tôi sẽ không đến tiệm nào khác.",
    location: "dallas",
  },
  {
    name: "Robert W.",
    stars: 5,
    lang: "en",
    textEn:
      "State inspection was quick and the staff were genuinely friendly. No upsells, no nonsense. In and out in under 30 minutes. I've been going here for two years now.",
    location: "dallas",
  },
  {
    name: "An V.",
    stars: 5,
    lang: "both",
    textEn:
      "After the accident I was stressed about the repairs, but the Garland team made everything simple. Insurance, parts, paint — all handled professionally. My car looks brand new.",
    textVi:
      "Sau tai nạn tôi rất lo lắng, nhưng đội ngũ Garland làm mọi thứ đơn giản. Bảo hiểm, phụ tùng, sơn xe — tất cả đều chuyên nghiệp. Xe tôi trông như mới.",
    location: "garland",
  },
];

function scoreReview(review: Review, keywords: string[]): number {
  if (keywords.length === 0) return 0;
  const haystack = (review.textEn + " " + (review.textVi ?? "")).toLowerCase();
  return keywords.reduce((acc, kw) => acc + (haystack.includes(kw.toLowerCase()) ? 1 : 0), 0);
}

router.get("/reviews", async (req, res) => {
  const rawKeywords = typeof req.query.keywords === "string" ? req.query.keywords : "";
  const keywords = rawKeywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const location = req.query["location"] as string | undefined;

  if (location && location !== "dallas" && location !== "garland") {
    res.status(400).json({ error: "location must be 'dallas' or 'garland'" });
    return;
  }

  if (keywords.length > 0) {
    const rawLimit = typeof req.query.limit === "string" ? parseInt(req.query.limit, 10) : NaN;
    const limit = Number.isNaN(rawLimit) || rawLimit <= 0 ? 2 : Math.min(rawLimit, 10);

    const pool = location ? REVIEWS.filter((r) => r.location === location) : REVIEWS;
    const scored = pool.map((r) => ({ review: r, score: scoreReview(r, keywords) }));
    const matched = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);

    let result: Review[];
    if (matched.length >= limit) {
      result = matched.slice(0, limit).map((s) => s.review);
    } else {
      const matchedSet = new Set(matched.map((s) => s.review));
      const fallback = pool.filter((r) => !matchedSet.has(r));
      result = [
        ...matched.map((s) => s.review),
        ...fallback.slice(0, limit - matched.length),
      ];
    }

    res.json({ reviews: result });
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
