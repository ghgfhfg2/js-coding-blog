---
title: 모든 배지를 담는 가장 짧은 구간
slug: shortest-all-badges-window
track: today
difficulty: medium
topic: cover-all-window
tags:
  - daily
  - medium
  - sliding-window
  - hash-map
  - distinct
  - interval
order: 6
function_name: solution
time_limit_ms: 200
primaryMethod: sliding-window-cover-all-types
coreIdea: 전체 종류 수를 먼저 구한 뒤 현재 구간의 종류별 개수를 관리하며 모든 종류를 포함하는 가장 짧은 윈도우를 투포인터로 줄여 찾는다
gimmick: 길이가 같은 후보는 시작 인덱스가 더 작은 구간을 유지해야 하므로 윈도우 축소 시 tie-break를 함께 처리한다
starter_code: |
  function solution(badges) {
    return [0, 0];
  }
test_cases:
  - input: [["A", "B", "A", "C", "B", "C"]]
    output: [2, 4]
  - input: [["x", "x", "x"]]
    output: [1, 1]
  - input: [["red", "blue", "green", "blue", "red"]]
    output: [1, 3]
  - input: [["aa", "ab", "aa", "ac", "ab", "ac", "aa"]]
    output: [2, 4]
---

배지 기록 배열 `badges`가 주어질 때, **배열에 등장한 모든 종류의 배지를 한 번 이상 포함하는 가장 짧은 연속 구간**을 찾는 `solution` 함수를 작성하세요.

정답은 **1-based 인덱스** 기준의 `[start, end]` 배열로 반환합니다.
길이가 같은 후보가 여러 개라면 **시작 인덱스가 더 작은 구간**을 반환하세요.

## 제한사항
- `badges`는 길이 1 이상 100,000 이하의 문자열 배열입니다.
- 각 원소는 길이 1 이상 20 이하의 문자열입니다.
- 대소문자는 구분합니다.
- 반환값 `[start, end]`는 1-based 인덱스입니다.
- `badges`에 등장하는 모든 서로 다른 문자열을 최소 1번씩 포함해야 합니다.

## 예시
- 입력: `["A", "B", "A", "C", "B", "C"]` → 출력: `[2, 4]`
- 입력: `["x", "x", "x"]` → 출력: `[1, 1]`
- 입력: `["red", "blue", "green", "blue", "red"]` → 출력: `[1, 3]`

## 힌트
- 먼저 전체 배열에 서로 다른 배지가 몇 종류인지 구해 보세요.
- 오른쪽 포인터로 구간을 넓히고, 조건을 만족하면 왼쪽 포인터를 움직여 구간을 최대한 줄일 수 있습니다.
- 현재 구간 안에서 각 배지가 몇 번 들어 있는지 빠르게 관리하면 됩니다.

## 해설
이 문제는 **슬라이딩 윈도우 + 빈도 맵**으로 해결할 수 있습니다.

1. 전체 배열에서 서로 다른 배지 종류 수를 구합니다.
2. `left`와 `right`로 현재 구간을 관리합니다.
3. `right`를 한 칸씩 늘리면서 현재 배지의 개수를 빈도 맵에 기록합니다.
4. 현재 구간이 모든 종류를 포함하게 되면, `left`를 이동시키며 조건이 깨지기 직전까지 구간을 줄입니다.
5. 줄이는 과정에서 가장 짧은 구간을 갱신합니다.
6. 길이까지 같다면 시작 인덱스가 더 작은 구간을 유지합니다.

예를 들어 `["A", "B", "A", "C", "B", "C"]`에서는 전체 종류가 `A, B, C`로 3개입니다.
`right`를 늘려 `["B", "A", "C"]`가 되는 순간 모든 종류를 포함하고, 이 구간은 1-based 기준 `[2, 4]`가 됩니다.
이후 더 짧은 후보가 없으므로 정답은 `[2, 4]`입니다.

이 방식은 각 포인터가 배열을 최대 한 번씩만 이동하므로 효율적으로 동작합니다.