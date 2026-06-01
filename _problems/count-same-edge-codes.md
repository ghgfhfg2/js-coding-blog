---
title: 양끝 문자가 같은 코드 개수
slug: count-same-edge-codes
track: today
difficulty: easy
topic: edge-character-check
tags:
  - daily
  - beginner
  - string
  - counting
  - edge-case
order: 1360
function_name: countSameEdgeCodes
time_limit_ms: 200
primaryMethod: first-last-character-comparison
coreIdea: 문자열 배열을 순회하며 각 코드의 첫 문자와 마지막 문자가 같은지 비교해 조건을 만족하는 코드 개수를 센다
gimmick: 길이가 1인 코드는 첫 문자와 마지막 문자가 같으므로 조건을 만족하고 빈 배열은 0을 반환해야 한다
starter_code: |
  function countSameEdgeCodes(codes) {
    return 0;
  }
test_cases:
  - input: [["AXA", "B12", "Q", "HELLOH"]]
    output: 3
  - input: [["ab", "aa", "z", "level", "code"]]
    output: 3
  - input: [[]]
    output: 0
  - input: [["A", "BB", "CA", "DDC"]]
    output: 2
---

문자열 코드 목록에서 첫 문자와 마지막 문자가 같은 코드의 개수를 구하세요.

## 문제 설명

문자열로 된 코드들이 배열 `codes`에 들어 있습니다.

각 코드의 첫 문자와 마지막 문자가 같다면 특별 코드로 봅니다. 특별 코드가 모두 몇 개인지 반환하는 함수 `countSameEdgeCodes`를 작성하세요.

## 제한사항

- `codes`는 문자열 배열입니다.
- `0 <= codes.length <= 1,000`
- 각 문자열의 길이는 `1` 이상 `100` 이하입니다.
- 문자열은 영문 대문자, 영문 소문자, 숫자로만 이루어져 있습니다.
- 대문자와 소문자는 서로 다른 문자로 봅니다.

## 예시

- 입력: `["AXA", "B12", "Q", "HELLOH"]` -> 출력: `3`
- 입력: `["ab", "aa", "z", "level", "code"]` -> 출력: `3`
- 입력: `[]` -> 출력: `0`

## 힌트

- 각 문자열에서 `code[0]`과 `code[code.length - 1]`을 비교해 보세요.
- 길이가 1인 문자열은 양끝 문자가 같은 것으로 처리됩니다.

## 해설

배열을 한 번 순회하면서 각 코드의 첫 문자와 마지막 문자를 비교합니다.

두 문자가 같으면 카운트를 1 늘리고, 다르면 넘어갑니다. 모든 코드를 확인한 뒤 누적한 카운트를 반환하면 됩니다. 빈 배열은 순회할 코드가 없으므로 자연스럽게 `0`을 반환합니다.
