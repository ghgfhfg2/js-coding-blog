---
title: 코드 문자열을 글자 배열로 바꾸기
slug: convert-code-to-char-array
track: js-basic
difficulty: easy
topic: iterable-conversion-methods
tags:
  - beginner
  - string
  - array
  - js-method
  - Array.from
  - conversion
order: 9
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(code) {
    return [];
  }
test_cases:
  - input: ["A12"]
    output: ["A", "1", "2"]
  - input: ["hello"]
    output: ["h", "e", "l", "l", "o"]
  - input: [""]
    output: []
  - input: ["JS-7"]
    output: ["J", "S", "-", "7"]
---

문자열 `code`가 주어질 때, 각 글자를 순서대로 담은 배열을 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`Array.from()`은 문자열이나 다른 iterable 값을 하나씩 꺼내 새 배열로 바꿀 때 자주 쓰는 메서드입니다.

## 메서드 설명
이 문제에서는 문자열 `code`를 글자 단위로 나눈 배열이 필요합니다.
`Array.from(code)`를 사용하면 문자열을 직접 순회하지 않아도 각 문자가 배열 요소로 들어간 새 배열을 만들 수 있습니다.

## 기본 문법
```js
Array.from(iterable)
```

## 사용 예시
```js
Array.from('cat') // ['c', 'a', 't']
Array.from('') // []
Array.from('JS-7') // ['J', 'S', '-', '7']
```

## 주의할 점
- `Array.from()`은 원본 문자열을 바꾸지 않습니다.
- 빈 문자열에 사용하면 빈 배열 `[]`이 반환됩니다.
- 문자열을 글자 단위로 배열로 바꾸는 문제이므로, 공백이나 기호도 그대로 하나의 요소가 됩니다.

## 제한사항
- `code`는 길이 0 이상 100 이하의 문자열입니다.
- 영문자, 숫자, 공백, 기호가 들어올 수 있습니다.
- 반환값은 문자열 한 글자씩 담긴 배열입니다.

## 예시
- 입력: `"A12"` → 출력: `["A", "1", "2"]`
- 입력: `""` → 출력: `[]`
- 입력: `"JS-7"` → 출력: `["J", "S", "-", "7"]`

## 힌트
- 문자열을 배열처럼 직접 인덱스로 옮겨 담지 않아도 됩니다.
- 문자열 전체를 `Array.from()`에 넣으면 원하는 형태를 바로 만들 수 있습니다.

## 해설
이 문제의 핵심은 문자열을 **글자 배열로 변환**하는 것입니다.

`Array.from()`은 iterable 값을 한 칸씩 읽어서 새 배열을 만들어 줍니다. 문자열도 iterable이므로 각 글자가 순서대로 배열에 들어갑니다.

예를 들어 `code`가 `"A12"`라면:
1. `Array.from(code)`를 호출합니다.
2. 문자열의 각 글자 `A`, `1`, `2`가 차례대로 읽힙니다.
3. 최종 결과로 `["A", "1", "2"]`가 반환됩니다.

이 문제는 `Array.from()`이 문자열을 배열로 바꾸는 가장 기본적인 사용법을 익히기에 좋습니다.
