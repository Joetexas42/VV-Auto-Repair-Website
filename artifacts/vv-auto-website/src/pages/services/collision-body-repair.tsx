import React, { useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Star, CheckCircle2, ChevronRight, CarFront } from "lucide-react";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";
import { ServiceReviewBadge } from "@/components/service-review-badge";

export default function CollisionRepair() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("Collision & Body Repair Garland TX | V.V. Auto Body", "Đồng Sơn & Phục Hồi Tai Nạn Garland TX | V.V. Auto Body");
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
            <span className="text-[var(--vv-navy)] font-semibold">{t("Collision & Body Work", "Đồng Sơn & Tai Nạn")}</span>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[var(--vv-red)]/10 text-[var(--vv-red)] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 text-sm">
                {t("Garland Location Service", "Dịch Vụ Tại Garland")}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--vv-navy)] tracking-tight mb-6 leading-tight font-display">
                {t("Collision & Body Work", "Đồng Sơn & Phục Hồi Tai Nạn")} <br/>
                <span className="text-[var(--vv-red)]">{t("in Garland, TX", "tại Garland, TX")}</span>
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="text-gray-600 font-medium">{t("We Work With All Insurance", "Làm Việc Với Mọi Bảo Hiểm")}</span>
              </div>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t(
                  "Been in an accident? Our Garland body shop specializes in major and minor collision repair, professional paint matching, and frame straightening. We handle the insurance process so you don't have to.",
                  "Bị tai nạn? Tiệm đồng sơn Garland của chúng tôi chuyên sửa chữa tai nạn nặng nhẹ, sơn pha màu chuyên nghiệp và nắn khung sườn. Chúng tôi xử lý quy trình bảo hiểm để bạn không phải lo lắng."
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:4692589356" className="bg-[var(--vv-navy)] hover:bg-blue-900 text-white text-center px-8 py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center gap-3 shadow-lg">
                  <Phone size={24} />
                  {t("Call Garland Shop", "Gọi Tiệm Garland")}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[var(--vv-gray)] rounded-2xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="/images/vv-body.png" 
                alt="Auto body shop painting and repair" 
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
                {t("Making It Look Like New", "Phục Hồi Như Mới")}
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  {t(
                    "Our goal is to restore your vehicle to its pre-accident condition—both structurally and cosmetically. We use advanced color-matching technology to ensure the new paint blends perfectly with the rest of your car.",
                    "Mục tiêu của chúng tôi là phục hồi xe của bạn về tình trạng trước khi tai nạn—cả về cấu trúc lẫn thẩm mỹ. Chúng tôi sử dụng công nghệ pha màu tiên tiến để đảm bảo lớp sơn mới hòa quyện hoàn hảo với phần còn lại của xe."
                  )}
                </p>
                <p>
                  {t(
                    "Navigating insurance claims can be a headache. Our team is experienced in working directly with all major insurance providers. We provide free estimates and handle the paperwork, making the process as stress-free as possible.",
                    "Xử lý hồ sơ bảo hiểm có thể gây đau đầu. Đội ngũ của chúng tôi có kinh nghiệm làm việc trực tiếp với tất cả các nhà cung cấp bảo hiểm lớn. Chúng tôi cung cấp ước tính miễn phí và xử lý giấy tờ, giúp quá trình này trở nên thoải mái nhất có thể."
                  )}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CarFront className="text-[var(--vv-red)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Body Services:", "Dịch vụ đồng sơn:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-red)] shrink-0 mt-0.5" size={18} /><span>{t("Major collision structural repair", "Sửa chữa tai nạn cấu trúc nặng")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-red)] shrink-0 mt-0.5" size={18} /><span>{t("Dent, ding, and scratch removal", "Xóa vết móp, vết xước")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-red)] shrink-0 mt-0.5" size={18} /><span>{t("Frame straightening & alignment", "Nắn khung sườn & căn chỉnh")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-red)] shrink-0 mt-0.5" size={18} /><span>{t("Bumper repair & replacement", "Sửa chữa & thay thế cản xe")}</span></li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="text-[var(--vv-red)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Paint & Insurance:", "Sơn & Bảo hiểm:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-red)] shrink-0 mt-0.5" size={18} /><span>{t("Computerized color matching", "Pha màu bằng máy tính")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-red)] shrink-0 mt-0.5" size={18} /><span>{t("Full auto painting", "Sơn toàn bộ xe")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-red)] shrink-0 mt-0.5" size={18} /><span>{t("Free insurance claim estimates", "Ước tính hồ sơ bảo hiểm miễn phí")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-red)] shrink-0 mt-0.5" size={18} /><span>{t("Direct billing to insurance", "Thanh toán trực tiếp cho bảo hiểm")}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[var(--vv-navy)] rounded-2xl p-8 text-white shadow-xl sticky top-28 border-t-4 border-[var(--vv-red)]">
                <h3 className="text-2xl font-bold mb-4 font-display">{t("Get A Free Estimate", "Nhận Báo Giá Miễn Phí")}</h3>
                <p className="text-white/80 mb-8">{t("Body work and collision repair is exclusively performed at our Garland location.", "Công việc đồng sơn và sửa chữa tai nạn được thực hiện độc quyền tại cơ sở Garland của chúng tôi.")}</p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[var(--vv-red)] shrink-0" size={24} />
                    <div>
                      <p className="font-semibold">V V Auto Body Repair</p>
                      <p className="text-white/80">3730 Marquis Dr<br/>Garland, TX 75042</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-[var(--vv-red)] shrink-0" size={24} />
                    <div>
                      <p className="text-white/80">{t("Mon–Fri: 8am–5pm", "Thứ Hai–Thứ Sáu: 8am–5pm")}</p>
                      <p className="text-white/80">{t("Sat–Sun: Closed", "Thứ Bảy–Chủ Nhật: Đóng cửa")}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href="tel:4692589356" className="block w-full bg-[var(--vv-red)] hover:bg-red-500 text-white text-center py-3 rounded-lg font-bold transition-colors shadow-lg text-sm">
                    Huong: (469) 258-9356
                  </a>
                  <a href="tel:4694075340" className="block w-full bg-[var(--vv-red)] hover:bg-red-500 text-white text-center py-3 rounded-lg font-bold transition-colors shadow-lg text-sm">
                    David: (469) 407-5340
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Badge */}
      <ServiceReviewBadge keywords={["collision", "body", "paint", "insurance", "Garland"]} />
    </Layout>
  );
}