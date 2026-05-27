(function () {
  const page = document.body.dataset.page;
  const toast = document.querySelector("[data-toast-host]");
  const CART_KEY = "waxAtelierCartCount";

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message || "已记录";
    toast.classList.add("show");
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  };

  const cartCount = () => Number(window.sessionStorage.getItem(CART_KEY) || 0);
  const setCartCount = (count) => {
    window.sessionStorage.setItem(CART_KEY, String(Math.max(0, count)));
    updateCartBadges();
  };
  const addCartItem = () => setCartCount(cartCount() + 1);

  const updateCartBadges = () => {
    document.querySelectorAll(".tab-item[data-tab='cart']").forEach((item) => {
      let badge = item.querySelector(".cart-badge");
      const count = cartCount();
      if (!count) {
        if (badge) badge.remove();
        return;
      }
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "cart-badge";
        item.append(badge);
      }
      badge.textContent = count > 9 ? "9+" : String(count);
    });
  };

  document.querySelectorAll("[data-choice-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const target = event.target.closest("[data-choice]");
      if (!target || target.disabled || !group.contains(target)) return;
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
      if (target.classList.contains("sample-package")) target.classList.toggle("featured", next);
    });
  });

  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.toast || "已记录"));
  });

  const giftTabs = Array.from(document.querySelectorAll("[data-gift-tab]"));
  const giftPanels = Array.from(document.querySelectorAll("[data-gift-panel]"));
  const validGiftTabs = giftTabs.map((tab) => tab.dataset.giftTab);
  const defaultGiftTab = validGiftTabs[0] || "scene";

  const activateGiftTab = (name, updateHash) => {
    const nextName = validGiftTabs.includes(name) ? name : defaultGiftTab;
    giftTabs.forEach((tab) => {
      const active = tab.dataset.giftTab === nextName;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    giftPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.giftPanel === nextName);
    });
    if (updateHash && window.location.hash !== "#" + nextName) {
      window.history.replaceState(null, "", "#" + nextName);
    }
  };

  if (giftTabs.length && giftPanels.length) {
    giftTabs.forEach((tab) => {
      tab.addEventListener("click", () => activateGiftTab(tab.dataset.giftTab, true));
    });
    window.addEventListener("hashchange", () => activateGiftTab(window.location.hash.slice(1), false));
    activateGiftTab(window.location.hash.slice(1) || defaultGiftTab, false);
  }

  const budgetPicker = document.querySelector("[data-budget-picker]");
  if (budgetPicker) {
    const empty = document.querySelector("[data-budget-empty]");
    const panels = Array.from(document.querySelectorAll("[data-budget-panel]"));
    const showBudgetPanel = (name) => {
      let hasMatch = false;
      panels.forEach((panel) => {
        const active = panel.dataset.budgetPanel === name;
        panel.classList.toggle("active", active);
        if (active) hasMatch = true;
      });
      if (empty) empty.classList.toggle("is-hidden", hasMatch);
    };

    budgetPicker.addEventListener("click", (event) => {
      const target = event.target.closest("[data-budget-option]");
      if (target) showBudgetPanel(target.dataset.budgetOption);
    });
    showBudgetPanel("");
  }

  const catalogImages = {
    classic: ["assets/catalog/classic-01.png", "assets/catalog/classic-02.png", "assets/catalog/classic-03.png", "assets/catalog/classic-04.png"],
    advanced: ["assets/catalog/advanced-01.png", "assets/catalog/advanced-02.png", "assets/catalog/advanced-03.png", "assets/catalog/advanced-04.png", "assets/catalog/advanced-05.png", "assets/catalog/advanced-06.png"],
    artisan: ["assets/catalog/artisan-01.png", "assets/catalog/artisan-02.png", "assets/catalog/artisan-03.png", "assets/catalog/artisan-04.png", "assets/catalog/artisan-05.png", "assets/catalog/artisan-06.png"],
    festival: ["assets/catalog/festival-01.png", "assets/catalog/festival-02.png", "assets/catalog/festival-03.png", "assets/catalog/festival-04.png"],
  };

  const filterLabels = {
    birthday: "生日答谢",
    daily: "乔迁日常",
    light: "浅色",
    deep: "深色",
    giftbox: "礼盒",
    important: "重要关系",
    display: "陈列",
    warm: "暖色",
    cool: "冷色",
    spring: "春节",
    lantern: "元宵",
    mother: "母亲节",
    romance: "520/七夕",
    dragonboat: "端午",
    midautumn: "中秋",
    teacher: "教师节",
    yearend: "年末",
  };

  const holidayCycle = ["spring", "spring", "lantern", "lantern", "mother", "mother", "romance", "romance", "dragonboat", "dragonboat", "midautumn", "midautumn", "teacher", "teacher", "yearend", "yearend"];

  const productFilters = (series, index) => {
    if (series === "advanced") {
      const tags = ["giftbox"];
      tags.push(index % 2 ? "birthday" : "daily");
      tags.push(index % 3 === 0 || index % 5 === 0 ? "deep" : "light");
      return tags;
    }
    if (series === "artisan") {
      const tags = ["giftbox"];
      tags.push(index % 2 ? "important" : "display");
      tags.push(index % 4 === 0 || index % 5 === 0 ? "cool" : "warm");
      return tags;
    }
    if (series === "festival") return [holidayCycle[(index - 1) % holidayCycle.length]];
    return [];
  };

  const buildProductCards = (panel) => {
    const grid = panel.querySelector("[data-product-grid]");
    if (!grid || grid.dataset.generated === "true") return;
    const seriesKey = panel.dataset.seriesPanel || "advanced";
    const images = catalogImages[seriesKey] || catalogImages.advanced;
    const prefix = panel.dataset.colorPrefix || "CO";
    const count = Number(panel.dataset.colorCount || 0);
    const tones = (panel.dataset.toneList || "暖白花冠,莓红浮雕,香槟金边,雾蓝雕花").split(",");
    const seriesName = panel.dataset.seriesName || "商品系列";
    const status = panel.dataset.status || "零售";
    const packageLabel = panel.dataset.packageLabel || "包装待确认";
    const sizeLabel = panel.dataset.sizeLabel || "S/M/L/XL";
    const priceLabel = panel.dataset.priceLabel || "顾问确认";
    const baseHref = panel.dataset.cardHref || "product.html";
    const actionMode = status === "零售" ? (seriesKey === "festival" ? "configure" : "add") : "navigate";
    const pad = (value) => String(value).padStart(2, "0");
    const fragment = document.createDocumentFragment();

    for (let index = 1; index <= count; index += 1) {
      const code = prefix + "-" + pad(index);
      const tone = tones[(index - 1) % tones.length];
      const image = images[(index - 1) % images.length];
      const tags = productFilters(seriesKey, index);
      const href = baseHref + "?series=" + encodeURIComponent(seriesKey) + "&code=" + encodeURIComponent(code);
      const card = document.createElement("article");
      card.className = "catalog-product-card";
      card.dataset.filters = tags.join(" ");
      card.dataset.series = seriesKey;
      card.setAttribute("aria-label", seriesName + " " + code + " " + tone);

      const link = document.createElement("a");
      link.className = "catalog-product-link";
      link.href = href;

      const imageWrap = document.createElement("span");
      imageWrap.className = "catalog-product-image";
      const img = document.createElement("img");
      img.src = image;
      img.alt = seriesName + " " + code + " " + tone + "雕刻蜡烛";
      img.loading = "lazy";
      img.width = 512;
      img.height = 512;
      imageWrap.append(img);

      const body = document.createElement("span");
      body.className = "catalog-product-body";

      const codeRow = document.createElement("span");
      codeRow.className = "catalog-code-row";
      const strong = document.createElement("strong");
      strong.textContent = code;
      codeRow.append(strong);
      if (status && status !== "零售") {
        const badge = document.createElement("em");
        badge.textContent = status;
        codeRow.append(badge);
      }

      const name = document.createElement("span");
      name.className = "catalog-product-name";
      name.textContent = tone;

      const meta = document.createElement("span");
      meta.className = "catalog-product-meta";
      meta.textContent = sizeLabel + " · " + packageLabel;

      const price = document.createElement("span");
      price.className = "catalog-product-price";
      price.textContent = priceLabel;

      const tagRow = document.createElement("span");
      tagRow.className = "catalog-product-tags";
      tags.slice(0, 2).forEach((tag) => {
        const chip = document.createElement("span");
        chip.textContent = filterLabels[tag] || tag;
        tagRow.append(chip);
      });

      body.append(codeRow, name, meta, price, tagRow);
      link.append(imageWrap, body);

      const action = document.createElement("button");
      action.className = "catalog-product-action";
      action.type = "button";
      action.textContent = actionMode === "navigate" ? "询" : "+";
      action.setAttribute("aria-label", actionMode === "add" ? "加入购物车" : (actionMode === "navigate" ? "顾问确认" : "选择包装"));
      action.dataset.cardAction = actionMode;
      action.dataset.cardHref = href;
      action.dataset.seriesKey = seriesKey;

      card.append(link, action);
      fragment.append(card);
    }

    grid.append(fragment);
    grid.dataset.generated = "true";
  };

  document.querySelectorAll("[data-series-panel]").forEach(buildProductCards);

  const seriesCards = Array.from(document.querySelectorAll("[data-series-card]"));
  const seriesPanels = Array.from(document.querySelectorAll("[data-series-panel]"));
  const activateFilter = (series, filter) => {
    const panel = seriesPanels.find((item) => item.dataset.seriesPanel === series);
    if (!panel) return;
    const value = filter || "all";
    panel.querySelectorAll("[data-filter-value]").forEach((button) => {
      const active = button.dataset.filterValue === value;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    panel.querySelectorAll(".catalog-product-card").forEach((card) => {
      const visible = value === "all" || (card.dataset.filters || "").split(" ").includes(value);
      card.classList.toggle("is-filtered-out", !visible);
    });
  };

  const activateSeries = (name, filter) => {
    const nextName = seriesPanels.some((panel) => panel.dataset.seriesPanel === name) ? name : "advanced";
    seriesCards.forEach((card) => {
      const active = card.dataset.seriesCard === nextName;
      card.classList.toggle("active", active);
      card.setAttribute("aria-pressed", String(active));
    });
    seriesPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.seriesPanel === nextName);
    });
    activateFilter(nextName, filter || "all");
  };

  const applyCatalogHash = () => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return activateSeries("advanced", "all");
    if (hash.startsWith("festival-")) return activateSeries("festival", hash.replace("festival-", ""));
    if (["advanced", "artisan", "festival"].includes(hash)) return activateSeries(hash, "all");
    return activateSeries("advanced", "all");
  };

  seriesCards.forEach((card) => {
    card.addEventListener("click", () => {
      activateSeries(card.dataset.seriesCard, "all");
      if (window.location.hash !== "#" + card.dataset.seriesCard) window.history.replaceState(null, "", "#" + card.dataset.seriesCard);
    });
  });

  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const target = event.target.closest("[data-filter-value]");
      if (!target) return;
      const series = group.dataset.filterGroup;
      const filter = target.dataset.filterValue;
      activateFilter(series, filter);
      if (series === "festival") {
        const nextHash = filter === "all" ? "#festival" : "#festival-" + filter;
        if (window.location.hash !== nextHash) window.history.replaceState(null, "", nextHash);
      }
    });
  });

  if (seriesPanels.length) {
    window.addEventListener("hashchange", applyCatalogHash);
    applyCatalogHash();
  }

  document.querySelectorAll("[data-card-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (button.dataset.cardAction === "add") {
        addCartItem();
        showToast("已加入购物车，可继续挑选其他商品");
        return;
      }
      window.location.href = button.dataset.cardHref || "product.html";
    });
  });

  const productData = {
    advanced: {
      label: "进阶系列",
      prefix: "AD",
      defaultCode: "AD-07",
      packageTag: "精品包装",
      titleSuffix: "手工雕刻香薰蜡烛",
      desc: "进阶系列适合生日、感谢和日常节日送礼。默认精品包装，可按关系升级礼盒。",
      tones: ["象牙花冠", "森林松绿", "玫瑰粉雾", "奶油浮雕", "雾蓝花瓣", "胭脂珊瑚", "莓果洛可可"],
      fragranceNote: "进阶系列 3 选 1",
      fragrances: [
        ["玫瑰木", "花木调 · 中等扩香", "红莓、粉胡椒", "玫瑰木、天竺葵", "琥珀、柔木", "适合生日、感谢和纪念日礼。"],
        ["白茶", "清茶调 · 轻柔扩香", "柑橘、白梨", "白茶、铃兰", "雪松、白麝香", "适合乔迁、办公室和日常空间礼。"],
        ["无香陈列", "无香 · 纯陈列", "不添加香精", "不干扰空间气味", "适合敏感人群", "适合只看造型、对气味敏感或商业陈列。"],
      ],
      packages: [
        ["premium", "精品包装", "进阶系列默认包装，补差 ¥0。", 0],
        ["giftbox", "礼盒包装", "升级硬质礼盒，额外 +20。", 20],
      ],
      packageNote: "当前商品为进阶系列，普通包装不进入默认零售详情页选项。",
    },
    artisan: {
      label: "匠作系列",
      prefix: "AR",
      defaultCode: "AR-01",
      packageTag: "礼盒包装",
      titleSuffix: "匠作手工雕刻香薰蜡烛",
      desc: "匠作系列颜色和香型更完整，默认礼盒包装，适合重要关系、高端陈列和空间礼。",
      tones: ["莓红鎏金", "雾蓝花冠", "香槟金雕", "深梅礼烛", "宫廷红白", "祖母绿金"],
      fragranceNote: "匠作系列 10 选 1",
      fragrances: [
        ["玫瑰木", "花木调 · 中等扩香", "红莓、粉胡椒", "玫瑰木、天竺葵", "琥珀、柔木", "适合生日、感谢和纪念日礼。"],
        ["白花麝香", "白花调 · 轻柔扩香", "梨花、柑橘", "白花、铃兰", "白麝香、柔木", "适合长辈、女性礼和温柔空间。"],
        ["晚香玉", "花香调 · 浓郁扩香", "绿叶、橙花", "晚香玉、茉莉", "奶油木、安息香", "适合仪式感礼盒和晚宴空间。"],
        ["雪松琥珀", "木质调 · 稳定扩香", "柠檬皮、鼠尾草", "雪松、岩兰草", "琥珀、麝香", "适合商务、书房和中性礼。"],
        ["檀木", "东方木质调 · 中高扩香", "香草、豆蔻", "檀木、雪松", "安息香、乳香", "适合重要关系和沉稳空间礼。"],
        ["乌木烟熏", "深木调 · 高扩香", "黑胡椒、皮革", "乌木、烟草叶", "烟熏木、广藿香", "适合高端陈列和个性化收藏。"],
        ["莓果", "果香调 · 中等扩香", "红莓、黑加仑", "覆盆子、玫瑰", "木质麝香", "适合甜美节日和朋友礼。"],
        ["柑橘橙花", "柑橘花香调 · 清亮扩香", "佛手柑、甜橙", "橙花、白茶", "白麝香、雪松", "适合春夏、乔迁和办公空间。"],
        ["白茶", "清茶调 · 轻柔扩香", "柑橘、白梨", "白茶、铃兰", "雪松、白麝香", "适合低干扰空间与日常陈列。"],
        ["无香陈列", "无香 · 纯陈列", "不添加香精", "不干扰空间气味", "适合敏感人群", "适合只看造型、对气味敏感或商业陈列。"],
      ],
      packages: [["giftbox", "礼盒包装", "匠作系列默认硬质礼盒，补差 ¥0。", 0]],
      packageNote: "匠作系列默认礼盒包装，当前零售详情页不提供降级包装。",
    },
    festival: {
      label: "节日系列",
      prefix: "FS",
      defaultCode: "FS-01",
      packageTag: "包装手选",
      titleSuffix: "节日限定雕刻香薰蜡烛",
      desc: "节日系列按节点维护商品标签，包装需手动选择，适合春节、中秋、纪念日和年末礼。",
      tones: ["暖金节庆", "红白限定", "团圆组合", "粉白纪念"],
      fragranceNote: "节日系列 3 选 1",
      fragrances: [
        ["玫瑰木", "花木调 · 中等扩香", "红莓、粉胡椒", "玫瑰木、天竺葵", "琥珀、柔木", "适合仪式感节日和纪念日。"],
        ["柑橘橙花", "柑橘花香调 · 清亮扩香", "佛手柑、甜橙", "橙花、白茶", "白麝香、雪松", "适合拜访礼和春夏节日。"],
        ["无香陈列", "无香 · 纯陈列", "不添加香精", "不干扰空间气味", "适合敏感人群", "适合企业节点和桌面陈列。"],
      ],
      packages: [
        ["plain", "普通包装", "基础防护包装，补差 ¥0。", 0],
        ["premium", "精品包装", "增加礼品纸和缓冲，额外 +30。", 30],
        ["giftbox", "礼盒包装", "硬质礼盒与贺卡位，额外 +50。", 50],
      ],
      packageNote: "节日系列需手动选择包装，提交前可在购物车再次修改。",
    },
  };

  const renderProductDetail = () => {
    const root = document.querySelector("[data-fragrance-selector]");
    if (!root) return;
    const params = new URLSearchParams(window.location.search);
    const series = productData[params.get("series")] ? params.get("series") : "advanced";
    const data = productData[series];
    const code = params.get("code") || data.defaultCode;
    const index = Math.max(1, Number((code.split("-")[1] || "1").replace(/\D/g, "")));
    const tone = data.tones[(index - 1) % data.tones.length];

    const subtitle = document.querySelector("[data-product-subtitle]");
    if (subtitle) subtitle.textContent = code + " " + tone;
    const tagRow = document.querySelector("[data-product-tags]");
    if (tagRow) tagRow.innerHTML = '<span class="tag berry">' + data.label + '</span><span class="tag">' + code + '</span><span class="tag">' + data.packageTag + '</span>';
    const title = document.querySelector("[data-product-title]");
    if (title) title.textContent = tone + " · " + data.titleSuffix;
    const desc = document.querySelector("[data-product-desc]");
    if (desc) desc.textContent = data.desc;
    const specs = document.querySelector("[data-product-specs]");
    if (specs) specs.innerHTML = "<span>系列：" + data.label + "</span><span>颜色：" + code + " " + tone + "</span><span>销售：零售可购</span>";
    const back = document.querySelector("[data-product-back]");
    if (back) back.href = "catalog.html#" + series;

    const note = document.querySelector("[data-fragrance-count]");
    if (note) note.textContent = data.fragranceNote;
    const strip = root.querySelector(".fragrance-strip");
    if (strip) {
      strip.innerHTML = "";
      data.fragrances.forEach((item, itemIndex) => {
        const button = document.createElement("button");
        button.className = "fragrance-pill";
        button.type = "button";
        button.dataset.choice = "";
        button.dataset.fragranceName = item[0];
        button.dataset.fragranceType = item[1];
        button.dataset.fragranceTop = item[2];
        button.dataset.fragranceMiddle = item[3];
        button.dataset.fragranceBase = item[4];
        button.dataset.fragranceScene = item[5];
        button.setAttribute("aria-pressed", String(itemIndex === 0));
        button.textContent = item[0];
        strip.append(button);
      });
    }

    const packageRoot = document.querySelector("[data-package-options]");
    const packageGrid = packageRoot ? packageRoot.querySelector("[data-package-choice-group]") : null;
    if (packageRoot && packageGrid) {
      packageRoot.dataset.packageSeries = series;
      packageGrid.classList.toggle("two", data.packages.length === 2);
      packageGrid.innerHTML = "";
      data.packages.forEach((item, itemIndex) => {
        const button = document.createElement("button");
        button.className = "choice-card compact";
        button.dataset.choice = "";
        button.dataset.packageOption = item[0];
        button.dataset.packageDelta = String(item[3]);
        button.setAttribute("aria-pressed", String(itemIndex === 0));
        button.innerHTML = "<strong>" + item[1] + "</strong><span>" + item[2] + "</span>";
        packageGrid.append(button);
      });
      const packageNote = packageRoot.querySelector("[data-package-note]");
      if (packageNote) packageNote.textContent = data.packageNote;
    }
  };

  renderProductDetail();

  const updateFragranceDetail = (button) => {
    const root = document.querySelector("[data-fragrance-selector]");
    if (!root || !button) return;
    const setText = (selector, value) => {
      const node = root.querySelector(selector);
      if (node) node.textContent = value || "";
    };
    setText("[data-fragrance-title]", button.dataset.fragranceName || button.textContent);
    setText("[data-fragrance-type-text]", button.dataset.fragranceType);
    setText("[data-fragrance-top-text]", button.dataset.fragranceTop);
    setText("[data-fragrance-middle-text]", button.dataset.fragranceMiddle);
    setText("[data-fragrance-base-text]", button.dataset.fragranceBase);
    setText("[data-fragrance-scene-text]", button.dataset.fragranceScene);
  };

  const fragranceSelector = document.querySelector("[data-fragrance-selector]");
  if (fragranceSelector) {
    fragranceSelector.addEventListener("click", (event) => {
      const button = event.target.closest("[data-fragrance-name]");
      if (button) updateFragranceDetail(button);
    });
    updateFragranceDetail(fragranceSelector.querySelector("[data-fragrance-name][aria-pressed='true']"));
  }

  const packageRoot = document.querySelector("[data-package-options]");
  if (packageRoot) {
    const updatePackageDelta = () => {
      const selected = packageRoot.querySelector("[data-package-option][aria-pressed='true']");
      const delta = packageRoot.querySelector("[data-package-delta]");
      if (!delta || !selected) return;
      const title = selected.querySelector("strong") ? selected.querySelector("strong").textContent : "当前包装";
      const diff = Number(selected.dataset.packageDelta || 0);
      delta.textContent = "当前：" + title + "，补差 ¥" + diff;
    };
    const optionGroup = packageRoot.querySelector("[data-package-choice-group]");
    if (optionGroup) optionGroup.addEventListener("click", updatePackageDelta);
    updatePackageDelta();
  }

  const productAdd = document.querySelector("[data-product-add]");
  const addPanel = document.querySelector("[data-add-cart-panel]");
  if (productAdd) {
    productAdd.addEventListener("click", () => {
      addCartItem();
      showToast("已加入购物车，可继续挑选其他商品");
      if (addPanel) addPanel.hidden = false;
    });
  }

  const carousel = document.querySelector("[data-gallery-carousel]");
  if (carousel) {
    const track = carousel.querySelector("[data-gallery-track]");
    const slides = Array.from(track ? track.querySelectorAll("img") : []);
    const dots = Array.from(carousel.querySelectorAll("[data-gallery-dots] button"));
    const count = carousel.querySelector("[data-gallery-count]");
    let index = 0;
    let startX = 0;
    let pauseUntil = 0;

    const goTo = (nextIndex, manual) => {
      if (!slides.length) return;
      index = (nextIndex + slides.length) % slides.length;
      if (track) track.style.transform = "translateX(" + (-index * 100) + "%)";
      dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
      if (count) count.textContent = index + 1 + "/" + slides.length;
      if (manual) pauseUntil = Date.now() + 6500;
    };

    dots.forEach((dot, dotIndex) => dot.addEventListener("click", () => goTo(dotIndex, true)));
    carousel.addEventListener("touchstart", (event) => {
      startX = event.touches[0].clientX;
    }, { passive: true });
    carousel.addEventListener("touchend", (event) => {
      const delta = event.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 36) goTo(index + (delta < 0 ? 1 : -1), true);
    }, { passive: true });
    window.setInterval(() => {
      if (Date.now() < pauseUntil) return;
      goTo(index + 1, false);
    }, 3500);
    goTo(0, false);
  }

  const cartToggle = document.querySelector("[data-cart-config-toggle]");
  const cartConfig = document.querySelector("[data-cart-config]");
  if (cartToggle && cartConfig) {
    cartToggle.addEventListener("click", () => {
      const nextOpen = cartConfig.hasAttribute("hidden");
      cartConfig.toggleAttribute("hidden", !nextOpen);
      cartToggle.setAttribute("aria-expanded", String(nextOpen));
      cartToggle.textContent = nextOpen ? "收起配置" : "修改配置";
    });
  }

  document.querySelectorAll(".btn, .quick-item, .choice-card, .segment, .tab-item, .feature-card, .coupon-card, .download-card, .activity-card, .sample-package, .round-action, .step-card, .gift-tab, .series-card, .catalog-product-link, .catalog-product-action, .decision-card, .budget-row, .festival-card, .fragrance-pill, .config-toggle, .filter-chip").forEach((item) => {
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
      result.textContent = cost > 0 && retail > 0 && margin > 0 ? "¥" + margin.toFixed(0) : "申请后确认";
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
  updateCartBadges();
})();
