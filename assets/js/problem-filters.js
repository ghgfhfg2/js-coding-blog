(function () {
  const searchInput = document.getElementById('problem-search');
  const trackFilter = document.getElementById('track-filter');
  const difficultyFilter = document.getElementById('difficulty-filter');
  const topicResetButton = document.getElementById('topic-reset');
  const topicChips = Array.from(document.querySelectorAll('.topic-chip'));
  const problemGrid = document.getElementById('problem-grid');
  const problemCount = document.getElementById('problem-count');
  const emptyState = document.getElementById('problem-empty');

  if (!searchInput || !trackFilter || !difficultyFilter || !problemGrid) return;

  const cards = Array.from(problemGrid.querySelectorAll('.problem-card'));
  let activeTopic = 'all';

  searchInput.addEventListener('input', applyFilters);
  trackFilter.addEventListener('change', applyFilters);
  difficultyFilter.addEventListener('change', applyFilters);

  topicChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      activeTopic = chip.dataset.topic || 'all';
      syncTopicChips();
      applyFilters();
    });
  });

  if (topicResetButton) {
    topicResetButton.addEventListener('click', () => {
      activeTopic = 'all';
      syncTopicChips();
      applyFilters();
    });
  }

  syncTopicChips();
  applyFilters();

  function syncTopicChips() {
    topicChips.forEach((chip) => {
      chip.classList.toggle('is-active', (chip.dataset.topic || 'all') === activeTopic);
    });
  }

  function applyFilters() {
    const keyword = searchInput.value.trim().toLowerCase();
    const track = trackFilter.value;
    const difficulty = difficultyFilter.value;
    const topic = activeTopic;

    let visibleCount = 0;

    cards.forEach((card) => {
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
      const visible = matchesKeyword && matchesTrack && matchesDifficulty && matchesTopic;

      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount += 1;
    });

    problemCount.textContent = topic === 'all'
      ? `총 ${visibleCount}개 문제 표시 중`
      : `주제 '${topic}' 기준 ${visibleCount}개 문제 표시 중`;
    emptyState.classList.toggle('is-hidden', visibleCount !== 0);
  }
})();
