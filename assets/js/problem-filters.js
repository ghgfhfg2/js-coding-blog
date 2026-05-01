(function () {
  const searchInput = document.getElementById('problem-search');
  const trackFilter = document.getElementById('track-filter');
  const difficultyFilter = document.getElementById('difficulty-filter');
  const topicFilter = document.getElementById('topic-filter');
  const problemGrid = document.getElementById('problem-grid');
  const problemCount = document.getElementById('problem-count');
  const emptyState = document.getElementById('problem-empty');
  const pagination = document.getElementById('problem-pagination');

  if (!problemGrid) return;

  const cards = Array.from(problemGrid.querySelectorAll('.problem-card'));
  const pageSize = Number(problemGrid.dataset.pageSize || 12);
  let currentPage = 1;

  if (searchInput) searchInput.addEventListener('input', handleFilterChange);
  if (trackFilter) trackFilter.addEventListener('change', handleFilterChange);
  if (difficultyFilter) difficultyFilter.addEventListener('change', handleFilterChange);
  if (topicFilter) topicFilter.addEventListener('change', handleFilterChange);

  applyFilters();

  function handleFilterChange() {
    currentPage = 1;
    applyFilters();
  }

  function applyFilters() {
    const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const track = trackFilter ? trackFilter.value : 'all';
    const difficulty = difficultyFilter ? difficultyFilter.value : 'all';
    const topic = topicFilter ? topicFilter.value : 'all';

    const visibleCards = cards.filter((card) => {
      const title = card.dataset.title || '';
      const description = card.dataset.description || '';
      const tags = card.dataset.tags || '';
      const cardTrack = card.dataset.track || '';
      const cardDifficulty = card.dataset.difficulty || '';
      const cardTopic = card.dataset.topic || '';

      const matchesKeyword = !keyword || title.includes(keyword) || description.includes(keyword) || tags.includes(keyword);
      const matchesTrack = track === 'all' || cardTrack === track;
      const matchesDifficulty = difficulty === 'all' || cardDifficulty === difficulty;
      const matchesTopic = topic === 'all' || cardTopic === topic;

      return matchesKeyword && matchesTrack && matchesDifficulty && matchesTopic;
    });

    const totalPages = Math.max(1, Math.ceil(visibleCards.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    cards.forEach((card) => {
      card.style.display = 'none';
    });

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    visibleCards.slice(start, end).forEach((card) => {
      card.style.display = '';
    });

    if (problemCount) {
      const startIndex = visibleCards.length === 0 ? 0 : start + 1;
      const endIndex = Math.min(end, visibleCards.length);
      problemCount.textContent = visibleCards.length === 0
        ? '총 0개 문제'
        : `총 ${visibleCards.length}개 중 ${startIndex}-${endIndex} 표시`;
    }

    if (emptyState) {
      emptyState.classList.toggle('is-hidden', visibleCards.length !== 0);
    }

    renderPagination(totalPages, visibleCards.length);
  }

  function renderPagination(totalPages, visibleCount) {
    if (!pagination) return;

    if (visibleCount === 0 || totalPages <= 1) {
      pagination.innerHTML = '';
      pagination.classList.add('is-hidden');
      return;
    }

    pagination.classList.remove('is-hidden');

    const buttons = [];
    buttons.push(createButton('이전', currentPage - 1, currentPage === 1));

    for (let page = 1; page <= totalPages; page += 1) {
      if (
        page === 1 ||
        page === totalPages ||
        Math.abs(page - currentPage) <= 1
      ) {
        buttons.push(createButton(String(page), page, false, page === currentPage));
      } else if (
        page === currentPage - 2 ||
        page === currentPage + 2
      ) {
        buttons.push('<span class="pagination-ellipsis">…</span>');
      }
    }

    buttons.push(createButton('다음', currentPage + 1, currentPage === totalPages));
    pagination.innerHTML = buttons.join('');

    pagination.querySelectorAll('button[data-page]').forEach((button) => {
      button.addEventListener('click', () => {
        currentPage = Number(button.dataset.page);
        applyFilters();
        problemGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function createButton(label, page, disabled, active) {
    const classes = ['pagination-button'];
    if (active) classes.push('is-active');
    return `<button type="button" class="${classes.join(' ')}" data-page="${page}" ${disabled ? 'disabled' : ''}>${label}</button>`;
  }
})();
