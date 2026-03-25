---
layout: default
title: 홈
---

<section class="hero-section">
  <div class="hero-copy">
    <p class="eyebrow">Curated JavaScript Coding Practice</p>
    <h1>매일 풀고, 개념을 익히고, 자바스크립트 감각까지 함께 쌓는 코딩 연습 공간</h1>
    <p class="hero-lead">
      이곳은 단순히 문제만 모아둔 코테 사이트가 아니라,
      <strong>도전</strong>, <strong>알고리즘 학습</strong>, <strong>JS 메서드 학습</strong>을
      각 흐름에 맞게 큐레이션한 JavaScript 코딩 블로그입니다.
    </p>

    <div class="hero-actions">
      <a class="button-link button-link--primary" href="{{ '/problems/' | relative_url }}">문제 보러 가기</a>
      <a class="button-link button-link--secondary" href="{{ '/problems/' | relative_url }}#problem-grid">바로 탐색하기</a>
    </div>
  </div>

  <div class="hero-panel">
    <div class="hero-panel__card">
      <span class="hero-panel__label">NOW LIVE</span>
      <h2>세 가지 학습 흐름</h2>
      <ul>
        <li>오늘의 코테 — 짧고 신선한 도전</li>
        <li>알고리즘별 코테 — 개념과 유형 중심 학습</li>
        <li>JS 메서드 학습 — 메서드 설명 + 연습문제</li>
      </ul>
    </div>
  </div>
</section>

<section class="dashboard-grid">
  <article class="dashboard-card dashboard-card--today">
    <p class="dashboard-card__eyebrow">TODAY TRACK</p>
    <h2>오늘의 코테</h2>
    <p>
      매일 한 문제씩 가볍게 도전할 수 있는 트랙.
      짧아도 한 번 더 생각하게 만드는 문제를 중심으로 큐레이션합니다.
    </p>
    <ul>
      <li>초급 / 중급 / 상급 난이도 운영</li>
      <li>도전감과 재방문 흐름 강화</li>
      <li>문제 자체의 재미를 우선</li>
    </ul>
  </article>

  <article class="dashboard-card dashboard-card--algorithm">
    <p class="dashboard-card__eyebrow">ALGORITHM TRACK</p>
    <h2>알고리즘별 코테</h2>
    <p>
      문자열, 배열, 그리디 같은 주제별로 묶어서
      초중급 학습자가 개념과 풀이 감각을 함께 익힐 수 있게 구성합니다.
    </p>
    <ul>
      <li>유형별 반복 훈련</li>
      <li>힌트와 해설의 교육적 가치 강화</li>
      <li>실력 향상용 기본 축</li>
    </ul>
  </article>

  <article class="dashboard-card dashboard-card--learning">
    <p class="dashboard-card__eyebrow">JS BASIC TRACK</p>
    <h2>JS 메서드 학습</h2>
    <p>
      문제만 던지는 대신 메서드 설명, 사용 예시, 주의할 점까지 함께 제공하는
      학습형 레슨 + 연습문제 트랙입니다.
    </p>
    <ul>
      <li><code>includes()</code>, <code>split()</code>, <code>map()</code> 같은 메서드 학습</li>
      <li>초보자 친화적 설명 중심</li>
      <li>코테 입문 전 언어 적응에 최적화</li>
    </ul>
  </article>
</section>

<section class="home-section">
  <div class="section-heading">
    <h2>이 블로그의 방향</h2>
    <p>문제를 많이 쌓는 것보다, 어떤 흐름으로 배우고 도전하게 만들지에 더 집중합니다.</p>
  </div>

  <div class="home-info-grid">
    <article class="info-card">
      <h3>큐레이션 중심</h3>
      <p>문제 수보다 문제의 맥락과 배치를 중요하게 봅니다. 각 문제는 트랙의 목적에 맞게 배치됩니다.</p>
    </article>
    <article class="info-card">
      <h3>학습 친화적</h3>
      <p>특히 JS 메서드 학습 트랙은 레슨형 구조로 설계되어, 초보자도 맥락을 따라가기 쉽게 만듭니다.</p>
    </article>
    <article class="info-card">
      <h3>브라우저에서 바로 실습</h3>
      <p>에디터, 예제 테스트, 커스텀 테스트, 시간초과 표시까지 한 페이지 안에서 바로 확인할 수 있습니다.</p>
    </article>
  </div>
</section>

<section class="home-section home-section--cta">
  <div class="section-heading">
    <h2>바로 시작하기</h2>
    <p>원하는 방식으로 시작하면 됩니다. 오늘은 도전할지, 개념을 다질지, 메서드를 배울지 선택해보세요.</p>
  </div>

  <div class="quick-links">
    <a class="quick-link" href="{{ '/problems/' | relative_url }}">전체 문제 보기</a>
    <a class="quick-link" href="{{ '/problems/' | relative_url }}">트랙별로 탐색하기</a>
    <a class="quick-link" href="{{ '/problems/count-vowels/' | relative_url }}">JS 학습형 문제 예시 보기</a>
  </div>
</section>
