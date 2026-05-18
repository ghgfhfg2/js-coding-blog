---
title: 코드의 첫 글자 가져오기
slug: get-first-code-character
track: js-basic
difficulty: easy
topic: string-character-methods
tags:
  - beginner
  - string
  - js-method
  - charAt
  - character-access
order: 1266
function_name: solution
time_limit_ms: 200
primaryMethod: String.charAt
coreIdea: 코드 문자열에서 charAt(0)으로 첫 번째 글자만 안전하게 꺼내고 빈 문자열이면 빈 문자열을 그대로 반환한다
gimmick: 인덱스 0의 글자를 직접 꺼내는 연습이며 문자열이 비어 있을 때도 charAt은 에러 없이 빈 문자열을 반환한다
starter_code: |
  function solution(code) {
    return "";
  }
test_cases:
  - input: ["A12-BOX"]
    output: "A"
  - input: ["x"]
    output: "x"
  - input: [""]
    output: ""
  - input: ["9-ticket"]
    output: "9"
---

## 문제 설명
문자열 `code`가 주어질 때, 코드의 첫 번째 글자만 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
오늘 배울 메서드는 `String.charAt()`입니다.

`String.charAt()`은 문자열에서 원하는 위치의 글자 하나를 꺼낼 때 사용하는 JavaScript 문자열 메서드입니다.

## 메서드 설명
문자열은 각 글자마다 0부터 시작하는 위치 번호, 즉 인덱스를 가집니다.

`charAt(index)`를 사용하면 해당 인덱스에 있는 글자를 문자열로 반환합니다. 예를 들어 첫 번째 글자는 인덱스가 `0`이므로 `charAt(0)`으로 가져올 수 있습니다.

## 기본 문법
```js
str.charAt(index)
```

- `str`: 글자를 꺼낼 문자열
- `index`: 가져오고 싶은 글자의 위치 번호
- 반환값: 해당 위치의 글자 하나를 담은 문자열

## 사용 예시
```js
'CODE-123'.charAt(0) // 'C'
'hello'.charAt(1) // 'e'
''.charAt(0) // ''
```

## 주의할 점
- JavaScript 문자열의 인덱스는 `0`부터 시작합니다.
- 첫 번째 글자를 가져오려면 `charAt(0)`을 사용합니다.
- 인덱스가 문자열 길이를 벗어나면 에러가 아니라 빈 문자열 `''`이 반환됩니다.
- `charAt()`은 원본 문자열을 바꾸지 않습니다.

## 제한사항
- `code`는 문자열입니다.
- `code`의 길이는 0 이상 100 이하입니다.
- `code`에는 영문자, 숫자, 하이픈(`-`)이 들어올 수 있습니다.
- `code`가 빈 문자열이면 빈 문자열 `""`을 반환합니다.
- 반환값은 문자열이어야 합니다.

## 예시
- 입력: `"A12-BOX"` → 출력: `"A"`
- 입력: `"x"` → 출력: `"x"`
- 입력: `""` → 출력: `""`
- 입력: `"9-ticket"` → 출력: `"9"`

## 힌트
- 첫 번째 글자의 인덱스는 `0`입니다.
- `code.charAt(0)`의 결과를 그대로 반환해 보세요.

## 해설
이 문제는 문자열에서 특정 위치의 글자 하나를 꺼내는 기본 연습입니다.

코드의 첫 글자는 항상 인덱스 `0`에 있습니다. 따라서 `code.charAt(0)`을 호출하면 첫 번째 글자만 얻을 수 있습니다.

풀이 흐름은 간단합니다.

1. `solution(code)`로 문자열을 받습니다.
2. `code.charAt(0)`을 호출합니다.
3. 그 결과를 그대로 반환합니다.

예를 들어 `code`가 `"A12-BOX"`이면 인덱스 `0`의 글자는 `"A"`입니다. `code`가 `"9-ticket"`이면 첫 글자는 `"9"`입니다. 빈 문자열 `""`에서는 꺼낼 글자가 없지만, `charAt(0)`은 에러를 내지 않고 빈 문자열을 반환하므로 별도 예외 처리 없이 요구사항을 만족할 수 있습니다.
