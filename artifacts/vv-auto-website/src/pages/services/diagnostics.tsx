import React, { useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Star, CheckCircle2, ChevronRight, Laptop } from "lucide-react";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";

export default function Diagnostics() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("Computer Diagnostics Dallas TX | V.V. Auto", "Chẩn Đoán Máy Tính Dallas TX | V.V. Auto");
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
            <span className="text-[var(--vv-navy)] font-semibold">{t("Diagnostics", "Chẩn Đoán")}</span>
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
                {t("Computer Diagnostics", "Chẩn Đoán Lỗi Bằng Máy Tính")} <br/>
                <span className="text-[var(--vv-red)]">{t("in Dallas, TX", "tại Dallas, TX")}</span>
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="text-gray-600 font-medium">{t("Accurate Troubleshooting", "Chẩn Đoán Chính Xác")}</span>
              </div>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t(
                  "Is your check engine light on? Don't guess what's wrong. Our advanced computer diagnostic tools read your vehicle's codes accurately, allowing our mechanics to pinpoint the exact issue quickly and save you money on unnecessary parts.",
                  "Đèn báo lỗi động cơ của bạn có sáng không? Đừng đoán mò xem có chuyện gì. Các công cụ chẩn đoán máy tính tiên tiến của chúng tôi đọc chính xác mã lỗi xe của bạn, cho phép thợ máy xác định đúng vấn đề nhanh chóng và tiết kiệm tiền cho bạn khỏi những phụ tùng không cần thiết."
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
                src="/images/vv-diagnostics.png" 
                alt="Mechanic using diagnostic tool" 
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
                {t("We Find The Root Cause", "Chúng Tôi Tìm Nguyên Nhân Gốc Rễ")}
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  {t(
                    "Modern vehicles are highly computerized. When a warning light comes on, it means your vehicle's computer has detected a problem. A diagnostic test is the only way to know exactly what's failing.",
                    "Xe cộ hiện đại được vi tính hóa rất cao. Khi đèn cảnh báo bật sáng, điều đó có nghĩa là máy tính của xe đã phát hiện sự cố. Kiểm tra chẩn đoán là cách duy nhất để biết chính xác bộ phận nào đang hỏng."
                  )}
                </p>
                <p>
                  {t(
                    "We don't just clear the code and send you on your way. We use the code as a starting point to physically inspect the components and find the root cause of the problem.",
                    "Chúng tôi không chỉ xóa mã lỗi và để bạn đi. Chúng tôi sử dụng mã lỗi như một điểm bắt đầu để kiểm tra vật lý các bộ phận và tìm ra nguyên nhân gốc rễ của vấn đề."
                  )}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <Laptop className="text-[var(--vv-blue)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("We Diagnose:", "Chúng tôi chẩn đoán:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Check Engine Lights", "Đèn báo lỗi động cơ")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("ABS & Airbag Lights", "Đèn báo ABS & Túi khí")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Transmission Issues", "Vấn đề hộp số")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Electrical Problems", "Vấn đề điện")}</span></li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="text-[var(--vv-blue)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Our Process:", "Quy trình của chúng tôi:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Scan vehicle computer for codes", "Quét máy tính xe tìm mã lỗi")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Perform physical inspection", "Kiểm tra vật lý")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Provide honest repair estimate", "Cung cấp báo giá sửa chữa trung thực")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Repair and reset systems", "Sửa chữa và thiết lập lại hệ thống")}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[var(--vv-navy)] rounded-2xl p-8 text-white shadow-xl sticky top-28">
                <h3 className="text-2xl font-bold mb-4 font-display">{t("Schedule Diagnostics", "Đặt Lịch Chẩn Đoán")}</h3>
                <p className="text-white/80 mb-8">{t("Diagnostics are performed at our Dallas location.", "Việc chẩn đoán được thực hiện tại cơ sở Dallas của chúng tôi.")}</p>
                
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