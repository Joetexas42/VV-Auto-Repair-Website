import React, { useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Star, CheckCircle2, ChevronRight, ShieldAlert, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";
import { ServiceReviewBadge } from "@/components/service-review-badge";

const BRAKE_REVIEWS = [
  {
    name: "Michael T.",
    stars: 5,
    textEn:
      "Brought my car in for brake replacement and they did an incredible job at a fair price. The mechanic explained everything clearly and didn't try to upsell me on things I didn't need. Honest shop — I'll keep coming back.",
    textVi:
      "Tôi mang xe đến thay phanh và họ làm rất tuyệt với giá hợp lý. Thợ máy giải thích mọi thứ rõ ràng và không cố bán thêm những thứ không cần thiết. Tiệm uy tín — tôi sẽ tiếp tục quay lại.",
  },
  {
    name: "Thanh H.",
    stars: 5,
    textEn:
      "Professional and honest service. They checked the car for free and clearly explained the problem. Prices are fair — not inflated like other shops. I recommend them to all my friends.",
    textVi:
      "Dịch vụ chuyên nghiệp và trung thực. Họ kiểm tra xe miễn phí và giải thích rõ ràng vấn đề. Giá cả hợp lý, không chặt chém như nhiều tiệm khác. Tôi sẽ giới thiệu cho bạn bè.",
  },
];

export default function BrakeRepair() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("Brake Repair Dallas TX | V.V. Auto Repair", "Sửa Chữa Phanh Dallas TX | V.V. Auto Repair");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t("Honest brake repair in Dallas. We never upsell — we just fix your brakes right for a fair price.", "Sửa chữa phanh trung thực tại Dallas. Chúng tôi không bao giờ bán thêm — chỉ sửa phanh đúng cách với giá công bằng."));
    }
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
            <span className="text-[var(--vv-navy)] font-semibold">{t("Brake Repair", "Sửa Chữa Phanh")}</span>
          </div>
        </div>
      </div>

      {/* Service Hero */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[var(--vv-blue)]/10 text-[var(--vv-blue)] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 text-sm">
                {t("Dallas Location Service", "Dịch Vụ Tại Dallas")}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--vv-navy)] tracking-tight mb-6 leading-tight font-display">
                {t("Brake Repair", "Sửa Chữa Phanh")} <br/>
                <span className="text-[var(--vv-red)]">{t("in Dallas, TX", "tại Dallas, TX")}</span>
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="text-gray-600 font-medium">{t("4.4 Star Google Rating", "Đánh giá 4.4 sao trên Google")}</span>
              </div>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t(
                  "Your brakes are the most important safety feature on your vehicle. At V.V. Auto Repair, we provide honest, straightforward brake inspections and repairs. We'll show you exactly how much pad is left, explain what needs to be replaced, and give you a fair price before any work begins.",
                  "Hệ thống phanh là tính năng an toàn quan trọng nhất trên xe của bạn. Tại V.V. Auto Repair, chúng tôi cung cấp dịch vụ kiểm tra và sửa chữa phanh trung thực, rõ ràng. Chúng tôi sẽ cho bạn thấy chính xác bố phanh còn bao nhiêu, giải thích những gì cần thay thế và báo giá hợp lý trước khi bắt đầu công việc."
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:2143202171" className="bg-[var(--vv-navy)] hover:bg-blue-900 text-white text-center px-8 py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center gap-3 shadow-lg">
                  <Phone size={24} />
                  {t("Call Dallas Shop", "Gọi Tiệm Dallas")}
                </a>
                <a href="#details" className="bg-[var(--vv-teal)] hover:bg-teal-400 text-white text-center px-8 py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center">
                  {t("Learn More", "Tìm Hiểu Thêm")}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[var(--vv-gray)] rounded-2xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="/images/vv-brakes.png" 
                alt="Mechanic replacing disc brakes" 
                className="relative rounded-2xl shadow-xl z-10 w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section id="details" className="py-20 bg-[var(--vv-gray)] border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-extrabold text-[var(--vv-navy)] mb-8 font-display">
                {t("Honest Brake Service", "Dịch Vụ Phanh Trung Thực")}
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  {t(
                    "When you hear squeaking, grinding, or feel a vibration when pressing the brake pedal, it's time for an inspection. Ignoring brake issues doesn't just put your safety at risk—it can lead to more expensive repairs like damaged rotors or calipers.",
                    "Khi bạn nghe thấy tiếng rít, tiếng nghiến hoặc cảm thấy rung khi đạp phanh, đã đến lúc phải kiểm tra. Bỏ qua các vấn đề về phanh không chỉ gây nguy hiểm cho sự an toàn của bạn—mà còn có thể dẫn đến các sửa chữa tốn kém hơn như hỏng đĩa phanh hoặc cùm phanh."
                  )}
                </p>
                <p>
                  {t(
                    "Our certified mechanics at the Dallas location will thoroughly inspect your entire braking system. We don't believe in upselling. If your rotors just need to be resurfaced instead of replaced, we'll tell you. If your brake pads still have 10,000 miles left on them, we'll let you know.",
                    "Đội ngũ thợ máy chuyên nghiệp tại cơ sở Dallas của chúng tôi sẽ kiểm tra kỹ lưỡng toàn bộ hệ thống phanh của bạn. Chúng tôi không vẽ thêm bệnh. Nếu đĩa phanh của bạn chỉ cần mài lại thay vì thay mới, chúng tôi sẽ nói cho bạn biết. Nếu bố phanh của bạn vẫn có thể chạy thêm 10.000 dặm nữa, chúng tôi sẽ thông báo cho bạn."
                  )}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <ShieldAlert className="text-[var(--vv-red)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Signs you need brakes:", "Dấu hiệu bạn cần sửa phanh:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Squealing or grinding noises", "Tiếng rít hoặc nghiến")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Vibration in the steering wheel", "Tay lái bị rung")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Spongy or soft brake pedal", "Chân phanh xốp hoặc mềm")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Car pulling to one side when braking", "Xe bị lệch sang một bên khi phanh")}</span></li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="text-[var(--vv-blue)] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("What we check:", "Những gì chúng tôi kiểm tra:")}</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Brake pad thickness", "Độ dày bố phanh")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Rotor condition & thickness", "Tình trạng & độ dày đĩa phanh")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Caliper operation", "Hoạt động của cùm phanh")}</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-[var(--vv-blue)] shrink-0 mt-0.5" size={18} /><span>{t("Brake fluid level and quality", "Mức và chất lượng dầu phanh")}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="bg-[var(--vv-navy)] rounded-2xl p-8 text-white shadow-xl sticky top-28">
                <h3 className="text-2xl font-bold mb-4 font-display">{t("Schedule Your Repair", "Đặt Lịch Sửa Chữa")}</h3>
                <p className="text-white/80 mb-8">{t("Brake services are performed at our Dallas location.", "Dịch vụ phanh được thực hiện tại cơ sở Dallas của chúng tôi.")}</p>
                
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
      <ServiceReviewBadge reviews={BRAKE_REVIEWS} />

      {/* Cross-sell */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--vv-gray)] border border-gray-200 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-block bg-[var(--vv-red)]/10 text-[var(--vv-red)] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-xs">
                {t("Also in Garland", "Cũng có tại Garland")}
              </div>
              <h3 className="text-2xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Need collision or body work?", "Cần làm đồng sơn hay phục hồi tai nạn?")}</h3>
              <p className="text-gray-600 max-w-xl">{t("Our Garland location specializes in major collision repair, paint, and insurance claims. We work with all insurance providers.", "Cơ sở Garland của chúng tôi chuyên sửa chữa tai nạn nặng, sơn xe và làm hồ sơ bảo hiểm. Chúng tôi làm việc với mọi công ty bảo hiểm.")}</p>
            </div>
            <Link href="/services/collision-body-repair" className="whitespace-nowrap bg-[var(--vv-teal)] hover:bg-teal-400 text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2">
              {t("Visit V V Auto Body", "Ghé thăm V V Auto Body")} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}