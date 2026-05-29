import React, { useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Star, CheckCircle2, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";

export default function StateInspection() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("TX State Inspection Dallas TX | V.V. Auto", "Kiểm Định Tiểu Bang TX Dallas | V.V. Auto");
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
            <span className="text-[var(--vv-navy)] font-semibold">{t("State Inspection", "Kiểm Định Tiểu Bang")}</span>
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
                {t("TX State Inspection", "Kiểm Định Tiểu Bang TX")} <br/>
                <span className="text-[var(--vv-red)]">{t("in Dallas, TX", "tại Dallas, TX")}</span>
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="text-gray-600 font-medium">{t("Official Inspection Station", "Trạm Kiểm Định Chính Thức")}</span>
              </div>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t(
                  "V.V. Auto Repair is an official Texas vehicle safety and emissions inspection station. We provide quick, thorough inspections so you can renew your registration without hassle.",
                  "V.V. Auto Repair là trạm kiểm định khí thải và an toàn xe cộ chính thức của Texas. Chúng tôi cung cấp dịch vụ kiểm định nhanh chóng, kỹ lưỡng để bạn có thể gia hạn đăng ký xe mà không gặp rắc rối."
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://maps.google.com/?q=11366+Jupiter+Rd,+Dallas,+TX+75218" target="_blank" rel="noreferrer" className="bg-[var(--vv-navy)] hover:bg-blue-900 text-white text-center px-8 py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center gap-3 shadow-lg">
                  <MapPin size={24} />
                  {t("Get Directions to Shop", "Chỉ Đường Đến Tiệm")}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[var(--vv-gray)] rounded-2xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="/images/vv-inspection.png" 
                alt="Mechanic performing inspection" 
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
                {t("Fast & Easy Inspections", "Kiểm Định Nhanh Chóng & Dễ Dàng")}
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  {t(
                    "Need your car inspected for registration? Drop by our Dallas shop. Most inspections are completed quickly while you wait. If your vehicle doesn't pass, our mechanics can fix the problem right here so you don't have to drive around town.",
                    "Cần kiểm định xe để đăng ký? Hãy ghé qua tiệm Dallas của chúng tôi. Hầu hết các cuộc kiểm định được hoàn thành nhanh chóng trong lúc bạn chờ đợi. Nếu xe của bạn không đạt yêu cầu, thợ máy của chúng tôi có thể khắc phục sự cố ngay tại đây để bạn không phải chạy quanh thành phố."
                  )}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="text-[var(--vv-blue)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Safety Inspection:", "Kiểm định an toàn:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Brakes & steering", "Phanh & hệ thống lái")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Lights & turn signals", "Đèn & xi nhan")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Tires & wheel assembly", "Lốp & bánh xe")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Mirrors & wipers", "Gương & cần gạt nước")}</span></li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="text-[var(--vv-blue)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Emissions Testing:", "Kiểm định khí thải:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("On-Board Diagnostic (OBD) check", "Kiểm tra chẩn đoán trên xe (OBD)")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Exhaust system integrity", "Tính toàn vẹn của hệ thống xả")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Check engine light verification", "Kiểm tra đèn báo động cơ")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Gas cap check", "Kiểm tra nắp bình xăng")}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[var(--vv-navy)] rounded-2xl p-8 text-white shadow-xl sticky top-28">
                <h3 className="text-2xl font-bold mb-4 font-display">{t("Stop By For Inspection", "Ghé Ngang Kiểm Định")}</h3>
                <p className="text-white/80 mb-8">{t("Inspections are performed at our Dallas location. No appointment needed.", "Kiểm định được thực hiện tại cơ sở Dallas của chúng tôi. Không cần đặt lịch trước.")}</p>
                
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
    </Layout>
  );
}