# New HTML Prototype Branch

## Summary

This branch keeps the original prototype untouched and adds the user's newer HTML prototype under `new/` for continued iteration.

- Branch: `codex/new-html-prototype`
- Entry page: `new/商城首页.html`
- Prototype type: static mobile HTML prototype
- Page count: 16 HTML pages
- Scope: upload and document the new version as a separate development branch, not a replacement for `mini-program-visual-prototype`

## Page Map

| Page | Role |
| --- | --- |
| `new/商城首页.html` | Retail home and primary entry |
| `new/商品分类.html` | Product category and list browsing |
| `new/商品详情页.html` | Product detail and add-to-cart flow |
| `new/购物车.html` | Cart, address, delivery, and price-tier preview |
| `new/支付成功.html` | Payment result |
| `new/订单列表.html` | Order list and order status |
| `new/我的.html` | Account center |
| `new/地址管理.html` | Address management |
| `new/发票管理.html` | Invoice management |
| `new/申请开票.html` | Invoice application |
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

## Iteration Notes

- The new prototype has a more compact and direct flow than the older version.
- Because pages are standalone, shared behavior and visual tokens are duplicated. A later cleanup can extract common CSS and navigation logic after the experience direction is confirmed.
- Some text and labels should be reviewed in-browser before product decisions are locked, because the current version is optimized as a visual prototype rather than production markup.
- CDN assets are acceptable for this branch preview, but a production-oriented prototype should eventually localize critical fonts, icons, and styling dependencies.

## Verification

- Confirmed `new/` contains 16 HTML pages.
- Confirmed obvious old English HTML route references were removed from `new/`.
- Confirmed this work is on a separate branch and does not overwrite the previous prototype directory.
