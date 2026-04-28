---
title: 삼각 점수판 최대 경로 점수
slug: max-triangle-score-path
track: today
difficulty: medium
topic: triangle-dp
tags:
  - daily
  - medium
  - dynamic-programming
  - triangle
  - path-sum
  - bottom-up
order: 1090
function_name: maxTriangleScorePath
time_limit_ms: 200
primaryMethod: row-by-row-parent-max-dp
coreIdea: 삼각형의 각 칸에 도달하는 최대 점수를 이전 줄의 인접 부모들 중 더 큰 누적값으로 갱신하며 마지막 줄의 최댓값을 구한다
gimmick: 가장 왼쪽과 오른쪽 칸은 부모가 하나뿐이고 음수가 있어도 무조건 아래로 끝까지 내려가야 하므로 중간 최대값이 아니라 누적 경로 최대값을 유지해야 한다
starter_code: |
  function maxTriangleScorePath(triangle) {
    return 0;
  }
test_cases:
  - input: [[[2], [4, 1], [5, 1, 7]]]
    output: 13
  - input: [[[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]]
    output: 30
  - input: [[[-1], [2, 3], [1, -5, 1]]]
    output: 3
  - input: [[[5], [-2, -3], [4, 9, 1], [-8, 1, 2, 3]]]
    output: 12
---
숫자 삼각형에서 위에서 아래로 내려가며 얻을 수 있는 최대 점수를 구하는 문제입니다.

## 문제 설명
정수로 이루어진 삼각형 배열 `triangle`이 주어집니다.

맨 위 칸에서 시작해서 맨 아래 줄까지 내려가려고 합니다. 현재 줄의 `i`번째 칸에 있다면, 다음 줄에서는 아래쪽의 두 칸 중 하나로만 이동할 수 있습니다.
- 같은 인덱스 `i`
- 바로 오른쪽 인덱스 `i + 1`

지나간 칸들의 점수 합이 가장 크게 되도록 이동했을 때, 그 **최대 점수**를 반환하는 `maxTriangleScorePath` 함수를 작성하세요.

## 제한사항
- `triangle`의 길이는 `1` 이상 `200` 이하입니다.
- `triangle[i]`의 길이는 항상 `i + 1`입니다.
- 각 원소는 `-1,000` 이상 `1,000` 이하의 정수입니다.
- 반드시 맨 위에서 시작해 맨 아래 줄까지 내려가야 합니다.

## 예시
- 입력: `triangle = [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]` → 출력: `30`
- 입력: `triangle = [[-1], [2, 3], [1, -5, 1]]` → 출력: `3`
- 입력: `triangle = [[5], [-2, -3], [4, 9, 1], [-8, 1, 2, 3]]` → 출력: `12`

## 힌트
- 각 칸에 도착하는 최대 점수만 알면, 그 아래 칸의 최대 점수도 계산할 수 있습니다.
- 현재 칸으로 올 수 있는 부모는 많아야 2개뿐입니다.
- 양 끝 칸은 부모가 1개뿐이라는 점을 먼저 정리하면 구현이 깔끔해집니다.

## 해설
이 문제는 완전탐색으로 모든 경로를 다 시도하면 경우의 수가 빠르게 커집니다.

대신 **각 칸까지 도달했을 때의 최대 누적 점수**를 저장하면 됩니다.

예를 들어 `dp[row][col]`을 `row`번째 줄 `col`번째 칸에 도착했을 때 얻을 수 있는 최대 점수라고 두면,
- 맨 왼쪽 칸은 왼쪽 위 부모가 없으므로 바로 위 칸에서만 올 수 있고
- 맨 오른쪽 칸은 오른쪽 위 부모가 없으므로 왼쪽 위 칸에서만 올 수 있으며
- 중간 칸은 `왼쪽 위`, `바로 위` 중 더 큰 누적값을 선택하면 됩니다.

점화식은 다음과 같습니다.

```js
leftParent = col > 0 ? dp[row - 1][col - 1] : -Infinity;
rightParent = col < row ? dp[row - 1][col] : -Infinity;
dp[row][col] = triangle[row][col] + Math.max(leftParent, rightParent);
```

마지막 줄까지 계산한 뒤, 마지막 줄의 최댓값이 정답입니다.

이 방식은 각 칸을 한 번씩만 계산하므로 시간 복잡도는 `O(n^2)`입니다.
