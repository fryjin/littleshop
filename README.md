# Little Shop Visual Prototype

微信小程序商城高保真静态视觉稿，产品为德国手工香薰雕刻蜡烛。

## 当前交付

- 入口页：`mini-program-visual-prototype/index.html`
- 当前阶段：静态 HTML 视觉稿，不包含真实小程序、后端、支付、登录、库存或客服接口。
- 页面数量：21 个 HTML 页面。
- 默认身份：零售买家；经典系列和渠道批发价仅在批发路径中出现。
- 视觉方向：Wax Atelier，手工奢品、礼品橱窗、克制交易、香氛生活方式、批发渠道可信感。

## 最新迭代

本轮更新聚焦零售导购、商品浏览和加购动线：

- 首页保留按场景、按预算、按节日和批发拿样入口；进阶场景区调整为定制、婚礼批采和 AI 搭配三卡布局。
- 选礼页使用三 tab：按场景选、按预算选、按节日选；节日选择统一收敛到零售商品手册的节日系列筛选。
- 零售商品手册仅展示进阶、匠作和节日系列，支持系列 hash、节日 hash 和系列内筛选。
- 商品卡使用圆形 `+` 快速加购；进阶和匠作商品加购后停留当前页，节日商品进入详情页确认包装。
- 商品详情页支持多图轮播、尺寸、香型、雕花和包装选择；匠作系列展示 10 种香型，香调信息按前调 / 中调 / 后调三行展示。
- 购物车定位为下单前配置检查，可展开修改尺寸、香型、雕花、包装和贺卡。

## 核心页面

- `home.html`：首页分流、快捷入口、本周热卖和进阶场景。
- `gift.html`：零售选礼助手，按场景、预算和节日降低选择成本。
- `catalog.html`：零售商品手册，展示进阶、匠作、节日系列，并支持筛选和加购反馈。
- `product.html`：商品详情，展示轮播图、尺寸、香型、雕花、包装和购买参考信息。
- `cart.html`：购物车与下单前配置确认。
- `wholesale.html` / `wholesale-catalog.html`：渠道申请、批发手册和顾问确认路径。
- `sample.html` / `quotation.html`：拿样包和渠道报价单。
- `custom.html` / `wedding.html` / `ai-match.html`：定制、婚礼批采和 AI 搭配静态演示。

## 使用方式

直接在浏览器打开：

```text
mini-program-visual-prototype/index.html
```

本地开发预览可使用任意静态服务器指向 `mini-program-visual-prototype/`，例如：

```text
http://127.0.0.1:5174/index.html
```

静态页面共享：

- `mini-program-visual-prototype/assets/styles.css`
- `mini-program-visual-prototype/assets/app.js`

截图位于：

- `mini-program-visual-prototype/_screenshots/`

## 验证记录

- `mini-program-visual-prototype/assets/app.js` 已通过语法检查。
- 关键页面在 390 x 844 移动视口下无横向溢出。
- 已检查 `home.html`、`gift.html#festival`、`catalog.html`、`catalog.html#festival-spring`、`product.html?series=artisan&code=AR-01`、`cart.html`。
- 商品系列切换、系列内筛选、节日 hash、商品卡 `+` 加购、购物车角标、详情页不跳转加购、匠作 10 香型和香调三行布局已检查通过。
