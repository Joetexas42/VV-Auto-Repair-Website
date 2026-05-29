import React from "react";
import { MapPin, Phone, Mail, Clock, Star, Wrench, ShieldCheck, CheckCircle2, ChevronRight, Menu } from "lucide-react";
import "./_group.css";

const Navigation = () => (
  <nav className="bg-vv-navy text-white sticky top-0 z-50 shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        <div className="flex items-center gap-2">
          <div className="text-3xl font-extrabold tracking-tighter flex items-center">
            <span className="text-white">V.V.</span>
            <span className="text-vv-red ml-2 text-xl font-bold uppercase tracking-widest border-l-2 border-white/20 pl-2">Auto</span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="hover:text-vv-red transition-colors font-medium">Home</a>
          <a href="#" className="hover:text-vv-red transition-colors font-medium">Services</a>
          <a href="#" className="hover:text-vv-red transition-colors font-medium">About</a>
          <a href="#" className="hover:text-vv-red transition-colors font-medium">Contact</a>
          <div className="flex items-center bg-white/10 rounded p-1 gap-1">
            <span className="px-6 py-2.5 bg-white text-vv-navy rounded font-bold shadow-sm cursor-pointer">English</span>
            <span className="px-6 py-2.5 text-white/70 font-bold hover:text-white cursor-pointer transition-colors">Vietnamese</span>
          </div>
          <a href="tel:2143202171" className="bg-vv-red hover:bg-red-500 text-white px-6 py-2.5 rounded font-bold transition-colors flex items-center gap-2">
            <Phone size={18} />
            (214) 320-2171
          </a>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white hover:text-vv-red p-2">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-vv-navy text-white/80 py-16 border-t-[6px] border-vv-red">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="text-3xl font-extrabold tracking-tighter flex items-center mb-6">
            <span className="text-white">V.V.</span>
            <span className="text-vv-red ml-2 text-xl font-bold uppercase tracking-widest border-l-2 border-white/20 pl-2">Auto</span>
          </div>
          <p className="mb-6 leading-relaxed">
            Honest auto repair and collision services in Dallas and Garland. A family-owned mechanic shop built on trust, fair pricing, and reliable work.
          </p>
          <div className="flex gap-1 text-yellow-400 mb-2">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
          </div>
          <p className="text-sm">4.4 Stars • 65+ Google Reviews</p>
        </div>
        
        <div>
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Dallas (Auto Repair)</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin className="text-vv-red shrink-0 mt-1" size={20} />
              <span>11366 Jupiter Rd<br/>Dallas, TX 75218</span>
            </li>
            <li className="flex gap-3">
              <Phone className="text-vv-red shrink-0 mt-1" size={20} />
              <span>Main: 214-320-2171<br/>Cell: 469-258-9356</span>
            </li>
            <li className="flex gap-3">
              <Clock className="text-vv-red shrink-0 mt-1" size={20} />
              <span>Mon–Fri: 8:00am–6:00pm<br/>Sat–Sun: Closed</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Garland (Body Shop)</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin className="text-vv-red shrink-0 mt-1" size={20} />
              <span>3730 Marquis Dr<br/>Garland, TX 75042</span>
            </li>
            <li className="flex gap-3">
              <Phone className="text-vv-red shrink-0 mt-1" size={20} />
              <span>Huong: 469-258-9356<br/>David: 469-407-5340</span>
            </li>
            <li className="flex gap-3">
              <Clock className="text-vv-red shrink-0 mt-1" size={20} />
              <span>Mon–Fri: 8:00am–5:00pm<br/>Sat–Sun: Closed</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={16} className="text-vv-red"/> Auto Repair Services</a></li>
            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={16} className="text-vv-red"/> Brake Repair</a></li>
            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={16} className="text-vv-red"/> Collision & Body Work</a></li>
            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={16} className="text-vv-red"/> State Inspections</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} V.V. Auto Repair & Body Shop. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export function Homepage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-vv-red selection:text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-vv-navy">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-vv-gradient mix-blend-multiply opacity-90 z-10"></div>
          <img 
            src="/__mockup/images/vv-hero.png" 
            alt="V.V. Auto Repair Shop Garage" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-8">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span>4.4 Stars (65+ Reviews)</span>
              <span className="w-1 h-1 rounded-full bg-white/50 mx-2"></span>
              <span>Serving Dallas & Garland</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Honest Auto Repair <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-vv-red">in Dallas, TX</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-medium max-w-2xl">
              Trusted local mechanic serving Dallas drivers with fair pricing, reliable repairs, diagnostics, body work, and straightforward service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:2143202171" className="bg-vv-red hover:bg-red-500 text-white text-center px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3">
                <Phone size={24} />
                Call Now — (214) 320-2171
              </a>
              <a href="#locations" className="bg-vv-teal hover:bg-teal-400 text-white text-center px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3">
                <MapPin size={24} className="text-vv-red" />
                Get Directions
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-4 text-white/80 text-sm font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-vv-red"/> Honest Pricing</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-vv-red"/> Vietnamese Speaking</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-vv-navy mb-6 tracking-tight">A mechanic you'd send your mom to.</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Finding a mechanic you can trust shouldn't be hard. At V.V. Auto, we built our family business on a simple premise: relentlessly honest work. We never overcharge. We never invent repairs you don't need. We just fix your car right the first time.
              </p>
              
              <div className="bg-vv-gray rounded-xl p-6 border-l-4 border-vv-blue mb-8">
                <p className="text-vv-navy font-medium italic">
                  "We speak English and Tiếng Việt, serving our diverse community across Dallas and Garland with respect and transparency."
                </p>
                <p className="text-vv-navy font-medium italic mt-3 opacity-80">
                  "Chúng tôi giao tiếp bằng tiếng Anh và Tiếng Việt, phục vụ cộng đồng đa dạng tại Dallas và Garland với sự tôn trọng và minh bạch."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-vv-gray flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-vv-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-vv-navy">Honest Pricing</h4>
                    <p className="text-sm text-gray-500 mt-1">No hidden fees or surprise charges.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-vv-gray flex items-center justify-center shrink-0">
                    <Wrench className="text-vv-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-vv-navy">Expert Service</h4>
                    <p className="text-sm text-gray-500 mt-1">From diagnostics to full body repair.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-vv-blue rounded-2xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="/__mockup/images/vv-brakes.png" 
                alt="Mechanic working on brakes" 
                className="relative rounded-2xl shadow-xl z-10 w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl z-20 flex items-center gap-4">
                <div className="text-5xl font-black text-vv-red">65+</div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <div className="font-bold text-vv-navy">5-Star Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-vv-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-vv-red tracking-widest uppercase mb-3">What We Do</h2>
            <h3 className="text-4xl font-extrabold text-vv-navy tracking-tight mb-4">Complete Auto Care</h3>
            <p className="text-lg text-gray-600">Two specialized locations working together to handle everything your vehicle needs, from routine maintenance to major collision repair.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Auto Repair Services */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-vv-blue" size={20} />
                  <span className="font-semibold text-vv-blue tracking-wide uppercase text-sm">Dallas Location</span>
                </div>
                <h4 className="text-2xl font-bold text-vv-navy">Auto Repair Services</h4>
                <p className="text-gray-500 mt-2">Mechanical repair, maintenance, and diagnostics.</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {[
                    "Official State Inspection",
                    "Computerized Engine Diagnostic Test",
                    "Brake Repair & Replacement",
                    "Oil Changes & Routine Maintenance",
                    "Engine Repair & Rebuilds",
                    "Domestic & Foreign Vehicles",
                    "General Auto Repair"
                  ].map((service, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-vv-red mt-0.5 shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">{service}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a href="#" className="text-vv-blue font-bold flex items-center gap-2 hover:text-vv-navy transition-colors">
                    View all mechanical services <ChevronRight size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Auto Body Services */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-vv-red" size={20} />
                  <span className="font-semibold text-vv-red tracking-wide uppercase text-sm">Garland Location</span>
                </div>
                <h4 className="text-2xl font-bold text-vv-navy">Auto Body Services</h4>
                <p className="text-gray-500 mt-2">Collision repair, paint, and insurance claims.</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {[
                    "Major & Minor Collision Repair",
                    "Professional Paint & Body Work",
                    "Insurance Claim Repairs",
                    "Free Estimates for Claims",
                    "Works With Any Insurance",
                    "24-Hour Towing Available",
                    "Frame Straightening"
                  ].map((service, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-vv-red mt-0.5 shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">{service}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a href="#" className="text-vv-blue font-bold flex items-center gap-2 hover:text-vv-navy transition-colors">
                    View all body shop services <ChevronRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-vv-navy tracking-tight mb-4">Two Convenient Locations</h2>
            <p className="text-lg text-gray-600">Find the right shop for your needs. Auto repair in Dallas, collision and body work in Garland.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Dallas Card */}
            <div className="bg-white border-2 border-vv-gray rounded-2xl p-8 lg:p-10 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-vv-gray rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              
              <div className="inline-block bg-vv-blue text-white text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">Auto Repair</div>
              
              <h3 className="text-3xl font-extrabold text-vv-navy mb-2">V V Auto Repair</h3>
              <p className="text-gray-500 font-medium mb-8 pb-8 border-b border-gray-100">Dallas</p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="bg-vv-gray p-3 rounded-full text-vv-blue"><MapPin size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600 leading-relaxed">11366 Jupiter Rd<br/>Dallas, TX 75218</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-vv-gray p-3 rounded-full text-vv-blue"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Contact</h4>
                    <p className="text-gray-600">Main: <a href="tel:2143202171" className="font-semibold text-vv-blue hover:underline">214-320-2171</a></p>
                    <p className="text-gray-600">Cell: <a href="tel:4692589356" className="font-semibold text-vv-blue hover:underline">469-258-9356</a></p>
                    <p className="text-gray-600 mt-1"><a href="mailto:vv.autorepair@yahoo.com" className="hover:text-vv-blue transition-colors">vv.autorepair@yahoo.com</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-vv-gray p-3 rounded-full text-vv-blue"><Clock size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Hours</h4>
                    <p className="text-gray-600">Monday–Friday: 8:00am–6:00pm</p>
                    <p className="text-gray-500">Saturday–Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:2143202171" className="flex-1 bg-vv-navy hover:bg-blue-900 text-white text-center py-3 rounded-lg font-bold transition-colors">Call Dallas Shop</a>
                <a href="#" className="flex-1 bg-vv-teal hover:bg-teal-400 text-white text-center py-3 rounded-lg font-bold transition-colors">Get Directions</a>
              </div>
            </div>

            {/* Garland Card */}
            <div className="bg-white border-2 border-vv-gray rounded-2xl p-8 lg:p-10 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-vv-gray rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              
              <div className="inline-block bg-vv-red text-white text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">Collision & Body</div>
              
              <h3 className="text-3xl font-extrabold text-vv-navy mb-2">V V Auto Body Repair</h3>
              <p className="text-gray-500 font-medium mb-8 pb-8 border-b border-gray-100">Garland</p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="bg-vv-gray p-3 rounded-full text-vv-red"><MapPin size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600 leading-relaxed">3730 Marquis Dr<br/>Garland, TX 75042</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-vv-gray p-3 rounded-full text-vv-red"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Contact</h4>
                    <p className="text-gray-600">Huong: <a href="tel:4692589356" className="font-semibold text-vv-red hover:underline">469-258-9356</a></p>
                    <p className="text-gray-600">David: <a href="tel:4694075340" className="font-semibold text-vv-red hover:underline">469-407-5340</a></p>
                    <p className="text-gray-600 mt-1"><a href="mailto:vv.autobodycorp@gmail.com" className="hover:text-vv-red transition-colors">vv.autobodycorp@gmail.com</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-vv-gray p-3 rounded-full text-vv-red"><Clock size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Hours</h4>
                    <p className="text-gray-600">Monday–Friday: 8:00am–5:00pm</p>
                    <p className="text-gray-500">Saturday–Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:4692589356" className="flex-1 bg-vv-navy hover:bg-blue-900 text-white text-center py-3 rounded-lg font-bold transition-colors">Call Garland Shop</a>
                <a href="#" className="flex-1 bg-vv-teal hover:bg-teal-400 text-white text-center py-3 rounded-lg font-bold transition-colors">Get Directions</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-vv-red py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Need an honest opinion on your car?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Stop by our Dallas shop for diagnostics, or visit our Garland shop for a free collision estimate.</p>
          <a href="tel:2143202171" className="inline-flex items-center gap-3 bg-white text-vv-red px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
            <Phone size={24} />
            Call Dallas: (214) 320-2171
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
