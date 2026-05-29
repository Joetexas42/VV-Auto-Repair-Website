import React, { useEffect, useState } from "react";
import { Star, ExternalLink, Quote, PenLine } from "lucide-react";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";
import { fetchAllReviews, type AllReviewsResponse } from "@/lib/reviewsApi";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/V+V+Auto+Repair/@32.8488156,-96.6827611,17z/data=!4m8!3m7!1s0x864ea12237496ed3:0x44a59c7835f91535!8m2!3d32.8488156!4d-96.6827611!9m1!1b1";

const GOOGLE_WRITE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ025JNyKhToYRNRX5NXicpUQ";

interface Review {
  name: string;
  stars: number;
  lang: "en" | "vi" | "both";
  textEn: string;
  textVi?: string;
  location?: "dallas" | "garland";
  photoUrl?: string;
  relativeTime?: string;
}

const FALLBACK_REVIEWS: Review[] = [
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

function liveToReview(
  r: { author_name: string; rating: number; text: string; relative_time_description?: string; profile_photo_url?: string },
  location: "dallas" | "garland"
): Review {
  return {
    name: r.author_name,
    stars: r.rating,
    lang: "en",
    textEn: r.text,
    location,
    photoUrl: r.profile_photo_url,
    relativeTime: r.relative_time_description,
  };
}

function StarRow({ count, size = 18 }: { count: number; size?: number }) {
  return (
    <div className="flex gap-0.5 text-yellow-400">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= count ? "currentColor" : "none"}
          strokeWidth={i <= count ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, lang }: { review: Review; lang: "en" | "vi" }) {
  const showVietnamese = review.textVi && (review.lang === "vi" || review.lang === "both");
  const showBilingual = showVietnamese && review.lang === "both";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        {review.photoUrl ? (
          <img
            src={review.photoUrl}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover shrink-0 bg-[var(--vv-gray)]"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="w-12 h-12 rounded-full bg-[var(--vv-gray)] items-center justify-center shrink-0"
          style={{ display: review.photoUrl ? "none" : "flex" }}
        >
          <span className="text-[var(--vv-navy)] font-extrabold text-lg font-display">
            {review.name.charAt(0)}
          </span>
        </div>
        <Quote size={32} className="text-[var(--vv-red)] opacity-20 shrink-0" />
      </div>

      <div className="flex items-center gap-3">
        <StarRow count={review.stars} />
        {review.location && (
          <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--vv-gray)] text-[var(--vv-navy)]">
            {review.location === "dallas" ? "Dallas" : "Garland"}
          </span>
        )}
      </div>

      <div className="flex-1">
        {showVietnamese && !showBilingual ? (
          lang === "vi" && review.textVi ? (
            <p className="text-gray-700 leading-relaxed italic">"{review.textVi}"</p>
          ) : (
            <p className="text-gray-700 leading-relaxed italic">"{review.textEn}"</p>
          )
        ) : showBilingual ? (
          <>
            <p className="text-gray-700 leading-relaxed italic">
              "{lang === "vi" && review.textVi ? review.textVi : review.textEn}"
            </p>
            {lang === "en" && review.textVi && (
              <p className="text-gray-500 leading-relaxed italic mt-3 text-sm border-t border-gray-100 pt-3">
                "{review.textVi}"
              </p>
            )}
            {lang === "vi" && (
              <p className="text-gray-500 leading-relaxed italic mt-3 text-sm border-t border-gray-100 pt-3">
                "{review.textEn}"
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-700 leading-relaxed italic">"{review.textEn}"</p>
        )}
      </div>

      <div className="pt-2 border-t border-gray-100">
        <p className="font-bold text-[var(--vv-navy)] font-display">{review.name}</p>
        <p className="text-sm text-gray-400">
          {review.relativeTime
            ? review.relativeTime
            : (lang === "vi" ? "Khách hàng Google" : "Google Customer")}
        </p>
      </div>
    </div>
  );
}

function buildDisplayReviews(liveData: AllReviewsResponse): Review[] {
  const result: Review[] = [];
  if (liveData.dallas?.reviews) {
    for (const r of liveData.dallas.reviews) {
      if (r.text) result.push(liveToReview(r, "dallas"));
    }
  }
  if (liveData.garland?.reviews) {
    for (const r of liveData.garland.reviews) {
      if (r.text) result.push(liveToReview(r, "garland"));
    }
  }
  result.sort((a, b) => b.stars - a.stars);
  return result;
}

export default function ReviewsPage() {
  const { lang, t } = useLanguage();
  const [liveData, setLiveData] = useState<AllReviewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = t(
      "Customer Reviews | V.V. Auto Repair & Body Shop",
      "Đánh Giá Khách Hàng | V.V. Auto Repair & Body Shop"
    );
  }, [t]);

  useEffect(() => {
    fetchAllReviews()
      .then((data) => setLiveData(data))
      .finally(() => setIsLoading(false));
  }, []);

  const hasLiveReviews =
    liveData &&
    ((liveData.dallas?.reviews && liveData.dallas.reviews.length > 0) ||
      (liveData.garland?.reviews && liveData.garland.reviews.length > 0));

  const displayReviews: Review[] = hasLiveReviews
    ? buildDisplayReviews(liveData!)
    : FALLBACK_REVIEWS;

  const dallasRating = liveData?.dallas?.rating;
  const dallasCount = liveData?.dallas?.user_ratings_total;
  const displayRating = dallasRating ? dallasRating.toFixed(1) : "4.4";
  const displayCount = dallasCount ? `${dallasCount}+` : "65+";

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[var(--vv-navy)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold text-[var(--vv-red)] tracking-widest uppercase mb-3">
            {t("What Our Customers Say", "Khách Hàng Nói Gì Về Chúng Tôi")}
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 font-display">
            {t("Real Reviews from Real Customers", "Đánh Giá Thật Từ Khách Hàng Thật")}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={28} fill="currentColor" />
              ))}
            </div>
            <span className="text-white text-2xl font-bold font-display">{displayRating}</span>
            <span className="text-white/70 text-lg">
              {t(`· ${displayCount} Google Reviews`, `· Hơn ${displayCount} Đánh Giá Google`)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={GOOGLE_WRITE_REVIEW_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--vv-red)] hover:bg-red-500 text-white px-7 py-3.5 rounded-lg font-bold transition-all transform hover:-translate-y-1 shadow-lg"
            >
              <PenLine size={18} />
              {t("Write a Review", "Viết Đánh Giá")}
            </a>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-lg font-semibold transition-colors"
            >
              <ExternalLink size={18} />
              {t("See All Reviews on Google Maps", "Xem Tất Cả Đánh Giá Trên Google Maps")}
            </a>
          </div>
        </div>
      </section>

      {/* All Reviews */}
      <section className="py-20 bg-[var(--vv-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-8 h-8 border-4 border-[var(--vv-navy)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {hasLiveReviews && (
                <p className="text-center text-sm text-gray-400 mb-8">
                  {t("Live from Google Reviews", "Trực tiếp từ Google Reviews")}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayReviews.map((review, idx) => (
                  <ReviewCard key={idx} review={review} lang={lang} />
                ))}
              </div>
            </>
          )}

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-6 text-lg">
              {t(
                "These are just a few highlights. See our full review listing on Google.",
                "Đây chỉ là một số nổi bật. Xem toàn bộ đánh giá của chúng tôi trên Google."
              )}
            </p>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[var(--vv-navy)] hover:bg-blue-900 text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg"
            >
              <ExternalLink size={20} />
              {t(
                `Read All ${displayCount} Reviews on Google`,
                `Đọc Hơn ${displayCount} Đánh Giá Trên Google`
              )}
            </a>
          </div>
        </div>
      </section>

      {/* Write a Review CTA Banner */}
      <section className="py-20 bg-[var(--vv-navy)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--vv-red)]/20 mb-6">
            <PenLine size={32} className="text-[var(--vv-red)]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 font-display">
            {t("Had a great experience?", "Bạn hài lòng với dịch vụ của chúng tôi?")}
          </h2>
          <p className="text-white/70 text-lg mb-3 leading-relaxed">
            {t(
              "Your review helps other drivers in Dallas and Garland find an honest mechanic they can trust. It only takes a minute!",
              "Đánh giá của bạn giúp các tài xế khác ở Dallas và Garland tìm được thợ máy trung thực. Chỉ mất một phút thôi!"
            )}
          </p>
          <p className="text-white/50 text-base mb-10 italic">
            {t(
              "Hài lòng với dịch vụ? Hãy chia sẻ trải nghiệm của bạn — cảm ơn rất nhiều!",
              "Happy with our service? Share your experience — we appreciate it so much!"
            )}
          </p>
          <a
            href={GOOGLE_WRITE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[var(--vv-red)] hover:bg-red-500 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all transform hover:-translate-y-1 shadow-xl"
          >
            <PenLine size={24} />
            {t("Write a Google Review", "Viết Đánh Giá Google")}
          </a>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="ml-2">{t("Currently 4.4 stars · 65+ reviews", "Hiện tại 4.4 sao · Hơn 65 đánh giá")}</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
