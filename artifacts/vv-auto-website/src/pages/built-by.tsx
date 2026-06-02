import React, { useState } from "react";
import { Layout } from "@/components/layout";

type FormState = "idle" | "submitting" | "success" | "error" | "rate-limited";

export default function BuiltByPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.status === 429) {
        setFormState("rate-limited");
        return;
      }

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? "Something went wrong.");
      }

      setFormState("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setFormState("error");
    }
  }

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
              independent software studio that builds custom websites, AI-powered tools,
              and digital solutions for local businesses.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              We believe every local business deserves a professional web presence that actually works
              for them — fast, mobile-friendly, and built to grow. We partner closely with our clients
              to create something they're proud to put their name on.
            </p>

            <div className="border-t border-gray-100 pt-10 mb-10">
              <h2 className="text-2xl font-bold text-[var(--vv-navy)] mb-3 font-display">What We Built for V.V. Auto</h2>
              <p className="text-gray-500 text-sm mb-6">Here's a look at what went into this project — a real example of what we deliver.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  {
                    title: "Bilingual Website",
                    desc: "Full English & Vietnamese support with a smooth, one-tap language toggle — no page reload, no separate URLs.",
                  },
                  {
                    title: "Live Review Feed",
                    desc: "Google reviews pulled automatically and surfaced on both the website and app so the shop's reputation speaks for itself.",
                  },
                  {
                    title: "Service Pages with SEO",
                    desc: "Dedicated pages for brake repair, collision work, oil changes, and state inspections — built to rank locally.",
                  },
                  {
                    title: "Two-Location Support",
                    desc: "Dallas and Garland locations each get their own info, maps, and hours — cleanly organized in one site.",
                  },
                  {
                    title: "Contact & Directions",
                    desc: "Embedded Google Maps, click-to-call buttons, and a contact form — every friction point removed.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-gray-100 bg-[var(--vv-gray)] p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--vv-red)] shrink-0" />
                      <span className="font-bold text-[var(--vv-navy)] text-sm">{item.title}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-10 mb-10">
              <h2 className="text-2xl font-bold text-[var(--vv-navy)] mb-6 font-display">What We Build</h2>
              <ul className="space-y-3">
                {[
                  "Custom websites for local businesses",
                  "AI Receptionist",
                  "AI Answering Service",
                  "AI Customer Support",
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

            <div className="bg-[var(--vv-gray)] rounded-xl p-8 border-l-4 border-[var(--vv-navy)] mb-10">
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

            <div className="border-t border-gray-100 pt-10">
              <h2 className="text-2xl font-bold text-[var(--vv-navy)] mb-2 font-display">Send Us a Message</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you shortly.
              </p>

              {formState === "success" ? (
                <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-green-800 mb-1">Message Sent!</h3>
                  <p className="text-green-700 text-sm">
                    Thanks for reaching out. We'll be in touch soon.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-4 text-sm text-green-700 underline hover:text-green-900 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="ps-name" className="block text-sm font-semibold text-[var(--vv-navy)] mb-1.5">
                        Name <span className="text-[var(--vv-red)]">*</span>
                      </label>
                      <input
                        id="ps-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your name"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--vv-navy)] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="ps-email" className="block text-sm font-semibold text-[var(--vv-navy)] mb-1.5">
                        Email <span className="text-[var(--vv-red)]">*</span>
                      </label>
                      <input
                        id="ps-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--vv-navy)] focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ps-message" className="block text-sm font-semibold text-[var(--vv-navy)] mb-1.5">
                      Message <span className="text-[var(--vv-red)]">*</span>
                    </label>
                    <textarea
                      id="ps-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--vv-navy)] focus:border-transparent transition resize-none"
                    />
                  </div>

                  {formState === "rate-limited" && (
                    <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      </svg>
                      <p className="text-sm text-amber-800">
                        <strong>You've sent too many messages</strong> — please wait an hour and try again.
                      </p>
                    </div>
                  )}

                  {formState === "error" && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      {errorMsg || "Something went wrong. Please try again."}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "submitting" || formState === "rate-limited"}
                    className="inline-flex items-center gap-2 bg-[var(--vv-navy)] hover:bg-[var(--vv-blue)] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "submitting" ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
