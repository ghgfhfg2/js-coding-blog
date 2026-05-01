---
layout: default
title: 홈
seo_title: "JS 코딩테스트 문제 풀이 · 알고리즘 연습 · JavaScript 메서드 학습 | JS Coding Blog"
description: "자바스크립트 코딩테스트 문제 풀이, JS 알고리즘 연습, JavaScript 메서드 학습 문제를 카테고리별로 탐색할 수 있는 학습 대시보드"
---

{% assign today_problems = site.problems | where: 'track', 'today' | sort: 'order' %}
{% assign algorithm_problems = site.problems | where: 'track', 'algorithm' | sort: 'order' %}
{% assign js_basic_problems = site.problems | where: 'track', 'js-basic' | sort: 'order' %}
{% assign total_count = site.problems | size %}
{% assign featured_today = today_problems | first %}
{% assign featured_algorithm = algorithm_problems | first %}
{% assign featured_basic = js_basic_problems | first %}
{% assign featured = site.problems | sort: 'order' %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "JS Coding Blog",
  "url": "https://js-coding.sooyadev.com/",
  "description": "자바스크립트 코딩테스트 문제 풀이, JS 알고리즘 연습, JavaScript 메서드 학습 문제를 카테고리별로 탐색할 수 있는 학습 대시보드",
  "inLanguage": "ko-KR"
}
</script>

<section class="hero-section hero-section--dashboard">
  <div class="hero-copy">
    <p class="eyebrow">Category-first JavaScript Practice</p>
    <h1>자바스크립트 코딩테스트 문제를 카테고리별로 풀고, 알고리즘 감각과 JS 기본기를 함께 쌓는 대시보드</h1>
    <p class="hero-lead">
      JS 코딩테스트 문제 풀이를 오늘의 코테, 알고리즘 연습, JavaScript 메서드 학습 흐름으로 나눠서 탐색할 수 있어요.
      자바스크립트 입문자부터 코테 연습이 필요한 학습자까지 바로 문제를 골라 실습할 수 있습니다.
    </p>

    <div class="hero-actions">
      <a class="button-link button-link--primary" href="/today/">오늘의 코테 시작</a>
      <a class="button-link button-link--secondary" href="/algorithm/">알고리즘 카테고리 보기</a>
      <a class="button-link button-link--ghost" href="/js-basic/">JS 메서드 학습 보기</a>
    </div>
  </div>

  <div class="hero-panel">
    <div class="hero-panel__card hero-panel__card--stats">
      <span class="hero-panel__label">NOW LIVE</span>
      <h2>한눈에 보기</h2>
      <div class="dashboard-stats-grid">
        <article class="dashboard-stat-card">
          <span class="dashboard-stat-card__label">전체 문제</span>
          <strong class="dashboard-stat-card__value">{{ total_count }}</strong>
        </article>
        <article class="dashboard-stat-card">
          <span class="dashboard-stat-card__label">오늘의 코테</span>
          <strong class="dashboard-stat-card__value">{{ today_problems | size }}</strong>
        </article>
        <article class="dashboard-stat-card">
          <span class="dashboard-stat-card__label">알고리즘</span>
          <strong class="dashboard-stat-card__value">{{ algorithm_problems | size }}</strong>
        </article>
        <article class="dashboard-stat-card">
          <span class="dashboard-stat-card__label">JS 메서드</span>
          <strong class="dashboard-stat-card__value">{{ js_basic_problems | size }}</strong>
        </article>
      </div>
      <p class="muted hero-panel__foot">처음이라면 오늘의 코테 → 알고리즘 → JS 메서드 학습 순서로 둘러보는 걸 추천해요.</p>
    </div>
  </div>
</section>

<section class="home-section home-section--feature-strip">
  <div class="section-heading">
    <h2>오늘 바로 시작할 추천 루트</h2>
    <p>카테고리마다 첫 문제를 하나씩 골라두었습니다. 막막할 때는 여기서 바로 시작해도 좋아요.</p>
  </div>

  <div class="featured-route-grid">
    <article class="featured-route-card featured-route-card--today">
      <div class="featured-route-card__icon">⚡</div>
      <div>
        <p class="dashboard-card__eyebrow">오늘의 코테 추천</p>
        <h3><a href="{{ featured_today.url }}">{{ featured_today.title }}</a></h3>
        <p>{{ featured_today.excerpt | strip_html | truncate: 90 }}</p>
      </div>
    </article>
    <article class="featured-route-card featured-route-card--algorithm">
      <div class="featured-route-card__icon">🧩</div>
      <div>
        <p class="dashboard-card__eyebrow">알고리즘 추천</p>
        <h3><a href="{{ featured_algorithm.url }}">{{ featured_algorithm.title }}</a></h3>
        <p>{{ featured_algorithm.excerpt | strip_html | truncate: 90 }}</p>
      </div>
    </article>
    <article class="featured-route-card featured-route-card--learning">
      <div class="featured-route-card__icon">📘</div>
      <div>
        <p class="dashboard-card__eyebrow">JS 메서드 추천</p>
        <h3><a href="{{ featured_basic.url }}">{{ featured_basic.title }}</a></h3>
        <p>{{ featured_basic.excerpt | strip_html | truncate: 90 }}</p>
      </div>
    </article>
  </div>
</section>

<section class="home-section">
  <div class="section-heading">
    <h2>학습 흐름 선택하기</h2>
    <p>각 카테고리는 목적이 다릅니다. 오늘의 기분과 학습 목적에 맞는 흐름으로 들어가 보세요.</p>
  </div>

  <div class="category-hub-grid">
    <article class="category-card category-card--today">
      <div class="category-card__head">
        <div class="category-card__icon">⚡</div>
        <p class="dashboard-card__eyebrow">TODAY TRACK</p>
        <h3>오늘의 코테</h3>
        <p>짧지만 감각을 깨우는 JavaScript 코딩테스트 문제를 중심으로, 매일 가볍게 도전하는 트랙입니다.</p>
      </div>
      <ul class="preview-problem-list">
        {% for problem in today_problems limit: 3 %}
          <li>
            <a href="{{ problem.url }}">{{ problem.title }}</a>
            <span>{{ problem.difficulty }} · {{ problem.topic }}</span>
          </li>
        {% endfor %}
      </ul>
      <a class="text-link" href="/today/">오늘의 코테 전체 보기 →</a>
    </article>

    <article class="category-card category-card--algorithm">
      <div class="category-card__head">
        <div class="category-card__icon">🧩</div>
        <p class="dashboard-card__eyebrow">ALGORITHM TRACK</p>
        <h3>알고리즘별 코테</h3>
        <p>문자열, 배열, 해시, 투 포인터 같은 유형 중심으로 자바스크립트 알고리즘 문제를 반복 연습하는 트랙입니다.</p>
      </div>
      <ul class="preview-problem-list">
        {% for problem in algorithm_problems limit: 3 %}
          <li>
            <a href="{{ problem.url }}">{{ problem.title }}</a>
            <span>{{ problem.difficulty }} · {{ problem.topic }}</span>
          </li>
        {% endfor %}
      </ul>
      <a class="text-link" href="/algorithm/">알고리즘 카테고리 보기 →</a>
    </article>

    <article class="category-card category-card--learning">
      <div class="category-card__head">
        <div class="category-card__icon">📘</div>
        <p class="dashboard-card__eyebrow">JS BASIC TRACK</p>
        <h3>JS 메서드 학습</h3>
        <p>JavaScript 메서드 설명, 사용 예시, 주의점까지 함께 익히는 학습형 트랙입니다.</p>
      </div>
      <ul class="preview-problem-list">
        {% for problem in js_basic_problems limit: 3 %}
          <li>
            <a href="{{ problem.url }}">{{ problem.title }}</a>
            <span>{{ problem.difficulty }} · {{ problem.topic }}</span>
          </li>
        {% endfor %}
      </ul>
      <a class="text-link" href="/js-basic/">JS 메서드 학습 보기 →</a>
    </article>
  </div>
</section>

<section class="home-section">
  <div class="section-heading">
    <h2>빠르게 시작하기</h2>
    <p>지금 바로 풀어볼 만한 대표 문제를 카테고리별로 골랐어요.</p>
  </div>

  <div class="spotlight-grid">
    {% for problem in featured limit: 6 %}
      <article class="spotlight-card">
        <div class="meta-row compact">
          <span class="pill">{{ problem.track }}</span>
          <span class="pill">{{ problem.difficulty }}</span>
          <span class="pill">{{ problem.topic }}</span>
        </div>
        <h3><a href="{{ problem.url }}">{{ problem.title }}</a></h3>
        <p>{{ problem.excerpt | strip_html | truncate: 110 }}</p>
        <a class="text-link" href="{{ problem.url }}">바로 풀기 →</a>
      </article>
    {% endfor %}
  </div>
</section>

<section class="home-section home-section--cta">
  <div class="section-heading">
    <h2>탐색 방식도 선택할 수 있어요</h2>
    <p>카테고리로 들어가도 좋고, 전체 문제 목록에서 검색과 필터로 원하는 JavaScript 코딩테스트 문제를 찾을 수도 있습니다.</p>
  </div>

  <div class="quick-links quick-links--wide">
    <a class="quick-link" href="/today/">오늘의 코테 모아보기</a>
    <a class="quick-link" href="/algorithm/">알고리즘 카테고리 모아보기</a>
    <a class="quick-link" href="/js-basic/">JS 메서드 학습 모아보기</a>
    <a class="quick-link" href="/problems/">전체 문제 + 필터 보기</a>
  </div>
</section>
