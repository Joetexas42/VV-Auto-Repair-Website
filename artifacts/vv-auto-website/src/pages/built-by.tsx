import React from "react";
import { Layout } from "@/components/layout";

export default function BuiltByPage() {
  return (
    <Layout>
      <section className="py-20 bg-[var(--vv-gray)] min-h-[70vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 md:p-14">
            <p className="text-xs font-bold text-[var(--vv-red)] tracking-widest uppercase mb-4">Web Design & Development</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--vv-navy)] tracking-tight mb-6 font-display">
              Built With Pride
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              This website was designed and developed by{" "}
              <strong className="text-[var(--vv-navy)]">Paper Street Software Co.</strong> — a small,
              independent software studio that builds custom websites, mobile apps, and digital tools
              for local businesses.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              We believe every local business deserves a professional web presence that actually works
              for them — fast, mobile-friendly, and built to grow. We partner closely with our clients
              to create something they're proud to put their name on.
            </p>

            <div className="border-t border-gray-100 pt-10 mb-10">
              <h2 className="text-2xl font-bold text-[var(--vv-navy)] mb-6 font-display">What We Build</h2>
              <ul className="space-y-3">
                {[
                  "Custom websites for local businesses",
                  "Mobile apps for iOS and Android",
                  "Online booking and scheduling systems",
                  "Review and reputation management tools",
                  "Bilingual and multilingual experiences",
                  "Ongoing maintenance and support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--vv-red)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--vv-gray)] rounded-xl p-8 border-l-4 border-[var(--vv-navy)]">
              <h2 className="text-xl font-bold text-[var(--vv-navy)] mb-4 font-display">Get In Touch</h2>
              <p className="text-gray-600 mb-4">
                Interested in working together? We'd love to hear from you.
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold text-[var(--vv-navy)]">Website: </span>
                  <a
                    href="https://paperstreet.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--vv-blue)] hover:text-[var(--vv-navy)] underline underline-offset-2 transition-colors font-medium"
                  >
                    PaperStreet.online
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-[var(--vv-navy)]">Email: </span>
                  <a
                    href="mailto:Paperstreetsoftware@gmail.com"
                    className="text-[var(--vv-blue)] hover:text-[var(--vv-navy)] underline underline-offset-2 transition-colors font-medium"
                  >
                    Paperstreetsoftware@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
