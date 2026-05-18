---
title: 목표 금액을 만드는 최소 동전 수
slug: minimum-coins-for-target-amount
track: algorithm
difficulty: medium
topic: coin-change
tags:
  - algorithm
  - dynamic-programming
  - coin-change
  - unbounded-knapsack
  - minimum-count
order: 1265
function_name: minimumCoinsForTarget
time_limit_ms: 300
primaryMethod: one-dimensional-unbounded-coin-dp
coreIdea: 금액 0부터 target까지 필요한 최소 동전 수를 dp에 저장하고 각 동전을 여러 번 사용할 수 있도록 현재 금액에서 동전 값을 뺀 이전 상태를 참고해 갱신한다
gimmick: 만들 수 없는 금액은 Infinity로 남겨 두었다가 최종적으로 -1로 바꾸며, target이 0이면 동전을 하나도 쓰지 않는 0개가 정답이다
starter_code: |
  function minimumCoinsForTarget(coins, target) {
    return -1;
  }
test_cases:
  - input: [[1, 2, 5], 11]
    output: 3
  - input: [[2], 3]
    output: -1
  - input: [[2, 4, 6], 0]
    output: 0
  - input: [[1, 3, 4], 6]
    output: 2
  - input: [[5, 7], 1]
    output: -1
---

## 문제 설명
동전 단위 배열 `coins`와 목표 금액 `target`이 주어집니다. 각 동전은 원하는 만큼 여러 번 사용할 수 있을 때, 정확히 `target`원을 만들기 위해 필요한 **최소 동전 개수**를 반환하는 `minimumCoinsForTarget` 함수를 작성하세요.

목표 금액을 만들 수 없다면 `-1`을 반환합니다.

## 제한사항
- `1 <= coins.length <= 100`
- `1 <= coins[i] <= 10,000`
- `0 <= target <= 10,000`
- 같은 동전 단위가 여러 번 들어올 수 있습니다.
- 각 동전 단위는 원하는 만큼 반복해서 사용할 수 있습니다.
- 정확히 `target`을 만들 수 없으면 `-1`을 반환합니다.
- `target`이 `0`이면 동전을 사용하지 않아도 되므로 `0`을 반환합니다.

## 예시
- 입력: `coins = [1, 2, 5]`, `target = 11` → 출력: `3`
  - `5 + 5 + 1`로 3개를 사용합니다.
- 입력: `coins = [2]`, `target = 3` → 출력: `-1`
  - 2원 동전만으로는 3원을 만들 수 없습니다.
- 입력: `coins = [1, 3, 4]`, `target = 6` → 출력: `2`
  - `3 + 3`으로 2개를 사용하는 것이 `4 + 1 + 1`보다 적습니다.

## 힌트
- `dp[amount]`를 `amount`원을 만드는 데 필요한 최소 동전 개수라고 생각해 보세요.
- 어떤 동전 `coin`을 마지막에 사용했다면, 직전 상태는 `amount - coin`입니다.
- 만들 수 없는 금액은 큰 값으로 표시해 두고, 가능한 이전 상태에서만 갱신하면 됩니다.

## 해설
이 문제는 대표적인 **동전 교환(coin change) DP** 유형입니다. 작은 금액부터 차례대로 최소 동전 개수를 확정해 나가면 큰 금액도 이전 계산 결과를 이용해 구할 수 있습니다.

먼저 `dp[0] = 0`으로 둡니다. 0원을 만드는 데 필요한 동전 개수는 0개이기 때문입니다. 나머지 금액은 아직 만들 수 없다는 뜻으로 `Infinity` 같은 큰 값으로 초기화합니다.

이후 `amount`를 1부터 `target`까지 늘려 가며 모든 동전 `coin`을 확인합니다. 만약 `amount - coin`이 0 이상이고 그 금액을 만들 수 있다면, 현재 금액은 `dp[amount - coin] + 1`개의 동전으로 만들 수 있습니다. 여러 동전 후보 중 가장 작은 값을 `dp[amount]`에 저장합니다.

마지막에 `dp[target]`이 여전히 만들 수 없는 값이면 `-1`, 아니면 저장된 최소 개수를 반환합니다. 동전을 여러 번 사용할 수 있으므로 1차원 DP만으로도 충분하며, 시간 복잡도는 `O(target * coins.length)`입니다.
