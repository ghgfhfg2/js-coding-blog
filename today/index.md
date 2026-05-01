---
layout: default
title: 오늘의 코테
seo_title: "오늘의 코테 · 자바스크립트 코딩테스트 문제 모음 | JS Coding Blog"
description: "오늘 바로 풀어볼 수 있는 자바스크립트 코딩테스트 문제를 모아둔 카테고리. JS 입문자부터 코테 연습용까지 가볍게 도전할 수 있습니다."
permalink: /today/
---

{% assign problems = site.problems | where: 'track', 'today' | sort: 'order' %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "오늘의 코테",
  "url": "https://js-coding.sooyadev.com/today/",
  "description": "오늘 바로 풀어볼 수 있는 자바스크립트 코딩테스트 문제를 모아둔 카테고리",
  "inLanguage": "ko-KR"
}
</script>

<section class="category-hero category-hero--today">
  <p class="eyebrow">TODAY TRACK</p>
  <h1>오늘의 코테</h1>
  <p class="section-lead">오늘 바로 풀어볼 수 있는 자바스크립트 코딩테스트 문제를 모아둔 카테고리입니다. 짧게 한 문제 풀고 감각을 깨우는 데 초점을 둔 트랙이라 부담 없이 시작하기 좋습니다.</p>
</section>

<p id="problem-count" class="muted problem-count"></p>

<div id="problem-grid" class="category-page-grid" data-page-size="12">
  {% for problem in problems %}
    <article class="problem-card"
      data-title="{{ problem.title | downcase | escape }}"
      data-description="{{ problem.excerpt | strip_html | strip_newlines | downcase | escape }}"
      data-track="{{ problem.track | downcase }}"
      data-difficulty="{{ problem.difficulty | downcase }}"
      data-topic="{{ problem.topic | downcase }}"
      data-tags="{{ problem.tags | join: ' ' | downcase | escape }}">
      <div class="problem-card__body">
        <div class="problem-card__topline">
          <div class="meta-row compact">
            <span class="pill">{{ problem.track }}</span>
            <span class="pill">{{ problem.difficulty }}</span>
            <span class="pill">{{ problem.topic }}</span>
          </div>
        </div>
        <h2 class="problem-card__title"><a href="{{ problem.url }}">{{ problem.title }}</a></h2>
        <p class="problem-card__description">{{ problem.excerpt | strip_html | truncate: 120 }}</p>
      </div>
      <div class="problem-card__footer">
        <a class="text-link" href="{{ problem.url }}">문제 풀러 가기 →</a>
      </div>
    </article>
  {% endfor %}
</div>

<div id="problem-empty" class="empty-state is-hidden">조건에 맞는 문제가 없습니다.</div>
<div id="problem-pagination" class="pagination is-hidden"></div>

<script src="/assets/js/problem-filters.js" defer></script>
