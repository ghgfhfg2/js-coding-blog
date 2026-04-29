---
title: 양옆보다 작은 숫자 개수
slug: count-local-valleys
track: today
difficulty: easy
topic: neighbor-pattern
tags:
  - daily
  - beginner
  - array
  - pattern
  - counting
order: 999
function_name: solution
time_limit_ms: 200
primaryMethod: neighbor-triplet-strict-min-check
coreIdea: 양끝을 제외한 각 위치를 보며 현재 값이 바로 왼쪽과 오른쪽 값보다 모두 작은지 검사해 국소 골짜기 개수를 센다
gimmick: 전체 최솟값을 찾는 문제가 아니라 인접한 두 값과의 엄격 비교만 보면 되고, 이웃 값과 같으면 골짜기로 세지지 않는다
starter_code: |
  function solution(nums) {
    return 0;
  }
test_cases:
  - input: [[5, 2, 4, 1, 3]]
    output: 2
  - input: [[1, 2, 3, 4]]
    output: 0
  - input: [[3, 1, 1, 3]]
    output: 0
  - input: [[7, -1, 6, -2, 5]]
    output: 2
  - input: [[9, 4]]
    output: 0
---

정수 배열 `nums`가 주어질 때, 자기 양옆 숫자보다 모두 작은 위치의 개수를 반환하는 `solution` 함수를 작성하세요.

## 제한사항
- `nums`는 정수 배열입니다.
- 양끝 원소는 한쪽 이웃이 없으므로 세지지 않습니다.
- 어떤 위치의 값이 왼쪽 값보다 작고, 동시에 오른쪽 값보다 작을 때만 개수에 포함합니다.
- 배열 길이가 3보다 작으면 정답은 `0`입니다.

## 예시
- 입력: `[5, 2, 4, 1, 3]` → 출력: `2`
- 입력: `[1, 2, 3, 4]` → 출력: `0`
- 입력: `[3, 1, 1, 3]` → 출력: `0`

## 힌트
- 양끝을 제외한 위치만 확인하면 됩니다.
- 현재 값이 `nums[i - 1]`와 `nums[i + 1]`보다 모두 작은지 비교해 보세요.

## 해설
이 문제는 배열을 한 번만 순회하면 풀 수 있습니다.

1. 인덱스 `1`부터 `nums.length - 2`까지 확인합니다.
2. 각 위치에서 현재 값이 왼쪽 값과 오른쪽 값보다 모두 작은지 검사합니다.
3. 조건을 만족하면 개수를 1 증가시킵니다.
4. 순회가 끝나면 누적한 개수를 반환합니다.

핵심은 **양옆 두 값과의 비교가 모두 엄격한 부등호**여야 한다는 점입니다. 따라서 이웃한 값과 같으면 작은 위치로 보지 않습니다.