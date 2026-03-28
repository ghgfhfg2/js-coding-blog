(function () {
  const archiveKey = 'js-coding-blog:archive';
  const root = document.querySelector('[data-home-archive]');
  if (!root) return;

  const solvedCount = root.querySelector('[data-home-solved-count]');
  const latestTitle = root.querySelector('[data-home-latest-title]');
  const latestDate = root.querySelector('[data-home-latest-date]');
  const progressCopy = root.querySelector('[data-home-progress-copy]');
  const recentList = root.querySelector('[data-home-recent-list]');

  const archive = readArchive();
  const items = Object.values(archive.items || {}).sort((a, b) => {
    const aTime = a?.solvedAt ? new Date(a.solvedAt).getTime() : 0;
    const bTime = b?.solvedAt ? new Date(b.solvedAt).getTime() : 0;
    return bTime - aTime;
  });

  solvedCount.textContent = String(items.length);

  if (!items.length) {
    latestTitle.textContent = '아직 없음';
    latestDate.textContent = '-';
    progressCopy.textContent = '아직 푼 문제가 없어요. 오늘의 코테부터 한 문제 시작해보세요.';
    return;
  }

  latestTitle.textContent = items[0].title || '최근 풀이 문제';
  latestDate.textContent = formatDate(items[0].solvedAt);
  progressCopy.textContent = `지금까지 ${items.length}문제를 풀었어요. 최근 풀이 흐름을 이어가 보세요.`;

  if (recentList) {
    recentList.innerHTML = '';
    items.slice(0, 3).forEach((item) => {
      const li = document.createElement('li');
      li.className = 'recent-mini-item';
      li.innerHTML = `<a href="${item.url || '#'}">${item.title || item.id || '이름 없는 문제'}</a><span>${formatDate(item.solvedAt)}</span>`;
      recentList.appendChild(li);
    });
  }

  function readArchive() {
    try {
      const raw = localStorage.getItem(archiveKey);
      if (!raw) return { items: {}, updatedAt: null };
      const parsed = JSON.parse(raw);
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
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(value));
    } catch (error) {
      return value || '-';
    }
  }
})();
