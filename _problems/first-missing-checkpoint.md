---
title: 비어 있는 첫 체크포인트
slug: first-missing-checkpoint
track: today
difficulty: easy
topic: sequence-scan
tags:
  - daily
  - beginner
  - sequence
  - missing
  - checkpoint
order: 19
function_name: solution
time_limit_ms: 200
primaryMethod: expected-value-linear-scan
coreIdea: 1부터 기대하는 체크포인트 번호를 하나씩 올리며 정렬 배열을 앞에서 비교하다가 처음 어긋나는 순간의 기대값을 답으로 반환한다
gimmick: 중간 누락이 전혀 없고 1부터 끝까지 연속이면 실패가 아니라 0을 반환해야 한다
starter_code: |
  function solution(checkpoints) {
    return 0;
  }
test_cases:
  - input: [[1, 2, 3, 5, 6]]
    output: 4
  - input: [[2, 3, 4]]
    output: 1
  - input: [[1, 2, 3, 4]]
    output: 0
  - input: [[1]]
    output: 0
  - input: [[1, 3, 4, 5]]
    output: 2
---
정렬된 체크포인트 번호 배열 `checkpoints`가 주어질 때, **1번부터 시작해서 처음으로 비어 있는 번호**를 반환하세요. 중간에 비는 번호가 없다면 `0`을 반환하면 됩니다.

## 제한사항
- `checkpoints`의 길이는 1 이상 100,000 이하입니다.
- 각 원소는 1 이상 1,000,000 이하의 정수입니다.
- `checkpoints`는 오름차순으로 정렬되어 있습니다.
- 같은 번호는 두 번 이상 등장하지 않습니다.
- `1`부터 끊기지 않고 끝까지 이어져 있으면 `0`을 반환합니다.

## 예시
- 입력: `[1, 2, 3, 5, 6]` → 출력: `4`
- 입력: `[2, 3, 4]` → 출력: `1`
- 입력: `[1, 2, 3, 4]` → 출력: `0`

## 힌트
- 1번 체크포인트부터 차례대로 있어야 한다고 생각해 보세요.
- 현재 기대하는 번호와 실제 배열 값을 비교하다가 처음 어긋나는 순간이 정답입니다.

## 해설
이 문제는 배열 전체에서 아무 숫자나 찾는 문제가 아니라, **1부터 순서대로 이어지는 흐름이 어디서 처음 끊기는지** 찾는 문제입니다.

예를 들어 `[1, 2, 3, 5, 6]`이라면:
- 1은 있음
- 2도 있음
- 3도 있음
- 다음에는 4가 와야 하는데 5가 나옴
- 따라서 처음 비어 있는 번호는 4입니다.

풀이 방법은 간단합니다.

1. `expected = 1`로 시작합니다.
2. 배열을 앞에서부터 보면서 현재 값이 `expected`와 같은지 확인합니다.
3. 같으면 `expected`를 1 늘립니다.
4. 다르면 그 순간의 `expected`가 처음 비어 있는 체크포인트입니다.
5. 끝까지 모두 맞았다면 비는 번호가 없으므로 `0`을 반환합니다.

이 방식은 배열을 한 번만 보면 되므로 시간 복잡도는 `O(n)`입니다.
