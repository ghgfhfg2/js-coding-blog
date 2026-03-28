---
title: 모든 배지를 담는 가장 짧은 구간
slug: shortest-all-badges-window
track: today
difficulty: medium
topic: hash
tags:
  - daily
  - medium
  - hash
  - sliding-window
  - frequency-map
order: 6
function_name: solution
time_limit_ms: 300
starter_code: |
  function solution(badges) {
    return [0, 0];
  }
test_cases:
  - input: [["ruby", "emerald", "ruby", "sapphire", "emerald", "diamond"]]
    output: [2, 6]
  - input: [["a", "b", "c", "a", "b", "c"]]
    output: [1, 3]
  - input: [["solo", "solo", "solo"]]
    output: [1, 1]
  - input: [["moon", "star", "moon", "sun", "star", "sun"]]
    output: [2, 4]
---

배지 이름이 담긴 배열 `badges`가 주어질 때, **배열 전체에 등장하는 모든 종류의 배지를 최소 한 번씩 포함하는 가장 짧은 연속 구간**을 찾아 1-based `[start, end]` 형태로 반환하는 `solution` 함수를 작성하세요.

같은 길이의 정답 구간이 여러 개라면 **더 앞에서 시작하는 구간**을 반환하세요.

## 제한사항
- `badges`는 길이 1 이상의 배열입니다.
- 각 원소는 길이 1 이상 20 이하의 문자열입니다.
- 문자열은 대소문자를 구분합니다.
- 반환값은 1-based 인덱스의 `[start, end]` 배열입니다.
- `badges` 전체에 등장하는 모든 종류를 최소 한 번씩 포함하는 구간은 항상 존재합니다.

## 예시
- 입력: `["ruby", "emerald", "ruby", "sapphire", "emerald", "diamond"]` → 출력: `[2, 6]`
- 입력: `["a", "b", "c", "a", "b", "c"]` → 출력: `[1, 3]`
- 입력: `["solo", "solo", "solo"]` → 출력: `[1, 1]`

## 힌트
- 먼저 전체 배열에 서로 다른 배지 종류가 몇 개인지 구해 보세요.
- 연속 구간을 왼쪽과 오른쪽 포인터로 관리하면서, 현재 구간에 각 배지가 몇 번 들어 있는지 세면 됩니다.
- 현재 구간이 모든 종류를 포함하는 순간, 왼쪽을 최대한 줄여 더 짧은 정답을 만들 수 있습니다.

## 해설
이 문제의 핵심은 **모든 종류를 포함하는 구간을 찾되, 그 길이를 최소화하는 것**입니다.

배열의 모든 구간을 직접 검사하면 너무 비효율적입니다. 대신 **슬라이딩 윈도우 + 빈도 맵**으로 해결할 수 있습니다.

풀이 흐름은 다음과 같습니다.

1. `Set`으로 전체 배지 종류 수를 구합니다.
2. `left`와 `right` 포인터로 현재 구간을 관리합니다.
3. `right`를 늘리며 현재 구간에 들어온 배지의 개수를 `Map`에 기록합니다.
4. 현재 구간이 모든 종류를 포함하면,
   - 정답 후보를 갱신하고
   - `left`를 줄여 더 짧은 구간이 가능한지 확인합니다.
5. 어떤 배지의 개수가 0이 되면 `Map`에서 제거하거나, 종류 수 카운트를 감소시켜 다시 조건이 깨진 상태로 돌아갑니다.

예를 들어 `["moon", "star", "moon", "sun", "star", "sun"]`의 전체 종류는 `moon`, `star`, `sun` 세 가지입니다.

- 처음으로 모든 종류를 포함하는 구간은 `[1, 4]`
- 그다음 왼쪽을 줄이면 `[2, 4]`도 모든 종류를 포함하고 길이가 더 짧습니다.
- 이후 더 짧은 길이 3 구간이 또 나오더라도, 같은 길이면 더 앞선 `[2, 4]`를 유지하면 됩니다.

이 방식은 각 포인터가 배열을 많아야 한 번씩만 이동하므로 효율적으로 동작합니다.
