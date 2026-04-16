---
title: 가까운 구간 안의 비슷한 가격 알림
slug: nearby-similar-price-alert
track: today
difficulty: medium
topic: bucketization
tags:
  - daily
  - medium
  - hash
  - sliding-window
  - buckets
  - proximity
order: 51
function_name: hasNearbySimilarPrice
time_limit_ms: 200
primaryMethod: fixed-width-bucket-neighbor-check
coreIdea: 값 차이가 limit 이하인 수들은 너비가 limit + 1 인 버킷 기준으로 같은 버킷 또는 인접 버킷에만 들어갈 수 있다는 점을 이용해 최근 windowSize개 구간 안에서 조건을 만족하는 쌍이 있는지 O(n)에 판별한다
gimmick: 인덱스 차이 제한 때문에 오래된 원소를 버킷에서 즉시 제거해야 하고 음수 가격도 버킷 번호가 꼬이지 않도록 floor 기반으로 나눠야 한다
starter_code: |
  function hasNearbySimilarPrice(prices, windowSize, limit) {
    return false;
  }
test_cases:
  - input: [[10, 13, 11, 20], 2, 2]
    output: true
  - input: [[5, 14, 30, 5], 2, 0]
    output: false
  - input: [[8, 1, 6, 15, 9], 3, 2]
    output: true
  - input: [[-5, -1, -4], 2, 1]
    output: true
  - input: [[7, 7], 0, 0]
    output: false
---
가게 가격 기록 배열에서, 서로 너무 멀지 않은 두 시점의 가격이 거의 같은 순간이 있는지 찾는 문제입니다.

## 문제 설명
정수 배열 `prices`, 정수 `windowSize`, 정수 `limit`가 주어집니다.

서로 다른 두 인덱스 `i`, `j`가 아래 두 조건을 모두 만족하면 **비슷한 가격 알림**이 발생한다고 정의합니다.

- `|i - j| <= windowSize`
- `|prices[i] - prices[j]| <= limit`

조건을 만족하는 쌍이 하나라도 있으면 `true`, 없으면 `false`를 반환하는 `hasNearbySimilarPrice` 함수를 작성하세요.

## 제한사항
- `1 <= prices.length <= 100,000`
- `-1,000,000,000 <= prices[i] <= 1,000,000,000`
- `0 <= windowSize <= 100,000`
- `0 <= limit <= 1,000,000,000`
- 반환값은 불리언 값입니다.

## 예시
- 입력: `prices = [10, 13, 11, 20]`, `windowSize = 2`, `limit = 2` → 출력: `true`
- 입력: `prices = [5, 14, 30, 5]`, `windowSize = 2`, `limit = 0` → 출력: `false`
- 입력: `prices = [7, 7]`, `windowSize = 0`, `limit = 0` → 출력: `false`

첫 번째 예시에서는 인덱스 0의 값 `10`과 인덱스 2의 값 `11`이 인덱스 차이 2, 값 차이 1이라 조건을 만족합니다.

## 힌트
- 모든 쌍을 비교하면 `O(n^2)`라 길이가 큰 입력에서 너무 느립니다.
- 인덱스 차이 제한이 있으므로, 현재 위치 기준으로 최근 `windowSize`개 원소만 관리하면 됩니다.
- 값 차이 제한은 숫자 범위를 일정한 크기 구간으로 나누면 더 빠르게 검사할 수 있습니다.

## 해설
핵심은 두 조건을 따로 보는 것입니다.

1. **인덱스 차이 제한**
   - 현재 인덱스를 `i`라고 하면, `i - windowSize`보다 앞에 있는 원소는 더 이상 후보가 아닙니다.
   - 따라서 최근 `windowSize`개 원소만 유지하는 슬라이딩 윈도우로 생각할 수 있습니다.

2. **값 차이 제한**
   - 값 차이가 `limit` 이하인 두 수는 길이가 `limit + 1`인 버킷으로 나눴을 때,
     같은 버킷에 있거나 바로 이웃한 버킷에만 들어갈 수 있습니다.
   - 예를 들어 `limit = 2`면 버킷 크기는 3입니다.
   - 같은 버킷에 두 수가 들어가면 그 차이는 자동으로 2 이하입니다.

풀이 흐름은 다음과 같습니다.

1. 버킷 크기를 `limit + 1`로 둡니다.
2. 현재 값이 들어갈 버킷 번호를 계산합니다.
3. 같은 버킷에 값이 이미 있으면 바로 `true`입니다.
4. 왼쪽 인접 버킷, 오른쪽 인접 버킷의 값과도 실제 차이가 `limit` 이하인지 확인합니다.
5. 현재 값을 버킷에 넣습니다.
6. 윈도우 크기를 넘긴 가장 오래된 값은 자기 버킷에서 제거합니다.

버킷 번호를 계산할 때 음수 값도 있으므로 단순 정수 나눗셈 대신 `Math.floor(value / bucketSize)`처럼 바닥 나눗셈 기준으로 처리해야 안전합니다.

각 원소는 버킷에 한 번 들어가고 한 번 빠지므로 전체 시간 복잡도는 `O(n)`이고, 추가 공간은 윈도우에 비례해 `O(windowSize)`입니다.