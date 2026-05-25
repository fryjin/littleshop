(function () {
  const page = document.body.dataset.page;
  const toast = document.querySelector("[data-toast-host]");

  document.querySelectorAll("[data-choice-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const target = event.target.closest("[data-choice]");
      if (!target) return;
      const single = group.dataset.choiceGroup !== "multi";
      if (single) {
        group.querySelectorAll("[data-choice]").forEach((item) => {
          item.setAttribute("aria-pressed", "false");
          item.classList.remove("active");
          if (item.classList.contains("sample-package")) item.classList.remove("featured");
        });
      }
      const current = target.getAttribute("aria-pressed") === "true";
      const next = single ? true : !current;
      target.setAttribute("aria-pressed", String(next));
      target.classList.toggle("active", next && target.classList.contains("segment"));
      if (target.classList.contains("sample-package")) {
        target.classList.toggle("featured", next);
      }
    });
  });

  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!toast) return;
      toast.textContent = button.dataset.toast || "已记录";
      toast.classList.add("show");
      window.clearTimeout(window.__toastTimer);
      window.__toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
    });
  });

  document.querySelectorAll(".btn, .quick-item, .choice-card, .segment, .tab-item, .feature-card, .coupon-card, .download-card, .activity-card, .sample-package, .round-action, .step-card").forEach((item) => {
    item.addEventListener("pointerdown", () => item.classList.add("tap-active"));
    item.addEventListener("pointerup", () => item.classList.remove("tap-active"));
    item.addEventListener("pointerleave", () => item.classList.remove("tap-active"));
  });

  const wholesale = document.querySelector("[data-wholesale-calc]");
  if (wholesale) {
    const wholesaleInput = wholesale.querySelector("[data-cost]");
    const retailInput = wholesale.querySelector("[data-retail]");
    const result = wholesale.querySelector("[data-margin]");
    const update = () => {
      const cost = Number(wholesaleInput.value || 0);
      const retail = Number(retailInput.value || 0);
      const margin = retail - cost;
      result.textContent = margin > 0 ? "¥" + margin.toFixed(0) : "待确认";
    };
    wholesaleInput.addEventListener("input", update);
    retailInput.addEventListener("input", update);
    update();
  }

  if (page) {
    document.querySelectorAll(".tab-item").forEach((item) => {
      item.classList.toggle("active", item.dataset.tab === page);
    });
  }
})();
