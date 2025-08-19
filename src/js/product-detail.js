
const params = new URLSearchParams(location.search);
const id = Number(params.get('id'));
const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

document.getElementById('crumbName').textContent = product.name;

const el = document.getElementById('detail');
el.innerHTML = `
  <div><img src="${product.image}" alt="${product.name}"/></div>
  <div>
    <h1>${product.name}</h1>
    <div class="rating" aria-label="rating">${stars(product.rating)}</div>
    <div class="price" style="font-size:22px;margin:6px 0 14px">${money(product.price)}</div>
    <p class="note">Your new cooking BFF! You can add this to virtually everything. Try it on rice, on meat or tofu, in your burger, ramen and pretty much anything.</p>
    <div class="cta">
      <button id="addBtn" class="btn secondary">Add to Cart</button>
      <a class="btn" href="order.html" id="buyBtn">Buy Now</a>
    </div>
    <div class="small">32 Reviews</div>
  </div>
`;

document.getElementById('addBtn').addEventListener('click', () => {
  incrementCart(1);
  const b = document.getElementById('addBtn');
  b.textContent = 'Added to Cart';
  setTimeout(() => b.textContent = 'Add to Cart', 1200);
});
