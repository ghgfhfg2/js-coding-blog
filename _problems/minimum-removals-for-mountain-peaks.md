---
title: 봉우리 배열을 만들기 위한 최소 제거 수
slug: minimum-removals-for-mountain-peaks
track: today
difficulty: medium
topic: mountain-dp
tags:
  - daily
  - medium
  - dynamic-programming
  - subsequence
  - lis
order: 1370
function_name: minRemovalsForMountainPeaks
time_limit_ms: 300
primaryMethod: lis-lds-mountain-dp
coreIdea: 각 위치를 봉우리로 삼을 때 왼쪽의 증가 부분수열 길이와 오른쪽의 감소 부분수열 길이를 DP로 구해 가장 긴 산 모양 부분수열을 남긴다
gimmick: 봉우리는 양쪽에 최소 한 칸씩 있어야 하며 같은 높이는 증가나 감소로 인정하지 않는다
starter_code: |
  function minRemovalsForMountainPeaks(heights) {
    return -1;
  }
test_cases:
  - input: [[2, 1, 1, 5, 6, 2, 3, 1]]
    output: 3
  - input: [[1, 3, 1]]
    output: 0
  - input: [[1, 2, 3, 4]]
    output: -1
  - input: [[1, 2, 2, 3, 2, 1]]
    output: 1
---

정수 배열에서 일부 원소를 제거해 산 모양 배열을 만들 때 필요한 최소 제거 수를 구하세요.

## 문제 설명

배열 `heights`가 주어집니다. 원소를 원하는 만큼 제거하되, 남은 원소의 상대적인 순서는 바꿀 수 없습니다.

남은 배열이 아래 조건을 모두 만족하면 산 모양 배열입니다.

- 길이가 3 이상입니다.
- 어떤 봉우리 인덱스 `i`가 있어 `0 < i < length - 1`입니다.
- 봉우리 전까지는 높이가 엄격히 증가합니다.
- 봉우리 뒤부터는 높이가 엄격히 감소합니다.

산 모양 배열을 만들 수 있다면 제거해야 하는 원소의 최소 개수를 반환하세요. 만들 수 없다면 `-1`을 반환하세요.

## 제한사항

- `3 <= heights.length <= 1,000`
- `1 <= heights[i] <= 100,000`
- 같은 높이는 증가나 감소로 인정하지 않습니다.
- 원소를 제거할 수는 있지만 남은 원소의 순서를 바꿀 수는 없습니다.

## 예시

- 입력: `[2, 1, 1, 5, 6, 2, 3, 1]` -> 출력: `3`
- 입력: `[1, 3, 1]` -> 출력: `0`
- 입력: `[1, 2, 3, 4]` -> 출력: `-1`
- 입력: `[1, 2, 2, 3, 2, 1]` -> 출력: `1`

## 힌트

- 각 위치를 봉우리로 선택할 수 있는지 확인하려면, 그 위치까지의 가장 긴 증가 부분수열 길이와 그 위치부터의 가장 긴 감소 부분수열 길이가 필요합니다.
- 봉우리의 왼쪽과 오른쪽 길이가 모두 2 이상이어야 실제 산 모양 배열이 됩니다.

## 해설

먼저 `left[i]`를 `i`번째 원소를 끝으로 하는 가장 긴 엄격한 증가 부분수열 길이로 둡니다. 왼쪽에서 오른쪽으로 보며 `j < i`이고 `heights[j] < heights[i]`인 경우 `left[i] = max(left[i], left[j] + 1)`로 갱신합니다.

반대로 `right[i]`는 `i`번째 원소를 시작으로 하는 가장 긴 엄격한 감소 부분수열 길이입니다. 오른쪽에서 왼쪽으로 보며 `j > i`이고 `heights[j] < heights[i]`인 경우 `right[i] = max(right[i], right[j] + 1)`로 갱신합니다.

어떤 인덱스 `i`가 봉우리가 되려면 `left[i] > 1`이고 `right[i] > 1`이어야 합니다. 이때 만들 수 있는 산 모양 부분수열의 길이는 `left[i] + right[i] - 1`입니다. 가능한 봉우리 중 이 값이 가장 큰 것을 남기면 제거 수가 최소가 되므로, 정답은 `heights.length - bestLength`입니다. 가능한 봉우리가 하나도 없다면 `-1`을 반환합니다.
