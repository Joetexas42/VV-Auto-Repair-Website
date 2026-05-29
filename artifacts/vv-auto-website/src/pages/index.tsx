import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Star, Wrench, ShieldCheck, CheckCircle2, ChevronRight, ArrowRight, Clock, Images, Quote, ExternalLink, PenLine } from "lucide-react";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";
import { fetchAllReviews, type AllReviewsResponse } from "@/lib/reviewsApi";

const FALLBACK_FEATURED = [
  {
    name: "Michael T.",
    stars: 5,
    textEn: "Brought my car in for brake replacement and they did an incredible job at a fair price. The mechanic explained everything clearly and didn't try to upsell me. Honest shop — I'll keep coming back.",
    textVi: "Tôi đem xe đến thay phanh và họ làm việc xuất sắc với giá hợp lý. Thợ giải thích rõ ràng và không ép mua thêm. Tiệm trung thực — tôi sẽ quay lại.",
    badge: "Dallas",
  },
  {
    name: "Thanh H.",
    stars: 5,
    textEn: "Professional and honest service. They checked the car for free and clearly explained the problem. Prices are fair — not inflated like other shops. I recommend them to all my friends.",
    textVi: "Dịch vụ chuyên nghiệp và trung thực. Họ kiểm tra xe miễn phí và giải thích rõ ràng vấn đề. Giá cả hợp lý, không chặt chém. Tôi giới thiệu cho bạn bè.",
    badge: "Dallas",
  },
  {
    name: "Jessica R.",
    stars: 5,
    textEn: "Had a fender bender and the Garland body shop made my car look flawless. They handled my insurance claim and made the whole process easy. Couldn't be happier!",
    textVi: "Sau một vụ va chạm nhỏ, tiệm đồng sơn Garland làm xe tôi trông hoàn hảo. Họ xử lý hồ sơ bảo hiểm và mọi thứ rất dễ dàng. Tôi rất hài lòng!",
    badge: "Garland",
  },
];

function buildFeatured(liveData: AllReviewsResponse): Array<{ name: string; stars: number; textEn: string; textVi: string; badge: string; relativeTime?: string }> {
  const allReviews: Array<{ name: string; stars: number; textEn: string; textVi: string; badge: string; relativeTime?: string }> = [];
  if (liveData.dallas?.reviews) {
    for (const r of liveData.dallas.reviews) {
      if (r.text) allReviews.push({ name: r.author_name, stars: r.rating, textEn: r.text, textVi: r.text, badge: "Dallas", relativeTime: r.relative_time_description });
    }
  }
  if (liveData.garland?.reviews) {
    for (const r of liveData.garland.reviews) {
      if (r.text) allReviews.push({ name: r.author_name, stars: r.rating, textEn: r.text, textVi: r.text, badge: "Garland", relativeTime: r.relative_time_description });
    }
  }
  allReviews.sort((a, b) => b.stars - a.stars);
  return allReviews.slice(0, 3);
}

const GOOGLE_WRITE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ025JNyKhToYRNRX5NXicpUQ";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/V+V+Auto+Repair/@32.8396,-96.6685,17z/data=!4m8!3m7!1s0x0:0x0!8m2!3d32.8396!4d-96.6685!9m1!1b1";

function GoogleBadge({ live }: { live: boolean }) {
  return (
    <a
      href={live ? GOOGLE_MAPS_URL : undefined}
      target={live ? "_blank" : undefined}
      rel={live ? "noreferrer" : undefined}
      className={`inline-flex items-center gap-1.5 mt-1 ${live ? "cursor-pointer group" : "cursor-default"}`}
      title={live ? "View on Google Maps" : undefined}
      aria-label={live ? "Verified Google Review — view on Google Maps" : "Google Review (sample)"}
      onClick={live ? undefined : (e) => e.preventDefault()}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`shrink-0 transition-opacity ${live ? "opacity-100" : "opacity-30"}`}
      >
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill={live ? "#4285F4" : "#9ca3af"} />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill={live ? "#34A853" : "#9ca3af"} />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill={live ? "#FBBC05" : "#9ca3af"} />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill={live ? "#EA4335" : "#9ca3af"} />
      </svg>
      <span className={`text-xs font-semibold transition-colors ${live ? "text-white/50 group-hover:text-white/80" : "text-white/20"}`}>
        Google Review
      </span>
      {live && (
        <ExternalLink size={10} className="text-white/40 group-hover:text-white/70 transition-colors" />
      )}
    </a>
  );
}

export default function Homepage() {
  const { lang, t } = useLanguage();
  const [liveReviewData, setLiveReviewData] = useState<AllReviewsResponse | null>(null);

  useEffect(() => {
    fetchAllReviews().then((data) => {
      if (data && ((data.dallas?.reviews?.length ?? 0) > 0 || (data.garland?.reviews?.length ?? 0) > 0)) {
        setLiveReviewData(data);
      }
    });
  }, []);

  useEffect(() => {
    document.title = t("V.V. Auto Repair & Body Shop | Dallas & Garland TX", "Sửa Chữa Ô Tô V.V. Auto | Dallas & Garland TX");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t("Honest family-owned auto repair in Dallas and collision body shop in Garland. Specializing in mechanics, diagnostics, and paint.", "Sửa chữa ô tô và đồng sơn uy tín tại Dallas và Garland. Dịch vụ tận tâm, giá cả trung thực."));
    }
  }, [t]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--vv-navy)]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-vv-gradient mix-blend-multiply opacity-90 z-10"></div>
          <img 
            src="/images/vv-hero.png" 
            alt="V.V. Auto Repair Shop Garage" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-8">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span>{t("4.4 Stars (65+ Reviews)", "4.4 Sao (Hơn 65+ Đánh giá)")}</span>
              <span className="w-1 h-1 rounded-full bg-white/50 mx-2"></span>
              <span>{t("Serving Dallas & Garland", "Phục vụ Dallas & Garland")}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight font-display">
              {t("Honest Auto Repair", "Sửa Chữa Ô Tô Uy Tín")} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[var(--vv-red)]">
                {t("in Dallas, TX", "tại Dallas, TX")}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-medium max-w-2xl">
              {t(
                "Trusted local mechanic serving Dallas drivers with fair pricing, reliable repairs, diagnostics, body work, and straightforward service.",
                "Gara địa phương đáng tin cậy phục vụ tài xế Dallas với giá cả công bằng, sửa chữa đảm bảo, chẩn đoán lỗi, làm đồng sơn và dịch vụ trung thực."
              )}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:2143202171" className="bg-[var(--vv-red)] hover:bg-red-500 text-white text-center px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3">
                <Phone size={24} />
                {t("Call Now — (214) 320-2171", "Gọi Ngay — (214) 320-2171")}
              </a>
              <a href="#locations" className="bg-[var(--vv-teal)] hover:bg-teal-400 text-white text-center px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3">
                <MapPin size={24} className="text-[var(--vv-red)]" />
                {t("Get Directions", "Chỉ Đường")}
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-4 text-white/80 text-sm font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[var(--vv-red)]"/> {t("Honest Pricing", "Giá Cả Trung Thực")}</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[var(--vv-red)]"/> {t("Vietnamese Speaking", "Giao Tiếp Tiếng Việt")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--vv-navy)] mb-6 tracking-tight font-display">
                {t("A mechanic you'd send your mom to.", "Người thợ máy mà bạn có thể an tâm giới thiệu cho gia đình.")}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t(
                  "Finding a mechanic you can trust shouldn't be hard. At V.V. Auto, we built our family business on a simple premise: relentlessly honest work. We never overcharge. We never invent repairs you don't need. We just fix your car right the first time.",
                  "Việc tìm kiếm một thợ máy đáng tin cậy không nên quá khó khăn. Tại V.V. Auto, chúng tôi xây dựng cơ sở gia đình mình dựa trên một nguyên tắc đơn giản: làm việc trung thực tuyệt đối. Chúng tôi không bao giờ tính phí quá cao. Chúng tôi không bao giờ vẽ ra những sửa chữa mà bạn không cần. Chúng tôi chỉ sửa xe của bạn đúng cách ngay từ lần đầu tiên."
                )}
              </p>
              
              <div className="bg-[var(--vv-gray)] rounded-xl p-6 border-l-4 border-[var(--vv-blue)] mb-8">
                <p className="text-[var(--vv-navy)] font-medium italic">
                  "We speak English and Tiếng Việt, serving our diverse community across Dallas and Garland with respect and transparency."
                </p>
                <p className="text-[var(--vv-navy)] font-medium italic mt-3 opacity-80">
                  "Chúng tôi giao tiếp bằng tiếng Anh và Tiếng Việt, phục vụ cộng đồng đa dạng tại Dallas và Garland với sự tôn trọng và minh bạch."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--vv-gray)] flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-[var(--vv-blue)]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--vv-navy)] font-display">{t("Honest Pricing", "Giá Cả Minh Bạch")}</h4>
                    <p className="text-sm text-gray-500 mt-1">{t("No hidden fees or surprise charges.", "Không có phí ẩn hay chi phí bất ngờ.")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--vv-gray)] flex items-center justify-center shrink-0">
                    <Wrench className="text-[var(--vv-blue)]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--vv-navy)] font-display">{t("Expert Service", "Dịch Vụ Chuyên Nghiệp")}</h4>
                    <p className="text-sm text-gray-500 mt-1">{t("From diagnostics to full body repair.", "Từ chẩn đoán lỗi đến phục hồi thân vỏ.")}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--vv-blue)] rounded-2xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="/images/vv-brakes.png" 
                alt="Mechanic working on brakes" 
                className="relative rounded-2xl shadow-xl z-10 w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl z-20 flex items-center gap-4">
                <div className="text-5xl font-black text-[var(--vv-red)] font-display">65+</div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <div className="font-bold text-[var(--vv-navy)] font-display">{t("5-Star Reviews", "Đánh Giá 5 Sao")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[var(--vv-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-[var(--vv-red)] tracking-widest uppercase mb-3">{t("What We Do", "Những Gì Chúng Tôi Làm")}</h2>
            <h3 className="text-4xl font-extrabold text-[var(--vv-navy)] tracking-tight mb-4 font-display">{t("Complete Auto Care", "Chăm Sóc Ô Tô Toàn Diện")}</h3>
            <p className="text-lg text-gray-600">
              {t(
                "Two specialized locations working together to handle everything your vehicle needs, from routine maintenance to major collision repair.",
                "Hai địa điểm chuyên biệt phối hợp cùng nhau để xử lý mọi nhu cầu cho chiếc xe của bạn, từ bảo dưỡng định kỳ đến sửa chữa tai nạn nặng."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Auto Repair Services */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-[var(--vv-blue)]" size={20} />
                  <span className="font-semibold text-[var(--vv-blue)] tracking-wide uppercase text-sm">{t("Dallas Location", "Địa điểm Dallas")}</span>
                </div>
                <h4 className="text-2xl font-bold text-[var(--vv-navy)] font-display">{t("Auto Repair Services", "Dịch Vụ Sửa Chữa Ô Tô")}</h4>
                <p className="text-gray-500 mt-2">{t("Mechanical repair, maintenance, and diagnostics.", "Sửa chữa máy móc, bảo dưỡng và chẩn đoán.")}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {(lang === "en" ? [
                    "Official State Inspection",
                    "Computerized Engine Diagnostic Test",
                    "Brake Repair & Replacement",
                    "Oil Changes & Routine Maintenance",
                    "Engine Repair & Rebuilds",
                    "Domestic & Foreign Vehicles",
                    "General Auto Repair"
                  ] : [
                    "Kiểm Định Chính Thức Tiểu Bang",
                    "Kiểm Tra Chẩn Đoán Động Cơ Bằng Máy Tính",
                    "Sửa Chữa & Thay Thế Phanh",
                    "Thay Nhớt & Bảo Dưỡng Định Kỳ",
                    "Sửa Chữa & Phục Hồi Động Cơ",
                    "Xe Mỹ & Xe Nhập Khẩu",
                    "Sửa Chữa Ô Tô Tổng Quát"
                  ]).map((service, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-[var(--vv-red)] mt-0.5 shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">{service}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/services" className="text-[var(--vv-blue)] font-bold flex items-center gap-2 hover:text-[var(--vv-navy)] transition-colors">
                    {t("View all mechanical services", "Xem tất cả dịch vụ sửa máy")} <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Auto Body Services */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-[var(--vv-red)]" size={20} />
                  <span className="font-semibold text-[var(--vv-red)] tracking-wide uppercase text-sm">{t("Garland Location", "Địa điểm Garland")}</span>
                </div>
                <h4 className="text-2xl font-bold text-[var(--vv-navy)] font-display">{t("Auto Body Services", "Dịch Vụ Làm Đồng Sơn")}</h4>
                <p className="text-gray-500 mt-2">{t("Collision repair, paint, and insurance claims.", "Sửa chữa tai nạn, sơn xe và làm bảo hiểm.")}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {(lang === "en" ? [
                    "Major & Minor Collision Repair",
                    "Professional Paint & Body Work",
                    "Insurance Claim Repairs",
                    "Free Estimates for Claims",
                    "Works With Any Insurance",
                    "24-Hour Towing Available",
                    "Frame Straightening"
                  ] : [
                    "Sửa Chữa Tai Nạn Nặng & Nhẹ",
                    "Sơn & Làm Đồng Chuyên Nghiệp",
                    "Sửa Chữa Hồ Sơ Bảo Hiểm",
                    "Ước Tính Miễn Phí Cho Hồ Sơ Bảo Hiểm",
                    "Làm Việc Với Mọi Công Ty Bảo Hiểm",
                    "Có Dịch Vụ Kéo Xe 24 Giờ",
                    "Nắn Khung Sườn"
                  ]).map((service, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-[var(--vv-red)] mt-0.5 shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">{service}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/services/collision-body-repair" className="text-[var(--vv-blue)] font-bold flex items-center gap-2 hover:text-[var(--vv-navy)] transition-colors">
                    {t("View all body shop services", "Xem tất cả dịch vụ đồng sơn")} <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-[var(--vv-navy)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-sm font-bold text-[var(--vv-red)] tracking-widest uppercase mb-3">
              {t("Customer Reviews", "Đánh Giá Khách Hàng")}
            </h2>
            <h3 className="text-4xl font-extrabold text-white tracking-tight mb-4 font-display">
              {t("Trusted by Dallas Drivers", "Được Tài Xế Dallas Tin Tưởng")}
            </h3>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={22} fill="currentColor" />)}
              </div>
              <span className="text-white font-bold text-xl font-display">
                {liveReviewData?.dallas?.rating ? liveReviewData.dallas.rating.toFixed(1) : "4.4"}
              </span>
              <span className="text-white/60">
                {liveReviewData?.dallas?.user_ratings_total
                  ? t(`· ${liveReviewData.dallas.user_ratings_total}+ Google Reviews`, `· Hơn ${liveReviewData.dallas.user_ratings_total}+ Đánh Giá Google`)
                  : t("· 65+ Google Reviews", "· Hơn 65+ Đánh Giá Google")}
              </span>
            </div>
            <p className="text-white/70 text-lg">
              {t(
                "Don't take our word for it — here's what our customers say.",
                "Đừng chỉ tin lời chúng tôi — đây là những gì khách hàng nói."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {(liveReviewData ? buildFeatured(liveReviewData) : FALLBACK_FEATURED).map((review, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col gap-4 hover:bg-white/15 transition-colors">
                <Quote size={28} className="text-[var(--vv-red)] opacity-60" />
                <p className="text-white/90 leading-relaxed italic flex-1">
                  "{lang === "vi" ? review.textVi : review.textEn}"
                </p>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex gap-0.5 text-yellow-400">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= review.stars ? "currentColor" : "none"} strokeWidth={i <= review.stars ? 0 : 1.5} />)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                      {review.badge}
                    </span>
                  </div>
                  <p className="font-bold text-white font-display">{review.name}</p>
                  <p className="text-white/50 text-sm">
                    {review.relativeTime ?? t("Google Customer", "Khách Hàng Google")}
                  </p>
                  <GoogleBadge live={!!liveReviewData} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-3 bg-[var(--vv-red)] hover:bg-red-500 text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg"
            >
              <Star size={20} fill="currentColor" />
              {t("See All Customer Reviews", "Xem Tất Cả Đánh Giá")}
              <ArrowRight size={20} />
            </Link>
            <a
              href={GOOGLE_WRITE_REVIEW_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-6 py-4 rounded-md font-bold text-lg transition-all hover:-translate-y-1"
            >
              <PenLine size={18} />
              {t("Write a Review", "Viết Đánh Giá")}
            </a>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-[var(--vv-navy)] tracking-tight mb-4 font-display">
              {t("Two Convenient Locations", "Hai Địa Điểm Thuận Tiện")}
            </h2>
            <p className="text-lg text-gray-600">
              {t(
                "Find the right shop for your needs. Auto repair in Dallas, collision and body work in Garland.",
                "Tìm cửa tiệm phù hợp với nhu cầu của bạn. Sửa chữa máy móc tại Dallas, làm đồng sơn tại Garland."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Dallas Card */}
            <div className="bg-white border-2 border-[var(--vv-gray)] rounded-2xl p-8 lg:p-10 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--vv-gray)] rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              
              <div className="inline-block bg-[var(--vv-blue)] text-white text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                {t("Auto Repair", "Sửa Chữa Máy Móc")}
              </div>
              
              <h3 className="text-3xl font-extrabold text-[var(--vv-navy)] mb-2 font-display">V V Auto Repair</h3>
              <p className="text-gray-500 font-medium mb-8 pb-8 border-b border-gray-100">Dallas</p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--vv-gray)] p-3 rounded-full text-[var(--vv-blue)]"><MapPin size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 font-display">{t("Address", "Địa chỉ")}</h4>
                    <p className="text-gray-600 leading-relaxed">11366 Jupiter Rd<br/>Dallas, TX 75218</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--vv-gray)] p-3 rounded-full text-[var(--vv-blue)]"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 font-display">{t("Contact", "Liên Hệ")}</h4>
                    <p className="text-gray-600">{t("Main:", "Chính:")} <a href="tel:2143202171" className="font-semibold text-[var(--vv-blue)] hover:underline">214-320-2171</a></p>
                    <p className="text-gray-600">{t("Cell:", "Di động:")} <a href="tel:4692589356" className="font-semibold text-[var(--vv-blue)] hover:underline">469-258-9356</a></p>
                    <p className="text-gray-600 mt-1"><a href="mailto:vv.autorepair@yahoo.com" className="hover:text-[var(--vv-blue)] transition-colors">vv.autorepair@yahoo.com</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--vv-gray)] p-3 rounded-full text-[var(--vv-blue)]"><Clock size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 font-display">{t("Hours", "Giờ mở cửa")}</h4>
                    <p className="text-gray-600">{t("Monday–Friday: 8:00am–6:00pm", "Thứ Hai–Thứ Sáu: 8:00sáng–6:00chiều")}</p>
                    <p className="text-gray-500">{t("Saturday–Sunday: Closed", "Thứ Bảy–Chủ Nhật: Đóng cửa")}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:2143202171" className="flex-1 bg-[var(--vv-navy)] hover:bg-blue-900 text-white text-center py-3 rounded-lg font-bold transition-colors">
                  {t("Call Dallas Shop", "Gọi Tiệm Dallas")}
                </a>
                <a href="https://maps.google.com/?q=11366+Jupiter+Rd,+Dallas,+TX+75218" target="_blank" rel="noreferrer" className="flex-1 bg-[var(--vv-teal)] hover:bg-teal-400 text-white text-center py-3 rounded-lg font-bold transition-colors">
                  {t("Get Directions", "Chỉ Đường")}
                </a>
              </div>
            </div>

            {/* Garland Card */}
            <div className="bg-white border-2 border-[var(--vv-gray)] rounded-2xl p-8 lg:p-10 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--vv-gray)] rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              
              <div className="inline-block bg-[var(--vv-red)] text-white text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                {t("Collision & Body", "Đồng Sơn & Tại Nạn")}
              </div>
              
              <h3 className="text-3xl font-extrabold text-[var(--vv-navy)] mb-2 font-display">V V Auto Body Repair</h3>
              <p className="text-gray-500 font-medium mb-8 pb-8 border-b border-gray-100">Garland</p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--vv-gray)] p-3 rounded-full text-[var(--vv-red)]"><MapPin size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 font-display">{t("Address", "Địa chỉ")}</h4>
                    <p className="text-gray-600 leading-relaxed">3730 Marquis Dr<br/>Garland, TX 75042</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--vv-gray)] p-3 rounded-full text-[var(--vv-red)]"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 font-display">{t("Contact", "Liên Hệ")}</h4>
                    <p className="text-gray-600">Huong: <a href="tel:4692589356" className="font-semibold text-[var(--vv-red)] hover:underline">469-258-9356</a></p>
                    <p className="text-gray-600">David: <a href="tel:4694075340" className="font-semibold text-[var(--vv-red)] hover:underline">469-407-5340</a></p>
                    <p className="text-gray-600 mt-1"><a href="mailto:vv.autobodycorp@gmail.com" className="hover:text-[var(--vv-red)] transition-colors">vv.autobodycorp@gmail.com</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--vv-gray)] p-3 rounded-full text-[var(--vv-red)]"><Clock size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 font-display">{t("Hours", "Giờ mở cửa")}</h4>
                    <p className="text-gray-600">{t("Monday–Friday: 8:00am–5:00pm", "Thứ Hai–Thứ Sáu: 8:00sáng–5:00chiều")}</p>
                    <p className="text-gray-500">{t("Saturday–Sunday: Closed", "Thứ Bảy–Chủ Nhật: Đóng cửa")}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:4692589356" className="flex-1 bg-[var(--vv-navy)] hover:bg-blue-900 text-white text-center py-3 rounded-lg font-bold transition-colors">
                  {t("Call Garland Shop", "Gọi Tiệm Garland")}
                </a>
                <a href="https://maps.google.com/?q=3730+Marquis+Dr,+Garland,+TX+75042" target="_blank" rel="noreferrer" className="flex-1 bg-[var(--vv-teal)] hover:bg-teal-400 text-white text-center py-3 rounded-lg font-bold transition-colors">
                  {t("Get Directions", "Chỉ Đường")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[var(--vv-red)] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 font-display">
            {t("Need an honest opinion on your car?", "Cần một ý kiến trung thực về chiếc xe của bạn?")}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {t(
              "Stop by our Dallas shop for diagnostics, or visit our Garland shop for a free collision estimate.",
              "Ghé qua tiệm Dallas của chúng tôi để chẩn đoán, hoặc đến tiệm Garland để được ước tính sửa chữa miễn phí."
            )}
          </p>
          <a href="tel:2143202171" className="inline-flex items-center gap-3 bg-white text-[var(--vv-red)] px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
            <Phone size={24} />
            {t("Call Dallas: (214) 320-2171", "Gọi Dallas: (214) 320-2171")}
          </a>
        </div>
      </section>
    </Layout>
  );
}
