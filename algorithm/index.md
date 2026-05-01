---
layout: default
title: 알고리즘별 코테
seo_title: "알고리즘별 자바스크립트 코딩테스트 문제 | JS Coding Blog"
description: "문자열, 배열, 해시, prefix sum 등 유형 중심으로 자바스크립트 알고리즘 문제를 연습할 수 있는 카테고리입니다."
permalink: /algorithm/
---

{% assign problems = site.problems | where: 'track', 'algorithm' | sort: 'order' %}
{% assign topics = problems | map: 'topic' | uniq | sort %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "알고리즘별 코테",
  "url": "https://js-coding.sooyadev.com/algorithm/",
  "description": "문자열, 배열, 해시 등 유형 중심으로 자바스크립트 알고리즘 문제를 연습할 수 있는 카테고리",
  "inLanguage": "ko-KR"
}
</script>

<section class="category-hero category-hero--algorithm">
  <p class="eyebrow">ALGORITHM TRACK</p>
  <h1>알고리즘별 코테</h1>
  <p class="section-lead">문자열, 배열, 해시, prefix sum 같은 유형 중심으로 자바스크립트 알고리즘 문제를 반복 연습할 수 있는 카테고리입니다. 코딩테스트에서 자주 나오는 패턴을 유형별로 익히기에 좋습니다.</p>
</section>

<section class="home-section compact-section">
  <div class="section-heading">
    <h2>다루는 주제</h2>
    <p>현재 알고리즘 트랙에서 자주 다루는 주제들입니다.</p>
  </div>
  <div class="topic-chip-list static-chip-list">
    {% for topic in topics %}
      <span class="topic-chip topic-chip--static">{{ topic }}</span>
    {% endfor %}
  </div>
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
