import React, { useEffect } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";
import { ShieldCheck, Heart, Wrench, Users } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("About Us | V.V. Auto Repair & Body Shop", "Về Chúng Tôi | V.V. Auto Repair & Body Shop");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t(
        "Learn about V.V. Auto — a family-owned shop serving Dallas and Garland with honest, no-upsell auto repair. We speak English and Vietnamese.",
        "Tìm hiểu về V.V. Auto — cơ sở gia đình phục vụ Dallas và Garland với dịch vụ sửa chữa ô tô trung thực, không ép bán thêm. Giao tiếp tiếng Anh và tiếng Việt."
      ));
    }
  }, [t]);

  return (
    <Layout>
      <section className="bg-[var(--vv-navy)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-vv-gradient mix-blend-multiply opacity-90 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 font-display">
            {t("Our Story", "Câu Chuyện Của Chúng Tôi")}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t(
              "A family-owned business built on a simple premise: relentlessly honest work.",
              "Một doanh nghiệp gia đình được xây dựng trên một nguyên tắc đơn giản: làm việc trung thực tuyệt đối."
            )}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg text-gray-700">
              <h2 className="text-3xl font-extrabold text-[var(--vv-navy)] mb-6 font-display">
                {t("Serving Dallas & Garland with Integrity", "Phục Vụ Dallas & Garland Với Sự Chính Trực")}
              </h2>
              
              <p className="mb-6">
                {t(
                  "Finding a mechanic you can trust shouldn't be hard. At V.V. Auto, we started our family business because we saw a need for an auto shop that treated customers like neighbors, not just numbers.",
                  "Việc tìm kiếm một thợ máy đáng tin cậy không nên quá khó khăn. Tại V.V. Auto, chúng tôi bắt đầu công việc kinh doanh của gia đình mình vì chúng tôi thấy cần một xưởng sửa chữa ô tô đối xử với khách hàng như những người hàng xóm chứ không chỉ là những con số."
                )}
              </p>

              <p className="mb-8">
                {t(
                  "Today, we operate two specialized locations to serve you better: our Dallas shop handles all mechanical repairs, maintenance, and diagnostics, while our Garland location is a full-service body shop specializing in collision repair and paint.",
                  "Ngày nay, chúng tôi điều hành hai địa điểm chuyên biệt để phục vụ bạn tốt hơn: tiệm Dallas của chúng tôi xử lý mọi công việc sửa chữa máy móc, bảo dưỡng và chẩn đoán, trong khi địa điểm Garland là một xưởng làm đồng sơn toàn diện chuyên về sửa chữa tai nạn và sơn."
                )}
              </p>

              <div className="bg-[var(--vv-gray)] rounded-2xl p-8 my-10 border-l-4 border-[var(--vv-blue)]">
                <h3 className="text-xl font-bold text-[var(--vv-navy)] mb-4 font-display">
                  {t("Proudly Serving The Vietnamese Community", "Tự Hào Phục Vụ Cộng Đồng Người Việt")}
                </h3>
                <p className="italic mb-4">
                  "We speak English and Tiếng Việt, ensuring nothing gets lost in translation when discussing your vehicle's needs. We believe clear communication is the foundation of trust."
                </p>
                <p className="italic opacity-80">
                  "Chúng tôi giao tiếp bằng tiếng Anh và Tiếng Việt, đảm bảo không có gì bị hiểu sai khi thảo luận về các nhu cầu xe của bạn. Chúng tôi tin rằng giao tiếp rõ ràng là nền tảng của sự tin cậy."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <ShieldCheck className="text-[var(--vv-blue)] mb-4" size={32} />
                  <h4 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("No Upselling", "Không Bán Thêm")}</h4>
                  <p className="text-sm">
                    {t(
                      "We never invent repairs you don't need. If it can wait, we'll tell you. If it needs immediate attention, we'll show you why.",
                      "Chúng tôi không bao giờ vẽ ra những sửa chữa mà bạn không cần. Nếu có thể chờ đợi, chúng tôi sẽ nói cho bạn biết. Nếu cần chú ý ngay lập tức, chúng tôi sẽ cho bạn thấy lý do."
                    )}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <Wrench className="text-[var(--vv-blue)] mb-4" size={32} />
                  <h4 className="text-xl font-bold text-[var(--vv-navy)] mb-2 font-display">{t("Quality Work", "Công Việc Chất Lượng")}</h4>
                  <p className="text-sm">
                    {t(
                      "We use quality parts and do the job right the first time. Our mechanics treat your car exactly how they would treat their own.",
                      "Chúng tôi sử dụng phụ tùng chất lượng và làm đúng việc ngay từ lần đầu tiên. Thợ máy của chúng tôi đối xử với chiếc xe của bạn chính xác như cách họ đối xử với chiếc xe của chính họ."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}