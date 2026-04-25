---
title: 처음 다시 등장한 배지
slug: first-repeated-badge
track: today
difficulty: easy
topic: first-repeat
tags:
  - daily
  - beginner
  - set
  - duplicate
  - scan
order: 5
function_name: solution
time_limit_ms: 200
primaryMethod: set-first-repeat-scan
coreIdea: 왼쪽부터 순회하면서 이미 본 배지가 다시 나오면 그 즉시 반환해 두 번째 등장 시점이 가장 빠른 배지를 찾는다
gimmick: 중복된 값 자체가 아니라 가장 먼저 다시 등장한 시점을 찾아야 하므로 Set을 채우다가 재등장 순간 즉시 종료하면 된다
starter_code: |
  function solution(badges) {
    return "clean";
  }
test_cases:
  - input: [["A1", "B2", "C3", "B2", "D4"]]
    output: "B2"
  - input: [["red", "blue", "red", "blue"]]
    output: "red"
  - input: [["solo"]]
    output: "clean"
  - input: [["x", "y", "z", "x", "z"]]
    output: "x"
---

배지 번호 목록을 앞에서부터 확인할 때, 가장 먼저 **다시 등장한** 배지 번호를 찾는 `solution` 함수를 작성하세요.

중복이 전혀 없으면 문자열 `"clean"`을 반환하면 됩니다.

## 제한사항
- `badges`는 배지 번호가 담긴 문자열 배열입니다.
- 배열 길이는 1 이상 100,000 이하입니다.
- 각 배지 번호는 길이 1 이상 20 이하의 문자열입니다.
- 대소문자는 구분합니다.
- 어떤 배지 번호가 두 번 이상 나오더라도, **두 번째 등장 시점이 가장 빠른 번호**를 반환해야 합니다.
- 중복이 없으면 `"clean"`을 반환합니다.

## 예시
- 입력: `["A1", "B2", "C3", "B2", "D4"]` → 출력: `"B2"`
- 입력: `["red", "blue", "red", "blue"]` → 출력: `"red"`
- 입력: `["solo"]` → 출력: `"clean"`

## 힌트
- 이미 본 배지 번호를 빠르게 확인할 수 있는 자료구조를 떠올려 보세요.
- 배열을 왼쪽부터 한 번만 보면서도 정답을 찾을 수 있습니다.

## 해설
이 문제의 핵심은 **처음 등장한 중복 자체**가 아니라, **두 번째로 나타나는 시점이 가장 빠른 배지 번호**를 찾는 것입니다.

예를 들어 `["red", "blue", "red", "blue"]`에서는 `red`와 `blue`가 모두 중복되지만,
`red`가 세 번째 위치에서 먼저 다시 등장하므로 정답은 `"red"`입니다.

가장 간단한 방법은 빈 `Set`을 하나 만들고 배열을 앞에서부터 순회하는 것입니다.

1. 현재 배지 번호가 `Set`에 이미 있으면, 그 번호가 가장 먼저 다시 등장한 배지이므로 바로 반환합니다.
2. 없다면 `Set`에 추가합니다.
3. 끝까지 중복이 없으면 `"clean"`을 반환합니다.

이 방식은 각 배지를 한 번씩만 확인하므로 효율적으로 동작합니다.