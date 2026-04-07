---
layout: default
title: JS 메서드 학습
seo_title: "JavaScript 메서드 학습 문제 모음 | JS Coding Blog"
description: "includes, split, map, startsWith, endsWith 같은 JavaScript 메서드를 문제와 함께 익힐 수 있는 학습 카테고리입니다."
permalink: /js-basic/
---

{% assign problems = site.problems | where: 'track', 'js-basic' | sort: 'order' %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "JS 메서드 학습",
  "url": "https://js-coding.sooyadev.com/js-basic/",
  "description": "JavaScript 메서드를 문제와 함께 익힐 수 있는 학습 카테고리",
  "inLanguage": "ko-KR"
}
</script>

<section class="category-hero category-hero--learning">
  <p class="eyebrow">JS BASIC TRACK</p>
  <h1>JS 메서드 학습</h1>
  <p class="section-lead">includes, split, map, startsWith, endsWith 같은 JavaScript 메서드를 문제와 함께 익힐 수 있는 학습형 카테고리입니다. 메서드 설명, 사용 예시, 주의할 점까지 함께 보며 자바스크립트 기본기를 다질 수 있습니다.</p>
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
