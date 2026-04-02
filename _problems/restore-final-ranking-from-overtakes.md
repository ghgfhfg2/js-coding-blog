---
title: 추월 로그로 최종 순위 복원하기
slug: restore-final-ranking-from-overtakes
track: today
difficulty: medium
topic: index-map
tags:
  - daily
  - medium
  - simulation
  - swap
  - hashmap
  - ranking
order: 31
primaryMethod: bidirectional-index-map-swaps
coreIdea: 현재 순위 배열과 선수 이름별 인덱스 맵을 함께 유지하면서 추월 로그가 들어올 때마다 바로 앞 선수와 한 칸 swap해 최종 순위를 복원한다
gimmick: 같은 선수가 여러 번 연속 추월할 수 있으므로 매번 배열만 찾으면 느려지고, 이름→인덱스와 인덱스→이름을 동시에 갱신해야 O(1)에 처리할 수 있다
function_name: solution
time_limit_ms: 300
starter_code: |
  function solution(players, callings) {
    return [];
  }
test_cases:
  - input:
      - ["mumu", "soe", "poe", "kai", "mine"]
      - ["kai", "kai", "mine", "mine"]
    output: ["mumu", "kai", "mine", "soe", "poe"]
  - input:
      - ["red", "blue", "green"]
      - []
    output: ["red", "blue", "green"]
  - input:
      - ["a", "b", "c", "d"]
      - ["b", "c", "c", "d"]
    output: ["c", "d", "a", "b"]
  - input:
      - ["solo", "duo"]
      - ["duo"]
    output: ["duo", "solo"]
---

선수들의 현재 순위가 담긴 배열 `players`와, **한 번 추월이 발생할 때마다 추월한 선수 이름**이 순서대로 담긴 배열 `callings`가 주어집니다.

각 추월은 해당 선수가 **바로 앞 선수와 자리만 바꾸는 것**을 의미합니다.
모든 추월 로그를 순서대로 반영한 뒤의 최종 순위를 반환하는 `solution` 함수를 작성하세요.

## 제한사항
- `1 <= players.length <= 100000`
- `0 <= callings.length <= 100000`
- `players`의 각 이름은 서로 다릅니다.
- `callings`에 등장하는 이름은 항상 `players` 안에 있습니다.
- 추월 로그는 항상 유효합니다.
  - 즉, 호출된 선수는 그 순간에 맨 앞 선수가 아닙니다.
- 반환값은 모든 추월을 반영한 최종 순위 배열입니다.

## 예시
- 입력:
  - `players = ["mumu", "soe", "poe", "kai", "mine"]`
  - `callings = ["kai", "kai", "mine", "mine"]`
- 출력: `["mumu", "kai", "mine", "soe", "poe"]`

흐름을 보면:
1. `kai`가 `poe`를 추월 → `["mumu", "soe", "kai", "poe", "mine"]`
2. `kai`가 `soe`를 추월 → `["mumu", "kai", "soe", "poe", "mine"]`
3. `mine`이 `poe`를 추월 → `["mumu", "kai", "soe", "mine", "poe"]`
4. `mine`이 `soe`를 추월 → `["mumu", "kai", "mine", "soe", "poe"]`

추월 로그가 없으면 원래 순위를 그대로 반환합니다.

## 힌트
- 매번 선수 이름을 배열에서 `indexOf`로 찾으면 너무 느릴 수 있습니다.
- **선수 이름 → 현재 인덱스**를 빠르게 찾을 방법이 필요합니다.
- 한 번 추월이 일어나면 실제로 바뀌는 것은 **추월한 선수와 바로 앞 선수 2명뿐**입니다.

## 해설
이 문제의 핵심은 **추월이 일어날 때마다 전체 배열을 다시 탐색하지 않는 것**입니다.

가장 단순한 방법은 호출된 선수 이름을 배열에서 찾아, 바로 앞 선수와 swap하는 것입니다. 하지만 `callings`가 많을 때마다 `indexOf`를 쓰면 매번 `O(n)`이 걸려 전체가 매우 느려질 수 있습니다.

효율적으로 처리하려면 두 정보를 함께 관리하면 됩니다.

1. **현재 순위 배열**
   - `players[i]`는 현재 `i`등 선수 이름입니다.
2. **이름 → 현재 인덱스 맵**
   - 예: `position["kai"] = 3`

추월 로그에서 어떤 선수 `name`이 호출되면:

1. `position[name]`으로 현재 인덱스를 바로 찾습니다.
2. 바로 앞 인덱스 `idx - 1`의 선수 이름을 확인합니다.
3. 배열에서 두 선수의 위치를 swap합니다.
4. 맵에서도 두 선수의 인덱스를 함께 갱신합니다.

이렇게 하면 **각 추월을 O(1)** 에 처리할 수 있어서,
전체 시간 복잡도는 `O(players.length + callings.length)`가 됩니다.

예를 들어 `players = ["a", "b", "c", "d"]`, `callings = ["b", "c", "c", "d"]`라면:

1. `b` 호출 → `a`와 swap → `["b", "a", "c", "d"]`
2. `c` 호출 → `a`와 swap → `["b", "c", "a", "d"]`
3. `c` 호출 → `b`와 swap → `["c", "b", "a", "d"]`
4. `d` 호출 → `a`와 swap → `["c", "b", "d", "a"]`

중요한 포인트는 **배열만 바꾸고 맵을 안 바꾸면 다음 호출부터 인덱스 정보가 틀어진다**는 점입니다.
배열과 맵을 항상 같이 갱신해야 올바른 답을 얻을 수 있습니다.
