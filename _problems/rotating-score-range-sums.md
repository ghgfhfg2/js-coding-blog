---
title: 회전한 점수판 구간 합 빠르게 구하기
slug: rotating-score-range-sums
track: today
difficulty: medium
topic: circular-prefix-sum
tags:
  - daily
  - medium
  - array
  - prefix-sum
  - circular
  - range-query
order: 1490
function_name: rotatingScoreRangeSums
time_limit_ms: 300
primaryMethod: doubled-prefix-rotation-range-sum
coreIdea: 원형 배열을 두 번 이어 붙인 누적합을 만들어 오른쪽 회전 뒤 보이는 연속 구간을 원본 원형 구간으로 바꿔 각 질의의 합을 O(1)에 계산한다
gimmick: 회전 수가 배열 길이보다 클 수 있고, 보이는 구간이 원본 배열 끝에서 처음으로 이어지는 경우도 하나의 doubled prefix 구간으로 처리해야 한다
starter_code: |
  function rotatingScoreRangeSums(scores, queries) {
    return [];
  }
test_cases:
  - input: [[10, 20, 30, 40, 50], [[1, 0, 1], [2, 1, 3], [0, 2, 4]]]
    output: [60, 80, 120]
  - input: [[5, -2, 7, 1], [[3, 0, 2], [1, 2, 3], [8, 1, 1]]]
    output: [6, 5, -2]
  - input: [[42], [[100, 0, 0], [0, 0, 0]]]
    output: [42, 42]
  - input: [[3, 1, 4, 1, 5], [[2, 3, 4], [2, 4, 4], [2, 0, 4]]]
    output: [5, 4, 14]
---

## 문제 설명
점수판 `scores`가 원형으로 놓여 있습니다.

각 질의 `[rotation, left, right]`는 점수판을 오른쪽으로 `rotation`칸 회전했을 때, 보이는 배열의 `left`번 인덱스부터 `right`번 인덱스까지의 합을 구하라는 뜻입니다.

모든 질의의 답을 순서대로 담은 배열을 반환하는 `rotatingScoreRangeSums` 함수를 작성하세요.

## 제한사항
- `1 <= scores.length <= 100000`
- `-10000 <= scores[i] <= 10000`
- `1 <= queries.length <= 100000`
- 각 질의는 `[rotation, left, right]` 형태입니다.
- `0 <= rotation <= 1000000000`
- `0 <= left <= right < scores.length`
- 반환값은 각 질의의 구간 합을 순서대로 담은 배열입니다.

## 예시
- 입력: `scores = [10, 20, 30, 40, 50]`, `queries = [[1, 0, 1], [2, 1, 3], [0, 2, 4]]` → 출력: `[60, 80, 120]`
- 입력: `scores = [5, -2, 7, 1]`, `queries = [[3, 0, 2], [1, 2, 3], [8, 1, 1]]` → 출력: `[6, 5, -2]`
- 입력: `scores = [42]`, `queries = [[100, 0, 0], [0, 0, 0]]` → 출력: `[42, 42]`

## 힌트
- 오른쪽으로 `r`칸 회전한 뒤 보이는 인덱스 `i`는 원본 배열의 `(i - r + n) % n` 위치와 대응됩니다.
- 원형 구간 합은 배열을 두 번 이어 붙인 뒤 누적합을 만들면 끊김 없이 계산할 수 있습니다.
- `rotation`은 `scores.length`로 나눈 나머지만 실제 배치에 영향을 줍니다.

## 해설
질의마다 실제로 배열을 회전하면 한 번의 질의에 최대 `O(n)`이 걸려 전체 시간이 커집니다.
회전은 인덱스 대응만 바꾸므로 배열 자체를 움직일 필요가 없습니다.

배열 길이를 `n`, 오른쪽 회전 수를 `r % n`이라고 합시다.
회전된 배열의 `left` 위치는 원본 배열의 `(left - r + n) % n` 위치에서 시작합니다.
`left`부터 `right`까지의 길이는 `right - left + 1`입니다.

원본 배열을 두 번 이어 붙인 배열의 누적합을 만들어 두면, 시작 위치에서 길이만큼 이어지는 원형 구간 합을 한 번의 뺄셈으로 구할 수 있습니다.
따라서 전처리는 `O(n)`, 각 질의는 `O(1)`에 처리할 수 있습니다.
