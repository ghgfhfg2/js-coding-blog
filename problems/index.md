---
layout: default
title: 전체 문제
description: 카테고리와 필터로 JavaScript 코딩 문제를 탐색하는 전체 문제 목록
permalink: /problems/
---

# 전체 문제

<p class="section-lead">카테고리별로 둘러본 뒤, 여기서 검색과 필터로 원하는 문제를 빠르게 찾을 수 있어요.</p>

<div class="quick-links quick-links--mini quick-links--top">
  <a class="quick-link" href="/today/">오늘의 코테</a>
  <a class="quick-link" href="/algorithm/">알고리즘별 코테</a>
  <a class="quick-link" href="/js-basic/">JS 메서드 학습</a>
</div>

<div class="filter-panel filter-panel--wide">
  <div class="filter-group filter-group--search">
    <label class="filter-label" for="problem-search">검색</label>
    <input id="problem-search" class="filter-input" type="search" placeholder="문제 제목이나 설명 검색" />
  </div>

  <div class="filter-group">
    <label class="filter-label" for="track-filter">카테고리</label>
    <select id="track-filter" class="filter-select">
      <option value="all">전체</option>
      <option value="today">오늘의 코테</option>
      <option value="algorithm">알고리즘별 코테</option>
      <option value="js-basic">JS 메서드 학습</option>
    </select>
  </div>

  <div class="filter-group">
    <label class="filter-label" for="difficulty-filter">난이도</label>
    <select id="difficulty-filter" class="filter-select">
      <option value="all">전체</option>
      <option value="easy">easy</option>
      <option value="medium">medium</option>
      <option value="hard">hard</option>
    </select>
  </div>
</div>

<div class="topic-filter-panel card">
  <div class="topic-filter-head">
    <div>
      <p class="filter-label">주제</p>
      <p class="muted topic-filter-copy">카테고리를 고른 뒤 주제까지 좁혀서 문제를 찾아보세요.</p>
    </div>
    <button id="topic-reset" class="topic-reset-btn" type="button">주제 전체</button>
  </div>

  <div id="topic-chip-list" class="topic-chip-list" aria-label="인기 주제 필터">
    <button class="topic-chip is-active" type="button" data-topic="all">전체</button>
    {% assign topics = site.problems | map: 'topic' | uniq | sort %}
    {% for topic in topics limit: 8 %}
      {% if topic %}<button class="topic-chip" type="button" data-topic="{{ topic }}">{{ topic }}</button>{% endif %}
    {% endfor %}
  </div>

  {% if topics.size > 8 %}
    <details class="content-toggle topic-more">
      <summary class="content-toggle__summary">더 많은 주제 보기</summary>
      <div class="topic-chip-list topic-chip-list--all" aria-label="전체 주제 필터">
        {% for topic in topics offset: 8 %}
          {% if topic %}<button class="topic-chip topic-chip--subtle" type="button" data-topic="{{ topic }}">{{ topic }}</button>{% endif %}
        {% endfor %}
      </div>
    </details>
  {% endif %}
</div>

<section id="archive-summary" class="archive-summary card is-hidden" aria-live="polite">
  <div class="section-heading">
    <h2>내 아카이브</h2>
    <p id="archive-summary-copy" class="muted">아직 기록된 풀이가 없습니다. 문제를 하나 풀어보세요.</p>
  </div>
  <div class="archive-stats">
    <article class="archive-stat">
      <span class="archive-stat__label">푼 문제 수</span>
      <strong id="archive-solved-count" class="archive-stat__value">0</strong>
    </article>
    <article class="archive-stat">
      <span class="archive-stat__label">마지막으로 푼 문제</span>
      <strong id="archive-last-title" class="archive-stat__value">없음</strong>
    </article>
    <article class="archive-stat">
      <span class="archive-stat__label">최근 풀이 시각</span>
      <strong id="archive-last-date" class="archive-stat__value">-</strong>
    </article>
  </div>

  <div class="archive-toolbar">
    <label class="archive-toggle">
      <input id="solved-only-toggle" type="checkbox" />
      <span>푼 문제만 보기</span>
    </label>
  </div>

  <div class="recent-solved">
    <div class="section-heading compact-heading">
      <h3>최근 푼 문제</h3>
      <p class="muted">최근 기록 5개까지 보여줘요.</p>
    </div>
    <ul id="recent-solved-list" class="recent-solved-list"></ul>
  </div>
</section>

<p id="problem-count" class="muted problem-count"></p>

<div id="problem-grid" class="problem-grid">
  {% assign sorted_problems = site.problems | sort: 'order' %}
  {% for problem in sorted_problems %}
    <article
      class="problem-card"
      data-problem-id="{{ problem.slug | default: problem.url | slugify }}"
      data-problem-title="{{ problem.title | escape }}"
      data-problem-url="{{ problem.url }}"
      data-title="{{ problem.title | downcase | escape }}"
      data-description="{{ problem.excerpt | strip_html | strip_newlines | downcase | escape }}"
      data-track="{{ problem.track | downcase }}"
      data-difficulty="{{ problem.difficulty | downcase }}"
      data-topic="{{ problem.topic | downcase }}"
      data-tags="{{ problem.tags | join: ' ' | downcase | escape }}">
      <div class="problem-card__body">
        <div class="problem-card__topline">
          <div class="meta-row compact">
            {% if problem.track %}<span class="pill">{{ problem.track }}</span>{% endif %}
            {% if problem.difficulty %}<span class="pill">{{ problem.difficulty }}</span>{% endif %}
            {% if problem.topic %}<span class="pill">{{ problem.topic }}</span>{% endif %}
          </div>
          <span class="solved-badge is-hidden">해결 완료</span>
        </div>
        <h2 class="problem-card__title"><a href="{{ problem.url }}">{{ problem.title }}</a></h2>
        <p class="problem-card__description">
          {% if problem.excerpt %}
            {{ problem.excerpt | strip_html | truncate: 120 }}
          {% else %}
            문제를 읽고 브라우저에서 바로 JavaScript로 풀어볼 수 있습니다.
          {% endif %}
        </p>
      </div>
      <div class="problem-card__footer">
        <a class="text-link" href="{{ problem.url }}">문제 풀러 가기 →</a>
      </div>
    </article>
  {% endfor %}
</div>

<div id="problem-empty" class="empty-state is-hidden">조건에 맞는 문제가 없습니다. 검색어나 필터를 바꿔보세요.</div>

<script src="/assets/js/problem-filters.js" defer></script>
