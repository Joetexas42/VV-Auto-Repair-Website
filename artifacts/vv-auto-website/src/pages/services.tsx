import React, { useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Phone, ArrowRight, ShieldCheck, Wrench, CarFront } from "lucide-react";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";

export default function ServicesHub() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("Auto Repair & Body Services | V.V. Auto", "Dịch Vụ Sửa Chữa & Đồng Sơn | V.V. Auto");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t("Complete auto care in Dallas and Garland. From oil changes and brake repairs to full collision body work and state inspections.", "Chăm sóc ô tô toàn diện tại Dallas và Garland. Từ thay nhớt, sửa phanh đến làm đồng sơn và kiểm định tiểu bang."));
    }
  }, [t]);

  const services = [
    {
      id: "brake-repair",
      title: t("Brake Repair", "Sửa Chữa Phanh"),
      desc: t("Honest inspections and reliable brake pad/rotor replacement.", "Kiểm tra trung thực và thay thế bố/đĩa phanh đảm bảo."),
      icon: <ShieldCheck size={32} className="text-[var(--vv-blue)]" />,
      location: t("Dallas Location", "Địa Điểm Dallas"),
      color: "blue",
      href: "/services/brake-repair"
    },
    {
      id: "oil-change",
      title: t("Oil Changes", "Thay Nhớt"),
      desc: t("Routine maintenance to keep your engine running smoothly.", "Bảo dưỡng định kỳ để giữ động cơ hoạt động mượt mà."),
      icon: <Wrench size={32} className="text-[var(--vv-blue)]" />,
      location: t("Dallas Location", "Địa Điểm Dallas"),
      color: "blue",
      href: "/services/oil-change"
    },
    {
      id: "engine-repair",
      title: t("Engine Repair", "Sửa Chữa Động Cơ"),
      desc: t("Complex diagnostics, repairs, and full engine rebuilds.", "Chẩn đoán lỗi phức tạp, sửa chữa và phục hồi động cơ."),
      icon: <CarFront size={32} className="text-[var(--vv-blue)]" />,
      location: t("Dallas Location", "Địa Điểm Dallas"),
      color: "blue",
      href: "/services/engine-repair"
    },
    {
      id: "state-inspection",
      title: t("State Inspections", "Kiểm Định Tiểu Bang"),
      desc: t("Official Texas vehicle safety and emissions inspections.", "Kiểm định an toàn và khí thải xe cộ chính thức của Texas."),
      icon: <ShieldCheck size={32} className="text-[var(--vv-blue)]" />,
      location: t("Dallas Location", "Địa Điểm Dallas"),
      color: "blue",
      href: "/services/state-inspection"
    },
    {
      id: "diagnostics",
      title: t("Computer Diagnostics", "Chẩn Đoán Máy Tính"),
      desc: t("Check engine light? We'll find the root cause quickly.", "Đèn báo lỗi động cơ? Chúng tôi sẽ tìm ra nguyên nhân nhanh chóng."),
      icon: <Wrench size={32} className="text-[var(--vv-blue)]" />,
      location: t("Dallas Location", "Địa Điểm Dallas"),
      color: "blue",
      href: "/services/diagnostics"
    },
    {
      id: "collision-body-repair",
      title: t("Collision & Body Work", "Đồng Sơn & Tai Nạn"),
      desc: t("Major/minor collision repair, paint, and insurance claims.", "Sửa chữa tai nạn, sơn xe và làm hồ sơ bảo hiểm."),
      icon: <CarFront size={32} className="text-[var(--vv-red)]" />,
      location: t("Garland Location", "Địa Điểm Garland"),
      color: "red",
      href: "/services/collision-body-repair"
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[var(--vv-navy)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-vv-gradient mix-blend-multiply opacity-90 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 font-display">
            {t("Our Services", "Dịch Vụ Của Chúng Tôi")}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t(
              "Comprehensive auto repair in Dallas and professional collision repair in Garland.",
              "Sửa chữa ô tô toàn diện tại Dallas và làm đồng sơn chuyên nghiệp tại Garland."
            )}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[var(--vv-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <Link key={svc.id} href={svc.href} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col h-full">
                <div className={`inline-block ${svc.color === 'red' ? 'bg-[var(--vv-red)]/10 text-[var(--vv-red)]' : 'bg-[var(--vv-blue)]/10 text-[var(--vv-blue)]'} font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6 text-xs w-fit`}>
                  {svc.location}
                </div>
                <div className="mb-4">
                  {svc.icon}
                </div>
                <h3 className="text-2xl font-bold text-[var(--vv-navy)] mb-3 font-display">{svc.title}</h3>
                <p className="text-gray-600 mb-8 flex-1">{svc.desc}</p>
                <div className="flex items-center text-[var(--vv-teal)] font-bold group-hover:text-[var(--vv-navy)] transition-colors">
                  {t("Learn More", "Tìm Hiểu Thêm")} <ArrowRight size={18} className="ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--vv-navy)] mb-6 font-display">
            {t("Not sure what you need?", "Không chắc xe bạn cần gì?")}
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            {t(
              "Give us a call and describe the symptoms. We'll give you honest advice on what to do next.",
              "Hãy gọi cho chúng tôi và mô tả triệu chứng. Chúng tôi sẽ tư vấn trung thực về bước tiếp theo."
            )}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:2143202171" className="inline-flex items-center justify-center gap-2 bg-[var(--vv-navy)] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-900 transition-colors">
              <Phone size={20} />
              {t("Dallas Repair: (214) 320-2171", "Sửa Chữa Dallas: (214) 320-2171")}
            </a>
            <a href="tel:4692589356" className="inline-flex items-center justify-center gap-2 bg-[var(--vv-red)] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-red-700 transition-colors">
              <Phone size={20} />
              {t("Garland Body: (469) 258-9356", "Đồng Sơn Garland: (469) 258-9356")}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}