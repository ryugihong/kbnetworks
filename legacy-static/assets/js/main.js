/* ============================================================
   KOBIS GLOBAL — Shared interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- FAQ accordion ---- */
  window.toggleFaq = function (btn) {
    var item = btn.closest(".faq-item");
    if (!item) return;
    var answer = item.querySelector(".faq-a");
    var isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(function (i) {
      i.classList.remove("open");
      var a = i.querySelector(".faq-a");
      if (a) a.style.maxHeight = "0";
    });
    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  };

  /* ---- Mobile menu ---- */
  window.toggleMenu = function () {
    var menu = document.getElementById("mobileMenu");
    if (menu) menu.classList.toggle("open");
  };

  document.addEventListener("DOMContentLoaded", function () {
    /* Close mobile menu on link click */
    var menu = document.getElementById("mobileMenu");
    if (menu) {
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          menu.classList.remove("open");
        });
      });
    }

    /* Year stamp */
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    /* Scroll reveal */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach(function (el) {
        obs.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("in");
      });
    }

    /* Newsletter / form demo handlers (no backend) */
    document.querySelectorAll("[data-demo-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var note = form.querySelector("[data-form-note]");
        if (note) {
          note.textContent =
            "문의가 접수되었습니다. KBNETWORKS 담당자가 영업일 기준 48시간 내 회신드립니다.";
          note.style.color = "var(--gold)";
        }
        form.reset();
      });
    });
  });
})();
