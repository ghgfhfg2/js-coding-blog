---
layout: default
title: JS 메서드 학습
description: JavaScript 메서드 개념과 함께 문제를 학습하는 카테고리
permalink: /js-basic/
---

{% assign problems = site.problems | where: 'track', 'js-basic' | sort: 'order' %}

<section class="category-hero category-hero--learning">
  <p class="eyebrow">JS BASIC TRACK</p>
  <h1>JS 메서드 학습</h1>
  <p class="section-lead">메서드 설명, 사용 예시, 주의할 점까지 함께 보며 자바스크립트 기본기를 익히는 학습형 카테고리입니다.</p>
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
