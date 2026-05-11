---
title: 공장 배치 비용을 가장 작게 만들기
slug: minimum-factory-placement-cost
track: today
difficulty: hard
topic: convex-hull-trick
tags:
  - daily
  - hard
  - dynamic-programming
  - convex-hull-trick
  - li-chao-tree
  - optimization
order: 147
function_name: solution
time_limit_ms: 500
primaryMethod: li-chao-tree-quadratic-dp
coreIdea: 이전 지점 j에서 현재 지점 i로 이어질 때의 비용을 직선 형태로 바꿔 저장하고, 각 위치 x[i]에서 최소 직선을 질의해 이차식 DP를 빠르게 계산한다
gimmick: 제곱항을 그대로 비교하지 않고 dp[j] + x[j]^2 를 절편, -2x[j] 를 기울기로 변환해야 하며 위치 값이 음수여도 같은 방식으로 처리된다
starter_code: |
  function solution(positions, costs) {
    return 0;
  }
test_cases:
  - input: [[0, 2, 5], [3, 4, 1]]
    output: 21
  - input: [[0, 1, 3, 6], [0, 10, 1, 2]]
    output: 21
  - input: [[7], [5]]
    output: 5
  - input: [[-3, -1, 4, 10], [2, 7, 0, 3]]
    output: 77
---

## 문제 설명
오름차순으로 정렬된 후보 위치 `positions`와 각 위치에 공장을 지을 때 드는 기본 비용 `costs`가 주어집니다.

반드시 `0`번 위치에 첫 공장을 짓고, 이후 더 큰 인덱스의 위치를 골라 마지막 위치 `n - 1`까지 이어야 합니다. 어떤 이전 공장 `j`에서 현재 공장 `i`로 바로 이어 붙일 때 추가 이동 비용은 `(positions[i] - positions[j])²`입니다.

`i`번 위치에 공장을 지어 도달하는 최소 비용은 다음과 같이 정의됩니다.

```txt
dp[0] = costs[0]
dp[i] = costs[i] + min(dp[j] + (positions[i] - positions[j])²)  (0 <= j < i)
```

마지막 위치 `n - 1`에 도달하는 최소 비용을 반환하는 `solution` 함수를 작성하세요.

## 제한사항
- `positions`와 `costs`의 길이는 같습니다.
- `positions`의 길이 `n`은 1 이상 100,000 이하입니다.
- `positions`는 오름차순으로 정렬되어 있으며, 같은 값은 없습니다.
- 각 `positions[i]`는 -1,000,000 이상 1,000,000 이하의 정수입니다.
- 각 `costs[i]`는 0 이상 1,000,000 이하의 정수입니다.
- 첫 공장은 항상 `0`번 위치에 지어진 것으로 봅니다.
- 반환값은 `n - 1`번 위치까지 도달하는 최소 총비용입니다.

## 예시
- 입력: `[0, 2, 5]`, `[3, 4, 1]` → 출력: `21`
- 입력: `[0, 1, 3, 6]`, `[0, 10, 1, 2]` → 출력: `21`
- 입력: `[7]`, `[5]` → 출력: `5`

## 힌트
- 식 `(x[i] - x[j])²`을 전개해 보세요.
- `x[i]²`와 `costs[i]`는 현재 `i`가 정해지면 고정값입니다.
- 이전 `j`가 만드는 값은 `(-2 * x[j]) * x[i] + (dp[j] + x[j]²)` 형태의 직선으로 볼 수 있습니다.

## 해설
점화식을 그대로 계산하면 각 `i`마다 모든 이전 `j`를 확인해야 하므로 `O(n²)`입니다. `n`이 최대 100,000이면 사용할 수 없습니다.

식을 전개하면 다음과 같습니다.

```txt
dp[i] = costs[i] + min(dp[j] + (x[i] - x[j])²)
      = costs[i] + x[i]² + min((-2x[j]) * x[i] + dp[j] + x[j]²)
```

즉, 이전 위치 `j` 하나는 다음 직선 하나를 만듭니다.

```txt
기울기 m = -2 * x[j]
절편 b = dp[j] + x[j]²
직선값 = m * x[i] + b
```

현재 위치 `x[i]`에서 지금까지 추가된 직선 중 최솟값을 빠르게 찾으면 `dp[i]`를 계산할 수 있습니다. 위치 값 범위가 정해져 있으므로 Li Chao Tree를 사용하면 직선 추가와 최소 질의를 각각 `O(log C)`에 처리할 수 있습니다. 여기서 `C`는 가능한 `positions` 값의 범위입니다.

풀이 흐름은 다음과 같습니다.

1. `dp[0] = costs[0]`으로 시작합니다.
2. `0`번 위치가 만드는 직선 `m = -2 * positions[0]`, `b = dp[0] + positions[0]²`을 자료구조에 넣습니다.
3. `i = 1`부터 차례대로 현재 `positions[i]`에서 최소 직선값을 질의합니다.
4. `dp[i] = costs[i] + positions[i]² + 최소 직선값`으로 계산합니다.
5. 계산된 `dp[i]`로 새 직선을 만들어 추가합니다.
6. 마지막 `dp[n - 1]`을 반환합니다.

위치가 음수여도 전개식은 그대로 성립합니다. 단, 비용 합은 커질 수 있으므로 JavaScript에서는 일반 `Number` 범위 안에서 계산하되, 중간값을 불필요하게 문자열로 바꾸지 않는 것이 좋습니다.
