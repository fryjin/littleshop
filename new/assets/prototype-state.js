(function () {
  const CART_KEY = 'wax_new_cart_items';
  let loadingHidden = false;
  let isNavigating = false;

  function readItems() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch (error) {
      return [];
    }
  }

  function writeItems(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  function notify(message) {
    if (typeof window.showToast === 'function') {
      window.showToast(message);
    }
  }

  function ensureLoadingOverlay() {
    if (document.getElementById('prototype-loading-style')) return;

    const style = document.createElement('style');
    style.id = 'prototype-loading-style';
    style.textContent = [
      '.prototype-loading-screen{position:fixed;inset:0;z-index:9999;background:#8FA396;color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;transition:opacity .28s ease,visibility .28s ease;}',
      '.app-container>.prototype-loading-screen{position:absolute;}',
      '.prototype-loading-screen.is-hidden{opacity:0;visibility:hidden;pointer-events:none;}',
      '.prototype-loading-text{font-size:11px;font-weight:700;}',
      '.prototype-globe{width:42px;height:42px;border-radius:999px;position:relative;overflow:hidden;background:#EEF1EA;box-shadow:inset -9px -5px 0 rgba(51,51,51,.12);}',
      '.prototype-globe-map{position:absolute;inset:0;background:radial-gradient(ellipse at 12px 14px,#8FA396 0 5px,transparent 6px),radial-gradient(ellipse at 32px 28px,rgba(143,163,150,.7) 0 5px,transparent 6px),radial-gradient(ellipse at 46px 16px,rgba(143,163,150,.55) 0 4px,transparent 5px);background-size:56px 42px;animation:prototypeGlobeTurn 1.25s linear infinite;}',
      '.prototype-globe:before{content:"";position:absolute;inset:7px 12px;border-left:2px solid rgba(143,163,150,.72);border-right:2px solid rgba(143,163,150,.72);border-radius:999px;}',
      '.prototype-globe:after{content:"";position:absolute;left:5px;right:5px;top:19px;height:2px;background:rgba(143,163,150,.72);border-radius:999px;box-shadow:0 -10px 0 rgba(143,163,150,.38),0 10px 0 rgba(143,163,150,.38);}',
      '.prototype-deferred-section{opacity:0;transform:translateY(8px);transition:opacity .28s ease,transform .28s ease;}',
      '.prototype-deferred-section.is-visible{opacity:1;transform:none;}',
      '@keyframes prototypeGlobeTurn{to{background-position:56px 0,56px 0,56px 0;}}'
    ].join('');
    document.head.appendChild(style);

    const mount = document.querySelector('.app-container') || document.body;
    const overlay = document.createElement('div');
    overlay.id = 'prototype-loading';
    overlay.className = 'prototype-loading-screen';
    overlay.innerHTML = '<div class="prototype-globe" aria-hidden="true"><div class="prototype-globe-map"></div></div><div class="prototype-loading-text">LOADING</div>';
    mount.appendChild(overlay);
  }

  function prepareProgressiveContent() {
    const scroller = document.querySelector('.app-container main.overflow-y-auto, .app-container main.flex-1, .app-container .overflow-y-auto');
    if (!scroller) return;
    const fold = (scroller.clientHeight || window.innerHeight || 812) * 0.92;
    Array.from(scroller.children).forEach(function (child) {
      if (child.offsetTop > fold) child.classList.add('prototype-deferred-section');
    });
  }

  function revealProgressiveContent() {
    document.querySelectorAll('.prototype-deferred-section').forEach(function (section, index) {
      setTimeout(function () {
        section.classList.add('is-visible');
      }, 80 + index * 55);
    });
  }

  function hideLoadingOverlay() {
    if (isNavigating) return;
    if (loadingHidden) return;
    loadingHidden = true;
    const overlay = document.getElementById('prototype-loading');
    if (overlay) overlay.classList.add('is-hidden');
    revealProgressiveContent();
  }

  function showLoading(next) {
    ensureLoadingOverlay();
    loadingHidden = false;
    isNavigating = true;
    const overlay = document.getElementById('prototype-loading');
    if (overlay) overlay.classList.remove('is-hidden');
    setTimeout(next, 240);
  }

  function inferFromButton(event, fallbackName, fallbackPrice) {
    const button = event && event.currentTarget;
    const card = button ? button.closest('.group, .rounded-xl, .rounded-2xl, .flex, article, div') : null;
    const name = fallbackName || (card && card.querySelector('h3,h4') && card.querySelector('h3,h4').textContent.trim()) || 'Wax Atelier 商品';
    const price = fallbackPrice || (card && card.querySelector('.text-brand-berry') && card.querySelector('.text-brand-berry').textContent.trim()) || '价格待确认';
    return { name, price };
  }

  window.goPage = function (page) {
    showLoading(function () {
      window.location.href = page;
    });
  };

  window.goBack = function (fallback) {
    if (window.history.length > 1) {
      showLoading(function () {
        window.history.back();
      });
      return;
    }
    showLoading(function () {
      window.location.href = fallback || '商城首页.html';
    });
  };

  window.addPrototypeCart = function (event, fallbackName, fallbackPrice) {
    if (event) event.stopPropagation();
    const item = inferFromButton(event, fallbackName, fallbackPrice);
    const items = readItems();
    items.push({
      name: item.name,
      price: item.price,
      qty: 1,
      size: 'M',
      scent: '玫瑰木',
      carving: '水波纹',
      package: '精品包装',
      addedAt: Date.now()
    });
    writeItems(items);
    window.updatePrototypeCartBadges();
    notify('已加入购物车');
  };

  window.addPrototypeCartAndCheckout = function (event, fallbackName, fallbackPrice) {
    window.addPrototypeCart(event, fallbackName, fallbackPrice);
    showLoading(function () {
      window.location.href = '购物车.html';
    });
  };

  window.checkoutPrototypeOrder = function () {
    showLoading(function () {
      window.location.href = '付款页面.html';
    });
  };

  window.updatePrototypeCartBadges = function () {
    const count = readItems().length;
    document.querySelectorAll('#cart-badge, [data-cart-badge]').forEach(function (badge) {
      badge.textContent = count;
      badge.classList.toggle('hidden', count === 0);
    });
  };

  window.renderPrototypeCartExtras = function () {
    const mount = document.getElementById('prototype-cart-extra');
    if (!mount) return;
    const items = readItems();
    if (!items.length) {
      mount.innerHTML = '';
      return;
    }
    mount.innerHTML = items.map(function (item, index) {
      const size = item.size || 'M';
      const scent = item.scent || '玫瑰木';
      const carving = item.carving || '水波纹';
      const packageName = item.package || '精品包装';
      const numericPrice = String(item.price || '').match(/\d+(?:\.\d+)?/);
      return [
        index === 0 ? '<div class="px-4 py-2 bg-brand-stone/60 text-[11px] text-gray-500">本次加购</div>' : '',
        '<div class="p-4 flex gap-3 border-t border-gray-50 cart-item-row" data-price="' + (numericPrice ? numericPrice[0] : '') + '">',
        '  <input type="checkbox" class="custom-checkbox cart-item-check self-center" checked>',
        '  <div class="w-20 h-20 bg-brand-stone rounded flex-shrink-0 flex items-center justify-center text-[10px] text-brand-sage">商品图</div>',
        '  <div class="flex-1 flex flex-col justify-between">',
        '    <div>',
        '      <h3 class="text-sm font-medium line-clamp-1">' + item.name + '</h3>',
        '      <button type="button" class="text-[10px] text-gray-500 mt-1 bg-gray-50 inline-flex items-center px-1.5 py-0.5 rounded" data-size="' + size + '" data-scent="' + scent + '" data-carving="' + carving + '" data-package="' + packageName + '" onclick="openCartConfigEditor(this, ' + index + ')"><span class="config-text">' + size + ' | ' + scent + ' | ' + carving + '</span><i data-lucide="chevron-down" class="w-3 h-3 ml-0.5"></i></button>',
        '    </div>',
        '    <div class="flex justify-between items-end mt-2">',
        '      <span class="text-brand-berry font-bold font-serif text-sm">' + item.price + '</span>',
        '      <div class="flex items-center border border-gray-200 rounded">',
        '        <button class="w-6 h-6 flex items-center justify-center text-gray-500" onclick="adjustPrototypeQty(' + index + ', -1)">-</button>',
        '        <span class="w-6 text-center text-xs cart-qty">' + (item.qty || 1) + '</span>',
        '        <button class="w-6 h-6 flex items-center justify-center text-gray-500" onclick="adjustPrototypeQty(' + index + ', 1)">+</button>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
    if (typeof window.updateCartTotal === 'function') window.updateCartTotal();
  };

  window.adjustPrototypeQty = function (index, delta) {
    const items = readItems();
    if (!items[index]) return;
    items[index].qty = Math.max(1, (items[index].qty || 1) + delta);
    writeItems(items);
    window.renderPrototypeCartExtras();
  };

  document.addEventListener('DOMContentLoaded', function () {
    ensureLoadingOverlay();
    prepareProgressiveContent();
    window.updatePrototypeCartBadges();
    window.renderPrototypeCartExtras();
    requestAnimationFrame(function () {
      setTimeout(hideLoadingOverlay, 80);
    });
    document.addEventListener('click', function (event) {
      const routeTrigger = event.target.closest && event.target.closest('[onclick]');
      if (routeTrigger) {
        const script = routeTrigger.getAttribute('onclick') || '';
        const match = script.match(/window\.location\.href\s*=\s*['"]([^'"]+)['"]/);
        if (match && match[1]) {
          event.preventDefault();
          event.stopImmediatePropagation();
          showLoading(function () {
            window.location.href = match[1];
          });
          return;
        }
      }

      const link = event.target.closest && event.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#' || /^(https?:|mailto:|tel:|javascript:)/.test(href)) return;
      event.preventDefault();
      showLoading(function () {
        window.location.href = href;
      });
    });
  });
  window.addEventListener('load', hideLoadingOverlay);
})();
