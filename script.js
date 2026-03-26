/* ============================================================
   KepinganBarang — Category Filter Script
   ============================================================ */

(function () {
  const catBtns   = document.querySelectorAll('.cat-btn');
  const cards     = document.querySelectorAll('.product-card');
  const countEl   = document.getElementById('count-display');

  function filterProducts(category) {
    let visible = 0;

    cards.forEach((card, i) => {
      const match = category === 'semua' || card.dataset.category === category;

      if (match) {
        card.classList.remove('hidden');
        // staggered re-entry animation
        card.style.animationDelay = `${i * 0.05}s`;
        card.style.animation = 'none';
        void card.offsetWidth; // reflow trick
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
      filterProducts(btn.dataset.category);
    });
  });

  // Initial count
  filterProducts('semua');
})();
