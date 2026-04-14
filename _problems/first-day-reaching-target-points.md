---
title: 목표 포인트를 처음 넘긴 날
slug: first-day-reaching-target-points
track: today
difficulty: easy
topic: milestone-scan
tags:
  - daily
  - beginner
  - array
  - prefix-total
  - milestone
order: 42
function_name: firstDayReachingTargetPoints
time_limit_ms: 200
primaryMethod: running-sum-first-hit
coreIdea: 배열을 앞에서부터 누적 합산하며 합계가 목표 이상이 되는 첫 시점을 찾아 1일부터 시작하는 날짜 번호를 반환한다
gimmick: 목표를 끝까지 못 넘기면 -1을 반환하고 목표값이 0 이하라면 아무 날도 기다릴 필요 없이 0을 반환한다
starter_code: |
  function firstDayReachingTargetPoints(points, target) {
    return -1;
  }
test_cases:
  - input: [[2, 3, 1, 4], 6]
    output: 3
  - input: [[5, 1, 1], 5]
    output: 1
  - input: [[1, 1, 1], 5]
    output: -1
  - input: [[], 3]
    output: -1
  - input: [[4, 0, 2], 0]
    output: 0
---
## 문제 설명
하루마다 모은 포인트가 담긴 배열 `points`와 목표 포인트 `target`이 주어집니다. 

1일차부터 순서대로 포인트를 누적했을 때, **누적 포인트가 처음으로 `target` 이상이 되는 날의 번호**를 반환하는 `firstDayReachingTargetPoints` 함수를 작성하세요.

날 번호는 `1`부터 시작합니다. 끝까지 누적해도 목표를 넘기지 못하면 `-1`을 반환하세요. 단, `target`이 `0` 이하라면 시작 전부터 이미 목표를 만족한 것으로 보고 `0`을 반환합니다.

## 제한사항
- `points`의 길이는 `0` 이상 `100,000` 이하입니다.
- `points[i]`는 `0` 이상 `10,000` 이하의 정수입니다.
- `target`은 `-1,000,000` 이상 `1,000,000` 이하의 정수입니다.
- 반환값은 목표를 처음 달성한 날의 번호이며, 불가능하면 `-1`입니다.

## 예시
- 입력: `points = [2, 3, 1, 4]`, `target = 6` → 출력: `3`
- 입력: `points = [5, 1, 1]`, `target = 5` → 출력: `1`
- 입력: `points = [1, 1, 1]`, `target = 5` → 출력: `-1`
- 입력: `points = [4, 0, 2]`, `target = 0` → 출력: `0`

## 힌트
- 하루씩 더해 가는 누적 합만 알면 됩니다.
- 누적 합이 목표 이상이 되는 순간 바로 답을 반환할 수 있습니다.
- 목표를 한 번 넘긴 뒤의 값은 더 볼 필요가 없습니다.

## 해설
이 문제는 **누적 합을 앞에서부터 추적하다가 처음 조건을 만족하는 시점**을 찾는 문제입니다.

1. `target <= 0`이면 시작 전부터 목표를 만족하므로 `0`을 반환합니다.
2. 누적 합을 저장할 변수 `sum`을 `0`으로 시작합니다.
3. `points`를 앞에서부터 순회하면서 현재 값을 `sum`에 더합니다.
4. 더한 뒤 `sum >= target`인지 확인합니다.
5. 처음으로 조건을 만족한 인덱스가 `i`라면 날짜 번호는 `i + 1`이므로 바로 반환합니다.
6. 끝까지 조건을 만족하지 못하면 `-1`을 반환합니다.

예를 들어 `points = [2, 3, 1, 4]`, `target = 6`이면:
- 1일차 누적: `2`
- 2일차 누적: `5`
- 3일차 누적: `6` → 처음으로 목표 이상

따라서 정답은 `3`입니다.

이 방식은 배열을 한 번만 순회하므로 시간 복잡도는 `O(n)`이고, 추가 공간은 `O(1)`입니다.
