import React, { useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("Contact Us | V.V. Auto Repair & Body Shop", "Liên Hệ | V.V. Auto Repair & Body Shop");
  }, [t]);

  return (
    <Layout>
      <section className="bg-[var(--vv-navy)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-vv-gradient mix-blend-multiply opacity-90 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 font-display">
            {t("Contact Us", "Liên Hệ Chúng Tôi")}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t(
              "Two locations ready to serve you. Call us or stop by during business hours.",
              "Hai địa điểm sẵn sàng phục vụ bạn. Hãy gọi cho chúng tôi hoặc ghé qua trong giờ làm việc."
            )}
          </p>
        </div>
      </section>

      <section className="py-24 bg-[var(--vv-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Dallas Card */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 lg:p-10 shadow-lg relative overflow-hidden group">
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
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--vv-gray)] p-3 rounded-full text-[var(--vv-blue)]"><Mail size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 font-display">Email</h4>
                    <p className="text-gray-600"><a href="mailto:vv.autorepair@yahoo.com" className="hover:text-[var(--vv-blue)] transition-colors">vv.autorepair@yahoo.com</a></p>
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
                <a href="https://www.google.com/maps/place/V+V+Auto+Repair/@32.8488156,-96.6827611,17z/data=!4m8!3m7!1s0x864ea12237496ed3:0x44a59c7835f91535!8m2!3d32.8488156!4d-96.6827611!9m1!1b1" target="_blank" rel="noreferrer" className="flex-1 bg-[var(--vv-teal)] hover:bg-teal-400 text-white text-center py-3 rounded-lg font-bold transition-colors">
                  {t("Get Directions", "Chỉ Đường")}
                </a>
              </div>
            </div>

            {/* Garland Card */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 lg:p-10 shadow-lg relative overflow-hidden group">
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
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--vv-gray)] p-3 rounded-full text-[var(--vv-red)]"><Mail size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 font-display">Email</h4>
                    <p className="text-gray-600"><a href="mailto:vv.autobodycorp@gmail.com" className="hover:text-[var(--vv-red)] transition-colors">vv.autobodycorp@gmail.com</a></p>
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
                <a href="https://www.google.com/maps/place/V+V+Auto+Body+Repair+Corporation/@32.9016826,-96.6874462,17z/data=!3m1!4b1!4m6!3m5!1s/g/11pzygbgln!8m2!3d32.9016826!4d-96.6874462!16s%2Fg%2F11pzygbgln" target="_blank" rel="noreferrer" className="flex-1 bg-[var(--vv-teal)] hover:bg-teal-400 text-white text-center py-3 rounded-lg font-bold transition-colors">
                  {t("Get Directions", "Chỉ Đường")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}