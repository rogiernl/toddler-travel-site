// Calm language switcher. Without JavaScript every language stays visible.
(function () {
  var LANGS = ["en", "nl", "fr", "es", "de"];
  var LABELS = {
    en: { support: "Support", privacy: "Privacy", terms: "Terms" },
    nl: { support: "Support", privacy: "Privacy", terms: "Voorwaarden" },
    fr: { support: "Assistance", privacy: "Confidentialité", terms: "Conditions" },
    es: { support: "Soporte", privacy: "Privacidad", terms: "Condiciones" },
    de: { support: "Hilfe", privacy: "Datenschutz", terms: "Nutzungsbedingungen" }
  };

  document.documentElement.classList.add("js");

  function pick() {
    var h = (location.hash || "").replace("#", "");
    if (LANGS.indexOf(h) >= 0) return h;
    try {
      var s = localStorage.getItem("tt-lang");
      if (LANGS.indexOf(s) >= 0) return s;
    } catch (e) {}
    var nav = (navigator.languages || [navigator.language || "en"]);
    for (var i = 0; i < nav.length; i++) {
      var code = String(nav[i]).slice(0, 2).toLowerCase();
      if (LANGS.indexOf(code) >= 0) return code;
    }
    return "en";
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("section.lang").forEach(function (s) {
      s.hidden = s.id !== lang;
    });
    document.querySelectorAll("nav.langs a").forEach(function (a) {
      var on = a.getAttribute("href") === "#" + lang;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    document.querySelectorAll("nav.pages a[data-page]").forEach(function (a) {
      var page = a.getAttribute("data-page");
      a.textContent = LABELS[lang][page];
      a.setAttribute("href", a.getAttribute("href").split("#")[0] + "#" + lang);
    });
    try { localStorage.setItem("tt-lang", lang); } catch (e) {}
  }

  function onHash() {
    apply(pick());
    window.scrollTo(0, 0);
  }

  document.addEventListener("DOMContentLoaded", function () { apply(pick()); window.scrollTo(0, 0); });
  window.addEventListener("hashchange", onHash);
})();
