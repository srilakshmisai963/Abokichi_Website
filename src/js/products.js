
const grid = document.getElementById('grid');
const sortSelect = document.getElementById('sortSelect');
const filterPanel = document.getElementById('filterPanel');
document.getElementById('filterToggle').addEventListener('click', () => {
  filterPanel.style.display = filterPanel.style.display === 'block' ? 'none' : 'block';
});

function getChecked(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(i => i.value);
}
function getRatingMin() {
  const el = document.querySelector('input[name="rating"]:checked');
  return el ? Number(el.value) : 0;
}

function applyFilters(data) {
  const cats = getChecked('category');
  const types = getChecked('type');
  const ratingMin = getRatingMin();
  return data.filter(p => {
    const okCat = cats.length ? cats.includes(p.category) : true;
    const okType = types.length ? types.includes(p.type) : true;
    const okRating = p.rating >= ratingMin;
    return okCat && okType && okRating;
  });
}
function applySort(data) {
  const v = sortSelect.value;
  const d = [...data];
  switch (v) {
    case 'az': d.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'za': d.sort((a, b) => b.name.localeCompare(a.name)); break;
    case 'price-asc': d.sort((a, b) => a.price - b.price); break;
    case 'price-desc': d.sort((a, b) => b.price - a.price); break;
    case 'rating-desc': d.sort((a, b) => b.rating - a.rating); break;
  }
  return d;
}

function render() {
  const filtered = applyFilters(PRODUCTS);
  const sorted = applySort(filtered);
  grid.innerHTML = sorted.map(p => `
    <a class="card" href="product.html?id=${p.id}" aria-label="${p.name}">
      <img src="${p.image}" alt="${p.name}"/>
      <div class="p16">
        <h3>${p.name}</h3>
        <div class="rating">${stars(p.rating)}</div>
        <div class="price">${money(p.price)}</div>
      </div>
    </a>
  `).join('');
}

document.addEventListener('change', e => {
  if (e.target.matches('input[name="category"], input[name="type"], input[name="rating"]')) render();
});
sortSelect.addEventListener('change', render);

render();
