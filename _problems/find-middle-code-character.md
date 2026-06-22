---
title: 코드의 가운데 글자 찾기
slug: find-middle-code-character
track: today
difficulty: easy
topic: middle-index
tags:
  - daily
  - beginner
  - string
  - index
  - character
order: 1480
function_name: findMiddleCodeCharacter
time_limit_ms: 200
primaryMethod: floor-middle-index-access
coreIdea: 길이가 홀수인 문자열에서 Math.floor(length / 2)로 가운데 인덱스를 구해 해당 글자 하나를 반환한다
gimmick: 길이가 1인 문자열도 같은 공식으로 처리되고, 앞뒤를 직접 잘라 비교할 필요가 없다
starter_code: |
  function findMiddleCodeCharacter(code) {
    return "";
  }
test_cases:
  - input: ["ABC"]
    output: "B"
  - input: ["Z"]
    output: "Z"
  - input: ["LEVEL"]
    output: "V"
  - input: ["OPENCLA"]
    output: "N"
---

## 문제 설명
문자열 `code`가 주어질 때, `code`의 **정확히 가운데에 있는 글자 하나**를 반환하는 `findMiddleCodeCharacter` 함수를 작성하세요.

`code`의 길이는 항상 홀수입니다.
예를 들어 `"ABC"`의 가운데 글자는 `"B"`이고, `"LEVEL"`의 가운데 글자는 `"V"`입니다.

## 제한사항
- `code`는 길이가 홀수인 문자열입니다.
- `1 <= code.length <= 100000`
- `code`는 영어 대문자로만 이루어져 있습니다.
- 반환값은 `code`의 가운데 글자 하나입니다.

## 예시
- 입력: `code = "ABC"` → 출력: `"B"`
- 입력: `code = "Z"` → 출력: `"Z"`
- 입력: `code = "LEVEL"` → 출력: `"V"`
- 입력: `code = "OPENCLA"` → 출력: `"N"`

## 힌트
- 문자열의 인덱스는 `0`부터 시작합니다.
- 길이가 `5`인 문자열의 가운데 인덱스는 `2`입니다.
- `Math.floor(code.length / 2)`를 이용하면 가운데 위치를 바로 구할 수 있습니다.

## 해설
문자열의 길이가 홀수라면 가운데 글자는 항상 하나만 존재합니다.

길이가 `n`일 때 가운데 인덱스는 `Math.floor(n / 2)`입니다.
예를 들어 `n = 5`이면 `Math.floor(5 / 2)`는 `2`이고, 인덱스 `2`가 세 번째 글자이므로 가운데 글자가 됩니다.

따라서 `code[Math.floor(code.length / 2)]`를 반환하면 됩니다.
길이가 `1`인 문자열도 가운데 인덱스가 `0`이므로 별도 예외 처리 없이 같은 방식으로 해결할 수 있습니다.
