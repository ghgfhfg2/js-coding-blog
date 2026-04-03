---
title: 문자열 뒤집기
slug: reverse-string
track: algorithm
difficulty: easy
topic: string
tags:
  - beginner
  - reverse
  - string
order: 2
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(str) {
    return str;
  }
test_cases:
  - input: ["abc"]
    output: "cba"
  - input: ["hello"]
    output: "olleh"
  - input: [""]
    output: ""
---

문자열 `str`이 주어질 때, 글자 순서를 뒤집은 새로운 문자열을 반환하는 `solution` 함수를 작성하세요.

## 제한사항
- `str`은 문자열입니다.
- 빈 문자열이 들어올 수 있습니다.
- 반환값도 문자열이어야 합니다.

## 예시
- 입력: `"abc"` → 출력: `"cba"`
- 입력: `"hello"` → 출력: `"olleh"`

## 힌트
- 문자열을 배열처럼 다룬 뒤 다시 합치는 방법을 떠올려보세요.

## 해설
이 문제는 문자열을 직접 뒤에서부터 이어 붙여도 되지만, JavaScript에서는 문자열을 배열로 바꾼 뒤 처리하는 방식이 직관적입니다.

대표적인 방법은 다음과 같습니다.
1. `split('')`으로 문자열을 문자 배열로 바꿉니다.
2. `reverse()`로 배열 순서를 뒤집습니다.
3. `join('')`으로 다시 문자열로 합칩니다.

예를 들어 `"hello"`는 `['h', 'e', 'l', 'l', 'o']`로 바뀌고, 이를 뒤집으면 `['o', 'l', 'l', 'e', 'h']`, 다시 합치면 `"olleh"`가 됩니다.

빈 문자열 `""`도 같은 방식으로 처리할 수 있으며 결과 역시 빈 문자열입니다.
