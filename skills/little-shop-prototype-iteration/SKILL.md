---
name: little-shop-prototype-iteration
description: Project-specific workflow for iterating the Little Shop static mini-program commerce prototype, especially the newer `new/` HTML version, with lifecycle-based UX decisions, low-noise retail flows, connected page paths, regression checks, and documentation updates.
---

# Little Shop Prototype Iteration

Use this skill when working on the Little Shop static mini-program prototypes and the task is to refine or extend the shopping experience.

Primary target:

- New prototype: `D:\little shop\new`

Legacy target:

- Old prototype: `D:\little shop\mini-program-visual-prototype`

When both versions are relevant, treat `new/` as the preferred design direction unless the user explicitly asks to continue the legacy version.

This skill complements `static-mobile-prototype-qa`. Use the generic skill for baseline prototype discipline, then use this one for Little Shop specific decisions and checks.

## Core Design Language

The reusable design direction is:

- Light luxury craft, not heavy luxury.
- Mature mini-program efficiency, not a marketing landing page.
- Low-saturation warmth: warm stone, ivory, sage gray, soft apricot, small berry accents.
- Compact action-first screens: show choices and next steps before long explanations.
- Retail buyer first; channel/wholesale features are gated or secondary.
- Remove AI-flavored copy. Use user actions such as `搭配推荐`, `帮我选`, `加入购物车`, `提交确认`.

The better version is better because it follows the user lifecycle:

1. Discover: fewer entry points, no feature dumping.
2. Decide: gift, budget, category, and recommendation paths reduce choice overload.
3. Confirm: product detail focuses on image, size, scent, package, and add-to-cart.
4. Checkout: cart, address, invoice, payment, and order pages form a real purchase loop.
5. Service: after-sales, policy, invoice, and order status reduce risk.
6. Return: account center keeps orders, address, invoice, and channel application available without crowding the buying path.

## What Repeats Here

Across iterations, the same loop repeats:

1. Reduce information density before adding new surfaces.
2. Keep retail and wholesale entry paths coherent after each page tweak.
3. Preserve lightweight static interactions such as add-to-cart, filters, drawers, and local state continuity.
4. Check the user lifecycle impact, not only the visual screenshot.
5. Re-run the same verification sequence and write back the outcome to docs when needed.

## Working Rules

1. Start with path and hierarchy, not expansion.
   - If feedback says "too crowded", "hard to understand", or "can't find it", first remove banners, repeated headings, or explanatory cards.
   - Only add a new page when the current page cannot carry the action cleanly.

2. Start from lifecycle stage.
   - Discover pages should help users choose where to go.
   - Decision pages should filter and compare.
   - Detail pages should confirm fit and support add-to-cart.
   - Cart pages should show all selected items, address, price tier, and submit action.
   - Service pages should reduce risk without interrupting purchase.

3. Recommendations must stay actionable.
   - Product cards and recommendation cards should lead to detail or lightweight add-to-cart.
   - Avoid static recommendation explanations that do not let the user act.
   - Prefer multiple concrete product results over long "why recommended" blocks.

4. Add-to-cart stays local.
   - For retail flows, adding to cart should usually keep the user on the current page and update local cart feedback.
   - Do not turn simple add-to-cart actions into forced checkout redirects unless the request explicitly changes the flow.
   - Cart count and cart item display should stay believable within the static prototype.

5. Hide channel-only capability from default retail paths.
   - Wholesale pricing, asset downloads, and similar gated content should appear only through the channel path or after an explicit application step.
   - Do not show unavailable channel-only cards to normal retail users; replace them with retail-useful tools.

6. Remove tool-sounding copy.
   - Prefer user-facing actions such as "dapei tuijian", "jiaru gouwuche", and "tijiao queren".
   - Avoid copy framed like internal explanations, AI wording, or prototype disclaimers unless the user explicitly asks for them.

7. Keep pages compact.
   - Remove large hero/banner modules unless they directly support the primary action.
   - Repeated page titles inside the content area are usually noise when the top nav already names the page.
   - Use chips, rows, drawers, and small cards before adding large panels.

8. Match real mini-program behavior.
   - Provide visible back or return paths, especially when a page can be opened from cart or account.
   - Bottom nav belongs on core retail pages; temporary detail actions should not hide core navigation unless the flow requires focus.
   - Forms should progressively collapse after submission when results are more important than the inputs.

## Required Files To Check

- `D:\little shop\NEW_HTML_PROTOTYPE.md`
- `D:\little shop\NEW_HTML_V2_ITERATION_PLAN.md`
- `D:\little shop\PROJECT_PROGRESS.md`
- `D:\little shop\README.md`
- New pages in `D:\little shop\new`
- `D:\little shop\new\assets\prototype-state.js` when shared cart, return-path, or page-jump behavior changed
- Legacy entry: `D:\little shop\mini-program-visual-prototype\index.html`
- Shared assets in `mini-program-visual-prototype/assets/` when legacy pages are touched

If a change affects navigation, also inspect the relevant entry pages that point to it, not just the edited page.

## Verification Loop

Run the smallest full check that matches the change:

1. Page inventory
   - Count changed `.html` pages.
   - Confirm the entry page is still known.

2. Link check
   - Search for stale English filenames, removed pages, or broken route names.
   - For `new/`, pay special attention to Chinese filenames and `history.back()` paths.
   - When `new/` route steps changed, confirm they still match the current V2 sequence in `NEW_HTML_V2_ITERATION_PLAN.md`.

3. `node --check mini-program-visual-prototype/assets/app.js`
   - Required whenever shared JS changed.

4. Shared state check for `new/`
   - Re-read `new/assets/prototype-state.js` whenever cart state, toast feedback, checkout jumps, or fallback back-navigation changed.
   - Confirm cart badges, local cart rendering, and checkout redirect targets still match the edited flow.

5. `git diff --check`
   - Catch whitespace or patch-shape mistakes.

6. `rg`
   - Search for stale copy, removed banners, old labels, or dead links that the change was supposed to eliminate.

7. Mobile rendering check
   - Re-check changed pages and any page touched by shared CSS/JS in a 390x844 viewport when browser tooling is available.
   - Watch for horizontal overflow, broken bottom CTA spacing, and cart/detail navigation regressions.

8. Documentation sync
   - Update `PROJECT_PROGRESS.md` when the iteration changes user-visible behavior, page inventory, validation status, or the working method.
   - Update `README.md` only when entry points, page counts, or the current delivery scope changed.
   - Update `NEW_HTML_PROTOTYPE.md` when the new page map or design direction changes.
   - Update `NEW_HTML_V2_ITERATION_PLAN.md` when the confirmed V2 scope, route sequence, or page list changes.

## Done Condition

An iteration is complete only when all of these are true:

- The edited flow is simpler or clearer than before.
- The changed screen still supports the correct lifecycle stage.
- Entry links and return paths still work.
- Shared static interactions still match the intended retail or wholesale route.
- Verification results are recorded honestly.
- `PROJECT_PROGRESS.md` reflects the new state when the change is material.
