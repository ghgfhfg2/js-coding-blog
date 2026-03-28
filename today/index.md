---
layout: default
title: 오늘의 코테
description: 오늘 가볍게 도전하기 좋은 문제를 모아본 카테고리
permalink: /today/
---

{% assign problems = site.problems | where: 'track', 'today' | sort: 'order' %}

<section class="category-hero category-hero--today">
  <p class="eyebrow">TODAY TRACK</p>
  <h1>오늘의 코테</h1>
  <p class="section-lead">짧게 한 문제 풀고 감각을 깨우는 데 초점을 둔 트랙입니다. 부담 없이 매일 한 문제씩 도전해 보세요.</p>
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
