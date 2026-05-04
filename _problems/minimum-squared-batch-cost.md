---
title: 제곱 묶음 비용의 최솟값
slug: minimum-squared-batch-cost
track: today
difficulty: hard
topic: convex-hull-trick
tags:
  - daily
  - hard
  - dynamic-programming
  - convex-hull-trick
  - prefix-sum
  - optimization
order: 1200
function_name: minimumSquaredBatchCost
time_limit_ms: 600
primaryMethod: monotonic-convex-hull-prefix-dp
coreIdea: 누적합 기준 구간 분할 DP를 세운 뒤 각 이전 분할점을 직선으로 바꿔 증가하는 누적합 순서에서 convex hull trick으로 최솟값 질의를 처리한다
gimmick: 구간 비용의 제곱항을 전개하면 현재 누적합에 대한 일차식 최솟값 문제로 바뀌고, 모든 원소가 양수라 누적합과 기울기 순서가 단조라는 점을 이용해 deque 기반 CHT로 O(n)에 가깝게 줄일 수 있다
starter_code: |
  function minimumSquaredBatchCost(nums, penalty) {
    return 0;
  }
test_cases:
  - input: [[3, 1, 2], 5]
    output: 28
  - input: [[1, 2, 3, 4], 10]
    output: 64
  - input: [[5], 7]
    output: 32
  - input: [[2, 2, 2, 2], 1]
    output: 20
  - input: [[1, 10, 1, 10], 3]
    output: 214
---
양의 정수 배열을 연속한 여러 묶음으로 나눌 때, 각 묶음의 합의 제곱 비용과 고정 페널티를 더한 총비용의 최솟값을 구하는 문제입니다.

## 문제 설명
양의 정수 배열 `nums`와 정수 `penalty`가 주어집니다.

`nums`를 **하나 이상의 연속한 묶음**으로 나누려고 합니다.
각 묶음의 비용은 다음과 같습니다.

- `그 묶음 원소 합의 제곱 + penalty`

전체 비용은 모든 묶음 비용의 합입니다.

연속 구간 분할을 적절히 골라 **전체 비용의 최솟값**을 반환하는 `minimumSquaredBatchCost` 함수를 작성하세요.

예를 들어 `nums = [3, 1, 2]`, `penalty = 5`라면:
- `[3, 1, 2]` 한 묶음 → `6^2 + 5 = 41`
- `[3]`, `[1, 2]` → `3^2 + 5 + 3^2 + 5 = 28`
- `[3, 1]`, `[2]` → `4^2 + 5 + 2^2 + 5 = 30`
- `[3]`, `[1]`, `[2]` → `9 + 5 + 1 + 5 + 4 + 5 = 29`

따라서 정답은 `28`입니다.

## 제한사항
- `1 <= nums.length <= 100,000`
- `1 <= nums[i] <= 100,000`
- `0 <= penalty <= 1,000,000,000`
- 반환값은 JavaScript의 안전한 정수 범위 안에 들어온다고 가정합니다.
- `nums`의 모든 원소는 양의 정수입니다.

## 예시
- 입력: `nums = [3, 1, 2]`, `penalty = 5` → 출력: `28`
- 입력: `nums = [1, 2, 3, 4]`, `penalty = 10` → 출력: `64`
- 입력: `nums = [2, 2, 2, 2]`, `penalty = 1` → 출력: `20`
- 입력: `nums = [1, 10, 1, 10]`, `penalty = 3` → 출력: `214`

## 힌트
- `dp[i]`를 앞에서부터 `i`개 원소까지 처리한 최소 비용으로 두고 식을 세워 보세요.
- 구간 합은 누적합으로 `O(1)`에 계산할 수 있습니다.
- 제곱항을 전개하면 `현재 누적합 x에 대한 여러 직선의 최솟값` 형태가 됩니다.
- `nums[i]`가 모두 양수라는 조건이 누적합 순서를 단조롭게 만들어 줍니다.

## 해설
기본 DP는 다음과 같습니다.

- `prefix[i]`: 앞에서부터 `i`개 원소의 누적합
- `dp[i]`: 앞에서부터 `i`개 원소까지 나눴을 때의 최소 비용

마지막 묶음이 `j + 1`부터 `i`까지라면:

```text
dp[i] = min(dp[j] + (prefix[i] - prefix[j])^2 + penalty)
        (0 <= j < i)
```

이 식을 전개하면:

```text
dp[i] = prefix[i]^2 + penalty + min(dp[j] + prefix[j]^2 - 2 * prefix[j] * prefix[i])
```

여기서 `prefix[i]`를 현재 x값이라고 보면, 각 `j`는

```text
y = m * x + b
m = -2 * prefix[j]
b = dp[j] + prefix[j]^2
```

형태의 직선 하나가 됩니다.
즉 매 단계마다:
1. 현재 `x = prefix[i]`에서 가장 작은 직선값을 질의하고
2. 새로 계산된 `dp[i]`로 다음 직선을 추가하면 됩니다.

또한 모든 `nums[i]`가 양수라서 `prefix[i]`는 엄격히 증가합니다.
그래서
- 질의 x값도 증가 순서
- 추가되는 직선 기울기 `-2 * prefix[j]`도 단조 순서

를 만족하므로, 일반 Li Chao Tree 대신 **deque 기반 monotonic convex hull trick**으로 처리할 수 있습니다.

이렇게 하면 전체 시간 복잡도는 `O(n)`에 가깝고, 큰 입력도 통과할 수 있습니다.
