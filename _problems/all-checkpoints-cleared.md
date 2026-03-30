---
title: 모든 체크포인트 통과 여부 확인하기
slug: all-checkpoints-cleared
track: js-basic
difficulty: easy
topic: high-order-functions
tags:
  - beginner
  - array
  - js-method
  - every
  - boolean
order: 19
primaryMethod: every
coreIdea: 불리언 배열의 모든 값이 true인지 every()로 확인해 전체 통과 여부를 한 번에 판단한다
gimmick: 하나라도 false가 나오면 끝까지 보지 않고 즉시 false를 반환하는 단락 평가가 핵심이다
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(checkpoints) {
    return false;
  }
test_cases:
  - input: [[true, true, true]]
    output: true
  - input: [[true, false, true]]
    output: false
  - input: [[false]]
    output: false
  - input: [[true, true, true, true, true]]
    output: true
---

불리언 배열 `checkpoints`가 주어질 때, 모든 값이 `true`이면 `true`를 반환하고 하나라도 `false`가 있으면 `false`를 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`every()`는 배열의 모든 요소가 주어진 조건을 만족하는지 확인하는 메서드입니다.

## 메서드 설명
이 문제에서는 각 체크포인트가 통과되었는지를 `true` 또는 `false`로 표현합니다.
모든 체크포인트가 통과된 경우에만 최종 결과도 `true`가 되어야 하므로, 배열의 모든 값이 `true`인지 검사하면 됩니다.

이때 `every()`를 사용하면 배열을 직접 세거나 별도 플래그를 두지 않고도 조건을 깔끔하게 확인할 수 있습니다.
예를 들어 `[true, true, false].every(value => value === true)`는 `false`를 반환합니다.

## 기본 문법
```js
arr.every(callback)
```

```js
arr.every(element => 조건식)
```

## 사용 예시
```js
[1, 2, 3].every(num => num > 0) // true
[true, true, false].every(value => value === true) // false
['a', 'ab', 'abc'].every(text => text.length >= 1) // true
```

## 주의할 점
- `every()`는 **배열 메서드**입니다.
- 조건을 만족하지 않는 요소를 하나라도 만나면 즉시 `false`를 반환합니다.
- 원본 배열을 바꾸지 않고 **불리언 값 하나**를 반환합니다.
- 이 문제에서는 각 요소가 이미 `true` 또는 `false`이므로 `value === true`처럼 검사할 수 있습니다.

## 제한사항
- `checkpoints`는 길이 1 이상 100 이하의 불리언 배열입니다.
- 배열의 각 요소는 `true` 또는 `false`입니다.
- 반환값은 모든 값이 `true`인지 나타내는 불리언 값입니다.

## 예시
- 입력: `[true, true, true]` → 출력: `true`
- 입력: `[true, false, true]` → 출력: `false`
- 입력: `[false]` → 출력: `false`

## 힌트
- 배열의 모든 값을 직접 세지 않아도 됩니다.
- “모든 요소가 조건을 만족하는가?”를 확인하는 배열 메서드를 떠올려 보세요.
- 각 값이 `true`인지 검사하는 콜백 함수를 넣으면 됩니다.

## 해설
이 문제의 핵심은 **배열 안에 false가 하나라도 있는지 빠르게 확인하는 것**입니다.

`every()`는 배열의 모든 요소가 조건을 만족하면 `true`, 하나라도 만족하지 않으면 `false`를 반환합니다.
따라서 이 문제에서는 각 요소가 `true`인지 확인하는 조건을 주면 됩니다.

풀이 흐름은 다음과 같습니다.

1. `checkpoints` 배열을 확인합니다.
2. `every()`를 사용해 각 요소가 `true`인지 검사합니다.
3. 모두 `true`이면 `true`를 반환합니다.
4. 중간에 `false`가 하나라도 나오면 바로 `false`를 반환합니다.

예를 들어 `[true, true, true]`는 모든 값이 통과이므로 `true`입니다.
반면 `[true, false, true]`는 두 번째 값에서 조건이 깨지므로 결과는 `false`입니다.

이 문제를 통해 `every()`가 **전체 통과 여부, 입력 검증, 규칙 만족 여부 확인**처럼 “모두 만족해야 하는 상황”에서 자주 쓰인다는 점을 익힐 수 있습니다.
