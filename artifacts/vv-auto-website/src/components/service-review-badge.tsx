import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Star, Quote, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export interface ServiceReview {
  name: string;
  stars: number;
  textEn: string;
  textVi?: string;
}

interface ServiceReviewBadgeProps {
  keywords: string[];
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-yellow-400">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          fill={i <= count ? "currentColor" : "none"}
          strokeWidth={i <= count ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, lang }: { review: ServiceReview; lang: "en" | "vi" }) {
  const showVi = lang === "vi" && review.textVi;
  const displayText = showVi ? review.textVi! : review.textEn;
  const secondaryText = showVi ? review.textEn : review.textVi;
  const hasBilingual = !!review.textVi;

  return (
    <div className="bg-[var(--vv-gray)] rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 relative">
      <Quote
        size={36}
        className="absolute top-5 right-5 text-[var(--vv-red)] opacity-10"
      />

      <StarRow count={review.stars} />

      <p className="text-gray-800 leading-relaxed font-medium">
        "{displayText}"
      </p>

      {hasBilingual && secondaryText && (
        <p className="text-gray-500 text-sm leading-relaxed italic border-t border-gray-200 pt-3">
          "{secondaryText}"
        </p>
      )}

      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-200">
        <div className="w-9 h-9 rounded-full bg-[var(--vv-navy)] flex items-center justify-center shrink-0">
          <span className="text-white font-extrabold text-sm font-display">
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-semibold text-[var(--vv-navy)] text-sm">{review.name}</p>
          <p className="text-xs text-gray-500">
            {lang === "vi" ? "Đánh Giá Google" : "Google Review"}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ServiceReviewBadge({ keywords }: ServiceReviewBadgeProps) {
  const { t, lang } = useLanguage();
  const [reviews, setReviews] = useState<ServiceReview[]>([]);

  useEffect(() => {
    const params = new URLSearchParams({ limit: "2" });
    if (keywords.length > 0) {
      params.set("keywords", keywords.join(","));
    }
    fetch(`/api/reviews?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
  }, [keywords.join(",")]);

  if (reviews.length === 0) return null;

  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-block bg-yellow-400/15 text-yellow-700 font-bold tracking-widest uppercase px-3 py-1 rounded-full text-xs mb-2">
              {t("What Customers Say", "Khách Hàng Nói Gì")}
            </span>
            <h2 className="text-2xl font-extrabold text-[var(--vv-navy)] font-display">
              {t("Real Reviews from Real Customers", "Đánh Giá Thật từ Khách Hàng Thật")}
            </h2>
          </div>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-[var(--vv-blue)] font-semibold hover:text-[var(--vv-navy)] transition-colors whitespace-nowrap text-sm"
          >
            {t("See all reviews", "Xem tất cả đánh giá")} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} review={review} lang={lang} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 bg-[var(--vv-navy)] hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm"
          >
            {t("Read All Customer Reviews", "Đọc Tất Cả Đánh Giá Khách Hàng")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
