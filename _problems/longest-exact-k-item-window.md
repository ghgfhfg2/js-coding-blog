---
title: 정확히 K종류 상품이 있는 가장 긴 진열 구간
slug: longest-exact-k-item-window
track: today
difficulty: medium
topic: distinct-window
tags:
  - daily
  - medium
  - sliding-window
  - hash-map
  - distinct
  - tie-break
order: 6
function_name: solution
time_limit_ms: 400
starter_code: |
  function solution(items, k) {
    return [-1, -1];
  }
test_cases:
  - input: [["apple", "banana", "apple", "carrot", "banana", "banana"], 3]
    output: [0, 5]
  - input: [["a", "b", "a", "c", "d", "c", "b"], 2]
    output: [0, 2]
  - input: [["pen", "pen", "pen"], 1]
    output: [0, 2]
  - input: [["red", "blue", "green"], 4]
    output: [-1, -1]
---

상품 이름이 담긴 배열 `items`와 정수 `k`가 주어질 때, **서로 다른 상품 종류가 정확히 `k`개인 연속 구간 중 가장 긴 구간**의 시작 인덱스와 끝 인덱스를 반환하는 `solution` 함수를 작성하세요.

가장 긴 구간이 여러 개라면 **시작 인덱스가 가장 작은 구간**을 반환하세요. 그런 구간이 없으면 `[-1, -1]`을 반환합니다.

## 제한사항
- `1 <= items.length <= 100000`
- `1 <= k <= items.length`
- `items[i]`는 길이 1 이상 20 이하의 문자열입니다.
- 반환값은 `[start, end]` 형태의 길이 2 배열입니다.
- `start`, `end`는 0-based 인덱스입니다.

## 예시
- 입력: `(["apple", "banana", "apple", "carrot", "banana", "banana"], 3)` → 출력: `[0, 5]`
  - 전체 구간이 `apple`, `banana`, `carrot` 3종류를 정확히 포함하므로 가장 깁니다.

- 입력: `(["a", "b", "a", "c", "d", "c", "b"], 2)` → 출력: `[0, 2]`
  - 길이 3인 `["a", "b", "a"]`는 종류가 정확히 2개입니다.
  - 길이 3인 다른 후보가 있더라도 시작 인덱스가 더 작은 `[0, 2]`를 반환합니다.

- 입력: `(["red", "blue", "green"], 4)` → 출력: `[-1, -1]`
  - 배열 전체를 봐도 종류가 4개가 되는 구간이 없습니다.

## 힌트
- 오른쪽 포인터를 늘리면서 각 상품의 등장 횟수를 관리해 보세요.
- 서로 다른 종류 수가 `k`를 초과하면 왼쪽 포인터를 움직여 다시 줄여야 합니다.
- 종류 수가 정확히 `k`일 때마다 현재 구간이 최선인지 비교하면 됩니다.

## 해설
이 문제의 핵심은 **슬라이딩 윈도우 + 빈도 해시 맵**입니다.

1. `right`를 한 칸씩 늘리며 현재 구간에 들어온 상품의 개수를 기록합니다.
2. 서로 다른 상품 종류 수가 `k`보다 커지면, `left`를 이동시키며 다시 `k` 이하가 될 때까지 줄입니다.
3. 종류 수가 정확히 `k`가 된 순간마다 현재 구간 길이를 확인합니다.
4. 더 긴 구간이면 정답을 갱신하고, 길이가 같으면 시작 인덱스가 더 작은 구간을 남깁니다.

이 방식이 가능한 이유는, 한 번 `right`가 늘어난 뒤 `left`도 앞으로만 이동하므로 각 원소가 윈도우에 들어오고 나가는 횟수가 많아야 1번씩이기 때문입니다.

- 시간 복잡도: `O(n)`
- 공간 복잡도: `O(k)` ~ `O(n)`

구간 자체를 모두 만들어 비교하면 너무 느리지만, 현재 윈도우의 빈도만 관리하면 긴 입력도 효율적으로 처리할 수 있습니다.
