(function () {
  'use strict';

  /* ─── Language ─── */
  function getLang() {
    var saved = localStorage.getItem('vv-lang');
    return (saved === 'en' || saved === 'vi') ? saved : 'en';
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('vv-lang', lang);

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
        applyLang(this.dataset.lang);
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

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initLoc();
    initMobileNav();
    markActivePage();
    setFooterYear();
  });
})();
