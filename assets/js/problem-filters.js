(function () {
  const searchInput = document.getElementById('problem-search');
  const trackFilter = document.getElementById('track-filter');
  const difficultyFilter = document.getElementById('difficulty-filter');
  const topicResetButton = document.getElementById('topic-reset');
  const topicChips = Array.from(document.querySelectorAll('.topic-chip'));
  const problemGrid = document.getElementById('problem-grid');
  const problemCount = document.getElementById('problem-count');
  const emptyState = document.getElementById('problem-empty');
  const archiveSummary = document.getElementById('archive-summary');
  const archiveSummaryCopy = document.getElementById('archive-summary-copy');
  const archiveSolvedCount = document.getElementById('archive-solved-count');
  const archiveLastTitle = document.getElementById('archive-last-title');
  const archiveLastDate = document.getElementById('archive-last-date');
  const recentSolvedList = document.getElementById('recent-solved-list');
  const solvedOnlyToggle = document.getElementById('solved-only-toggle');
  const archiveKey = 'js-coding-blog:archive';

  if (!searchInput || !trackFilter || !difficultyFilter || !problemGrid) return;

  const cards = Array.from(problemGrid.querySelectorAll('.problem-card'));
  let activeTopic = 'all';
  const archive = readArchive();

  markSolvedCards();
  renderArchiveSummary();

  searchInput.addEventListener('input', applyFilters);
  trackFilter.addEventListener('change', applyFilters);
  difficultyFilter.addEventListener('change', applyFilters);

  if (solvedOnlyToggle) {
    solvedOnlyToggle.addEventListener('change', applyFilters);
  }

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
    const solvedOnly = Boolean(solvedOnlyToggle && solvedOnlyToggle.checked);

    let visibleCount = 0;

    cards.forEach((card) => {
      const title = card.dataset.title || '';
      const description = card.dataset.description || '';
      const tags = card.dataset.tags || '';
      const cardTrack = card.dataset.track || '';
      const cardDifficulty = card.dataset.difficulty || '';
      const cardTopic = card.dataset.topic || '';
      const cardProblemId = card.dataset.problemId || '';
      const isSolved = Boolean(archive.items[cardProblemId]);

      const matchesKeyword = !keyword || title.includes(keyword) || description.includes(keyword) || tags.includes(keyword);
      const matchesTrack = track === 'all' || cardTrack === track;
      const matchesDifficulty = difficulty === 'all' || cardDifficulty === difficulty;
      const matchesTopic = topic === 'all' || cardTopic === topic;
      const matchesSolvedOnly = !solvedOnly || isSolved;
      const visible = matchesKeyword && matchesTrack && matchesDifficulty && matchesTopic && matchesSolvedOnly;

      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount += 1;
    });

    if (solvedOnly) {
      problemCount.textContent = `푼 문제만 보기 기준 ${visibleCount}개 문제 표시 중`;
    } else if (topic === 'all') {
      problemCount.textContent = `총 ${visibleCount}개 문제 표시 중`;
    } else {
      problemCount.textContent = `주제 '${topic}' 기준 ${visibleCount}개 문제 표시 중`;
    }

    emptyState.classList.toggle('is-hidden', visibleCount !== 0);
  }

  function markSolvedCards() {
    cards.forEach((card) => {
      const problemId = card.dataset.problemId || '';
      const solvedBadge = card.querySelector('.solved-badge');
      const item = archive.items[problemId];

      if (!solvedBadge) return;

      solvedBadge.classList.toggle('is-hidden', !item);
      if (item && item.solvedAt) {
        solvedBadge.title = `최근 풀이: ${formatDate(item.solvedAt)}`;
      }
    });
  }

  function renderArchiveSummary() {
    if (!archiveSummary || !archiveSummaryCopy || !archiveSolvedCount || !archiveLastTitle || !archiveLastDate) return;

    const items = getSortedItems();

    if (items.length === 0) {
      archiveSummary.classList.add('is-hidden');
      return;
    }

    const lastItem = items[0];
    archiveSummary.classList.remove('is-hidden');
    archiveSolvedCount.textContent = String(items.length);
    archiveLastTitle.textContent = lastItem && lastItem.title ? lastItem.title : '없음';
    archiveLastDate.textContent = lastItem && lastItem.solvedAt ? formatDate(lastItem.solvedAt) : '-';
    archiveSummaryCopy.textContent = `브라우저에 저장된 내 풀이 기록이에요. 지금까지 ${items.length}문제를 풀었어요.`;
    renderRecentSolved(items);
  }

  function renderRecentSolved(items) {
    if (!recentSolvedList) return;

    recentSolvedList.innerHTML = '';

    items.slice(0, 5).forEach((item) => {
      const li = document.createElement('li');
      li.className = 'recent-solved-item';

      const link = document.createElement('a');
      link.className = 'recent-solved-item__link';
      link.href = item.url || '#';
      link.textContent = item.title || item.id || '이름 없는 문제';

      const meta = document.createElement('span');
      meta.className = 'recent-solved-item__meta';
      meta.textContent = item.solvedAt ? formatDate(item.solvedAt) : '-';

      li.appendChild(link);
      li.appendChild(meta);
      recentSolvedList.appendChild(li);
    });
  }

  function getSortedItems() {
    return Object.values(archive.items || {}).sort((a, b) => {
      const aTime = a && a.solvedAt ? new Date(a.solvedAt).getTime() : 0;
      const bTime = b && b.solvedAt ? new Date(b.solvedAt).getTime() : 0;
      return bTime - aTime;
    });
  }

  function readArchive() {
    try {
      const raw = localStorage.getItem(archiveKey);
      if (!raw) return { items: {}, updatedAt: null };

      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return { items: {}, updatedAt: null };

      return {
        items: parsed.items && typeof parsed.items === 'object' ? parsed.items : {},
        updatedAt: parsed.updatedAt || null,
      };
    } catch (error) {
      return { items: {}, updatedAt: null };
    }
  }

  function formatDate(value) {
    try {
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(value));
    } catch (error) {
      return value;
    }
  }
})();
