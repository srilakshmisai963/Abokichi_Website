
function getCartCount() {
  return parseInt(localStorage.getItem('cartCount') || '0', 10);
}

function setCartCount(n) {
  localStorage.setItem('cartCount', String(n)); updateCartCount();
}

function incrementCart(n = 1) {
  setCartCount(getCartCount() + n);
}

function updateCartCount() {
  document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = getCartCount());
}

document.addEventListener('DOMContentLoaded', updateCartCount);

function money(v) { return `$${v.toFixed(2)}`; }

function stars(n) { return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n); }
