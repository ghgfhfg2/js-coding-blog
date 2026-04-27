---
title: 세 구간 합이 모두 같은지 확인하기
slug: check-equal-three-part-sum
track: today
difficulty: easy
topic: partition-scan
tags:
  - daily
  - beginner
  - array
  - partition
  - prefix-sum
order: 1030
function_name: checkEqualThreePartSum
time_limit_ms: 200
primaryMethod: running-sum-three-way-partition
coreIdea: 배열 전체 합이 3으로 나누어떨어지는지 먼저 확인한 뒤, 왼쪽부터 누적합이 목표값에 도달하는 지점을 두 번 찾으면 세 연속 구간의 합이 모두 같은지 판별할 수 있다
gimmick: 전체 합이 0인 경우도 포함되며 앞의 두 구간을 너무 늦게 자르면 마지막 구간이 비어 버릴 수 있으므로 마지막 원소 전까지만 두 번째 구간 종료를 찾아야 한다
starter_code: |
  function checkEqualThreePartSum(nums) {
    return false;
  }
test_cases:
  - input: [[1, 2, 3, 0, 3]]
    output: true
  - input: [[0, 0, 0]]
    output: true
  - input: [[3, 3, 3]]
    output: true
  - input: [[1, 1, 1, 1]]
    output: false
  - input: [[2, 0, 2, 0, 2, 0]]
    output: true
---
배열을 세 개의 연속 구간으로 나눴을 때 각 구간의 합이 모두 같은지 확인하는 문제입니다.

## 문제 설명
정수 배열 `nums`가 주어집니다.

이 배열을 **비어 있지 않은 세 개의 연속 구간**으로 나눌 수 있는지 확인하세요.
세 구간의 합이 모두 같으면 `true`, 아니면 `false`를 반환하는 `checkEqualThreePartSum` 함수를 작성하세요.

구간은 반드시 원래 순서를 유지해야 하며, 각 원소는 정확히 하나의 구간에만 포함되어야 합니다.

## 제한사항
- `nums`의 길이는 `3` 이상 `100,000` 이하입니다.
- `nums`의 각 원소는 `-1,000` 이상 `1,000` 이하의 정수입니다.
- 세 구간은 모두 **연속**이어야 합니다.
- 세 구간은 모두 **최소 1개 이상의 원소**를 가져야 합니다.

## 예시
- 입력: `nums = [1, 2, 3, 0, 3]` → 출력: `true`
- 입력: `nums = [0, 0, 0]` → 출력: `true`
- 입력: `nums = [1, 1, 1, 1]` → 출력: `false`
- 입력: `nums = [2, 0, 2, 0, 2, 0]` → 출력: `true`

## 힌트
- 세 구간의 합이 모두 같으려면 전체 합은 먼저 `3`으로 나누어떨어져야 합니다.
- 목표 합을 `target = total / 3`이라고 두고, 왼쪽부터 누적합을 쌓아 보세요.
- 누적합이 `target`이 되는 첫 번째 지점과 두 번째 지점을 찾으면 됩니다.

## 해설
핵심은 **전체 합이 3등분 가능한지 먼저 확인하고, 누적합으로 자를 위치를 찾는 것**입니다.

1. 배열 전체 합을 구합니다.
2. 전체 합이 `3`으로 나누어떨어지지 않으면 바로 `false`입니다.
3. `target = total / 3`을 구합니다.
4. 왼쪽부터 누적합을 더하면서 `target`이 되는 지점을 찾습니다.
5. 그 뒤 계속 진행해서 누적합이 `2 * target`이 되는 지점을 마지막 원소 전에 찾으면 `true`입니다.

왜 이렇게 해도 될까요?
- 첫 번째 커트 지점까지의 합이 `target`
- 두 번째 커트 지점까지의 합이 `2 * target`

이면, 남은 마지막 구간의 합은 자동으로 `total - 2 * target = target`이 됩니다.
즉 앞의 두 구간만 제대로 찾으면 세 번째 구간도 조건을 만족합니다.

예를 들어 `nums = [1, 2, 3, 0, 3]`이면 전체 합은 `9`, 각 구간 목표 합은 `3`입니다.
- `[1, 2]`의 합은 `3`
- `[3, 0]`의 합도 `3`
- `[3]`의 합도 `3`

이므로 `true`입니다.

반대로 `nums = [1, 1, 1, 1]`의 전체 합은 `4`라서 애초에 `3`등분할 수 없습니다.

이 방법은 배열을 한두 번만 순회하므로 시간 복잡도는 `O(n)`이고, 추가 공간은 `O(1)`입니다.
