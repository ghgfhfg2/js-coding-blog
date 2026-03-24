---
layout: default
title: 오늘의 코테
permalink: /today/
---

# 오늘의 코테

<p class="section-lead">짧고 신선한 도전 문제를 모아둔 트랙입니다. 매일 가볍게 풀어보면서 감각을 유지하기 좋습니다.</p>

<div class="home-section">
  <div class="section-heading">
    <h2>이 트랙의 성격</h2>
    <p>문제 중심, 도전 중심, 재방문 흐름에 초점을 둔 카테고리입니다.</p>
  </div>

  <div class="quick-links">
    <a class="quick-link" href="{{ '/problems/' | relative_url }}">전체 문제 보러 가기</a>
    <a class="quick-link" href="{{ '/problems/' | relative_url }}">다른 트랙도 함께 보기</a>
    <a class="quick-link" href="{{ '/problems/two-sum/' | relative_url }}">샘플 문제 바로 보기</a>
  </div>
</div>

<div class="problem-grid">
  {% assign track_problems = site.problems | where: 'track', 'today' | sort: 'order' %}
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
