---
title: 두 대각선 합이 같은 격자인지 확인하기
slug: check-equal-diagonal-sums
track: today
difficulty: easy
topic: diagonal-check
tags:
  - daily
  - beginner
  - matrix
  - diagonal
  - summation
order: 1150
function_name: checkEqualDiagonalSums
time_limit_ms: 200
primaryMethod: dual-diagonal-scan
coreIdea: 정사각 행렬의 주대각선과 반대각선을 한 번씩 순회하며 각각의 합을 구한 뒤 두 합이 같은지 비교한다
gimmick: 홀수 크기 행렬의 가운데 칸은 두 대각선에 모두 속하지만 각 대각선 합에는 한 번씩 포함되는 것이 맞다
starter_code: |
  function checkEqualDiagonalSums(grid) {
    return false;
  }
test_cases:
  - input: [[[7]]]
    output: true
  - input: [[[1, 2], [3, 1]]]
    output: false
  - input: [[[2, 0, 2], [1, 5, 1], [2, 0, 2]]]
    output: true
  - input: [[[4, 1, 3], [2, 9, 2], [5, 7, 4]]]
    output: false
  - input: [[[-3, 1, -3], [2, 0, 2], [-3, 1, -3]]]
    output: true
---
정사각 격자의 두 대각선 합이 같은지 판별하는 문제입니다.

## 문제 설명
정수로 이루어진 `n x n` 정사각 배열 `grid`가 주어집니다.

왼쪽 위에서 오른쪽 아래로 이어지는 **주대각선**의 합과,
오른쪽 위에서 왼쪽 아래로 이어지는 **반대각선**의 합이 서로 같으면 `true`, 다르면 `false`를 반환하는 `checkEqualDiagonalSums` 함수를 작성하세요.

## 제한사항
- `grid`의 길이는 `1` 이상 `100` 이하입니다.
- `grid[i]`의 길이는 항상 `grid.length`와 같습니다.
- 각 원소는 `-1,000` 이상 `1,000` 이하의 정수입니다.
- 반드시 정사각 배열만 입력으로 주어집니다.

## 예시
- 입력: `grid = [[7]]` → 출력: `true`
- 입력: `grid = [[1, 2], [3, 1]]` → 출력: `false`
- 입력: `grid = [[2, 0, 2], [1, 5, 1], [2, 0, 2]]` → 출력: `true`

## 힌트
- 주대각선의 인덱스는 `(0, 0)`, `(1, 1)`, `(2, 2)`처럼 늘어납니다.
- 반대각선의 인덱스는 `(0, n - 1)`, `(1, n - 2)`처럼 움직입니다.
- 두 합을 따로 구한 뒤 마지막에 비교하면 됩니다.

## 해설
이 문제는 **두 대각선의 위치 규칙만 정확히 잡으면** 어렵지 않습니다.

배열 길이를 `n`이라고 하면
- 주대각선은 `grid[i][i]`
- 반대각선은 `grid[i][n - 1 - i]`
를 더하면 됩니다.

즉, `i`를 `0`부터 `n - 1`까지 한 번 순회하면서
두 합을 동시에 누적한 뒤 마지막에 같은지만 비교하면 됩니다.

예를 들어 `[[2, 0, 2], [1, 5, 1], [2, 0, 2]]`에서는
- 주대각선 합: `2 + 5 + 2 = 9`
- 반대각선 합: `2 + 5 + 2 = 9`
이므로 `true`입니다.

홀수 크기 배열에서는 가운데 칸이 두 대각선에 모두 포함되지만,
이 문제는 **각 대각선의 합을 따로 구해 비교하는 것**이므로 가운데 값을 양쪽 합에 한 번씩 넣는 것이 맞습니다.

시간 복잡도는 대각선 원소만 보므로 `O(n)`입니다.