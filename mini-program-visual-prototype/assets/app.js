(function () {
  const page = document.body.dataset.page;
  const toast = document.querySelector("[data-toast-host]");
  const CART_KEY = "waxAtelierCartCount";
  const CART_ITEMS_KEY = "waxAtelierCartItems";
  const LANG_KEY = "waxAtelierLang";
  const ADDRESS_DEFAULT_KEY = "waxAtelierDefaultAddress";
  const ADDRESS_CART_KEY = "waxAtelierCartAddress";

  const translations = [
    ["首页", "Home"],
    ["送礼", "Gift"],
    ["商品", "Products"],
    ["购物车", "Cart"],
    ["我的", "Account"],
    ["香薰雕刻蜡烛", "Carved Scented Candles"],
    ["微信胶囊按钮", "WeChat capsule controls"],
    ["返回首页", "Back to home"],
    ["全部商品", "All Products"],
    ["进阶 · 匠作 · 节日", "Advanced · Artisan · Festival"],
    ["商品系列", "Product Series"],
    ["进阶系列", "Advanced"],
    ["匠作系列", "Artisan"],
    ["节日系列", "Festival"],
    ["进阶", "Advanced"],
    ["匠作", "Artisan"],
    ["节日", "Festival"],
    ["精品包装", "Premium wrap"],
    ["礼盒包装", "Gift box"],
    ["包装手选", "Choose wrap"],
    ["全部", "All"],
    ["春节", "Spring Festival"],
    ["元宵", "Lantern Festival"],
    ["母亲节/女神节", "Mother's/Women's Day"],
    ["520/七夕", "520/Qixi"],
    ["端午", "Dragon Boat"],
    ["中秋", "Mid-Autumn"],
    ["教师节", "Teacher's Day"],
    ["圣诞/年末", "Christmas/Year-end"],
    ["生日答谢", "Birthday/Thanks"],
    ["乔迁日常", "Housewarming/Daily"],
    ["浅色系", "Light tones"],
    ["深色系", "Deep tones"],
    ["可升礼盒", "Gift-box upgrade"],
    ["重要关系", "Important ties"],
    ["高端陈列", "Premium display"],
    ["礼盒默认", "Gift box default"],
    ["暖色系", "Warm tones"],
    ["冷色系", "Cool tones"],
    ["本周热卖", "This Week's Picks"],
    ["查看全部", "View all"],
    ["定制蜡烛", "Custom Candle"],
    ["定制色系、香型和贺卡内容。", "Customize color palette, scent and greeting card."],
    ["去配置", "Configure"],
    ["婚礼批采", "Wedding Bulk"],
    ["桌礼、伴手礼和迎宾区方案。", "Table gifts, favors and welcome-area plans."],
    ["看方案", "View plan"],
    ["搭配推荐", "Gift Match"],
    ["根据需求给 3 款推荐。", "Three picks from your brief."],
    ["推荐", "Picks"],
    ["未来页面入口", "Future entries"],
    ["进阶场景", "Advanced Scenarios"],
    ["零售价待确认", "Retail price pending"],
    ["阶梯价 ¥268 起", "Tiered from ¥268"],
    ["阶梯价 ¥498 起", "Tiered from ¥498"],
    ["阶梯价 ¥328 起", "Tiered from ¥328"],
    ["阶梯价格", "Tiered pricing"],
    ["同系列累计数量越多，单件价越低。", "The more you add in the same series, the lower the unit price."],
    ["当前阶梯价", "Current tier price"],
    ["再加 2 件进入 3 件档，单件 ¥248。", "Add 2 more to reach the 3-piece tier at ¥248 each."],
    ["继续加购可进入下一档。", "Add more to reach the next tier."],
    ["已是当前最高优惠档。", "Current best tier reached."],
    ["商品详情", "Product Details"],
    ["下单前检查配置", "Review before checkout"],
    ["M 号", "Size M"],
    ["莓果洛可可 · 手工雕刻香薰蜡烛", "Berry Rococo · Hand-carved Scented Candle"],
    ["M · 约 7 x 10 cm", "M · approx. 7 x 10 cm"],
    ["玫瑰木：红莓 / 玫瑰木 / 琥珀", "Rosewood: red berries / rosewood / amber"],
    ["经典卷边 · 礼盒包装 +20 · 空白贺卡", "Classic curl · gift box +20 · blank card"],
    ["修改配置", "Edit options"],
    ["收起配置", "Collapse options"],
    ["价格待确认", "Price pending"],
    ["尺寸", "Size"],
    ["香型", "Scent"],
    ["玫瑰木", "Rosewood"],
    ["白茶", "White Tea"],
    ["无香陈列", "Unscented Display"],
    ["当前香调：前调红莓，中调玫瑰木，后调琥珀。完整香调只在修改配置时展开。", "Current notes: red berries, rosewood and amber. Full notes appear when editing options."],
    ["雕花", "Carving"],
    ["经典卷边", "Classic Curl"],
    ["花瓣层叠", "Layered Petals"],
    ["宫廷褶皱", "Palace Pleats"],
    ["包装", "Packaging"],
    ["进阶默认，补差 ¥0。", "Advanced default, no surcharge."],
    ["当前选择，额外 +20。", "Selected, extra +20."],
    ["配送与售后", "Delivery & After-sales"],
    ["收货地址", "Shipping Address"],
    ["请选择收货地址", "Select a shipping address"],
    ["管理", "Manage"],
    ["更换", "Change"],
    ["使用此地址", "Use this address"],
    ["默认地址", "Default"],
    ["设为默认", "Set default"],
    ["编辑", "Edit"],
    ["地址管理", "Address Book"],
    ["地址管理 · 香薰雕刻蜡烛", "Address Book · Carved Scented Candles"],
    ["多地址 · 默认地址", "Multiple addresses · Default"],
    ["返回我的", "Back to account"],
    ["新增地址", "Add address"],
    ["默认地址已更新", "Default address updated"],
    ["已选择收货地址", "Shipping address selected"],
    ["新增地址为静态入口，后续接入真实表单", "Add address is a static entry; real form comes later"],
    ["编辑地址为静态入口，后续接入真实表单", "Edit address is a static entry; real form comes later"],
    ["地址管理页面视觉稿", "Address book prototype"],
    ["默认地址、多地址", "Default, multi-address"],
    ["预计 48 小时内发货。雕刻卷边为易损细节，默认加固包装；签收后如发现运输损坏，可联系客服处理。", "Ships within 48 hours. Delicate carved edges are packed with extra protection; contact support if transit damage is found after delivery."],
    ["发往中国内地以外", "Ship outside Chinese mainland"],
    ["默认不选；如需跨境配送，请选择配送目的地。", "Off by default. Select a destination for cross-border delivery."],
    ["配送目的地", "Delivery destination"],
    ["搜索国家或地区", "Search country or region"],
    ["请选择配送目的地", "Select delivery destination"],
    ["未选择配送目的地", "No delivery destination selected"],
    ["已选择配送目的地：", "Selected destination: "],
    ["无匹配目的地", "No matching destination"],
    ["港澳台地区", "Hong Kong, Macao & Taiwan"],
    ["亚洲", "Asia"],
    ["欧洲", "Europe"],
    ["北美与大洋洲", "North America & Oceania"],
    ["订单金额", "Order Summary"],
    ["商品小计", "Product subtotal"],
    ["待确认", "Pending"],
    ["礼盒升级", "Gift box upgrade"],
    ["运费", "Shipping"],
    ["应付合计", "Total due"],
    ["提交确认", "Submit for confirmation"],
    ["已提交确认，稍后核对价格", "Submitted. Price will be checked later."],
    ["我的 · 香薰雕刻蜡烛", "Account · Carved Scented Candles"],
    ["订单 · 会员 · 售后", "Orders · Member · Support"],
    ["礼盒会员", "Gift-box Member"],
    ["零售买家 · 复购权益已开启", "Retail buyer · repurchase benefits active"],
    ["会员中心", "Member Center"],
    ["会员积分", "Points"],
    ["积分", "Points"],
    ["复购券", "Coupons"],
    ["券", "Coupons"],
    ["待发货", "To ship"],
    ["订单状态", "Order Status"],
    ["查看订单", "View orders"],
    ["待付款", "To pay"],
    ["已完成", "Completed"],
    ["售后", "After-sales"],
    ["近期订单", "Recent Order"],
    ["莓果洛可可 · 中号", "Berry Rococo · Medium"],
    ["预计 48 小时内发货，默认防损包装。", "Ships within 48 hours with protective packing."],
    ["功能区", "Tools"],
    ["渠道与服务", "Channel & Service"],
    ["申请批发身份", "Apply for wholesale"],
    ["查看渠道报价", "View channel quote"],
    ["进入拿样、报价和素材支持流程。", "Enter sample, quotation and asset support flows."],
    ["拿样、报价、素材", "Samples, quotes, assets"],
    ["拿样包", "Sample Kit"],
    ["先试卖，再确认进货方向。", "Test-sell first, then confirm buying direction."],
    ["先试卖再进货", "Test before buying"],
    ["渠道报价", "Channel Quote"],
    ["申请后查看渠道价和起订规则。", "View channel pricing and MOQ rules after approval."],
    ["申请后查看规则", "View after approval"],
    ["素材下载", "Assets"],
    ["商品图、文案和海报素材。", "Product images, copy and poster assets."],
    ["图片、文案、海报", "Images, copy, posters"],
    ["申请后开放", "Apply to unlock"],
    ["可用券、领券", "Available coupons, claim more"],
    ["发票管理", "Invoices"],
    ["抬头、记录", "Titles, records"],
    ["政策协议", "Policies"],
    ["购买、隐私", "Purchase, privacy"],
    ["发票管理 · 香薰雕刻蜡烛", "Invoices · Carved Scented Candles"],
    ["抬头 · 记录 · 说明", "Titles · Records · Notes"],
    ["常用抬头", "Saved invoice titles"],
    ["新增抬头", "Add title"],
    ["开票记录", "Invoice records"],
    ["开票说明", "Invoice notes"],
    ["政策协议 · 香薰雕刻蜡烛", "Policies · Carved Scented Candles"],
    ["购买 · 售后 · 隐私", "Purchase · After-sales · Privacy"],
    ["购买须知", "Purchase notes"],
    ["售后说明", "After-sales notes"],
    ["隐私协议", "Privacy policy"],
    ["渠道申请说明", "Channel application notes"],
    ["积分商城", "Points shop"],
    ["余额 · 明细 · 商城", "Balance · History · Shop"],
    ["当前积分", "Current points"],
    ["本月累计", "Earned this month"],
    ["本月使用", "Used this month"],
    ["积分累计", "Points earned"],
    ["积分消费", "Points spent"],
    ["进入积分商城", "Enter points shop"],
    ["渠道素材已开放", "Channel assets unlocked"],
    ["门店陈列", "Store Display"],
    ["按面积和预算规划上架。", "Plan display by area and budget."],
    ["上架方案", "Display plan"],
    ["客服售后", "Support"],
    ["订单、破损和包装问题入口。", "Orders, damage and packaging support."],
    ["订单与破损处理", "Orders and damage"],
    ["已通过渠道身份，可直接查看报价规则", "Wholesale access approved. View quote rules directly"],
    ["返回购物车", "Back to cart"],
    ["继续下单", "Continue checkout"],
    ["已加入购物车，可继续挑选其他商品", "Added to cart. You can keep browsing."],
    ["选择包装", "Choose packaging"],
    ["加入购物车", "Add to cart"],
    ["顾问确认", "Confirm later"],
    ["询", "Ask"],
    ["当前：", "Current: "],
    ["当前：M · 约 7 x 10 cm", "Current: M · approx. 7 x 10 cm"],
    ["轻量小礼，适合答谢和小件心意。", "A light gift for thanks and small gestures."],
    ["推荐送礼，适合生日、答谢和常规礼品场景。", "Recommended for birthdays, thanks and everyday gifting."],
    ["陈列更稳，适合乔迁、长辈和重要关系。", "More stable for display, housewarming, elders and important ties."],
    ["空间礼，适合高端陈列或多件组合。", "A space gift for premium display or multi-piece sets."],
    ["，补差 ¥", ", surcharge ¥"],
    ["系列：", "Series: "],
    ["颜色：", "Color: "],
    ["销售：零售可购", "Sale: retail available"],
    ["前调", "Top"],
    ["中调", "Heart"],
    ["后调", "Base"],
    ["无香说明", "Unscented note"],
    ["不添加香精，不干扰空间气味，适合敏感人群或商业陈列。", "No fragrance is added, so it will not interfere with room scent and suits sensitive users or commercial display."],
    ["适合生日、感谢和纪念日礼。", "Good for birthday, thanks and anniversaries."],
    ["先选择预算区间。确认金额后，再给出对应款式、尺寸、包装和下一步建议。", "Choose a budget first. After confirming the range, we suggest products, size, packaging and next steps."],
    ["自定义预算", "Custom budget"],
    ["输入大致范围后再推荐。", "Enter a rough range before recommendations."],
    ["最低预算", "Minimum budget"],
    ["最高预算", "Maximum budget"],
    ["例如 200", "e.g. 200"],
    ["例如 500", "e.g. 500"],
    ["查看推荐", "View recommendations"],
    ["当前预算", "Current budget"],
    ["修改", "Edit"],
    ["预算 · 场景 · 节日", "Budget · Occasion · Festival"],
    ["预算", "Budget"],
    ["不限", "Any"],
    ["¥199 内", "Under ¥199"],
    ["¥200-399", "¥200-399"],
    ["¥400-699", "¥400-699"],
    ["¥700+", "¥700+"],
    ["场景", "Occasion"],
    ["重要关系", "Important"],
    ["企业节点", "Business"],
    ["推荐商品", "Recommended"],
    ["默认按热度排序，筛选后只保留相关款式。", "Sorted by popularity; filters move matching items up."],
    ["自定义", "Custom"],
    ["拖动区间后刷新推荐", "Drag the range to refresh picks"],
    ["应用预算", "Apply budget"],
    ["关闭预算选择", "Close budget picker"],
    ["关闭", "Close"],
    ["送礼条件", "Gift Conditions"],
    ["选几项就能看结果", "Pick a few items to see results"],
    ["已选条件", "Selected"],
    ["选好条件后显示推荐", "Recommendations appear after selection"],
    ["先不用写很长，几个关键词就够。", "A few keywords are enough."],
    ["可直接加购", "Can add directly"],
    ["第一推荐", "Top pick"],
    ["第二推荐", "Second pick"],
    ["第三推荐", "Third pick"],
    ["去结算", "Checkout"],
    ["填写送礼需求", "Fill in gifting needs"],
    ["先给几个关键词，再生成推荐", "Add a few cues before generating picks"],
    ["收礼关系", "Recipient relation"],
    ["朋友", "Friend"],
    ["同事", "Colleague"],
    ["长辈", "Elder"],
    ["客户", "Client"],
    ["请选择", "Select"],
    ["偏好 / 避雷", "Preferences / avoid"],
    ["例如：送给女性朋友，生日礼物，喜欢红色但不要太张扬。", "e.g. A birthday gift for a female friend; she likes red but not too bold."],
    ["例如：偏浅色、不要太甜、希望带贺卡", "e.g. light tones, not too sweet, include a card"],
    ["填写需求后生成 3 款推荐", "Fill in needs to generate 3 picks"],
    ["推荐会按预算、关系、场景和色系偏好展开，结果仍由顾问确认。", "Recommendations will use budget, relation, occasion and color preferences; a consultant still confirms the result."],
    ["先选使用场景，再填写数量、预算和日期。批量价格由顾问按数量、包装和交期确认。", "Choose the wedding use case first, then add quantity, budget and date. Bulk pricing is confirmed by quantity, packaging and lead time."],
    ["可多选使用场景，再填写数量、预算和日期。价格按数量、包装和交期确认。", "Select one or more uses, then add quantity, budget and date. Pricing is confirmed by quantity, packaging and lead time."],
    ["查看购物车", "View cart"],
    ["已提交采购需求", "Purchase request submitted"],
    ["先收集色系、香型和贺卡语气，不直接承诺生产周期和价格，最终由顾问确认可行性。", "Collect color, scent and card tone first. Production timing and price are confirmed by a consultant."],
    ["先选色系，再选香型，最后写贺卡和日期。提交后由顾问确认细节和交期。", "Choose colors, then scent, then card and date. A consultant confirms details and timing."],
    ["选色系", "Choose colors"],
    ["选香型", "Choose scent"],
    ["参考预算。具体价格按尺寸、色层、包装和交期确认。", "Reference budget. Final price depends on size, color layers, packaging and timing."],
    ["先看推荐", "See picks first"],
    ["已提交定制需求", "Custom request submitted"],
    ["象牙花冠", "Ivory Corolla"],
    ["森林松绿", "Forest Pine"],
    ["玫瑰粉雾", "Rose Mist"],
    ["奶油浮雕", "Cream Relief"],
    ["雾蓝花瓣", "Mist Blue Petals"],
    ["胭脂珊瑚", "Rouge Coral"],
    ["莓红鎏金", "Berry Gilt"],
    ["雾蓝花冠", "Mist Blue Corolla"],
    ["香槟金雕", "Champagne Gold"],
    ["深梅礼烛", "Deep Plum Gift"],
    ["宫廷红白", "Palace Red White"],
    ["祖母绿金", "Emerald Gold"],
    ["暖金节庆", "Warm Gold Festival"],
    ["红白限定", "Red White Limited"],
    ["团圆组合", "Reunion Set"],
    ["粉白纪念", "Pink White Keepsake"],
    ["生日答谢 · 精品包装", "Birthday/thanks · premium wrap"],
    ["乔迁日常 · 精品包装", "Housewarming/daily · premium wrap"],
    ["浅色系 · 可升礼盒", "Light tones · gift-box upgrade"],
    ["日常节日 · 精品包装", "Daily festivals · premium wrap"],
    ["冷色系 · 可升礼盒", "Cool tones · gift-box upgrade"],
    ["重要关系 · 礼盒默认", "Important ties · gift box default"],
    ["高端陈列 · 礼盒默认", "Premium display · gift box default"],
    ["暖色系 · 礼盒默认", "Warm tones · gift box default"],
    ["春节 · 包装手选", "Spring Festival · choose wrap"],
    ["520/七夕 · 包装手选", "520/Qixi · choose wrap"],
    ["中秋 · 包装手选", "Mid-Autumn · choose wrap"],
    ["母亲节/女神节 · 包装手选", "Mother's/Women's Day · choose wrap"],
    ["圣诞/年末 · 包装手选", "Christmas/year-end · choose wrap"],
    ["进阶系列适合生日、感谢和日常节日送礼。默认精品包装，可按关系升级礼盒。", "The Advanced series suits birthdays, thanks and everyday gifting. Premium wrap is default, with gift-box upgrade available."],
    ["匠作系列颜色和香型更完整，默认礼盒包装，适合重要关系、高端陈列和空间礼。", "The Artisan series offers richer colors and scents, with gift box by default for important relationships, premium display and space gifts."],
    ["节日系列按节点维护商品标签，包装需手动选择，适合春节、中秋、纪念日和年末礼。", "The Festival series is tagged by occasion and requires manual packaging selection, suitable for Spring Festival, Mid-Autumn, anniversaries and year-end gifts."],
    ["进阶系列 3 选 1", "Advanced series: choose 1 of 3"],
    ["匠作系列 10 选 1", "Artisan series: choose 1 of 10"],
    ["节日系列 3 选 1", "Festival series: choose 1 of 3"],
    ["选择雕花款式", "Choose carving style"],
    ["当前：经典卷边", "Current: Classic Curl"],
    ["稳妥礼品", "Safe gifting"],
    ["柔和仪式", "Soft ceremony"],
    ["陈列感强", "Display impact"],
    ["层次稳妥，适合大多数礼品场景。", "Layered and safe for most gifting occasions."],
    ["更柔和，适合生日和婚礼氛围。", "Softer, suitable for birthdays and weddings."],
    ["视觉更强，适合陈列和高端礼盒。", "Stronger visual impact for display and premium gift boxes."],
    ["白花麝香", "White Floral Musk"],
    ["晚香玉", "Tuberose"],
    ["雪松琥珀", "Cedar Amber"],
    ["檀木", "Sandalwood"],
    ["乌木烟熏", "Smoked Oud"],
    ["莓果", "Berry"],
    ["柑橘橙花", "Citrus Neroli"],
    ["花木调 · 中等扩香", "Floral woody · medium diffusion"],
    ["茶香调 · 轻扩香", "Tea note · light diffusion"],
    ["无香 · 适合陈列", "Unscented · display-friendly"],
    ["跨境配送费待确认", "Cross-border shipping pending"],
    ["已选择配送目的地：", "Selected destination: "],
    ["无匹配目的地", "No matching destination"],
    ["港澳台地区", "Hong Kong, Macao & Taiwan"],
    ["亚洲国家/地区", "Asia"],
    ["欧洲国家/地区", "Europe"],
    ["北美与大洋洲国家/地区", "North America & Oceania"],
    ["中国香港特别行政区", "Hong Kong SAR, China"],
    ["中国澳门特别行政区", "Macao SAR, China"],
    ["台湾地区", "Taiwan region"],
    ["日本", "Japan"],
    ["韩国", "South Korea"],
    ["新加坡", "Singapore"],
    ["马来西亚", "Malaysia"],
    ["泰国", "Thailand"],
    ["越南", "Vietnam"],
    ["印度尼西亚", "Indonesia"],
    ["菲律宾", "Philippines"],
    ["德国", "Germany"],
    ["法国", "France"],
    ["英国", "United Kingdom"],
    ["意大利", "Italy"],
    ["西班牙", "Spain"],
    ["荷兰", "Netherlands"],
    ["瑞士", "Switzerland"],
    ["瑞典", "Sweden"],
    ["美国", "United States"],
    ["加拿大", "Canada"],
    ["澳大利亚", "Australia"],
    ["新西兰", "New Zealand"]
  ];
  const zhToEn = new Map(translations);
  const enToZh = new Map(translations.map(([zh, en]) => [en, zh]));
  const textOriginals = new WeakMap();
  const currentLang = () => window.localStorage.getItem(LANG_KEY) === "en" ? "en" : "zh-CN";
  const translateString = (value, lang) => {
    if (!value) return value;
    const targetLang = lang || currentLang();
    const trimmed = String(value).trim();
    const next = targetLang === "en" ? zhToEn.get(trimmed) : enToZh.get(trimmed);
    return next ? String(value).replace(trimmed, next) : value;
  };
  const applyLanguage = (root) => {
    const lang = currentLang();
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
      button.textContent = lang === "en" ? "中" : "EN";
      button.setAttribute("aria-label", lang === "en" ? "Switch to Chinese" : "切换到英文");
    });
    document.title = translateString(document.title, lang);
    const scope = root || document.body;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || /^(SCRIPT|STYLE|SVG|PATH|INPUT|TEXTAREA)$/i.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return /[\u4e00-\u9fff]|[A-Za-z]/.test(node.nodeValue || "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (!textOriginals.has(node)) textOriginals.set(node, node.nodeValue);
      const original = textOriginals.get(node);
      const next = lang === "en" ? translateString(original, lang) : original;
      if (next !== node.nodeValue) node.nodeValue = next;
    });
    scope.querySelectorAll("[alt], [aria-label], [title], [placeholder], [data-toast]").forEach((node) => {
      ["alt", "aria-label", "title", "placeholder", "data-toast"].forEach((attr) => {
        if (!node.hasAttribute(attr)) return;
        const key = "i18nOriginal" + attr.replace(/(^|-)([a-z])/g, (_, _sep, letter) => letter.toUpperCase());
        if (!node.dataset[key]) node.dataset[key] = node.getAttribute(attr);
        const value = node.dataset[key];
        const next = lang === "en" ? translateString(value, lang) : value;
        if (next !== node.getAttribute(attr)) node.setAttribute(attr, next);
      });
    });
  };

  const initLanguageControls = () => {
    document.querySelectorAll(".wx-header").forEach((header) => {
      if (header.querySelector("[data-lang-toggle]")) return;
      const capsule = header.querySelector(".capsule");
      if (!capsule) return;
      const tools = document.createElement("div");
      tools.className = "header-tools";
      const toggle = document.createElement("button");
      toggle.className = "language-toggle";
      toggle.type = "button";
      toggle.dataset.langToggle = "";
      header.insertBefore(tools, capsule);
      tools.append(toggle, capsule);
    });
    const overview = document.querySelector(".prototype-page.overview");
    if (overview && !overview.querySelector("[data-lang-toggle]")) {
      const toggle = document.createElement("button");
      toggle.className = "language-toggle overview-language-toggle";
      toggle.type = "button";
      toggle.dataset.langToggle = "";
      overview.prepend(toggle);
    }
    document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        window.localStorage.setItem(LANG_KEY, currentLang() === "en" ? "zh-CN" : "en");
        if (window.__renderHomeHot) window.__renderHomeHot();
        if (window.__renderDestinations) window.__renderDestinations();
        if (window.__renderAddresses) window.__renderAddresses();
        if (window.__renderCartAddress) window.__renderCartAddress();
        if (window.__renderSizeSummary) window.__renderSizeSummary();
        if (window.__renderGiftResults) window.__renderGiftResults();
        if (window.__renderCartItems) window.__renderCartItems();
        applyLanguage();
      });
    });
  };

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = translateString(message || "已记录");
    toast.classList.add("show");
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  };

  const cartCount = () => Number(window.sessionStorage.getItem(CART_KEY) || 0);
  const defaultCartItem = () => ({
    code: "AD-07",
    series: "advanced",
    seriesLabel: "进阶",
    name: "莓果洛可可",
    title: "莓果洛可可 · 手工雕刻香薰蜡烛",
    image: "assets/detail/detail-hero.png",
    size: "M · 约 7 x 10 cm",
    scent: "玫瑰木：红莓 / 玫瑰木 / 琥珀",
    carving: "经典卷边",
    packaging: "礼盒包装 +20",
    extra: "空白贺卡",
    price: 268,
    qty: 1,
  });
  const cartItemFromElement = (element) => {
    const card = element ? element.closest("article, .catalog-product-card, .gift-result-card, .ai-result") : null;
    const image = element?.dataset.cartImage || card?.querySelector("img")?.getAttribute("src") || defaultCartItem().image;
    const heading = card?.querySelector("h3")?.textContent?.trim() || element?.dataset.cartTitle || defaultCartItem().title;
    const titleParts = heading.split("·").map((part) => part.trim()).filter(Boolean);
    const code = element?.dataset.cartCode || titleParts[0] || defaultCartItem().code;
    const name = element?.dataset.cartName || titleParts[1] || titleParts[0] || defaultCartItem().name;
    const priceText = card?.querySelector(".price-line")?.textContent || "";
    const priceMatch = priceText.match(/¥\s*(\d+)|楼\s*(\d+)/);
    const price = Number(element?.dataset.cartPrice || priceMatch?.[1] || priceMatch?.[2] || defaultCartItem().price);
    return {
      code,
      series: element?.dataset.cartSeries || element?.dataset.seriesKey || "advanced",
      seriesLabel: element?.dataset.cartSeriesLabel || "推荐",
      name,
      title: element?.dataset.cartTitle || heading,
      image,
      size: element?.dataset.cartSize || "M · 约 7 x 10 cm",
      scent: element?.dataset.cartScent || "玫瑰木：红莓 / 玫瑰木 / 琥珀",
      carving: element?.dataset.cartCarving || "经典卷边",
      packaging: element?.dataset.cartPackaging || "精品包装",
      extra: element?.dataset.cartExtra || "空白贺卡",
      price,
      qty: 1,
    };
  };
  const cartItems = () => {
    try {
      const items = JSON.parse(window.sessionStorage.getItem(CART_ITEMS_KEY) || "[]");
      return Array.isArray(items) ? items.filter(Boolean) : [];
    } catch (error) {
      return [];
    }
  };
  const setCartItems = (items) => {
    const nextItems = Array.isArray(items) ? items : [];
    window.sessionStorage.setItem(CART_ITEMS_KEY, JSON.stringify(nextItems));
    const count = nextItems.reduce((sum, item) => sum + Number(item.qty || 0), 0);
    window.sessionStorage.setItem(CART_KEY, String(Math.max(0, count)));
    updateCartBadges();
    if (window.__renderCartItems) window.__renderCartItems();
  };
  const setCartCount = (count) => {
    window.sessionStorage.setItem(CART_KEY, String(Math.max(0, count)));
    updateCartBadges();
  };
  const addCartItem = (item) => {
    const nextItem = Object.assign(defaultCartItem(), item || {});
    const items = cartItems();
    if (!items.length && cartCount() > 0) {
      const seed = defaultCartItem();
      seed.qty = cartCount();
      items.push(seed);
    }
    const key = [nextItem.series, nextItem.code, nextItem.name, nextItem.packaging].join("|");
    const existing = items.find((entry) => [entry.series, entry.code, entry.name, entry.packaging].join("|") === key);
    if (existing) {
      existing.qty = Number(existing.qty || 1) + 1;
    } else {
      items.push(nextItem);
    }
    setCartItems(items);
  };

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

  const sizeSelector = document.querySelector("[data-size-selector]");
  const sizeSummary = document.querySelector("[data-size-summary]");
  const renderSizeSummary = () => {
    if (!sizeSelector || !sizeSummary) return;
    const selected = sizeSelector.querySelector("[data-choice][aria-pressed='true']");
    if (!selected) return;
    const name = selected.dataset.sizeName || selected.querySelector("strong")?.textContent || "";
    const measure = selected.dataset.sizeMeasure || selected.querySelector("span")?.textContent || "";
    const lang = currentLang();
    const normalizedMeasure = lang === "en" ? String(measure).replace("约 ", "approx. ") : measure;
    sizeSummary.textContent = (lang === "en" ? "Current: " : "当前：") + name + " · " + normalizedMeasure;
  };
  if (sizeSelector && sizeSummary) {
    window.__renderSizeSummary = renderSizeSummary;
    sizeSelector.addEventListener("click", renderSizeSummary);
    renderSizeSummary();
  }

  const homeHotProducts = {
    advanced: [
      ["AD-01", "象牙花冠", "生日答谢 · 精品包装", "assets/catalog/advanced-01.png"],
      ["AD-02", "森林松绿", "乔迁日常 · 精品包装", "assets/catalog/advanced-02.png"],
      ["AD-03", "玫瑰粉雾", "浅色系 · 可升礼盒", "assets/catalog/advanced-03.png"],
      ["AD-04", "奶油浮雕", "日常节日 · 精品包装", "assets/catalog/advanced-04.png"],
      ["AD-05", "雾蓝花瓣", "冷色系 · 可升礼盒", "assets/catalog/advanced-05.png"]
    ],
    artisan: [
      ["AR-01", "莓红鎏金", "重要关系 · 礼盒默认", "assets/catalog/artisan-01.png"],
      ["AR-02", "雾蓝花冠", "高端陈列 · 礼盒默认", "assets/catalog/artisan-02.png"],
      ["AR-03", "香槟金雕", "暖色系 · 礼盒默认", "assets/catalog/artisan-03.png"],
      ["AR-04", "深梅礼烛", "重要关系 · 礼盒默认", "assets/catalog/artisan-04.png"],
      ["AR-05", "宫廷红白", "高端陈列 · 礼盒默认", "assets/catalog/artisan-05.png"]
    ],
    festival: [
      ["FS-01", "暖金节庆", "春节 · 包装手选", "assets/catalog/festival-01.png"],
      ["FS-02", "红白限定", "520/七夕 · 包装手选", "assets/catalog/festival-02.png"],
      ["FS-03", "团圆组合", "中秋 · 包装手选", "assets/catalog/festival-03.png"],
      ["FS-04", "粉白纪念", "母亲节/女神节 · 包装手选", "assets/catalog/festival-04.png"],
      ["FS-05", "暖金节庆", "圣诞/年末 · 包装手选", "assets/catalog/festival-01.png"]
    ]
  };

  const hotTabs = Array.from(document.querySelectorAll("[data-hot-tab]"));
  const hotGrid = document.querySelector("[data-hot-products]");
  const hotAll = document.querySelector("[data-hot-all]");
  let activeHotSeries = "advanced";
  const renderHomeHot = () => {
    if (!hotGrid) return;
    const lang = currentLang();
    hotTabs.forEach((tab) => {
      const active = tab.dataset.hotTab === activeHotSeries;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    if (hotAll) hotAll.href = "catalog.html#" + activeHotSeries;
    hotGrid.innerHTML = "";
    (homeHotProducts[activeHotSeries] || []).forEach((item) => {
      const [code, name, meta, image] = item;
      const href = "product.html?series=" + encodeURIComponent(activeHotSeries) + "&code=" + encodeURIComponent(code);
      const card = document.createElement("a");
      card.className = "product-card";
      card.href = href;
      card.innerHTML = '<div class="product-media photo-media"><img src="' + image + '" alt="' + name + '"></div>' +
        '<div class="product-body"><h3 class="product-name">' + code + ' · ' + name + '</h3>' +
        '<p class="product-desc">' + meta + '</p><div class="price-line">零售价待确认</div></div>';
      hotGrid.append(card);
    });
    applyLanguage(hotGrid);
    if (hotAll) hotAll.textContent = translateString(currentLang() === "en" ? "View all" : "查看全部", lang);
  };
  if (hotTabs.length && hotGrid) {
    window.__renderHomeHot = renderHomeHot;
    hotTabs.forEach((tab) => tab.addEventListener("click", () => {
      activeHotSeries = tab.dataset.hotTab || "advanced";
      renderHomeHot();
    }));
    renderHomeHot();
  }

  const giftHub = document.querySelector("[data-gift-hub]");
  if (giftHub) {
    const giftResults = giftHub.querySelector("[data-gift-results]");
    const giftCount = giftHub.querySelector("[data-gift-result-count]");
    const rangeSheet = document.querySelector("[data-gift-range-sheet]");
    const rangeMin = document.querySelector("[data-gift-range-min]");
    const rangeMax = document.querySelector("[data-gift-range-max]");
    const rangeLabel = document.querySelector("[data-gift-range-label]");
    const state = { budget: "all", scene: "all", festival: "all" };
    const giftProducts = [
      {
        code: "AD-01",
        name: "象牙花冠",
        title: "象牙花冠 · 进阶礼品款",
        meta: "生日答谢 · 精品包装",
        image: "assets/catalog/advanced-01.png",
        series: "advanced",
        seriesLabel: "进阶",
        budget: ["under199", "mid399"],
        scene: ["birthday"],
        festival: ["all"],
        heat: 98,
        price: 268,
      },
      {
        code: "AD-02",
        name: "森林松绿",
        title: "森林松绿 · 日常陈列款",
        meta: "乔迁日常 · 精品包装",
        image: "assets/catalog/advanced-02.png",
        series: "advanced",
        seriesLabel: "进阶",
        budget: ["mid399", "high699"],
        scene: ["housewarming"],
        festival: ["yearend"],
        heat: 94,
        price: 268,
      },
      {
        code: "AR-01",
        name: "莓红鎏金",
        title: "莓红鎏金 · 匠作礼盒",
        meta: "重要关系 · 礼盒默认",
        image: "assets/catalog/artisan-01.png",
        series: "artisan",
        seriesLabel: "匠作",
        budget: ["high699", "over700"],
        scene: ["important", "business"],
        festival: ["spring", "romance"],
        heat: 92,
        price: 498,
      },
      {
        code: "FS-01",
        name: "暖金节庆",
        title: "暖金节庆 · 节日系列",
        meta: "春节中秋 · 包装手选",
        image: "assets/catalog/festival-01.png",
        series: "festival",
        seriesLabel: "节日",
        budget: ["mid399", "high699"],
        scene: ["business", "important"],
        festival: ["spring", "midautumn"],
        heat: 89,
        price: 328,
      },
      {
        code: "AR-02",
        name: "雾蓝花冠",
        title: "雾蓝花冠 · 空间礼盒",
        meta: "高端陈列 · 礼盒默认",
        image: "assets/catalog/artisan-02.png",
        series: "artisan",
        seriesLabel: "匠作",
        budget: ["high699", "over700"],
        scene: ["housewarming", "important"],
        festival: ["yearend"],
        heat: 86,
        price: 498,
      },
    ];
    const scoreGiftProduct = (item) => {
      let score = item.heat;
      if (state.budget !== "all") score += item.budget.includes(state.budget) ? 30 : -18;
      if (state.scene !== "all") score += item.scene.includes(state.scene) ? 30 : -18;
      if (state.festival !== "all") score += item.festival.includes(state.festival) ? 30 : -18;
      return score;
    };
    const setGiftFilter = (type, value, label) => {
      state[type] = value || "all";
      giftHub.querySelectorAll("[data-gift-filter='" + type + "']").forEach((button) => {
        const active = button.dataset.filterValue === state[type];
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      if (type === "budget" && label) {
        const custom = giftHub.querySelector("[data-gift-custom-budget]");
        if (custom) custom.textContent = label;
      }
      renderGiftResults();
    };
    const renderGiftResults = () => {
      if (!giftResults) return;
      const ranked = giftProducts
        .map((item) => Object.assign({ score: scoreGiftProduct(item) }, item))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      giftResults.innerHTML = "";
      ranked.forEach((item, index) => {
        const article = document.createElement("article");
        article.className = "gift-result-card";
        article.innerHTML =
          '<a class="gift-result-link" href="product.html?series=' + encodeURIComponent(item.series) + '&code=' + encodeURIComponent(item.code) + '">' +
          '<img src="' + item.image + '" alt="' + item.name + '雕刻蜡烛">' +
          '<span class="gift-result-body"><span class="gift-rank">TOP ' + (index + 1) + '</span>' +
          '<strong>' + item.code + ' · ' + item.name + '</strong>' +
          '<em>' + item.meta + '</em><b>阶梯价 ¥' + item.price + ' 起</b></span></a>' +
          '<button class="catalog-product-action gift-result-add" type="button" aria-label="加入购物车" data-gift-add data-cart-code="' + item.code + '" data-cart-series="' + item.series + '" data-cart-series-label="' + item.seriesLabel + '" data-cart-name="' + item.name + '" data-cart-title="' + item.title + '" data-cart-image="' + item.image + '" data-cart-size="S/M/L/XL" data-cart-scent="玫瑰木：红莓 / 玫瑰木 / 琥珀" data-cart-packaging="' + item.meta.split("·").pop().trim() + '" data-cart-price="' + item.price + '">+</button>';
        giftResults.append(article);
      });
      if (giftCount) giftCount.textContent = ranked.length + " 款";
      applyLanguage(giftResults);
    };
    window.__renderGiftResults = renderGiftResults;
    const normalizeRange = () => {
      if (!rangeMin || !rangeMax || !rangeLabel) return;
      let min = Number(rangeMin.value || 0);
      let max = Number(rangeMax.value || 0);
      if (min > max) {
        const swap = min;
        min = max;
        max = swap;
      }
      rangeLabel.textContent = "¥" + min + " - ¥" + max;
    };
    const rangeToBudget = () => {
      const max = Number(rangeMax ? rangeMax.value : 0);
      if (max <= 199) return "under199";
      if (max <= 399) return "mid399";
      if (max <= 699) return "high699";
      return "over700";
    };
    giftHub.addEventListener("click", (event) => {
      const customBudget = event.target.closest("[data-gift-custom-budget]");
      if (customBudget && rangeSheet) {
        rangeSheet.hidden = false;
        normalizeRange();
        return;
      }
      const filter = event.target.closest("[data-gift-filter]");
      if (filter) {
        setGiftFilter(filter.dataset.giftFilter, filter.dataset.filterValue);
      }
      const add = event.target.closest("[data-gift-add]");
      if (add) {
        event.preventDefault();
        addCartItem(cartItemFromElement(add));
        showToast("已加入购物车，可继续挑选其他商品");
      }
    });
    document.querySelectorAll("[data-gift-range-close]").forEach((button) => {
      button.addEventListener("click", () => {
        if (rangeSheet) rangeSheet.hidden = true;
      });
    });
    [rangeMin, rangeMax].forEach((range) => {
      if (range) range.addEventListener("input", normalizeRange);
    });
    document.querySelector("[data-gift-range-apply]")?.addEventListener("click", () => {
      normalizeRange();
      setGiftFilter("budget", rangeToBudget(), rangeLabel ? rangeLabel.textContent : "自定义");
      if (rangeSheet) rangeSheet.hidden = true;
    });
    const hash = window.location.hash.slice(1);
    if (hash === "budget") setGiftFilter("budget", "mid399");
    else if (hash === "festival") setGiftFilter("festival", "spring");
    else renderGiftResults();
  }

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
    const intro = document.querySelector("[data-budget-intro]");
    const initial = document.querySelector("[data-budget-initial]");
    const toolbar = document.querySelector("[data-budget-toolbar]");
    const current = document.querySelector("[data-budget-current]");
    const edit = document.querySelector("[data-budget-edit]");
    const customBox = document.querySelector("[data-custom-budget]");
    const minInput = document.querySelector("[data-budget-min]");
    const maxInput = document.querySelector("[data-budget-max]");
    const customConfirm = document.querySelector("[data-custom-budget-confirm]");
    const panels = Array.from(document.querySelectorAll("[data-budget-panel]"));
    const budgetLabels = {
      under199: "¥199 内",
      mid399: "¥200-399",
      high699: "¥400-699",
      over700: "¥700+",
      custom: "预算不确定",
    };
    const hideBudgetPanels = () => {
      panels.forEach((panel) => {
        panel.classList.remove("active");
      });
    };
    const setBudgetEditing = (editing) => {
      if (initial) initial.hidden = !editing;
      if (intro) intro.hidden = !editing;
      if (toolbar) toolbar.hidden = editing;
      if (editing) hideBudgetPanels();
    };
    const showBudgetPanel = (name, label) => {
      if (name === "range") {
        if (customBox) customBox.hidden = false;
        if (toolbar) toolbar.hidden = true;
        hideBudgetPanels();
        return;
      }
      const nextName = budgetLabels[name] ? name : "custom";
      if (customBox) customBox.hidden = true;
      if (current) current.textContent = label || budgetLabels[nextName];
      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.budgetPanel === nextName);
      });
      setBudgetEditing(false);
    };
    const budgetFromCustomRange = () => {
      const max = Number(maxInput ? maxInput.value : "");
      if (!max) return "custom";
      if (max <= 199) return "under199";
      if (max <= 399) return "mid399";
      if (max <= 699) return "high699";
      return "over700";
    };
    const customBudgetLabel = () => {
      const min = minInput ? minInput.value.trim() : "";
      const max = maxInput ? maxInput.value.trim() : "";
      if (min && max) return "¥" + min + "-" + max;
      if (max) return "¥" + max + " 内";
      return "预算不确定";
    };

    budgetPicker.addEventListener("click", (event) => {
      const target = event.target.closest("[data-budget-option]");
      if (target) showBudgetPanel(target.dataset.budgetOption, target.dataset.budgetLabel);
    });
    if (customConfirm) {
      customConfirm.addEventListener("click", () => {
        showBudgetPanel(budgetFromCustomRange(), customBudgetLabel());
      });
    }
    if (edit) {
      edit.addEventListener("click", () => {
        setBudgetEditing(true);
        if (customBox) customBox.hidden = true;
      });
    }
    setBudgetEditing(true);
  }

  const aiForm = document.querySelector("[data-ai-match-form]");
  if (aiForm) {
    const aiInputs = Array.from(aiForm.querySelectorAll("[data-ai-input]"));
    const aiChips = Array.from(aiForm.querySelectorAll("[data-ai-chip]"));
    const aiResults = Array.from(document.querySelectorAll("[data-ai-results]"));
    const aiEmpty = document.querySelector("[data-ai-empty]");
    const aiGenerate = document.querySelector("[data-ai-generate]");
    const aiFields = aiForm.querySelector("[data-ai-fields]");
    const aiSummary = aiForm.querySelector("[data-ai-summary]");
    const aiSummaryText = aiForm.querySelector("[data-ai-summary-text]");
    const aiEdit = aiForm.querySelector("[data-ai-edit]");
    let generated = false;
    const hasAiBrief = () => {
      const hasField = aiInputs.some((input) => input.value.trim().length > 0);
      const hasChip = aiChips.some((chip) => chip.getAttribute("aria-pressed") === "true");
      return hasField || hasChip;
    };
    const setAiResultsVisible = (visible) => {
      aiResults.forEach((section) => {
        section.hidden = !visible;
      });
      if (aiEmpty) aiEmpty.hidden = visible;
    };
    const renderAiSummary = () => {
      const relation = aiForm.querySelector("[data-ai-relation]")?.value || "关系未选";
      const budget = aiForm.querySelector("[data-ai-budget]")?.value || "预算未选";
      const occasions = aiChips
        .filter((chip) => chip.getAttribute("aria-pressed") === "true")
        .map((chip) => chip.textContent.trim())
        .join("、") || "场景未选";
      if (aiSummaryText) aiSummaryText.textContent = relation + " · " + budget + " · " + occasions;
    };
    const setAiEditing = (editing) => {
      aiForm.classList.toggle("is-collapsed", !editing);
      if (aiFields) aiFields.hidden = !editing;
      if (aiSummary) aiSummary.hidden = editing;
      if (editing) {
        generated = false;
        setAiResultsVisible(false);
      } else {
        renderAiSummary();
      }
    };
    const updateAiState = () => {
      const ready = hasAiBrief();
      if (aiGenerate) aiGenerate.disabled = !ready;
      if (!generated) setAiResultsVisible(false);
    };
    aiForm.addEventListener("input", updateAiState);
    aiForm.addEventListener("change", updateAiState);
    aiForm.addEventListener("click", () => {
      window.setTimeout(updateAiState, 0);
    });
    if (aiGenerate) {
      aiGenerate.addEventListener("click", () => {
        if (!hasAiBrief()) {
          updateAiState();
          return;
        }
        generated = true;
        setAiResultsVisible(true);
        setAiEditing(false);
        const firstResult = aiResults.find((section) => !section.hidden);
        if (firstResult) window.requestAnimationFrame(() => firstResult.scrollIntoView({ behavior: "smooth", block: "start" }));
      });
    }
    if (aiEdit) aiEdit.addEventListener("click", () => setAiEditing(true));
    updateAiState();
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
      action.dataset.cartCode = code;
      action.dataset.cartSeries = seriesKey;
      action.dataset.cartSeriesLabel = seriesName.replace("系列", "");
      action.dataset.cartName = tone;
      action.dataset.cartTitle = tone + " · " + seriesName + "雕刻香薰蜡烛";
      action.dataset.cartImage = image;
      action.dataset.cartSize = sizeLabel;
      action.dataset.cartScent = seriesKey === "festival" ? "节日香型：下单前确认" : "玫瑰木：红莓 / 玫瑰木 / 琥珀";
      action.dataset.cartPackaging = packageLabel;
      action.dataset.cartPrice = seriesKey === "artisan" ? "498" : (seriesKey === "festival" ? "328" : "268");

      card.append(link, action);
      fragment.append(card);
    }

    grid.append(fragment);
    grid.dataset.generated = "true";
  };

  document.querySelectorAll("[data-series-panel]").forEach(buildProductCards);

  const seriesCards = Array.from(document.querySelectorAll("[data-series-card]"));
  const seriesPanels = Array.from(document.querySelectorAll("[data-series-panel]"));
  const seriesTabs = document.querySelector("[data-series-tabs]");
  const catalogScroll = seriesTabs ? seriesTabs.closest(".screen-scroll") : null;
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

  const resetCatalogScroll = (behavior = "smooth") => {
    if (!catalogScroll) return;
    catalogScroll.scrollTo({ top: 0, behavior });
  };

  const activateSeries = (name, filter, shouldScroll, behavior = "smooth") => {
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
    if (shouldScroll) window.requestAnimationFrame(() => resetCatalogScroll(behavior));
  };

  const applyCatalogHash = () => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return activateSeries("advanced", "all", false);
    if (hash.startsWith("festival-")) return activateSeries("festival", hash.replace("festival-", ""), true, "auto");
    if (["advanced", "artisan", "festival"].includes(hash)) return activateSeries(hash, "all", true, "auto");
    return activateSeries("advanced", "all", false);
  };

  seriesCards.forEach((card) => {
    card.addEventListener("click", () => {
      activateSeries(card.dataset.seriesCard, "all", true);
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
        addCartItem(cartItemFromElement(button));
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

  const tierPrices = {
    advanced: {
      title: "阶梯价 ¥268 起",
      note: "同系列累计数量越多，单件价越低。",
      rows: [["1-2 件", "¥268 / 件"], ["3-5 件", "¥248 / 件"], ["6 件起", "¥228 / 件"]]
    },
    artisan: {
      title: "阶梯价 ¥498 起",
      note: "匠作系列默认礼盒包装，按数量进入阶梯价。",
      rows: [["1-2 件", "¥598 / 件"], ["3-5 件", "¥548 / 件"], ["6 件起", "¥498 / 件"]]
    },
    festival: {
      title: "阶梯价 ¥328 起",
      note: "节日系列需先确认包装，再按数量计算。",
      rows: [["1-2 件", "¥388 / 件"], ["3-5 件", "¥358 / 件"], ["6 件起", "¥328 / 件"]]
    }
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
    const tier = tierPrices[series] || tierPrices.advanced;
    const productPrice = document.querySelector("[data-product-price]");
    if (productPrice) productPrice.innerHTML = tier.title + " <small>按系列、尺寸和数量</small>";
    const tierNote = document.querySelector("[data-tier-note]");
    if (tierNote) tierNote.textContent = tier.note;
    const tierTable = document.querySelector("[data-tier-table]");
    if (tierTable) {
      tierTable.innerHTML = tier.rows.map((row) => "<div><span>" + row[0] + "</span><strong>" + row[1] + "</strong></div>").join("");
    }

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
        if (item[0].includes("无香")) button.dataset.fragranceMode = "unscented";
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
    const detail = root.querySelector("[data-fragrance-detail]");
    const unscented = button.dataset.fragranceMode === "unscented";
    if (detail) detail.hidden = unscented;
    if (unscented) return;
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

  const carvingSelector = document.querySelector("[data-carving-selector]");
  const carvingSummary = document.querySelector("[data-carving-summary]");
  const carvingPreview = document.querySelector("[data-carving-preview]");
  const carvingPreviewImage = document.querySelector("[data-carving-preview-image]");
  const carvingPreviewTitle = document.querySelector("[data-carving-preview-title]");
  const updateCarvingSummary = () => {
    if (!carvingSelector) return;
    const selected = carvingSelector.querySelector("[data-choice][aria-pressed='true']");
    if (!selected) return;
    if (carvingSummary) carvingSummary.textContent = "当前：" + (selected.dataset.carvingName || selected.querySelector("strong")?.textContent || "");
  };
  const openCarvingPreview = (button) => {
    if (!carvingPreview || !button) return;
    const title = button.dataset.carvingName || button.querySelector("strong")?.textContent || "";
    if (carvingPreviewImage && button.dataset.carvingImage) {
      carvingPreviewImage.src = button.dataset.carvingImage;
      carvingPreviewImage.alt = title + "雕花大图预览";
    }
    if (carvingPreviewTitle) carvingPreviewTitle.textContent = title;
    carvingPreview.hidden = false;
  };
  const closeCarvingPreview = () => {
    if (carvingPreview) carvingPreview.hidden = true;
  };
  if (carvingSelector) {
    carvingSelector.addEventListener("click", (event) => {
      const button = event.target.closest("[data-choice]");
      updateCarvingSummary();
      if (button) openCarvingPreview(button);
    });
    updateCarvingSummary();
  }
  if (carvingPreview) {
    carvingPreview.addEventListener("click", (event) => {
      if (event.target === carvingPreview || event.target.closest("[data-carving-close]")) closeCarvingPreview();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeCarvingPreview();
    });
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
      const item = defaultCartItem();
      const title = document.querySelector("[data-product-title]")?.textContent?.trim();
      const subtitle = document.querySelector("[data-product-subtitle]")?.textContent?.trim() || "";
      const code = document.querySelector("[data-product-code]")?.textContent?.trim() || subtitle.split(/\s+/)[0];
      const image = document.querySelector("[data-gallery-track] img")?.getAttribute("src");
      if (title) item.title = title;
      if (code) item.code = code;
      if (image) item.image = image;
      addCartItem(item);
      showToast("已加入购物车，可继续挑选其他商品");
      if (addPanel) addPanel.hidden = false;
    });
  }

  document.querySelectorAll("[data-recommend-add-cart]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      addCartItem(cartItemFromElement(button));
      showToast("已加入购物车，可继续挑选其他商品");
    });
  });

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

  const cartListRoot = document.querySelector("[data-cart-list]");
  const cartTierPrice = document.querySelector("[data-cart-tier-price]");
  const cartTierNote = document.querySelector("[data-cart-tier-note]");
  const cartSubtotal = document.querySelector("[data-cart-subtotal]");
  const cartTotal = document.querySelector("[data-cart-total]");
  const cartTierMap = {
    advanced: [268, 248, 228],
    artisan: [498, 468, 438],
    festival: [328, 308, 288],
  };
  const cartSeriesCount = (items, series) => items
    .filter((item) => item.series === series)
    .reduce((sum, item) => sum + Number(item.qty || 0), 0);
  const cartUnitPrice = (item, items) => {
    const base = Number(item.price || 0);
    if (base >= 900) return base;
    const tiers = cartTierMap[item.series] || [base || 268, base || 248, base || 228];
    const count = cartSeriesCount(items, item.series);
    if (count >= 6) return tiers[2];
    if (count >= 3) return tiers[1];
    return tiers[0];
  };
  const cartPackageFee = (item) => {
    const match = String(item.packaging || "").match(/\+(\d+)/);
    return match ? Number(match[1]) : 0;
  };
  const cartTierHint = (item, items) => {
    if (Number(item.price || 0) >= 900) return "按采购数量确认，先加入购物车留档。";
    const count = cartSeriesCount(items, item.series);
    const tiers = cartTierMap[item.series] || cartTierMap.advanced;
    if (count < 3) return "同系列再加 " + (3 - count) + " 件，进入 ¥" + tiers[1] + " 档。";
    if (count < 6) return "同系列再加 " + (6 - count) + " 件，进入 ¥" + tiers[2] + " 档。";
    return "已是当前最高优惠档。";
  };
  const visibleCartItems = () => {
    const items = cartItems();
    if (items.length) return items;
    const fallback = defaultCartItem();
    fallback.qty = Math.max(1, cartCount() || 1);
    return [fallback];
  };
  const renderCartItems = () => {
    if (!cartListRoot) return;
    const items = visibleCartItems();
    cartListRoot.innerHTML = "";
    let subtotal = 0;
    let packageTotal = 0;
    items.forEach((item, index) => {
      const qty = Math.max(1, Number(item.qty || 1));
      const unit = cartUnitPrice(item, items);
      const packageFee = cartPackageFee(item) * qty;
      subtotal += unit * qty;
      packageTotal += packageFee;
      const article = document.createElement("article");
      article.className = "cart-item";
      article.innerHTML =
        '<div class="product-media photo-media cart-thumb"><img src="' + item.image + '" alt="' + item.name + '"></div>' +
        '<div class="cart-info"><div class="tag-row"><span class="tag berry">' + item.seriesLabel + '</span><span class="tag">' + item.code + '</span></div>' +
        '<h3>' + item.title + '</h3>' +
        '<p class="cart-meta-list">' + item.size + '<br>' + item.scent + '<br>' + item.carving + ' · ' + item.packaging + ' · ' + item.extra + '</p>' +
        '<button class="config-toggle" type="button" data-toast="配置修改为静态入口，后续接入表单">修改配置</button>' +
        '<div class="qty-row"><div><div class="price-line">当前阶梯价 ¥' + unit + ' / 件</div><div class="cart-tier-note">' + cartTierHint(item, items) + '</div></div>' +
        '<div class="qty-control" aria-label="数量选择"><button type="button" aria-label="减少数量" data-cart-item-minus="' + index + '">−</button><span>' + qty + '</span><button type="button" aria-label="增加数量" data-cart-item-plus="' + index + '">+</button></div></div></div>';
      cartListRoot.append(article);
    });
    if (cartTierPrice) cartTierPrice.textContent = "当前阶梯价按商品分别计算";
    if (cartTierNote) cartTierNote.textContent = items.length > 1 ? "已展示全部加购商品。" : cartTierHint(items[0], items);
    if (cartSubtotal) cartSubtotal.textContent = "¥" + subtotal;
    if (cartTotal) cartTotal.textContent = "¥" + (subtotal + packageTotal);
    applyLanguage(cartListRoot);
  };
  if (cartListRoot) {
    window.__renderCartItems = renderCartItems;
    renderCartItems();
    cartListRoot.addEventListener("click", (event) => {
      const minus = event.target.closest("[data-cart-item-minus]");
      const plus = event.target.closest("[data-cart-item-plus]");
      const toastButton = event.target.closest("[data-toast]");
      if (toastButton && !minus && !plus) {
        showToast(toastButton.dataset.toast);
        return;
      }
      if (!minus && !plus) return;
      const items = cartItems().length ? cartItems() : visibleCartItems();
      const index = Number((minus || plus).dataset.cartItemMinus || (minus || plus).dataset.cartItemPlus);
      if (!items[index]) return;
      const delta = plus ? 1 : -1;
      items[index].qty = Math.max(1, Number(items[index].qty || 1) + delta);
      setCartItems(items);
    });
  }

  const addressBook = [
    {
      id: "home",
      name: "周女士",
      nameEn: "Ms. Zhou",
      phone: "138****5821",
      region: "上海市 徐汇区",
      regionEn: "Xuhui, Shanghai",
      detail: "样板路 88 号 12 层",
      detailEn: "12F, No. 88 Sample Road",
      tag: "默认地址",
      tagEn: "Default"
    },
    {
      id: "office",
      name: "陈先生",
      nameEn: "Mr. Chen",
      phone: "136****3096",
      region: "浙江省 杭州市 西湖区",
      regionEn: "Xihu, Hangzhou, Zhejiang",
      detail: "云栖路 66 号收发室",
      detailEn: "Reception, No. 66 Yunqi Road",
      tag: "工作日可收",
      tagEn: "Weekdays"
    },
    {
      id: "gift",
      name: "礼品收件人",
      nameEn: "Gift Recipient",
      phone: "139****7402",
      region: "广东省 深圳市 南山区",
      regionEn: "Nanshan, Shenzhen, Guangdong",
      detail: "海岸路 19 号礼宾台",
      detailEn: "Concierge, No. 19 Coast Road",
      tag: "送礼备用",
      tagEn: "Gift backup"
    }
  ];

  const getDefaultAddressId = () => window.localStorage.getItem(ADDRESS_DEFAULT_KEY) || addressBook[0]?.id || "";
  const getCartAddressId = () => window.localStorage.getItem(ADDRESS_CART_KEY) || getDefaultAddressId();
  const getAddressById = (id) => addressBook.find((item) => item.id === id) || addressBook[0];
  const addressName = (item, lang) => lang === "en" ? item.nameEn : item.name;
  const addressRegion = (item, lang) => lang === "en" ? item.regionEn : item.region;
  const addressDetail = (item, lang) => lang === "en" ? item.detailEn : item.detail;
  const addressTag = (item, lang) => lang === "en" ? item.tagEn : item.tag;
  const addressSummaryHtml = (item, lang) => {
    if (!item) return '<span class="address-summary"><strong>' + translateString("请选择收货地址", lang) + '</strong></span>';
    return '<span class="address-summary"><strong>' + addressName(item, lang) + ' · ' + item.phone + '</strong><span>' + addressRegion(item, lang) + ' · ' + addressDetail(item, lang) + '</span></span>';
  };

  const renderAddresses = () => {
    const list = document.querySelector("[data-address-list]");
    if (!list) return;
    const lang = currentLang();
    const defaultId = getDefaultAddressId();
    list.innerHTML = "";
    addressBook.forEach((item) => {
      const card = document.createElement("article");
      card.className = "address-manage-card";
      card.classList.toggle("is-default", item.id === defaultId);
      card.innerHTML =
        '<div class="address-card-top"><strong>' + addressName(item, lang) + ' · ' + item.phone + '</strong><span>' + addressTag(item, lang) + '</span></div>' +
        '<p class="address-meta">' + addressRegion(item, lang) + '<br>' + addressDetail(item, lang) + '</p>' +
        '<div class="address-actions"><button type="button" data-address-default="' + item.id + '" aria-pressed="' + String(item.id === defaultId) + '">' + (item.id === defaultId ? translateString("默认地址", lang) : translateString("设为默认", lang)) + '</button><button type="button" data-address-edit="' + item.id + '">' + translateString("编辑", lang) + '</button></div>';
      list.append(card);
    });
  };

  const addressList = document.querySelector("[data-address-list]");
  if (addressList) {
    window.__renderAddresses = renderAddresses;
    addressList.addEventListener("click", (event) => {
      const defaultButton = event.target.closest("[data-address-default]");
      if (defaultButton) {
        window.localStorage.setItem(ADDRESS_DEFAULT_KEY, defaultButton.dataset.addressDefault || "");
        window.localStorage.removeItem(ADDRESS_CART_KEY);
        renderAddresses();
        showToast("默认地址已更新");
        return;
      }
      const editButton = event.target.closest("[data-address-edit]");
      if (editButton) showToast("编辑地址为静态入口，后续接入真实表单");
    });
    document.querySelector("[data-address-add]")?.addEventListener("click", () => showToast("新增地址为静态入口，后续接入真实表单"));
    renderAddresses();
  }

  const cartAddressSummary = document.querySelector("[data-cart-address-summary]");
  const cartAddressToggle = document.querySelector("[data-cart-address-toggle]");
  const cartAddressList = document.querySelector("[data-cart-address-list]");
  const renderCartAddress = () => {
    if (!cartAddressSummary || !cartAddressList) return;
    const lang = currentLang();
    const selectedId = getCartAddressId();
    const selected = getAddressById(selectedId);
    cartAddressSummary.innerHTML = addressSummaryHtml(selected, lang);
    cartAddressList.innerHTML = "";
    addressBook.forEach((item) => {
      const option = document.createElement("button");
      option.className = "cart-address-option";
      option.type = "button";
      option.dataset.cartAddressOption = item.id;
      option.setAttribute("aria-pressed", String(item.id === selected.id));
      option.innerHTML = addressSummaryHtml(item, lang);
      cartAddressList.append(option);
    });
  };
  if (cartAddressSummary && cartAddressToggle && cartAddressList) {
    window.__renderCartAddress = renderCartAddress;
    cartAddressToggle.addEventListener("click", () => {
      const nextOpen = cartAddressList.hasAttribute("hidden");
      cartAddressList.toggleAttribute("hidden", !nextOpen);
      cartAddressToggle.setAttribute("aria-expanded", String(nextOpen));
    });
    cartAddressList.addEventListener("click", (event) => {
      const option = event.target.closest("[data-cart-address-option]");
      if (!option) return;
      window.localStorage.setItem(ADDRESS_CART_KEY, option.dataset.cartAddressOption || "");
      cartAddressList.hidden = true;
      cartAddressToggle.setAttribute("aria-expanded", "false");
      renderCartAddress();
      showToast("已选择收货地址");
    });
    renderCartAddress();
  }

  const destinationGroups = [
    {
      label: "港澳台地区",
      items: [
        ["中国香港特别行政区", "Hong Kong"],
        ["中国澳门特别行政区", "Macao"],
        ["台湾地区", "Taiwan"]
      ]
    },
    {
      label: "亚洲",
      items: [
        ["日本", "Japan"],
        ["韩国", "South Korea"],
        ["新加坡", "Singapore"],
        ["马来西亚", "Malaysia"],
        ["泰国", "Thailand"],
        ["越南", "Vietnam"],
        ["印度尼西亚", "Indonesia"],
        ["菲律宾", "Philippines"]
      ]
    },
    {
      label: "欧洲",
      items: [
        ["德国", "Germany"],
        ["法国", "France"],
        ["英国", "United Kingdom"],
        ["意大利", "Italy"],
        ["西班牙", "Spain"],
        ["荷兰", "Netherlands"],
        ["瑞士", "Switzerland"],
        ["瑞典", "Sweden"]
      ]
    },
    {
      label: "北美与大洋洲",
      items: [
        ["美国", "United States"],
        ["加拿大", "Canada"],
        ["澳大利亚", "Australia"],
        ["新西兰", "New Zealand"]
      ]
    }
  ];
  const overseasToggle = document.querySelector("[data-overseas-toggle]");
  const destinationPanel = document.querySelector("[data-destination-panel]");
  const destinationSearch = document.querySelector("[data-destination-search]");
  const destinationSelect = document.querySelector("[data-destination-select]");
  const destinationLabel = document.querySelector("[data-destination-label]");
  const destinationResult = document.querySelector("[data-destination-result]");
  const destinationSelected = document.querySelector("[data-destination-selected]");
  const shippingFee = document.querySelector("[data-shipping-fee]");
  let selectedDestination = "";
  let destinationOpen = false;
  const getDestinationName = (zh, lang) => {
    const item = destinationGroups.flatMap((group) => group.items).find((entry) => entry[0] === zh);
    return lang === "en" ? (item?.[1] || zh) : zh;
  };
  const renderDestinations = () => {
    if (!destinationResult) return;
    const lang = currentLang();
    const query = (destinationSearch ? destinationSearch.value : "").trim().toLowerCase();
    destinationResult.innerHTML = "";
    destinationGroups.forEach((group) => {
      const matches = group.items.filter(([zh, en]) => {
        const haystack = (zh + " " + en).toLowerCase();
        return !query || haystack.includes(query);
      });
      if (!matches.length) return;
      const wrap = document.createElement("div");
      wrap.className = "destination-group";
      const title = document.createElement("strong");
      title.textContent = translateString(group.label, lang);
      wrap.append(title);
      matches.forEach(([zh, en]) => {
        const option = document.createElement("button");
        option.className = "destination-option";
        option.type = "button";
        option.dataset.destination = zh;
        option.dataset.destinationEn = en;
        option.setAttribute("aria-pressed", String(selectedDestination === zh));
        option.textContent = lang === "en" ? en : zh;
        wrap.append(option);
      });
      destinationResult.append(wrap);
    });
    if (!destinationResult.children.length) {
      const empty = document.createElement("p");
      empty.className = "destination-selected";
      empty.textContent = translateString("无匹配目的地", lang);
      destinationResult.append(empty);
    }
    if (destinationResult) destinationResult.hidden = !destinationOpen;
    if (destinationSelect) destinationSelect.setAttribute("aria-expanded", String(destinationOpen));
    if (destinationLabel) {
      destinationLabel.textContent = selectedDestination
        ? getDestinationName(selectedDestination, lang)
        : translateString("请选择配送目的地", lang);
    }
    if (destinationSelected) {
      destinationSelected.textContent = selectedDestination
        ? translateString("已选择配送目的地：", lang) + getDestinationName(selectedDestination, lang)
        : translateString("未选择配送目的地", lang);
    }
  };
  if (overseasToggle && destinationPanel) {
    window.__renderDestinations = renderDestinations;
    overseasToggle.addEventListener("click", () => {
      const next = overseasToggle.getAttribute("aria-pressed") !== "true";
      overseasToggle.setAttribute("aria-pressed", String(next));
      destinationPanel.hidden = !next;
      destinationOpen = false;
      if (shippingFee) shippingFee.textContent = translateString(next ? "跨境配送费待确认" : "¥0");
      renderDestinations();
    });
    if (destinationSelect) {
      destinationSelect.addEventListener("click", () => {
        destinationOpen = !destinationOpen;
        renderDestinations();
      });
    }
    if (destinationSearch) {
      destinationSearch.addEventListener("input", () => {
        destinationOpen = true;
        renderDestinations();
      });
    }
    if (destinationResult) {
      destinationResult.addEventListener("click", (event) => {
        const option = event.target.closest("[data-destination]");
        if (!option) return;
        selectedDestination = option.dataset.destination || "";
        destinationOpen = false;
        renderDestinations();
      });
    }
    renderDestinations();
  }

  document.querySelectorAll(".btn, .quick-item, .choice-card, .size-pill, .carving-card, .segment, .tab-item, .feature-card, .coupon-card, .download-card, .activity-card, .sample-package, .round-action, .mini-cart-button, .points-mall-card, .step-card, .gift-tab, .gift-filter-chip, .range-backdrop, .series-card, .catalog-product-link, .catalog-product-action, .decision-card, .budget-row, .festival-card, .fragrance-pill, .config-toggle, .filter-chip, .language-toggle, .mine-action-card, .destination-select, .destination-option, .address-current, .cart-address-option, .address-actions button, .link-button").forEach((item) => {
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
  initLanguageControls();

  const channelPrimary = document.querySelector("[data-channel-primary]");
  const channelAsset = document.querySelector("[data-channel-asset]");
  if (channelPrimary) {
    const params = new URLSearchParams(window.location.search);
    const approved = params.get("channel") === "approved" || window.localStorage.getItem("waxAtelierChannelStatus") === "approved";
    if (approved) {
      channelPrimary.href = channelPrimary.dataset.approvedHref || "quotation.html";
      const title = channelPrimary.querySelector("[data-channel-title]");
      const desc = channelPrimary.querySelector("[data-channel-desc]");
      if (title) title.textContent = "查看渠道报价";
      if (desc) desc.textContent = "已通过渠道身份，可直接查看报价规则";
      if (channelAsset) {
        channelAsset.href = channelAsset.dataset.approvedHref || "assets-download.html";
        channelAsset.classList.remove("locked");
        const assetDesc = channelAsset.querySelector("[data-channel-asset-desc]");
        if (assetDesc) assetDesc.textContent = "渠道素材已开放";
      }
    } else if (channelAsset) {
      channelAsset.href = channelAsset.dataset.lockedHref || "wholesale.html";
    }
  }

  const addressFromCart = new URLSearchParams(window.location.search).get("from") === "cart";
  if (addressFromCart && document.body.dataset.page === "mine") {
    const back = document.querySelector(".wx-header .back-link");
    if (back) {
      back.href = "cart.html";
      back.setAttribute("aria-label", "返回购物车");
    }
    const addressSection = document.querySelector(".address-scroll .section");
    if (addressSection && !addressSection.querySelector("[data-address-return]")) {
      const link = document.createElement("a");
      link.className = "address-return-link";
      link.href = "cart.html";
      link.dataset.addressReturn = "";
      link.textContent = "继续下单";
      addressSection.append(link);
    }
  }
  const memberFromCoupons = new URLSearchParams(window.location.search).get("from") === "coupons";
  if (memberFromCoupons && document.body.dataset.page === "member") {
    const back = document.querySelector(".wx-header a");
    if (back) {
      back.href = "coupons.html";
      back.setAttribute("aria-label", "返回复购券");
    }
  }
  applyLanguage();
  updateCartBadges();
})();
