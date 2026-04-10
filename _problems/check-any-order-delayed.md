---
title: 지연된 주문이 하나라도 있는지 확인하기
slug: check-any-order-delayed
track: js-basic
difficulty: easy
topic: array-boolean-checks
tags:
  - beginner
  - array
  - js-method
  - some
  - boolean
order: 35
function_name: checkAnyOrderDelayed
time_limit_ms: 200
primaryMethod: Array.some
coreIdea: 주문 상태 배열에서 delayed 상태가 하나라도 있는지 some 메서드로 검사해 불리언 값을 반환한다
gimmick: 조건을 만족하는 값이 하나만 있어도 true가 되고 빈 배열이나 해당 상태가 전혀 없으면 false가 된다
starter_code: |
  function checkAnyOrderDelayed(statuses) {
    // 여기에 코드를 작성하세요
    return false;
  }
test_cases:
  - input: [["packed", "shipped", "delayed", "done"]]
    output: true
  - input: [["packed", "shipped", "done"]]
    output: false
  - input: [["delayed"]]
    output: true
  - input: [[]]
    output: false
---
주문 상태가 담긴 배열 `statuses`가 주어질 때, 값들 중 **하나라도** `"delayed"`가 있으면 `true`, 없으면 `false`를 반환하는 `checkAnyOrderDelayed` 함수를 작성하세요.

## 오늘의 메서드
- `some()`

## 메서드 설명
- `some()`은 배열 안에 **조건을 만족하는 요소가 하나라도 있는지** 확인하는 메서드입니다.
- 앞에서부터 검사하다가 조건을 만족하는 요소를 찾으면 바로 `true`를 반환합니다.
- 끝까지 찾아도 없으면 `false`를 반환합니다.

## 기본 문법
```js
arr.some((element) => 조건식)
```

## 사용 예시
```js
const statuses = ['packed', 'shipped', 'delayed', 'done'];

statuses.some((status) => status === 'delayed'); // true
statuses.some((status) => status === 'cancelled'); // false
```

## 주의할 점
- `some()`의 반환값은 **불리언(`true` 또는 `false`)**입니다.
- 조건을 만족하는 요소를 하나 찾으면 바로 탐색을 멈춥니다.
- 원본 배열을 변경하지 않습니다.
- 빈 배열에서는 조건을 만족하는 요소가 없으므로 `false`가 반환됩니다.

## 제한사항
- `statuses`는 길이 0 이상 100 이하의 문자열 배열입니다.
- 각 원소는 `"packed"`, `"shipped"`, `"delayed"`, `"done"` 중 하나입니다.
- 배열 안에 `"delayed"`가 하나라도 있으면 `true`를 반환합니다.
- 그렇지 않으면 `false`를 반환합니다.

## 예시
- 입력: `["packed", "shipped", "delayed", "done"]` → 출력: `true`
- 입력: `["packed", "shipped", "done"]` → 출력: `false`
- 입력: `[]` → 출력: `false`

## 힌트
- 이 문제는 **모든 요소**가 아니라 **하나라도 조건을 만족하는지** 확인하면 됩니다.
- 각 상태를 보면서 `status === 'delayed'`인지 검사해 보세요.
- 조건을 만족하는 값이 나오면 더 이상 끝까지 볼 필요가 없습니다.

## 해설
이 문제의 핵심은 배열 안에 `"delayed"`라는 상태가 **하나라도 존재하는지** 확인하는 것입니다. 이런 상황에서는 `some()`이 잘 맞습니다.

먼저 `statuses.some(...)`을 사용해 각 상태가 `"delayed"`인지 검사합니다.

```js
statuses.some((status) => status === 'delayed')
```

이 코드는 배열을 앞에서부터 확인합니다.
- `status === 'delayed'`가 한 번이라도 `true`가 되면 전체 결과는 바로 `true`가 됩니다.
- 끝까지 확인해도 없으면 `false`가 됩니다.

예를 들어 `["packed", "shipped", "delayed", "done"]`이라면 앞의 두 값은 조건을 만족하지 않지만, `"delayed"`를 만나는 순간 바로 `true`가 됩니다.
반대로 `["packed", "shipped", "done"]`처럼 해당 값이 전혀 없으면 끝까지 검사한 뒤 `false`가 됩니다.

정답 코드는 아래처럼 간단하게 작성할 수 있습니다.

```js
function checkAnyOrderDelayed(statuses) {
  return statuses.some((status) => status === 'delayed');
}
```

이 풀이가 적합한 이유는 다음과 같습니다.
- 문제 요구사항이 "하나라도 조건을 만족하는가"와 정확히 일치합니다.
- 반복문과 플래그 변수를 직접 만들지 않아도 됩니다.
- 코드가 짧고 의도가 분명합니다.

즉, `some()`은 **배열 안에 특정 조건을 만족하는 값이 존재하는지 확인하는 패턴**을 익히기에 좋은 메서드입니다.
