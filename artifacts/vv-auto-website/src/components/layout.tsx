import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Menu, X, MapPin, Clock, Star, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", en: "Home", vi: "Trang Chủ" },
    { href: "/services", en: "Services", vi: "Dịch Vụ" },
    { href: "/reviews", en: "Reviews", vi: "Đánh Giá" },
    { href: "/about", en: "About", vi: "Giới Thiệu" },
    { href: "/contact", en: "Contact", vi: "Liên Hệ" },
  ];

  return (
    <nav className="bg-[var(--vv-navy)] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer" data-testid="link-home-logo" onClick={() => setMobileOpen(false)}>
            <div className="text-3xl font-extrabold tracking-tighter flex items-center font-display">
              <span className="text-white font-extrabold">V V</span>
              <span className="text-[var(--vv-red)] red-stroke-white ml-2 uppercase tracking-widest border-l-2 border-white/20 pl-2 font-display font-extrabold text-[24px]">Auto Repair
</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`hover:text-[var(--vv-red)] hover-red-stroke-white transition-colors font-medium ${location === link.href ? 'text-[var(--vv-red)] red-stroke-white' : ''}`}
                data-testid={`link-nav-${link.en.toLowerCase()}`}
              >
                {t(link.en, link.vi)}
              </Link>
            ))}
            <div className="flex items-center bg-white/20 ring-1 ring-white/30 rounded-full p-1" data-testid="language-toggle">
              <button
                onClick={() => setLang("en")}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                  lang === "en" ? "bg-white text-[var(--vv-navy)] shadow-sm" : "text-white/90 hover:text-white"
                }`}
                data-testid="btn-lang-en"
              >
                English
              </button>
              <button
                onClick={() => setLang("vi")}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                  lang === "vi" ? "bg-white text-[var(--vv-navy)] shadow-sm" : "text-white/90 hover:text-white"
                }`}
                data-testid="btn-lang-vi"
              >
                Tiếng Việt
              </button>
            </div>
            <a 
              href="tel:2143202171" 
              className="bg-[var(--vv-red)] hover:bg-red-500 text-white px-6 py-2.5 rounded font-bold transition-colors flex items-center gap-2"
              data-testid="btn-nav-call"
            >
              <Phone size={18} />
              (214) 320-2171
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="text-white hover:text-[var(--vv-red)] p-2"
              data-testid="btn-mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--vv-navy)] border-t border-white/10 px-4 pb-6 pt-2" data-testid="mobile-menu">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-3 px-2 text-lg font-medium border-b border-white/10 last:border-0 transition-colors hover-red-stroke-white ${
                  location === link.href ? "text-[var(--vv-red)] red-stroke-white" : "text-white hover:text-[var(--vv-red)]"
                }`}
                data-testid={`link-mobile-nav-${link.en.toLowerCase()}`}
              >
                {t(link.en, link.vi)}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex items-center bg-white/20 ring-1 ring-white/30 rounded-full p-1 w-fit" data-testid="mobile-language-toggle">
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                lang === "en" ? "bg-white text-[var(--vv-navy)] shadow-sm" : "text-white/90 hover:text-white"
              }`}
              data-testid="btn-mobile-lang-en"
            >
              English
            </button>
            <button
              onClick={() => setLang("vi")}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                lang === "vi" ? "bg-white text-[var(--vv-navy)] shadow-sm" : "text-white/90 hover:text-white"
              }`}
              data-testid="btn-mobile-lang-vi"
            >
              Tiếng Việt
            </button>
          </div>
          <a
            href="tel:2143202171"
            className="mt-4 w-full flex items-center justify-center gap-2 bg-[var(--vv-red)] hover:bg-red-500 text-white px-6 py-3 rounded font-bold transition-colors"
            data-testid="btn-mobile-call"
          >
            <Phone size={18} />
            (214) 320-2171
          </a>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[var(--vv-navy)] text-white/80 py-16 border-t-[6px] border-[var(--vv-red)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="text-3xl font-extrabold tracking-tighter flex items-center mb-6 font-display">
              <span className="text-white">V.V.</span>
              <span className="text-[var(--vv-red)] ml-2 text-xl font-bold uppercase tracking-widest border-l-2 border-white/20 pl-2 font-display">Auto</span>
            </div>
            <p className="mb-6 leading-relaxed">
              {t(
                "Honest auto repair and collision services in Dallas and Garland. A family-owned mechanic shop built on trust, fair pricing, and reliable work.",
                "Sửa chữa ô tô và đồng sơn uy tín tại Dallas và Garland. Một cơ sở gia đình được xây dựng trên sự tin cậy, giá cả công bằng và chất lượng đảm bảo."
              )}
            </p>
            <div className="flex gap-1 text-yellow-400 mb-2">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <p className="text-sm">{t("4.4 Stars • 65+ Google Reviews", "4.4 Sao • Hơn 65+ Đánh giá Google")}</p>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider font-display">
              {t("Dallas (Auto Repair)", "Dallas (Sửa Chữa)")}
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="text-[var(--vv-red)] shrink-0 mt-1" size={20} />
                <span>11366 Jupiter Rd<br/>Dallas, TX 75218</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-[var(--vv-red)] shrink-0 mt-1" size={20} />
                <span>
                  {t("Main: 214-320-2171", "Chính: 214-320-2171")}<br/>
                  {t("Cell: 469-258-9356", "Di động: 469-258-9356")}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="text-[var(--vv-red)] shrink-0 mt-1" size={20} />
                <span>
                  {t("Mon–Fri: 8:00am–6:00pm", "Thứ Hai–Thứ Sáu: 8:00sáng–6:00chiều")}<br/>
                  {t("Sat–Sun: Closed", "Thứ Bảy–Chủ Nhật: Đóng cửa")}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider font-display">
              {t("Garland (Body Shop)", "Garland (Đồng Sơn)")}
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="text-[var(--vv-red)] shrink-0 mt-1" size={20} />
                <span>3730 Marquis Dr<br/>Garland, TX 75042</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-[var(--vv-red)] shrink-0 mt-1" size={20} />
                <span>
                  Huong: 469-258-9356<br/>
                  David: 469-407-5340
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="text-[var(--vv-red)] shrink-0 mt-1" size={20} />
                <span>
                  {t("Mon–Fri: 8:00am–5:00pm", "Thứ Hai–Thứ Sáu: 8:00sáng–5:00chiều")}<br/>
                  {t("Sat–Sun: Closed", "Thứ Bảy–Chủ Nhật: Đóng cửa")}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider font-display">
              {t("Quick Links", "Liên Kết Nhanh")}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={16} className="text-[var(--vv-red)]"/> {t("Auto Repair Services", "Dịch Vụ Sửa Chữa Ô Tô")}</Link></li>
              <li><Link href="/services/brake-repair" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={16} className="text-[var(--vv-red)]"/> {t("Brake Repair", "Sửa Chữa Phanh")}</Link></li>
              <li><Link href="/services/collision-body-repair" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={16} className="text-[var(--vv-red)]"/> {t("Collision & Body Work", "Làm Đồng & Sơn")}</Link></li>
              <li><Link href="/services/state-inspection" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={16} className="text-[var(--vv-red)]"/> {t("State Inspections", "Kiểm Định Tiểu Bang")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {t("V.V. Auto Repair & Body Shop. All rights reserved.", "V.V. Auto Repair & Body Shop. Đã đăng ký bản quyền.")}</p>
          <p className="mt-2">
            <Link href="/built-by" className="text-white/30 hover:text-white/50 transition-colors text-xs">
              Site by Paper Street Software Co.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[var(--vv-red)] selection:text-white">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
