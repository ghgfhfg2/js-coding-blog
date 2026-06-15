---
title: 가격 차이가 제한 이내인 연속 구간 개수
slug: count-bounded-price-windows
track: today
difficulty: medium
topic: bounded-range-window
tags:
  - daily
  - medium
  - sliding-window
  - monotonic-deque
  - counting
order: 1440
function_name: countBoundedPriceWindows
time_limit_ms: 300
primaryMethod: dual-monotonic-deque-sliding-window-count
coreIdea: 두 단조 deque로 현재 연속 구간의 최댓값과 최솟값을 유지하고 차이가 limit를 넘으면 왼쪽 경계를 줄인 뒤, 각 오른쪽 끝점에서 만들 수 있는 모든 유효 구간 수를 더한다
gimmick: 가장 긴 유효 구간 하나가 아니라 조건을 만족하는 모든 연속 구간을 세므로 매 오른쪽 끝점마다 windowLength를 정답에 누적해야 한다
starter_code: |
  function countBoundedPriceWindows(prices, limit) {
    return 0;
  }
test_cases:
  - input: [[1, 3, 2], 2]
    output: 6
  - input: [[8, 2, 4, 7], 4]
    output: 6
  - input: [[4, 4, 4], 0]
    output: 6
  - input: [[1, 5, 2, 3], 2]
    output: 5
  - input: [[10], 0]
    output: 1
---

가격 배열에서 최댓값과 최솟값의 차이가 제한 안인 연속 구간이 몇 개인지 구하세요.

## 문제 설명

정수 배열 `prices`와 정수 `limit`가 주어집니다.

연속 구간 안의 최댓값과 최솟값의 차이가 `limit` 이하이면 그 구간을 안정적인 가격 구간이라고 합니다.

길이가 1인 구간을 포함해 안정적인 가격 구간의 총개수를 반환하는 `countBoundedPriceWindows` 함수를 작성하세요.

## 제한사항

- `1 <= prices.length <= 200,000`
- `0 <= prices[i] <= 1,000,000,000`
- `0 <= limit <= 1,000,000,000`
- 반환값은 JavaScript의 안전한 정수 범위 안에 들어온다고 가정합니다.
- 연속하지 않은 원소를 골라 만든 구간은 세지 않습니다.

## 예시

- 입력: `prices = [1, 3, 2]`, `limit = 2` -> 출력: `6`
- 입력: `prices = [8, 2, 4, 7]`, `limit = 4` -> 출력: `6`
- 입력: `prices = [4, 4, 4]`, `limit = 0` -> 출력: `6`
- 입력: `prices = [1, 5, 2, 3]`, `limit = 2` -> 출력: `5`

## 힌트

- 오른쪽 끝점을 하나씩 늘리면서 조건을 만족하는 가장 왼쪽 시작점을 관리해 보세요.
- 현재 구간의 최댓값과 최솟값을 빠르게 알 수 있도록 서로 반대 방향의 단조 deque 두 개를 사용할 수 있습니다.
- 오른쪽 끝점이 고정되었을 때 유효한 시작점은 몇 개인지 생각해 보세요.

## 해설

모든 연속 구간을 직접 확인하면 구간 수가 `O(n^2)`개라 입력이 클 때 통과하기 어렵습니다.

오른쪽 끝점 `right`를 한 칸씩 늘리는 슬라이딩 윈도우를 사용합니다. 현재 구간의 최댓값 인덱스는 값이 큰 순서로 유지하는 deque에, 최솟값 인덱스는 값이 작은 순서로 유지하는 deque에 저장합니다. 새 가격을 넣을 때 각 deque의 뒤에서 더 이상 후보가 될 수 없는 인덱스를 제거하면, 두 deque의 맨 앞에서 현재 최댓값과 최솟값을 바로 얻을 수 있습니다.

두 값의 차이가 `limit`를 넘는 동안 `left`를 오른쪽으로 옮깁니다. deque 맨 앞의 인덱스가 새로운 `left`보다 작아지면 함께 제거합니다. 이 과정이 끝나면 `[left, right]`는 조건을 만족하며, 같은 `right`에서 `left`보다 오른쪽에 있는 위치를 시작점으로 잡은 구간도 모두 조건을 만족합니다.

따라서 `right`에서 끝나는 안정적인 구간 수는 `right - left + 1`개입니다. 이 값을 모든 `right`에 대해 누적하면 전체 구간 수를 얻습니다.

각 인덱스는 두 deque에 각각 한 번 들어가고 최대 한 번 제거되므로 시간 복잡도는 `O(n)`, 공간 복잡도는 `O(n)`입니다.
