(function () {
  'use strict';

  /* ─── Locale detection from URL ─── */
  function getCurrentLocale() {
    return window.location.pathname.startsWith('/vi') ? 'vi' : 'en';
  }

  function getEnEquivalent(path) {
    return path.replace(/^\/vi/, '') || '/';
  }

  function getViEquivalent(path) {
    if (path.startsWith('/vi')) return path;
    return '/vi' + (path === '/' ? '/' : path);
  }

  /* ─── Language ─── */
  function getLang() {
    return getCurrentLocale();
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-toggle').forEach(function (toggle) {
      toggle.querySelectorAll('button').forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });
    });
  }

  function initLang() {
    var lang = getLang();
    applyLang(lang);

    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var selected = this.dataset.lang;
        var current = window.location.pathname;
        if (selected === getCurrentLocale()) return;

        if (selected === 'vi') {
          window.location.href = getViEquivalent(current);
        } else {
          window.location.href = getEnEquivalent(current);
        }
      });
    });
  }

  /* ─── Location ─── */
  function getLoc() {
    var saved = localStorage.getItem('vv-loc');
    return (saved === 'dallas' || saved === 'garland') ? saved : 'dallas';
  }

  function applyLoc(loc) {
    document.documentElement.dataset.loc = loc;
    localStorage.setItem('vv-loc', loc);

    document.querySelectorAll('.loc-toggle').forEach(function (toggle) {
      toggle.querySelectorAll('button').forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.loc === loc);
      });
    });
  }

  function initLoc() {
    var loc = getLoc();
    applyLoc(loc);

    document.querySelectorAll('.loc-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLoc(this.dataset.loc);
      });
    });
  }

  /* ─── Mobile nav ─── */
  function initMobileNav() {
    var hamburger = document.getElementById('nav-hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamburger.innerHTML = open
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });

    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      });
    });
  }

  /* ─── Active nav link ─── */
  function markActivePage() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('[data-navpath]').forEach(function (a) {
      var navPath = a.dataset.navpath.replace(/\/$/, '') || '/';
      if (navPath === path) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ─── Footer year ─── */
  function setFooterYear() {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ─── WebMCP tool registration ─── */
  function initWebMCP() {
    if (!navigator.modelContext || typeof navigator.modelContext.provideContext !== 'function') return;

    var API_BASE = '/api';

    navigator.modelContext.provideContext({
      tools: [
        {
          name: 'get-reviews',
          description: 'Fetch customer reviews for V.V. Auto Repair. Returns a list of Google reviews with rating, author, text, and date.',
          inputSchema: {
            type: 'object',
            properties: {
              limit: {
                type: 'integer',
                description: 'Maximum number of reviews to return (default: 10)',
                default: 10
              }
            },
            additionalProperties: false
          },
          execute: function (input) {
            var limit = (input && input.limit) ? input.limit : 10;
            return fetch(API_BASE + '/reviews?limit=' + limit)
              .then(function (r) { return r.json(); });
          }
        },
        {
          name: 'find-location',
          description: 'Get address, phone, hours, and Google Maps link for a V.V. Auto location.',
          inputSchema: {
            type: 'object',
            properties: {
              location: {
                type: 'string',
                enum: ['dallas', 'garland'],
                description: 'Which location to look up: "dallas" for auto repair, "garland" for collision/body shop'
              }
            },
            required: ['location'],
            additionalProperties: false
          },
          execute: function (input) {
            var locations = {
              dallas: {
                name: 'V.V. Auto Repair',
                type: 'Auto Repair',
                address: '11366 Jupiter Rd, Dallas, TX 75218',
                phone: '214-320-2171',
                phone_cell: '469-258-9356',
                email: 'vv.autorepair@yahoo.com',
                hours: 'Monday–Friday 8:00am–6:00pm, Saturday–Sunday Closed',
                maps_url: 'https://maps.app.goo.gl/iuW6oo7aA3FH7eG4A',
                page_url: 'https://vvrepair.com/contact'
              },
              garland: {
                name: 'V.V. Auto Body Repair',
                type: 'Collision & Body Shop',
                address: '3730 Marquis Dr, Garland, TX 75042',
                phone: '469-258-9356',
                phone_alt: '469-407-5340',
                email: 'vv.autobodycorp@gmail.com',
                hours: 'Monday–Friday 8:00am–5:00pm, Saturday–Sunday Closed',
                maps_url: 'https://maps.app.goo.gl/SRFnqikpxGiZt1gm7',
                page_url: 'https://vvrepair.com/contact'
              }
            };
            var loc = input && input.location;
            if (!loc || !locations[loc]) {
              return Promise.resolve({ error: 'Unknown location. Use "dallas" or "garland".' });
            }
            return Promise.resolve(locations[loc]);
          }
        },
        {
          name: 'view-services',
          description: 'Get the list of services offered at V.V. Auto Repair locations, with links to each service page.',
          inputSchema: {
            type: 'object',
            properties: {
              location: {
                type: 'string',
                enum: ['dallas', 'garland', 'all'],
                description: 'Filter by location. Defaults to "all".',
                default: 'all'
              }
            },
            additionalProperties: false
          },
          execute: function (input) {
            var loc = (input && input.location) ? input.location : 'all';
            var dallas = [
              { name: 'Oil Change & Maintenance', url: 'https://vvrepair.com/services/oil-change', location: 'dallas' },
              { name: 'Brake Repair & Replacement', url: 'https://vvrepair.com/services/brake-repair', location: 'dallas' },
              { name: 'Computer Engine Diagnostics', url: 'https://vvrepair.com/services/diagnostics', location: 'dallas' },
              { name: 'Engine Repair & Rebuilds', url: 'https://vvrepair.com/services/engine-repair', location: 'dallas' },
              { name: 'Texas State Inspection', url: 'https://vvrepair.com/services/state-inspection', location: 'dallas' }
            ];
            var garland = [
              { name: 'Collision & Body Repair', url: 'https://vvrepair.com/services/collision-body-repair', location: 'garland' }
            ];
            var all = dallas.concat(garland);
            var result = loc === 'dallas' ? dallas : loc === 'garland' ? garland : all;
            return Promise.resolve({ services: result, services_index: 'https://vvrepair.com/services/', markdown_index: 'https://vvrepair.com/md/index.json' });
          }
        },
        {
          name: 'request-appointment',
          description: 'Get contact information or navigate to the contact form to request an appointment at V.V. Auto Repair.',
          inputSchema: {
            type: 'object',
            properties: {
              location: {
                type: 'string',
                enum: ['dallas', 'garland'],
                description: 'Preferred location for the appointment'
              },
              service: {
                type: 'string',
                description: 'Type of service needed (optional, e.g. "oil change", "brake repair")'
              }
            },
            additionalProperties: false
          },
          execute: function (input) {
            var loc = input && input.location;
            var contact = {
              contact_page: 'https://vvrepair.com/contact',
              note: 'No appointment needed for most services — walk-ins welcome Monday through Friday.',
              dallas: { phone: '214-320-2171', tel_link: 'tel:2143202171', email: 'vv.autorepair@yahoo.com', hours: 'Mon–Fri 8am–6pm' },
              garland: { phone: '469-258-9356', tel_link: 'tel:4692589356', email: 'vv.autobodycorp@gmail.com', hours: 'Mon–Fri 8am–5pm' }
            };
            if (loc === 'dallas') {
              return Promise.resolve({ preferred_location: 'dallas', contact: contact.dallas, contact_page: contact.contact_page, note: contact.note });
            }
            if (loc === 'garland') {
              return Promise.resolve({ preferred_location: 'garland', contact: contact.garland, contact_page: contact.contact_page, note: contact.note });
            }
            return Promise.resolve(contact);
          }
        }
      ]
    });
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initLoc();
    initMobileNav();
    markActivePage();
    setFooterYear();
    initWebMCP();
  });
})();
