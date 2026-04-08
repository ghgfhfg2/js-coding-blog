---
title: 모든 점수가 통과선 이상인지 확인하기
slug: check-all-scores-pass
track: js-basic
difficulty: easy
topic: array-predicate-methods
tags:
  - beginner
  - array
  - js-method
  - every
  - boolean
order: 29
function_name: checkAllScoresPass
time_limit_ms: 200
primaryMethod: Array.every
coreIdea: 점수 배열의 모든 값이 기준 점수 이상인지 every 메서드로 한 번에 판별해 불리언 값을 반환한다
gimmick: 하나라도 기준 미만 점수가 있으면 즉시 false가 되고 모든 점수가 조건을 만족할 때만 true가 된다
starter_code: |
  function checkAllScoresPass(scores, passScore) {
    // 여기에 코드를 작성하세요
    return false;
  }
test_cases:
  - input: [[70, 82, 90, 76], 70]
    output: true
  - input: [[88, 91, 67, 95], 70]
    output: false
  - input: [[50], 50]
    output: true
  - input: [[100, 99, 98], 101]
    output: false
---
점수 배열 `scores`와 기준 점수 `passScore`가 주어질 때, **모든 점수가 기준 이상이면 `true`**, 하나라도 기준보다 작으면 `false`를 반환하는 `checkAllScoresPass` 함수를 작성하세요.

## 오늘의 메서드
- `every()`

## 메서드 설명
- `every()`는 배열의 **모든 요소가 조건을 만족하는지** 검사하는 메서드입니다.
- 배열을 앞에서부터 확인하다가 조건을 만족하지 않는 요소를 만나면 바로 `false`를 반환합니다.
- 끝까지 모두 통과하면 `true`를 반환합니다.

## 기본 문법
```js
arr.every((element) => 조건식)
```

## 사용 예시
```js
const scores = [70, 82, 90, 76];

scores.every((score) => score >= 70); // true
scores.every((score) => score >= 80); // false
```

## 주의할 점
- `every()`의 반환값은 **불리언(`true` 또는 `false`)**입니다.
- 조건을 하나라도 만족하지 못하는 요소가 있으면 바로 `false`가 됩니다.
- 원본 배열을 변경하지 않습니다.
- 이 문제에서는 점수 배열의 길이가 1 이상이라고 가정하므로, 빈 배열 처리는 신경 쓰지 않아도 됩니다.

## 제한사항
- `scores`는 길이 1 이상 100 이하의 정수 배열입니다.
- 각 점수는 0 이상 100 이하입니다.
- `passScore`는 0 이상 100 이하의 정수입니다.
- 모든 점수가 `passScore` 이상이면 `true`, 아니면 `false`를 반환합니다.

## 예시
- 입력: `[70, 82, 90, 76]`, `70` → 출력: `true`
- 입력: `[88, 91, 67, 95]`, `70` → 출력: `false`
- 입력: `[50]`, `50` → 출력: `true`

## 힌트
- 점수를 하나씩 보면서 `score >= passScore`인지 확인해 보세요.
- 이 문제는 **모든 값이 조건을 만족해야 하는지** 확인하는 문제입니다.
- 조건을 만족하지 않는 점수가 하나라도 있으면 바로 `false`가 되어야 합니다.

## 해설
이 문제의 핵심은 **배열의 모든 점수가 기준 점수 이상인지 한 번에 검사하는 것**입니다. 이런 상황에서는 `every()`가 잘 맞습니다.

먼저 `scores.every(...)`를 사용해 각 점수가 `passScore` 이상인지 검사합니다.

```js
scores.every((score) => score >= passScore)
```

이 코드는 배열의 각 점수를 앞에서부터 확인합니다.
- `score >= passScore`가 계속 `true`이면 끝까지 검사합니다.
- 중간에 하나라도 `false`가 나오면 바로 전체 결과는 `false`가 됩니다.

예를 들어 `[88, 91, 67, 95]`와 기준 점수 `70`이라면:
- 88은 통과
- 91은 통과
- 67은 기준 미만
- 따라서 더 볼 필요 없이 결과는 `false`입니다.

정답 코드는 아주 간단하게 작성할 수 있습니다.

```js
function checkAllScoresPass(scores, passScore) {
  return scores.every((score) => score >= passScore);
}
```

이 풀이가 적합한 이유는 다음과 같습니다.
- 문제 요구사항이 "모든 요소가 조건을 만족하는가"와 정확히 일치한다
- 반복문과 플래그 변수를 직접 만들지 않아도 된다
- 코드가 짧고 읽기 쉽다

즉, `every()`는 **배열 전체가 같은 기준을 통과하는지 검사하는 패턴**을 익히기에 좋은 메서드입니다.
