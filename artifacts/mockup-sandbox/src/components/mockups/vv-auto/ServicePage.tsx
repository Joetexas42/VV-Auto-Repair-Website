import React from "react";
import { MapPin, Phone, Clock, Star, CheckCircle2, ChevronRight, Menu, ArrowRight, ShieldAlert } from "lucide-react";
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
          <a href="#" className="hover:text-vv-red transition-colors font-medium text-vv-red">Services</a>
          <a href="#" className="hover:text-vv-red transition-colors font-medium">About</a>
          <a href="#" className="hover:text-vv-red transition-colors font-medium">Contact</a>
          <div className="flex items-center bg-white/10 rounded-full p-1">
            <span className="px-3 py-1 bg-white text-vv-navy rounded-full text-sm font-bold shadow-sm">EN</span>
            <span className="px-3 py-1 text-white/70 text-sm font-medium hover:text-white cursor-pointer transition-colors">VI</span>
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

export function ServicePage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-vv-red selection:text-white">
      <Navigation />

      {/* Breadcrumbs */}
      <div className="bg-vv-gray py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <a href="#" className="hover:text-vv-navy transition-colors">Home</a>
            <ChevronRight size={14} />
            <a href="#" className="hover:text-vv-navy transition-colors">Services</a>
            <ChevronRight size={14} />
            <span className="text-vv-navy font-semibold">Brake Repair</span>
          </div>
        </div>
      </div>

      {/* Service Hero */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-vv-blue/10 text-vv-blue font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 text-sm">
                Dallas Location Service
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-vv-navy tracking-tight mb-6 leading-tight">
                Brake Repair <br/>
                <span className="text-vv-red">in Dallas, TX</span>
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="text-gray-600 font-medium">4.4 Star Google Rating</span>
              </div>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Your brakes are the most important safety feature on your vehicle. At V.V. Auto Repair, we provide honest, straightforward brake inspections and repairs. We'll show you exactly how much pad is left, explain what needs to be replaced, and give you a fair price before any work begins.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:2143202171" className="bg-vv-navy hover:bg-blue-900 text-white text-center px-8 py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center gap-3 shadow-lg">
                  <Phone size={24} />
                  Call Dallas Shop
                </a>
                <a href="#details" className="bg-vv-teal hover:bg-teal-400 text-white text-center px-8 py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center">
                  Learn More
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-vv-gray rounded-2xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="/__mockup/images/vv-brakes.png" 
                alt="Mechanic replacing disc brakes" 
                className="relative rounded-2xl shadow-xl z-10 w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section id="details" className="py-20 bg-vv-gray border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-extrabold text-vv-navy mb-8">Honest Brake Service</h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  When you hear squeaking, grinding, or feel a vibration when pressing the brake pedal, it's time for an inspection. Ignoring brake issues doesn't just put your safety at risk—it can lead to more expensive repairs like damaged rotors or calipers.
                </p>
                <p>
                  Our certified mechanics at the Dallas location will thoroughly inspect your entire braking system. We don't believe in upselling. If your rotors just need to be resurfaced instead of replaced, we'll tell you. If your brake pads still have 10,000 miles left on them, we'll let you know.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <ShieldAlert className="text-vv-red mb-4" size={32} />
                  <h3 className="text-xl font-bold text-vv-navy mb-2">Signs you need brakes:</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-vv-blue shrink-0 mt-0.5" size={18} /><span>Squealing or grinding noises</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-vv-blue shrink-0 mt-0.5" size={18} /><span>Vibration in the steering wheel</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-vv-blue shrink-0 mt-0.5" size={18} /><span>Spongy or soft brake pedal</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-vv-blue shrink-0 mt-0.5" size={18} /><span>Car pulling to one side when braking</span></li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="text-vv-blue mb-4" size={32} />
                  <h3 className="text-xl font-bold text-vv-navy mb-2">What we check:</h3>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-vv-blue shrink-0 mt-0.5" size={18} /><span>Brake pad thickness</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-vv-blue shrink-0 mt-0.5" size={18} /><span>Rotor condition & thickness</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-vv-blue shrink-0 mt-0.5" size={18} /><span>Caliper operation</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-vv-blue shrink-0 mt-0.5" size={18} /><span>Brake fluid level and quality</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="bg-vv-navy rounded-2xl p-8 text-white shadow-xl sticky top-28">
                <h3 className="text-2xl font-bold mb-4">Schedule Your Repair</h3>
                <p className="text-white/80 mb-8">Brake services are performed at our Dallas location.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-vv-red shrink-0" size={24} />
                    <div>
                      <p className="font-semibold">V V Auto Repair</p>
                      <p className="text-white/80">11366 Jupiter Rd<br/>Dallas, TX 75218</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-vv-red shrink-0" size={24} />
                    <div>
                      <p className="text-white/80">Mon–Fri: 8am–6pm</p>
                      <p className="text-white/80">Sat–Sun: Closed</p>
                    </div>
                  </div>
                </div>

                <a href="tel:2143202171" className="block w-full bg-vv-red hover:bg-red-500 text-white text-center py-4 rounded-lg font-bold text-lg transition-colors shadow-lg">
                  (214) 320-2171
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-vv-gray border border-gray-200 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-block bg-vv-red/10 text-vv-red font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-xs">
                Also in Garland
              </div>
              <h3 className="text-2xl font-bold text-vv-navy mb-2">Need collision or body work?</h3>
              <p className="text-gray-600 max-w-xl">Our Garland location specializes in major collision repair, paint, and insurance claims. We work with all insurance providers.</p>
            </div>
            <a href="#" className="whitespace-nowrap bg-vv-teal hover:bg-teal-400 text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2">
              Visit V V Auto Body <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
