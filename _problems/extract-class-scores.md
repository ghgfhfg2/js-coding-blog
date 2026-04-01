---
title: 반별 점수 값 목록 꺼내기
slug: extract-class-scores
track: js-basic
difficulty: easy
topic: object-methods
tags:
  - beginner
  - object
  - js-method
  - Object.values
  - values
order: 29
primaryMethod: Object.values
coreIdea: 과목별 평균 점수가 담긴 객체에서 키 이름은 무시하고 Object.values()로 점수 값들만 순서대로 추출해 배열로 만든다
gimmick: 과목 이름을 하나씩 읽지 않아도 값 목록만 바로 얻을 수 있고 0점처럼 falsy한 값도 빠뜨리면 안 된다
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(scores) {
    return [];
  }
test_cases:
  - input: [{ math: 85, english: 92, science: 78 }]
    output: [85, 92, 78]
  - input: [{ art: 0, music: 100 }]
    output: [0, 100]
  - input: [{}]
    output: []
  - input: [{ history: 88 }]
    output: [88]
---

과목별 평균 점수를 담은 객체 `scores`가 주어질 때, 각 과목의 **점수 값만 순서대로 모은 배열**을 반환하는 `solution` 함수를 작성하세요.

예를 들어 `scores = { math: 85, english: 92, science: 78 }`라면 정답은 `[85, 92, 78]`입니다.

## 오늘의 메서드
- `Object.values()`

## 메서드 설명
- `Object.values()`는 객체의 **값(value)들만 모아서 배열로 반환**하는 메서드입니다.
- 키 이름은 필요 없고 값만 한 번에 꺼내고 싶을 때 유용합니다.
- 원본 객체를 바꾸지 않고 새로운 배열을 만들어 줍니다.

## 기본 문법
```js
Object.values(obj)
```

## 사용 예시
```js
const scores = {
  math: 85,
  english: 92,
  science: 78,
};

Object.values(scores); // [85, 92, 78]

Object.values({ art: 0, music: 100 }); // [0, 100]
Object.values({}); // []
```

## 주의할 점
- `Object.values()`는 **값만 반환**합니다. 키 이름은 결과에 들어가지 않습니다.
- 점수가 `0`이어도 정상적인 값이므로 제외하면 안 됩니다.
- 빈 객체 `{}`가 들어오면 빈 배열 `[]`을 반환합니다.
- 이 문제에서는 객체에 들어 있는 값이 모두 숫자라고 가정합니다.

## 제한사항
- `scores`는 과목 이름을 key, 평균 점수를 value로 가지는 객체입니다.
- 각 점수는 `0` 이상 `100` 이하의 정수입니다.
- 과목 수는 `0`개 이상 `1000`개 이하입니다.
- 반환값은 `scores`에 들어 있는 **점수 값들만 담은 배열**입니다.
- 입력 객체를 직접 수정하면 안 됩니다.

## 예시
- 입력: `scores = { math: 85, english: 92, science: 78 }` → 출력: `[85, 92, 78]`
- 입력: `scores = { art: 0, music: 100 }` → 출력: `[0, 100]`
- 입력: `scores = {}` → 출력: `[]`

## 힌트
- 객체에서 키를 하나씩 꺼내며 직접 배열을 만들 수도 있지만, 값만 필요하다면 더 간단한 메서드가 있습니다.
- `Object.values(scores)`가 무엇을 반환하는지 떠올려 보세요.
- `0`점도 그대로 결과에 포함되어야 합니다.

## 해설
이 문제의 핵심은 **객체에서 값만 꺼내는 방법**을 익히는 것입니다.

점수 객체는 보통 이런 모양입니다.

```js
{
  math: 85,
  english: 92,
  science: 78,
}
```

여기서 우리가 필요한 것은 과목 이름(`math`, `english`, `science`)이 아니라 **점수 값**인 `85`, `92`, `78`입니다.

이럴 때 `Object.values()`를 쓰면 객체의 값들만 모아서 배열로 만들 수 있습니다.

```js
Object.values({ math: 85, english: 92, science: 78 });
// [85, 92, 78]
```

따라서 풀이는 아주 간단합니다.

```js
function solution(scores) {
  return Object.values(scores);
}
```

### 왜 이 메서드가 적합할까?
- 키가 아니라 값만 필요합니다.
- 반복문을 직접 쓰지 않아도 됩니다.
- 원본 객체를 건드리지 않고 새 배열을 반환합니다.

### 예외 상황도 확인해 보자
- `scores = {}`이면 값이 없으므로 `[]`가 됩니다.
- `scores = { art: 0, music: 100 }`이면 `0`도 정상적인 점수이므로 `[0, 100]`이 되어야 합니다.

즉, 이 문제는 `Object.values()`를 이용해 **객체의 값 목록을 빠르게 꺼내는 기본 감각**을 익히는 연습입니다.
