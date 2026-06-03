import React, { useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Star, CheckCircle2, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";
import { ServiceReviewBadge } from "@/components/service-review-badge";

export default function EngineRepair() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("Engine Repair & Rebuilds Dallas TX | V.V. Auto", "Sửa Chữa & Phục Hồi Động Cơ Dallas TX | V.V. Auto");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t(
        "Expert engine repair and rebuilds in Dallas, TX. V.V. Auto handles timing belts, head gaskets, oil leaks, full engine rebuilds, and more — with honest diagnosis and fair pricing.",
        "Sửa chữa và phục hồi động cơ chuyên nghiệp tại Dallas, TX. V.V. Auto xử lý dây curoa cam, ron nắp quy lát, rò nhớt, phục hồi toàn bộ động cơ và nhiều hơn nữa — chẩn đoán trung thực, giá cả hợp lý."
      ));
    }
  }, [t]);

  return (
    <Layout>
      <div className="bg-[var(--vv-gray)] py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <Link href="/" className="hover:text-[var(--vv-navy)] transition-colors">{t("Home", "Trang Chủ")}</Link>
            <ChevronRight size={14} />
            <Link href="/services" className="hover:text-[var(--vv-navy)] transition-colors">{t("Services", "Dịch Vụ")}</Link>
            <ChevronRight size={14} />
            <span className="text-[var(--vv-navy)] font-semibold">{t("Engine Repair", "Sửa Chữa Động Cơ")}</span>
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
                {t("Engine Repair", "Sửa Chữa Động Cơ")} <br/>
                <span className="text-[var(--vv-red)]">{t("in Dallas, TX", "tại Dallas, TX")}</span>
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="text-gray-600 font-medium">{t("Expert Mechanics", "Thợ Máy Chuyên Nghiệp")}</span>
              </div>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t(
                  "From minor leaks to major engine rebuilds, our experienced mechanics have the skills and tools to get your vehicle back on the road. We handle domestic and imported vehicles with precision and care.",
                  "Từ những rò rỉ nhỏ đến phục hồi toàn bộ động cơ, những thợ máy giàu kinh nghiệm của chúng tôi có đủ kỹ năng và công cụ để đưa xe của bạn trở lại đường. Chúng tôi xử lý cả xe Mỹ và xe nhập khẩu với sự cẩn thận và độ chính xác cao."
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
                src="/images/vv-engine.png" 
                alt="Mechanic repairing engine" 
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
                {t("Complete Engine Solutions", "Giải Pháp Động Cơ Toàn Diện")}
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  {t(
                    "Engine problems can be stressful, but they don't have to be. We diagnose the issue accurately the first time and explain your options clearly. We never recommend a full replacement when a repair will fix the problem.",
                    "Các vấn đề về động cơ có thể gây căng thẳng, nhưng không nhất thiết phải như vậy. Chúng tôi chẩn đoán sự cố chính xác ngay từ lần đầu tiên và giải thích rõ ràng các lựa chọn của bạn. Chúng tôi không bao giờ đề xuất thay thế toàn bộ khi chỉ cần sửa chữa là giải quyết được vấn đề."
                  )}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="text-[var(--vv-blue)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Common Repairs:", "Sửa chữa phổ biến:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Timing belt replacement", "Thay dây curoa cam")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Water pump repairs", "Sửa chữa bơm nước")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Head gasket replacement", "Thay ron nắp quy lát")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Oil leak fixes", "Khắc phục rò rỉ nhớt")}</span></li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="text-[var(--vv-blue)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Major Engine Work:", "Sửa chữa lớn:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Complete engine rebuilds", "Phục hồi toàn bộ động cơ")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Engine replacement", "Thay thế động cơ")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Transmission repair", "Sửa chữa hộp số")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Cylinder head machining", "Phay nắp quy lát")}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[var(--vv-navy)] rounded-2xl p-8 text-white shadow-xl sticky top-28">
                <h3 className="text-2xl font-bold mb-4 font-display">{t("Schedule Your Repair", "Đặt Lịch Sửa Chữa")}</h3>
                <p className="text-white/80 mb-8">{t("Engine services are performed at our Dallas location.", "Dịch vụ động cơ được thực hiện tại cơ sở Dallas của chúng tôi.")}</p>
                
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
      <ServiceReviewBadge keywords={["engine", "diagnostic", "động cơ"]} />
    </Layout>
  );
}