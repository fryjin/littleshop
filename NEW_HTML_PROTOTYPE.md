# New HTML Prototype Branch

## Summary

This branch keeps the original prototype untouched and adds the user's newer HTML prototype under `new/` for continued iteration.

- Branch: `codex/new-html-prototype`
- Entry page: `new/商城首页.html`
- Prototype type: static mobile HTML prototype
- Page count: 22 HTML pages
- Scope: upload and document the new version as a separate development branch, not a replacement for `mini-program-visual-prototype`

## Page Map

| Page | Role |
| --- | --- |
| `new/商城首页.html` | Retail home and primary entry |
| `new/商品分类.html` | Product category and list browsing |
| `new/商品详情页.html` | Product detail and add-to-cart flow |
| `new/购物车.html` | Cart, address, delivery, and price-tier preview |
| `new/付款页面.html` | Payment confirmation before success |
| `new/支付成功.html` | Payment result |
| `new/订单列表.html` | Order list and order status |
| `new/我的.html` | Account center |
| `new/地址管理.html` | Address management |
| `new/发票管理.html` | Invoice management |
| `new/申请开票.html` | Invoice application |
| `new/会员积分.html` | Points balance, history, and points mall |
| `new/优惠券.html` | Coupon wallet |
| `new/收藏浏览.html` | Favorites and browsing history |
| `new/评价列表.html` | Pending and submitted reviews |
| `new/评价详情.html` | Review detail |
| `new/客服售后.html` | Customer service and after-sales |
| `new/政策协议.html` | Policy and agreements |
| `new/条款明细.html` | Policy detail page |
| `new/送礼助手.html` | Gift assistant |
| `new/搭配推荐.html` | Matching recommendation flow |
| `new/渠道合作申请.html` | Channel cooperation application |

## Current Structure

- Each page is a standalone HTML file.
- Styling is embedded per page through Tailwind CDN configuration and inline utility classes.
- Icons are loaded through Lucide CDN.
- Fonts are loaded through Google Fonts.
- No build step, backend, database, inventory, payment, login, or API integration is required.

## Initial Cleanup Applied

The new version used Chinese filenames, while a few internal links still pointed to older English filenames. This branch normalizes the obvious internal navigation targets, for example:

- `home.html` -> `商城首页.html`
- `product.html` -> `商品详情页.html`
- `cart.html` -> `购物车.html`
- `mine.html` -> `我的.html`
- `wholesale.html` -> `渠道合作申请.html`
- `order-list.html` -> `订单列表.html`
- `payment-success.html` -> `支付成功.html`
- `invoice.html` -> `发票管理.html`
- Cart checkout now routes to `付款页面.html`, and payment confirmation then routes to `支付成功.html`.

## Iteration Notes

- The new prototype has a more compact and direct flow than the older version.
- Because pages are standalone, shared behavior and visual tokens are duplicated. A later cleanup can extract common CSS and navigation logic after the experience direction is confirmed.
- Some text and labels should be reviewed in-browser before product decisions are locked, because the current version is optimized as a visual prototype rather than production markup.
- CDN assets are acceptable for this branch preview, but a production-oriented prototype should eventually localize critical fonts, icons, and styling dependencies.
- V1 iteration focuses on connecting standalone pages, replacing dead/toast-only navigation with real static routes, and keeping add-to-cart state visible in the cart preview.
- V2 page planning is documented in `NEW_HTML_V2_ITERATION_PLAN.md`; the current confirmed scope removes search and focuses on order confirmation, order detail, logistics, address editing, reviews, favorites/history, coupons, points, custom consultation, and channel quotation.
- Current iteration connected more real retail actions: compact gift filters, category switching, festival tags, product configuration, cart grouping, cart total recalculation, invoice reminders, review entry, and weak-network transition loading.
- The prototype still intentionally stays static. Cart, address, invoice, review, and loading states use local preview logic only.

## Verification

- Confirmed `new/` contains 22 HTML pages.
- Confirmed obvious old English HTML route references were removed from `new/`.
- Confirmed this work is on a separate branch and does not overwrite the previous prototype directory.
- Latest local checks cover shared JS syntax, inline script parsing, local HTML references, and whitespace checks. Browser screenshot QA should still be run before treating this as design-freeze ready.
