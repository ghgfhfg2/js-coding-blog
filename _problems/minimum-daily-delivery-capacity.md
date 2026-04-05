---
title: 정해진 날짜 안에 보내는 최소 배송 용량
slug: minimum-daily-delivery-capacity
track: algorithm
difficulty: medium
topic: binary-search
tags:
  - algorithm
  - binary-search
  - parametric-search
  - array
  - capacity
order: 17
function_name: solution
time_limit_ms: 300
starter_code: |
  function solution(weights, days) {
    return 0;
  }
test_cases:
  - input:
      - [3, 2, 2, 4, 1, 4]
      - 3
    output: 6
  - input:
      - [1, 2, 3, 1, 1]
      - 4
    output: 3
  - input:
      - [7, 2, 5, 10, 8]
      - 2
    output: 18
  - input:
      - [5, 5, 5]
      - 3
    output: 5
  - input:
      - [9]
      - 1
    output: 9
---
상자 무게가 순서대로 담긴 배열 `weights`와 남은 날짜 수 `days`가 주어질 때, **상자의 순서를 바꾸지 않고** `days`일 안에 모두 보내기 위해 필요한 **하루 최소 배송 용량**을 구하세요.

하루에는 왼쪽부터 순서대로 상자를 싣다가, 다음 상자를 더 실으면 용량을 초과하는 순간 그날 배송을 마감하고 다음 날로 넘어갑니다.

## 제한사항
- `1 <= weights.length <= 100000`
- `1 <= weights[i] <= 100000`
- `1 <= days <= weights.length`
- 상자의 순서는 바꿀 수 없습니다.
- 하루 용량은 정수여야 합니다.
- 모든 상자를 `days`일 안에 보낼 수 있는 최소 용량을 반환합니다.

## 예시
- 입력:
  - `weights = [3, 2, 2, 4, 1, 4]`
  - `days = 3`
  → 출력: `6`

  설명:
  - 용량이 6이면
    - 1일차: `[3, 2]`
    - 2일차: `[2, 4]`
    - 3일차: `[1, 4]`
  - 3일 안에 모두 보낼 수 있습니다.

- 입력:
  - `weights = [1, 2, 3, 1, 1]`
  - `days = 4`
  → 출력: `3`

- 입력:
  - `weights = [7, 2, 5, 10, 8]`
  - `days = 2`
  → 출력: `18`

## 힌트
- 하루 용량이 너무 작으면 날짜 안에 다 못 보냅니다.
- 반대로 용량이 충분히 크면 날짜 안에 보낼 수 있습니다.
- 어떤 용량이 가능하면, 그보다 큰 용량도 항상 가능합니다. 이 **단조성**을 이용해 보세요.
- 최소 가능한 용량의 범위는 `max(weights)` 이상 `sum(weights)` 이하입니다.

## 해설
이 문제는 가능한 답을 직접 하나씩 시험하면 범위가 너무 커서 비효율적입니다.

핵심은 **용량이 커질수록 배송 가능성이 좋아진다**는 점입니다.

- 어떤 용량 `C`로 `days`일 안에 배송할 수 있다면,
- 그보다 큰 용량으로도 당연히 배송할 수 있습니다.

이런 형태는 **정답에 대한 이분 탐색(binary search on answer)** 으로 풀기 좋습니다.

### 1) 탐색 범위 정하기
하루 용량은 적어도 가장 무거운 상자 하나는 실을 수 있어야 하므로,
최소값은 `max(weights)`입니다.

또 하루에 전부 보내는 경우가 최대이므로,
최대값은 `sum(weights)`입니다.

### 2) 어떤 용량이 가능한지 검사하기
용량 `cap`이 주어졌을 때,
왼쪽부터 상자를 순서대로 담아 보면서 며칠이 필요한지 계산합니다.

- 현재 날짜 적재량에 다음 상자를 더해도 `cap` 이하라면 계속 싣습니다.
- 초과하면 다음 날로 넘기고 새로 시작합니다.
- 필요한 날짜 수가 `days` 이하이면 그 용량은 가능한 값입니다.

### 3) 이분 탐색으로 최소 가능 용량 찾기
- `mid` 용량이 가능하면 더 작은 용량도 되는지 왼쪽 구간을 탐색합니다.
- `mid` 용량이 불가능하면 더 큰 용량이 필요하므로 오른쪽 구간을 탐색합니다.
- 이렇게 하면 최소 가능 용량을 찾을 수 있습니다.

시간 복잡도는 용량 검사에 `O(n)`, 이분 탐색이 `O(log(sum(weights)))`번 일어나므로 전체는 `O(n log S)` 정도입니다. (`S`는 가능한 용량 범위)

```js
function solution(weights, days) {
  let left = Math.max(...weights);
  let right = weights.reduce((sum, weight) => sum + weight, 0);

  const canShip = (cap) => {
    let usedDays = 1;
    let current = 0;

    for (const weight of weights) {
      if (current + weight <= cap) {
        current += weight;
      } else {
        usedDays += 1;
        current = weight;
      }
    }

    return usedDays <= days;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canShip(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
```

이 문제에서 익혀야 할 감각은 **배열을 직접 조작하는 것이 아니라, 정답 후보가 만족 가능한지 판별하는 함수를 만들고 그 범위를 줄여 가는 것**입니다. 이런 패턴은 용량, 시간, 거리, 인원 수 같은 최솟값/최댓값 결정 문제에 자주 등장합니다.
