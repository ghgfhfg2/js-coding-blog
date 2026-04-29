---
title: 예산 안에서 고르는 최대 모듈 점수
slug: max-module-score-within-budget
track: today
difficulty: hard
topic: meet-in-the-middle
tags:
  - daily
  - hard
  - meet-in-the-middle
  - subset-sum
  - binary-search
  - optimization
order: 1001
function_name: solution
time_limit_ms: 500
primaryMethod: subset-sum-half-enumeration-binary-search
coreIdea: 비용 배열을 절반으로 나눠 각 절반의 모든 부분합을 만든 뒤 한쪽 부분합을 정렬해 다른 쪽과 합쳤을 때 budget 이하가 되는 최대 합을 이분 탐색으로 찾는다
gimmick: 전체를 2^n으로 완전탐색하지 않고 2^(n/2) 규모의 두 절반 부분합만 다루며, budget을 넘는 조합은 버리고 딱 맞는 합이 없어도 가장 가까운 이하 값을 선택해야 한다
starter_code: |
  function solution(costs, budget) {
    return 0;
  }
test_cases:
  - input: [[4, 7, 10, 13], 17]
    output: 17
  - input: [[8, 6, 5], 4]
    output: 0
  - input: [[9, 12, 7, 3, 14, 6], 25]
    output: 25
  - input: [[15, 15, 15, 2, 2, 2, 9], 31]
    output: 31
---

정수 배열 `costs`와 정수 `budget`이 주어질 때, 일부 원소를 **중복 없이** 골라 합이 `budget`을 넘지 않도록 하면서 만들 수 있는 **최대 합**을 반환하는 `solution` 함수를 작성하세요.

## 제한사항
- `1 <= costs.length <= 32`
- `0 <= costs[i] <= 10^9`
- `0 <= budget <= 10^9`
- 각 원소는 **선택하거나 선택하지 않거나** 둘 중 하나입니다.
- 같은 원소를 여러 번 사용할 수 없습니다.
- 만들 수 있는 합이 하나도 없더라도, 아무것도 고르지 않는 선택은 가능하므로 최소 정답은 `0`입니다.

## 예시
- 입력: `costs = [4, 7, 10, 13]`, `budget = 17` → 출력: `17`
- 입력: `costs = [8, 6, 5]`, `budget = 4` → 출력: `0`
- 입력: `costs = [9, 12, 7, 3, 14, 6]`, `budget = 25` → 출력: `25`

## 힌트
- 원소 수가 최대 32개라서 모든 부분집합을 전부 확인하는 `O(2^n)` 방식은 부담스럽습니다.
- 배열을 반으로 나누면 각 절반의 부분합 개수는 훨씬 줄어듭니다.
- 한쪽 부분합을 정렬해 두면, 다른 한쪽 합과 합쳤을 때 `budget` 이하가 되는 최적의 짝을 빠르게 찾을 수 있습니다.

## 해설
이 문제의 핵심은 **meet-in-the-middle**입니다.

원소가 32개라면 전체 부분집합은 최대 `2^32`개라서 직접 모두 확인하기 어렵습니다. 대신 배열을 절반씩 나누면 각 절반은 최대 16개이므로, 각 절반의 부분합은 최대 `2^16`개만 만들면 됩니다.

1. `costs`를 왼쪽 절반과 오른쪽 절반으로 나눕니다.
2. 각 절반에서 만들 수 있는 모든 부분합을 구합니다.
3. 오른쪽 부분합 배열을 정렬합니다.
4. 왼쪽 부분합 하나를 고정하고, `budget - leftSum` 이하인 가장 큰 오른쪽 부분합을 이분 탐색으로 찾습니다.
5. 가능한 최대 합을 계속 갱신합니다.

이렇게 하면 완전탐색보다 훨씬 적은 연산으로 정답을 구할 수 있습니다.

예를 들어 `costs = [4, 7, 10, 13]`, `budget = 17`이라면:
- 왼쪽 `[4, 7]`의 부분합: `0, 4, 7, 11`
- 오른쪽 `[10, 13]`의 부분합: `0, 10, 13, 23`
- 왼쪽 합이 `4`일 때는 오른쪽에서 `13`을 붙여 `17`을 만들 수 있습니다.

따라서 정답은 `17`입니다.