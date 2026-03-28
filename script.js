/* ============================================================
   KepinganBarang — Category Filter + Search Script
   ============================================================ */

(function () {
  const catBtns     = document.querySelectorAll('.cat-btn');
  const cards       = document.querySelectorAll('.product-card');
  const countEl     = document.getElementById('count-display');
  const searchInput = document.getElementById('search-input');

  let activeCategory = 'semua';

  function filterProducts() {
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visible = 0;

    cards.forEach((card, i) => {
      const categoryMatch = activeCategory === 'semua' || card.dataset.category === activeCategory;
      const title = card.querySelector('.card-price')?.textContent.toLowerCase() || '';
      const searchMatch = keyword === '' || title.includes(keyword);
      const show = categoryMatch && searchMatch;

      if (show) {
        card.classList.remove('hidden');
        card.style.animationDelay = `${i * 0.05}s`;
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = '';
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countEl) countEl.textContent = visible;
  }

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      filterProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }

  filterProducts();
})();