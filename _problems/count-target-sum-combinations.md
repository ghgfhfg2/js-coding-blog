---
title: 목표 합을 만드는 조합 수
slug: count-target-sum-combinations
track: algorithm
difficulty: medium
topic: backtracking
tags:
  - algorithm
  - backtracking
  - recursion
  - combination
  - pruning
order: 39
function_name: solution
time_limit_ms: 300
primaryMethod: recursive-backtracking-pruning
coreIdea: 양의 정수 배열을 정렬한 뒤 각 수를 한 번씩만 쓰는 조합을 재귀적으로 탐색하면서 현재 합이 target을 넘으면 가지치기해 목표 합을 만드는 조합 개수를 센다
gimmick: 같은 값이 여러 번 있어도 인덱스가 다르면 서로 다른 원소로 취급하지만 조합은 인덱스 증가 방향으로만 만들어 순서만 다른 중복 경우를 세지 않는다
starter_code: |
  function solution(numbers, target) {
    return 0;
  }
test_cases:
  - input: [[2, 3, 5, 6, 8], 10]
    output: 3
  - input: [[1, 1, 2, 3], 4]
    output: 3
  - input: [[4, 7, 9], 3]
    output: 0
  - input: [[1, 2, 3], 0]
    output: 1
  - input: [[], 5]
    output: 0
---
양의 정수 배열에서 몇 개를 골라 합이 정확히 `target`이 되는 조합의 수를 구하는 문제입니다.

## 문제 설명
양의 정수 배열 `numbers`와 목표값 `target`이 주어집니다.

배열의 각 원소는 **최대 한 번만 사용할 수 있고**, 선택한 원소들의 **순서는 중요하지 않습니다**. 합이 정확히 `target`이 되는 서로 다른 조합의 개수를 반환하는 `solution` 함수를 작성하세요.

예를 들어 `numbers = [2, 3, 5, 6, 8]`, `target = 10`이면 가능한 조합은 다음 3개입니다.

- `2 + 3 + 5 = 10`
- `2 + 8 = 10`
- `4`는 없으므로 `4 + 6` 같은 조합은 불가능
- `10` 자체도 없으므로 단일 원소 조합은 없음

따라서 정답은 `3`입니다.

## 제한사항
- `0 <= numbers.length <= 20`
- `1 <= numbers[i] <= 100`
- `0 <= target <= 1,000`
- 각 원소는 한 번만 사용할 수 있습니다.
- 조합에서 원소의 **선택 순서만 다른 경우는 같은 조합**으로 봅니다.
- 반환값은 합이 정확히 `target`이 되는 조합의 개수입니다.

## 예시
- 입력: `numbers = [2, 3, 5, 6, 8]`, `target = 10` → 출력: `3`
- 입력: `numbers = [1, 1, 2, 3]`, `target = 4` → 출력: `3`
- 입력: `numbers = [4, 7, 9]`, `target = 3` → 출력: `0`
- 입력: `numbers = [1, 2, 3]`, `target = 0` → 출력: `1`

## 힌트
- 어떤 원소를 고를지 말지 결정하면서 다음 인덱스로 넘어가는 재귀 탐색을 떠올려 보세요.
- 원소가 모두 양수라면 현재 합이 이미 `target`을 넘는 순간 그 아래 경우는 더 볼 필요가 없습니다.
- 같은 조합을 순서만 바꿔 여러 번 세지 않으려면, 항상 뒤쪽 인덱스로만 진행하면 됩니다.

## 해설
이 문제는 가능한 조합을 직접 만들어 보는 **백트래킹** 연습 문제입니다.

핵심은 다음 두 가지입니다.

1. 각 원소는 한 번만 쓸 수 있다.
2. 순서만 다른 경우는 같은 조합이다.

따라서 재귀 함수에서 현재 보고 있는 위치 `index`를 기준으로, 그 뒤의 원소들만 선택하도록 만들면 됩니다. 그러면 `2 → 8`은 세더라도 `8 → 2` 같은 중복 순서는 생기지 않습니다.

### 어떻게 탐색하나?
예를 들어 `numbers = [2, 3, 5, 6, 8]`, `target = 10`이라면,

- `2`를 고르고 다음으로 진행
- `3`을 더 고르고 다음으로 진행
- `5`를 더하면 합이 `10`이므로 카운트 1 증가

이런 식으로 현재 조합의 합을 추적합니다.

### 왜 가지치기가 가능한가?
모든 수가 양수이므로 현재 합이 이미 `target`보다 커졌다면, 뒤에서 어떤 수를 더 골라도 합은 더 커질 뿐입니다.
따라서 그 경로는 바로 중단할 수 있습니다.

정렬까지 해 두면 현재 원소를 더했을 때 이미 `target`을 넘는 순간, 그 뒤의 더 큰 수들도 볼 필요가 없어져서 탐색이 더 깔끔해집니다.

### 구현 예시
```js
function solution(numbers, target) {
  const sorted = [...numbers].sort((a, b) => a - b);
  let count = 0;

  function dfs(start, sum) {
    if (sum === target) {
      count += 1;
      return;
    }

    for (let i = start; i < sorted.length; i++) {
      const nextSum = sum + sorted[i];

      if (nextSum > target) {
        break;
      }

      dfs(i + 1, nextSum);
    }
  }

  dfs(0, 0);
  return count;
}
```

### 예외 케이스
- `target`이 `0`이면 아무것도 고르지 않는 빈 조합 하나가 정답이므로 `1`을 반환합니다.
- 배열이 비어 있고 `target`이 양수라면 만들 수 있는 조합은 없으므로 `0`입니다.
- 같은 값이 여러 개 있어도 서로 다른 위치의 원소라면 각각 선택 여부를 따질 수 있습니다.
  - 예: `[1, 1, 2, 3]`, `target = 4`
  - 가능한 조합은 `(첫 번째 1, 3)`, `(두 번째 1, 3)`, `(1, 1, 2)`로 총 `3`개입니다.

이 문제를 통해 **조합 탐색, 인덱스를 이용한 중복 방지, 양수 조건을 이용한 가지치기**를 함께 연습할 수 있습니다.