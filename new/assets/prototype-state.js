(function () {
  const CART_KEY = 'wax_new_cart_items';

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

  function inferFromButton(event, fallbackName, fallbackPrice) {
    const button = event && event.currentTarget;
    const card = button ? button.closest('.group, .rounded-xl, .rounded-2xl, .flex, article, div') : null;
    const name = fallbackName || (card && card.querySelector('h3,h4') && card.querySelector('h3,h4').textContent.trim()) || 'Wax Atelier 商品';
    const price = fallbackPrice || (card && card.querySelector('.text-brand-berry') && card.querySelector('.text-brand-berry').textContent.trim()) || '价格待确认';
    return { name, price };
  }

  window.goPage = function (page) {
    window.location.href = page;
  };

  window.goBack = function (fallback) {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = fallback || '商城首页.html';
  };

  window.addPrototypeCart = function (event, fallbackName, fallbackPrice) {
    if (event) event.stopPropagation();
    const item = inferFromButton(event, fallbackName, fallbackPrice);
    const items = readItems();
    items.push({
      name: item.name,
      price: item.price,
      qty: 1,
      addedAt: Date.now()
    });
    writeItems(items);
    window.updatePrototypeCartBadges();
    notify('已加入购物车');
  };

  window.addPrototypeCartAndCheckout = function (event, fallbackName, fallbackPrice) {
    window.addPrototypeCart(event, fallbackName, fallbackPrice);
    setTimeout(function () {
      window.location.href = '购物车.html';
    }, 350);
  };

  window.checkoutPrototypeOrder = function () {
    window.location.href = '付款页面.html';
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
      return [
        '<div class="p-4 flex gap-3 border-t border-gray-50">',
        '  <input type="checkbox" class="custom-checkbox self-center" checked>',
        '  <div class="w-20 h-20 bg-brand-stone rounded flex-shrink-0 flex items-center justify-center text-[10px] text-brand-sage">商品图</div>',
        '  <div class="flex-1 flex flex-col justify-between">',
        '    <div>',
        '      <h3 class="text-sm font-medium line-clamp-1">' + item.name + '</h3>',
        '      <p class="text-[10px] text-gray-400 mt-1 bg-gray-50 inline-block px-1.5 py-0.5 rounded">本次加购 · 可到详情页调整</p>',
        '    </div>',
        '    <div class="flex justify-between items-end mt-2">',
        '      <span class="text-brand-berry font-bold font-serif text-sm">' + item.price + '</span>',
        '      <div class="flex items-center border border-gray-200 rounded">',
        '        <button class="w-6 h-6 flex items-center justify-center text-gray-500" onclick="adjustPrototypeQty(' + index + ', -1)">-</button>',
        '        <span class="w-6 text-center text-xs">' + (item.qty || 1) + '</span>',
        '        <button class="w-6 h-6 flex items-center justify-center text-gray-500" onclick="adjustPrototypeQty(' + index + ', 1)">+</button>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');
  };

  window.adjustPrototypeQty = function (index, delta) {
    const items = readItems();
    if (!items[index]) return;
    items[index].qty = Math.max(1, (items[index].qty || 1) + delta);
    writeItems(items);
    window.renderPrototypeCartExtras();
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.updatePrototypeCartBadges();
    window.renderPrototypeCartExtras();
  });
})();
