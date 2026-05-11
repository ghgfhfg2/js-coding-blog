---
title: 배열 입력인지 확인하기
slug: check-array-input
track: js-basic
difficulty: easy
topic: array-type-check-methods
tags:
  - beginner
  - array
  - type-check
  - js-method
  - Array.isArray
order: 152
function_name: solution
time_limit_ms: 200
primaryMethod: Array.isArray
coreIdea: 전달받은 값이 실제 배열인지 Array.isArray로 확인해 불리언 값을 반환한다
gimmick: 빈 배열도 배열이므로 true이고 문자열이나 객체처럼 배열처럼 보일 수 있는 값은 false로 구분해야 한다
starter_code: |
  function solution(value) {
    return false;
  }
test_cases:
  - input: [[1, 2, 3]]
    output: true
  - input: [[]]
    output: true
  - input: ["hello"]
    output: false
  - input: [{ name: "수야" }]
    output: false
  - input: [null]
    output: false
---

값 `value`가 주어질 때, 이 값이 JavaScript 배열이면 `true`, 배열이 아니면 `false`를 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
오늘 배울 메서드는 `Array.isArray()`입니다.

`Array.isArray()`는 어떤 값이 **진짜 배열인지** 확인할 때 사용하는 JavaScript 기본 메서드입니다.

## 메서드 설명
JavaScript에서는 배열도 객체의 한 종류입니다. 그래서 `typeof [1, 2, 3]`을 실행하면 `"object"`가 나옵니다.

이처럼 `typeof`만으로는 일반 객체와 배열을 정확히 구분하기 어렵습니다. 이때 `Array.isArray(value)`를 사용하면 값이 배열인지 아닌지를 명확하게 확인할 수 있습니다.

## 기본 문법
```js
Array.isArray(value)
```

- `value`: 배열인지 확인할 값
- 반환값: 배열이면 `true`, 배열이 아니면 `false`

## 사용 예시
```js
Array.isArray([1, 2, 3]) // true
Array.isArray([]) // true
Array.isArray('hello') // false
Array.isArray({ length: 3 }) // false
```

## 주의할 점
- 빈 배열 `[]`도 배열이므로 `true`입니다.
- 일반 객체 `{}`는 배열이 아니므로 `false`입니다.
- 문자열은 인덱스로 글자를 읽을 수 있어 배열처럼 보일 수 있지만 배열은 아니므로 `false`입니다.
- `null`은 객체처럼 다뤄지는 특이한 값이지만 배열이 아니므로 `false`입니다.

## 제한사항
- `value`에는 배열, 문자열, 숫자, 객체, `null` 등이 들어올 수 있습니다.
- 배열의 길이는 0 이상입니다.
- 반환값은 반드시 불리언(`true` 또는 `false`)이어야 합니다.
- 입력값을 직접 수정할 필요는 없습니다.

## 예시
- 입력: `[1, 2, 3]` → 출력: `true`
- 입력: `[]` → 출력: `true`
- 입력: `"hello"` → 출력: `false`
- 입력: `{ name: "수야" }` → 출력: `false`
- 입력: `null` → 출력: `false`

## 힌트
- 값의 타입을 직접 비교하려고 하기보다, 배열 판별 전용 메서드를 떠올려 보세요.
- `Array.isArray(value)`의 결과를 그대로 반환해도 됩니다.

## 해설
이 문제는 입력값이 배열인지 확인하는 기본 타입 판별 문제입니다.

초보자가 자주 하는 실수는 `typeof value === 'object'`처럼 확인하는 것입니다. 하지만 배열, 일반 객체, `null`은 모두 이 방식에서 헷갈릴 수 있습니다. 배열만 정확히 구분하려면 `Array.isArray()`를 사용하는 것이 가장 안전하고 읽기 쉽습니다.

풀이 흐름은 간단합니다.

1. `solution(value)`로 값을 받습니다.
2. `Array.isArray(value)`를 호출합니다.
3. 그 결과를 그대로 반환합니다.

예를 들어 `value`가 `[1, 2, 3]`이면 배열이므로 `true`입니다. 반대로 `"hello"`나 `{ name: "수야" }`는 배열이 아니므로 `false`입니다. 빈 배열 `[]`은 안에 값이 없어도 배열이라는 사실을 기억하면 좋습니다.
