document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.highlight-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Sync active classes on filter button hub
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const activeFilter = button.getAttribute('data-filter');

      // 2. Filter cards immediately using state classes
      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (activeFilter === 'all' || cardCategory === activeFilter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});