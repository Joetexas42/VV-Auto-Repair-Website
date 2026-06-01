/**
 * IMPORTANT: mapUrl values below must stay in sync with the website's
 * canonical source of truth: artifacts/vv-auto-website/src/lib/locations.ts
 *   - dallas.mapUrl  → DALLAS_MAPS_URL
 *   - garland.mapUrl → GARLAND_MAPS_URL
 * Update both files together whenever a Google Maps link changes.
 */
export const LOCATIONS = {
  dallas: {
    name: { en: "Dallas — Auto Repair", vi: "Dallas — Sửa Xe" },
    address: "11366 Jupiter Rd, Dallas, TX 75218",
    phone1: { number: "2143202171", display: "(214) 320-2171", label: { en: "Main", vi: "Chính" } },
    phone2: { number: "4692589356", display: "(469) 258-9356", label: { en: "Cell", vi: "Di Động" } },
    email: "vv.autorepair@yahoo.com",
    hours: {
      en: "Mon – Fri: 8:00 am – 6:00 pm\nSat – Sun: Closed",
      vi: "Thứ 2 – Thứ 6: 8:00 – 18:00\nThứ 7 – CN: Đóng cửa",
    },
    mapUrl:
      "https://www.google.com/maps/place/V+V+Auto+Repair/@32.8488156,-96.6827611,17z/data=!4m8!3m7!1s0x864ea12237496ed3:0x44a59c7835f91535!8m2!3d32.8488156!4d-96.6827611!9m1!1b1",
    color: "#3f5f85",
    tagEn: "Mechanical Repair",
    tagVi: "Sửa Máy",
  },
  garland: {
    name: { en: "Garland — Body Shop", vi: "Garland — Đồng Sơn" },
    address: "3730 Marquis Dr, Garland, TX 75042",
    phone1: { number: "4692589356", display: "(469) 258-9356", label: { en: "Huong", vi: "Hương" } },
    phone2: { number: "4694075340", display: "(469) 407-5340", label: { en: "David", vi: "David" } },
    email: "vv.autobodycorp@gmail.com",
    hours: {
      en: "Mon – Fri: 8:00 am – 5:00 pm\nSat – Sun: Closed",
      vi: "Thứ 2 – Thứ 6: 8:00 – 17:00\nThứ 7 – CN: Đóng cửa",
    },
    mapUrl:
      "https://www.google.com/maps/place/V+V+Auto+Body+Repair+Corporation/@32.9016826,-96.6874462,17z/data=!3m1!4b1!4m6!3m5!1s/g/11pzygbgln!8m2!3d32.9016826!4d-96.6874462!16s%2Fg%2F11pzygbgln!9m1!1b1",
    color: "#e63030",
    tagEn: "Collision & Body",
    tagVi: "Tai Nạn & Sơn",
  },
} as const;

export const SERVICES = {
  dallas: [
    { en: "Official State Inspection", vi: "Kiểm Định Xe Chính Thức" },
    { en: "Computerized Engine Diagnostics", vi: "Chẩn Đoán Động Cơ Điện Toán" },
    { en: "Brake Repair & Replacement", vi: "Sửa & Thay Thế Phanh" },
    { en: "Oil Changes & Routine Maintenance", vi: "Thay Dầu & Bảo Dưỡng Định Kỳ" },
    { en: "Engine Repair & Rebuilds", vi: "Sửa & Đại Tu Động Cơ" },
    { en: "General Auto Repair (Domestic & Foreign)", vi: "Sửa Xe Tổng Quát (Trong & Ngoài Nước)" },
  ],
  garland: [
    { en: "Major & Minor Collision Repair", vi: "Sửa Va Chạm Lớn & Nhỏ" },
    { en: "Professional Paint & Body Work", vi: "Sơn Chuyên Nghiệp & Đồng Thân Xe" },
    { en: "Insurance Claim Repairs", vi: "Sửa Xe Theo Bảo Hiểm" },
    { en: "Free Estimates", vi: "Báo Giá Miễn Phí" },
    { en: "24-Hour Towing", vi: "Kéo Xe 24 Giờ" },
    { en: "Frame Straightening", vi: "Nắn Khung Xe" },
  ],
};

export const STRINGS = {
  appName: { en: "VV Auto", vi: "VV Auto" },
  tagline: { en: "Trusted Auto Repair", vi: "Sửa Chữa Ô Tô Uy Tín" },
  subtitle: {
    en: "A mechanic you'd send your mom to",
    vi: "Người thợ mà bạn an tâm giới thiệu cho gia đình",
  },
  rating: { en: "4.4 Stars · 65+ Reviews", vi: "4.4 Sao · 65+ Đánh Giá" },
  callNow: { en: "Call Now", vi: "Gọi Ngay" },
  getDirections: { en: "Directions", vi: "Chỉ Đường" },
  services: { en: "Services", vi: "Dịch Vụ" },
  contact: { en: "Contact", vi: "Liên Hệ" },
  home: { en: "Home", vi: "Trang Chủ" },
  hours: { en: "Hours", vi: "Giờ Làm" },
  mechanicalServices: { en: "Mechanical Services", vi: "Dịch Vụ Sửa Máy" },
  bodyServices: { en: "Body Shop Services", vi: "Dịch Vụ Đồng Sơn" },
  callLocation: { en: "Call", vi: "Gọi" },
  email: { en: "Email", vi: "Email" },
  familyOwned: { en: "Family Owned & Operated", vi: "Doanh Nghiệp Gia Đình" },
  freeEstimate: { en: "Free Estimates Available", vi: "Báo Giá Miễn Phí" },
  insured: { en: "All Insurance Accepted", vi: "Chấp Nhận Mọi Bảo Hiểm" },
};
