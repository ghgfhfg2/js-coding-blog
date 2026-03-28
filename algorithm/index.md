---
layout: default
title: 알고리즘별 코테
description: 문자열, 배열, 해시 등 유형 중심으로 문제를 모아본 카테고리
permalink: /algorithm/
---

{% assign problems = site.problems | where: 'track', 'algorithm' | sort: 'order' %}
{% assign topics = problems | map: 'topic' | uniq | sort %}

<section class="category-hero category-hero--algorithm">
  <p class="eyebrow">ALGORITHM TRACK</p>
  <h1>알고리즘별 코테</h1>
  <p class="section-lead">유형별 반복 연습에 적합한 카테고리입니다. 자주 나오는 주제를 중심으로 풀이 감각을 쌓아보세요.</p>
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

<div class="category-page-grid">
  {% for problem in problems %}
    <article class="problem-card">
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
