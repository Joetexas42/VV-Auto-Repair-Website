import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Layout } from "@/components/layout";
import { useLanguage } from "@/lib/LanguageContext";

type GalleryItem = {
  src: string;
  altEn: string;
  altVi: string;
  captionEn: string;
  captionVi: string;
  category: "shop" | "repairs" | "body";
};

const galleryItems: GalleryItem[] = [
  {
    src: "/images/vv-hero.png",
    altEn: "V.V. Auto Repair shop exterior",
    altVi: "Mặt ngoài tiệm V.V. Auto Repair",
    captionEn: "Our Dallas shop on Jupiter Rd — clean, organized, and ready to serve.",
    captionVi: "Tiệm Dallas của chúng tôi trên đường Jupiter — gọn gàng, ngăn nắp và sẵn sàng phục vụ.",
    category: "shop",
  },
  {
    src: "/images/vv-brakes.png",
    altEn: "Mechanic performing brake repair",
    altVi: "Thợ máy đang sửa phanh xe",
    captionEn: "Expert brake inspection and replacement — every vehicle gets careful, thorough service.",
    captionVi: "Kiểm tra và thay thế phanh chuyên nghiệp — mỗi chiếc xe đều được phục vụ cẩn thận, tỉ mỉ.",
    category: "repairs",
  },
  {
    src: "/images/vv-engine.png",
    altEn: "Engine repair in progress",
    altVi: "Đang sửa chữa động cơ",
    captionEn: "Full engine diagnostics and rebuilds — we find the root cause, not just the symptom.",
    captionVi: "Chẩn đoán và phục hồi động cơ toàn diện — chúng tôi tìm ra nguyên nhân gốc rễ, không chỉ triệu chứng.",
    category: "repairs",
  },
  {
    src: "/images/vv-diagnostics.png",
    altEn: "Computerized engine diagnostic test",
    altVi: "Kiểm tra chẩn đoán động cơ bằng máy tính",
    captionEn: "State-of-the-art computerized diagnostic equipment to pinpoint any issue fast.",
    captionVi: "Thiết bị chẩn đoán điện tử hiện đại giúp xác định nhanh mọi vấn đề.",
    category: "repairs",
  },
  {
    src: "/images/vv-oil.png",
    altEn: "Oil change service",
    altVi: "Dịch vụ thay nhớt",
    captionEn: "Quick, clean oil changes that keep your engine running smoothly.",
    captionVi: "Thay nhớt nhanh chóng, sạch sẽ giúp động cơ luôn hoạt động mượt mà.",
    category: "repairs",
  },
  {
    src: "/images/vv-inspection.png",
    altEn: "Texas state vehicle inspection",
    altVi: "Kiểm định xe tiểu bang Texas",
    captionEn: "Official Texas state inspection — in and out quickly with a certified technician.",
    captionVi: "Kiểm định xe chính thức của tiểu bang Texas — nhanh chóng với kỹ thuật viên được chứng nhận.",
    category: "repairs",
  },
  {
    src: "/images/vv-body.png",
    altEn: "Auto body collision repair and paint work",
    altVi: "Sửa chữa tai nạn và sơn xe",
    captionEn: "Professional collision repair and paint at our Garland body shop — like it never happened.",
    captionVi: "Sửa chữa tai nạn và sơn xe chuyên nghiệp tại tiệm Garland — như chưa từng xảy ra.",
    category: "body",
  },
];

type Category = "all" | "shop" | "repairs" | "body";

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, goNext, goPrev]);

  useEffect(() => {
    document.title = t(
      "Photo Gallery | V.V. Auto Repair & Body Shop",
      "Thư Viện Ảnh | V.V. Auto Repair & Body Shop"
    );
  }, [t]);

  const categories: { key: Category; en: string; vi: string }[] = [
    { key: "all", en: "All Photos", vi: "Tất Cả Ảnh" },
    { key: "shop", en: "Our Shop", vi: "Tiệm Của Chúng Tôi" },
    { key: "repairs", en: "Repair Work", vi: "Công Việc Sửa Chữa" },
    { key: "body", en: "Body & Paint", vi: "Đồng Sơn" },
  ];

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-[var(--vv-navy)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold text-[var(--vv-red)] tracking-widest uppercase mb-3">
            {t("See Our Work", "Xem Công Việc Của Chúng Tôi")}
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 font-display">
            {t("Photo Gallery", "Thư Viện Ảnh")}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {t(
              "A look inside our shops, our team at work, and the quality repairs we deliver every day.",
              "Một cái nhìn bên trong các tiệm của chúng tôi, đội ngũ làm việc, và chất lượng sửa chữa chúng tôi thực hiện mỗi ngày."
            )}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setLightboxIndex(null); }}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.key
                    ? "bg-[var(--vv-navy)] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t(cat.en, cat.vi)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-[var(--vv-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              {t("No photos in this category yet.", "Chưa có ảnh trong danh mục này.")}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, idx) => (
                <button
                  key={item.src + idx}
                  onClick={() => openLightbox(idx)}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--vv-blue)] aspect-[4/3] bg-gray-200"
                  aria-label={t(`View full image: ${item.altEn}`, `Xem ảnh đầy đủ: ${item.altVi}`)}
                >
                  <img
                    src={item.src}
                    alt={t(item.altEn, item.altVi)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <ZoomIn size={18} />
                      <span className="text-sm font-semibold">{t("View Full Size", "Xem Kích Thước Đầy Đủ")}</span>
                    </div>
                    <p className="text-white/90 text-sm leading-snug line-clamp-2">
                      {t(item.captionEn, item.captionVi)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-2xl font-extrabold text-[var(--vv-navy)] mb-4 font-display">
            {t("Ready to experience the V.V. difference?", "Sẵn sàng trải nghiệm sự khác biệt của V.V.?")}
          </h3>
          <p className="text-gray-600 mb-8">
            {t(
              "Call us today or stop by either location. We'll take great care of your vehicle.",
              "Gọi cho chúng tôi hôm nay hoặc ghé qua một trong hai tiệm. Chúng tôi sẽ chăm sóc xe của bạn thật tốt."
            )}
          </p>
          <a
            href="tel:2143202171"
            className="inline-block bg-[var(--vv-red)] hover:bg-red-500 text-white px-10 py-4 rounded-md font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg"
          >
            {t("Call (214) 320-2171", "Gọi (214) 320-2171")}
          </a>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t("Image viewer", "Trình xem ảnh")}
        >
          <div
            className="relative max-w-5xl w-full mx-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors p-2"
              aria-label={t("Close", "Đóng")}
            >
              <X size={32} />
            </button>

            {/* Image */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
              <img
                src={filtered[lightboxIndex].src}
                alt={t(filtered[lightboxIndex].altEn, filtered[lightboxIndex].altVi)}
                className="w-full max-h-[70vh] object-contain"
              />

              {/* Prev / Next */}
              {filtered.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
                    aria-label={t("Previous image", "Ảnh trước")}
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
                    aria-label={t("Next image", "Ảnh tiếp theo")}
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <div className="mt-5 text-center max-w-2xl px-4">
              <p className="text-white font-semibold text-lg leading-snug">
                {t(filtered[lightboxIndex].captionEn, filtered[lightboxIndex].captionVi)}
              </p>
              <p className="text-white/60 text-sm mt-2">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
