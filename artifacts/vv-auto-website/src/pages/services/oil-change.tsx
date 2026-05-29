import React, { useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Star, CheckCircle2, ChevronRight, ArrowRight, OilCan } from "lucide-react";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";
import { ServiceReviewBadge } from "@/components/service-review-badge";

const OIL_REVIEWS = [
  {
    name: "David L.",
    stars: 4,
    textEn:
      "Great local mechanic shop. Took my truck in for an oil change and they noticed a couple other things that needed attention but didn't pressure me — just let me know and let me decide. That's the kind of honesty I appreciate.",
    textVi:
      "Tiệm thợ địa phương rất tốt. Tôi mang xe tải đến thay nhớt và họ phát hiện thêm một vài vấn đề cần chú ý nhưng không ép buộc — chỉ thông báo và để tôi tự quyết định. Đó là sự trung thực mà tôi trân trọng.",
  },
  {
    name: "Lan N.",
    stars: 5,
    textEn:
      "Excellent shop with skilled mechanics and very reasonable prices. I'm always satisfied with the service here. They fix the car quickly and on schedule — truly reliable!",
    textVi:
      "Tiệm sửa xe rất tốt, thợ tay nghề cao và giá cả hợp lý. Tôi luôn hài lòng với dịch vụ ở đây. Họ sửa xe nhanh và đúng lịch hẹn — rất đáng tin cậy!",
  },
];

export default function OilChange() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("Oil Change & Maintenance Dallas TX | V.V. Auto", "Thay Nhớt & Bảo Dưỡng Dallas TX | V.V. Auto");
  }, [t]);

  return (
    <Layout>
      {/* Breadcrumbs */}
      <div className="bg-[var(--vv-gray)] py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <Link href="/" className="hover:text-[var(--vv-navy)] transition-colors">{t("Home", "Trang Chủ")}</Link>
            <ChevronRight size={14} />
            <Link href="/services" className="hover:text-[var(--vv-navy)] transition-colors">{t("Services", "Dịch Vụ")}</Link>
            <ChevronRight size={14} />
            <span className="text-[var(--vv-navy)] font-semibold">{t("Oil Change", "Thay Nhớt")}</span>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[var(--vv-blue)]/10 text-[var(--vv-blue)] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 text-sm">
                {t("Dallas Location Service", "Dịch Vụ Tại Dallas")}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--vv-navy)] tracking-tight mb-6 leading-tight font-display">
                {t("Oil Changes & Maintenance", "Thay Nhớt & Bảo Dưỡng")} <br/>
                <span className="text-[var(--vv-red)]">{t("in Dallas, TX", "tại Dallas, TX")}</span>
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="text-gray-600 font-medium">{t("Quick & Reliable Service", "Dịch vụ nhanh chóng & đáng tin cậy")}</span>
              </div>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t(
                  "Regular oil changes are the most important thing you can do to extend the life of your engine. At V.V. Auto Repair, we offer fast, affordable oil changes using high-quality synthetic and conventional oils to keep your vehicle running smoothly.",
                  "Thay nhớt định kỳ là điều quan trọng nhất bạn có thể làm để kéo dài tuổi thọ động cơ. Tại V.V. Auto Repair, chúng tôi cung cấp dịch vụ thay nhớt nhanh chóng, giá cả phải chăng bằng các loại dầu tổng hợp và dầu thường chất lượng cao để giữ cho xe của bạn hoạt động mượt mà."
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:2143202171" className="bg-[var(--vv-navy)] hover:bg-blue-900 text-white text-center px-8 py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center gap-3 shadow-lg">
                  <Phone size={24} />
                  {t("Call Dallas Shop", "Gọi Tiệm Dallas")}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[var(--vv-gray)] rounded-2xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="/images/vv-oil.png" 
                alt="Mechanic changing oil" 
                className="relative rounded-2xl shadow-xl z-10 w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--vv-gray)] border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-extrabold text-[var(--vv-navy)] mb-8 font-display">
                {t("Comprehensive Maintenance", "Bảo Dưỡng Toàn Diện")}
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  {t(
                    "An oil change at V.V. Auto is more than just draining and filling. Every oil change includes a courtesy multi-point inspection to ensure your vehicle is safe for the road.",
                    "Thay nhớt tại V.V. Auto không chỉ là xả và châm dầu. Mỗi lần thay nhớt đều bao gồm một buổi kiểm tra đa điểm miễn phí để đảm bảo xe của bạn an toàn khi đi trên đường."
                  )}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="text-[var(--vv-blue)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Our Oil Services:", "Dịch vụ thay nhớt:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Full Synthetic Oil Changes", "Thay nhớt tổng hợp toàn phần")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Synthetic Blend Oil Changes", "Thay nhớt bán tổng hợp")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("High Mileage Oil Changes", "Thay nhớt cho xe đi nhiều")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Conventional Oil Changes", "Thay nhớt thông thường")}</span></li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="text-[var(--vv-blue)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Included Checks:", "Kiểm tra bao gồm:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Fluid level inspection & top-off", "Kiểm tra & châm thêm chất lỏng")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Tire pressure check", "Kiểm tra áp suất lốp")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Air filter inspection", "Kiểm tra lọc gió")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Battery & belt visual check", "Kiểm tra bình ắc quy & dây curoa")}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[var(--vv-navy)] rounded-2xl p-8 text-white shadow-xl sticky top-28">
                <h3 className="text-2xl font-bold mb-4 font-display">{t("Stop By For Service", "Ghé Tiệm Làm Dịch Vụ")}</h3>
                <p className="text-white/80 mb-8">{t("Maintenance services are performed at our Dallas location.", "Dịch vụ bảo dưỡng được thực hiện tại cơ sở Dallas của chúng tôi.")}</p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[var(--vv-red)] shrink-0" size={24} />
                    <div>
                      <p className="font-semibold">V V Auto Repair</p>
                      <p className="text-white/80">11366 Jupiter Rd<br/>Dallas, TX 75218</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-[var(--vv-red)] shrink-0" size={24} />
                    <div>
                      <p className="text-white/80">{t("Mon–Fri: 8am–6pm", "Thứ Hai–Thứ Sáu: 8am–6pm")}</p>
                      <p className="text-white/80">{t("Sat–Sun: Closed", "Thứ Bảy–Chủ Nhật: Đóng cửa")}</p>
                    </div>
                  </div>
                </div>

                <a href="tel:2143202171" className="block w-full bg-[var(--vv-red)] hover:bg-red-500 text-white text-center py-4 rounded-lg font-bold text-lg transition-colors shadow-lg">
                  (214) 320-2171
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Badge */}
      <ServiceReviewBadge reviews={OIL_REVIEWS} />
    </Layout>
  );
}