---
title: 같은 간격으로 늘어선 수열인지 확인하기
slug: check-arithmetic-streak
track: today
difficulty: easy
topic: progression-check
tags:
  - daily
  - beginner
  - array
  - sequence
  - difference
order: 1090
function_name: checkArithmeticStreak
time_limit_ms: 200
primaryMethod: first-difference-consistency-scan
coreIdea: 첫 두 수의 차이를 기준값으로 잡고 배열을 한 번 순회하며 모든 인접한 두 수의 차이가 끝까지 같은지 검사한다
gimmick: 길이가 2 이하인 배열은 자동으로 true이고 차이가 0이거나 음수여도 같은 간격이면 등차 수열로 인정해야 한다
starter_code: |
  function checkArithmeticStreak(nums) {
    return false;
  }
test_cases:
  - input: [[3, 7, 11, 15]]
    output: true
  - input: [[10, 7, 4, 1]]
    output: true
  - input: [[5, 5, 5, 5]]
    output: true
  - input: [[1, 3, 6, 8]]
    output: false
  - input: [[42]]
    output: true
---
숫자 배열이 끝까지 같은 간격으로 변하는지 확인하는 문제입니다.

## 문제 설명
정수 배열 `nums`가 주어집니다.

배열의 인접한 두 수의 차이가 처음부터 끝까지 모두 같다면 이 배열을 **같은 간격으로 늘어선 수열**이라고 하겠습니다.

`nums`가 이런 조건을 만족하면 `true`, 아니면 `false`를 반환하는 `checkArithmeticStreak` 함수를 작성하세요.

예를 들어 `[3, 7, 11, 15]`는 매번 `+4`씩 늘어나므로 `true`이고, `[1, 3, 6, 8]`은 차이가 `2, 3, 2`로 달라지므로 `false`입니다.

## 제한사항
- `nums`의 길이는 `1` 이상 `100,000` 이하입니다.
- `nums`의 각 원소는 `-1,000,000` 이상 `1,000,000` 이하의 정수입니다.
- 길이가 `1` 또는 `2`인 배열은 항상 `true`로 봅니다.
- 차이가 음수이거나 `0`이어도 모든 간격이 같으면 `true`입니다.

## 예시
- 입력: `nums = [3, 7, 11, 15]` → 출력: `true`
- 입력: `nums = [10, 7, 4, 1]` → 출력: `true`
- 입력: `nums = [5, 5, 5, 5]` → 출력: `true`
- 입력: `nums = [1, 3, 6, 8]` → 출력: `false`
- 입력: `nums = [42]` → 출력: `true`

## 힌트
- 첫 번째 간격만 먼저 구해 두면 됩니다.
- 그다음부터는 모든 인접한 두 수의 차이가 그 값과 같은지만 확인하면 됩니다.
- 길이가 아주 짧은 배열은 바로 답을 낼 수 있습니다.

## 해설
핵심은 **첫 간격을 기준으로 끝까지 일관성만 검사하는 것**입니다.

배열 길이가 `1` 또는 `2`라면 비교할 간격이 부족하므로 자동으로 `true`입니다.

그보다 길다면 먼저
- `diff = nums[1] - nums[0]`

를 구합니다.

이제 `i = 2`부터 끝까지 보면서 매번
- `nums[i] - nums[i - 1]`

를 계산하고, 이 값이 `diff`와 다르면 즉시 `false`를 반환하면 됩니다.

예를 들어 `[10, 7, 4, 1]`에서는 첫 간격이 `-3`이고,
- `7 - 10 = -3`
- `4 - 7 = -3`
- `1 - 4 = -3`

로 모두 같으므로 `true`입니다.

반대로 `[1, 3, 6, 8]`에서는 첫 간격이 `2`인데,
- `3 - 1 = 2`
- `6 - 3 = 3`

에서 바로 다르므로 `false`입니다.

이 방법은 배열을 한 번만 순회하므로 시간 복잡도는 `O(n)`이고, 추가 공간은 `O(1)`입니다.
