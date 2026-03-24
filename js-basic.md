---
layout: default
title: JS 메서드 학습
permalink: /js-basic/
---

# JS 메서드 학습

<p class="section-lead">문제 풀이와 함께 JavaScript 메서드 설명, 예시, 주의할 점까지 같이 익히는 입문형 트랙입니다.</p>

<div class="home-section">
  <div class="section-heading">
    <h2>이 트랙의 성격</h2>
    <p>코테 입문 전 언어 적응과 기본 메서드 감각을 쌓는 데 초점을 둔 카테고리입니다.</p>
  </div>

  <div class="quick-links">
    <a class="quick-link" href="{{ '/problems/' | relative_url }}">전체 문제 보러 가기</a>
    <a class="quick-link" href="{{ '/problems/' | relative_url }}">다른 트랙과 비교해서 보기</a>
    <a class="quick-link" href="{{ '/problems/count-vowels/' | relative_url }}">샘플 문제 바로 보기</a>
  </div>
</div>

<div class="problem-grid">
  {% assign track_problems = site.problems | where: 'track', 'js-basic' | sort: 'order' %}
  {% for problem in track_problems %}
    <article class="problem-card">
      <div class="problem-card__body">
        <div class="meta-row compact">
          {% if problem.track %}<span class="pill">{{ problem.track }}</span>{% endif %}
          {% if problem.difficulty %}<span class="pill">{{ problem.difficulty }}</span>{% endif %}
          {% if problem.topic %}<span class="pill">{{ problem.topic }}</span>{% endif %}
        </div>
        <h2 class="problem-card__title"><a href="{{ problem.url | relative_url }}">{{ problem.title }}</a></h2>
        <p class="problem-card__description">
          {% if problem.excerpt %}
            {{ problem.excerpt | strip_html | truncate: 120 }}
          {% else %}
            문제를 읽고 브라우저에서 바로 JavaScript로 풀어볼 수 있습니다.
          {% endif %}
        </p>
      </div>
      <div class="problem-card__footer">
        <a class="text-link" href="{{ problem.url | relative_url }}">문제 풀러 가기 →</a>
      </div>
    </article>
  {% endfor %}
</div>
