---
title: 냉각 시간을 지키며 얻는 최대 광고 수익
slug: max-ad-revenue-with-cooldown-slots
track: today
difficulty: hard
topic: weighted-interval-dp
tags:
  - daily
  - hard
  - dynamic-programming
  - binary-search
  - interval
  - scheduling
  - optimization
order: 1050
function_name: maxAdRevenueWithCooldownSlots
time_limit_ms: 250
primaryMethod: binary-search-weighted-interval-dp
coreIdea: 각 광고를 종료 시각 기준으로 정렬한 뒤, 이전에 함께 선택할 수 있는 마지막 광고를 이분 탐색으로 찾아 weighted interval scheduling DP를 수행하면 광고 사이에 필요한 냉각 시간을 지키면서 최대 수익을 구할 수 있다
gimmick: 두 광고가 단순히 겹치지 않는 것만으로는 부족하고 앞 광고의 종료 시각에 cooldown을 더한 뒤에야 다음 광고를 시작할 수 있으므로 호환 여부를 찾을 때 end <= nextStart - cooldown 조건을 정확히 반영해야 한다
starter_code: |
  function maxAdRevenueWithCooldownSlots(ads, cooldown) {
    return 0;
  }
test_cases:
  - input:
      - [[1, 3, 50], [4, 6, 60], [7, 9, 70]]
      - 1
    output: 180
  - input:
      - [[1, 4, 80], [3, 5, 50], [6, 8, 70], [9, 10, 30]]
      - 3
    output: 110
  - input:
      - [[2, 5, 40], [5, 9, 35], [8, 11, 90], [10, 12, 45], [13, 15, 60]]
      - 0
    output: 190
  - input:
      - [[0, 2, 10]]
      - 5
    output: 10
---
광고 슬롯 사이에 필요한 냉각 시간을 지키면서 얻을 수 있는 최대 총수익을 구하는 문제입니다.

## 문제 설명
광고 집행 요청 목록 `ads`가 주어집니다. 각 광고는 `[start, end, revenue]` 형태로 주어지며,
- `start`: 광고 시작 시각
- `end`: 광고 종료 시각
- `revenue`: 이 광고를 집행했을 때 얻는 수익
을 뜻합니다.

같은 장비를 연속으로 쓰기 때문에, 어떤 광고를 끝낸 뒤 다음 광고를 시작하려면 최소 `cooldown`만큼의 빈 시간이 필요합니다.

즉 광고 `A`를 선택한 뒤 광고 `B`를 이어서 선택하려면 다음 조건을 만족해야 합니다.
- `A.end + cooldown <= B.start`

서로 겹치지 않는 광고 일부를 골라 얻을 수 있는 **최대 총수익**을 반환하는 `maxAdRevenueWithCooldownSlots` 함수를 작성하세요.

## 제한사항
- `1 <= ads.length <= 200,000`
- `0 <= start < end <= 1,000,000,000`
- `0 <= revenue <= 1,000,000`
- `0 <= cooldown <= 1,000,000,000`
- 광고는 정렬되어 있지 않을 수 있습니다.

## 예시
- 입력: `ads = [[1, 3, 50], [4, 6, 60], [7, 9, 70]], cooldown = 1` → 출력: `180`
- 입력: `ads = [[1, 4, 80], [3, 5, 50], [6, 8, 70], [9, 10, 30]], cooldown = 3` → 출력: `110`
- 입력: `ads = [[2, 5, 40], [5, 9, 35], [8, 11, 90], [10, 12, 45], [13, 15, 60]], cooldown = 0` → 출력: `190`

## 힌트
- 광고를 종료 시각 기준으로 정렬하면 “현재 광고를 고를 때 바로 이전에 붙일 수 있는 마지막 광고”를 찾기 쉬워집니다.
- 각 광고에 대해 “이 광고를 고르지 않는 경우”와 “이 광고를 고르는 경우” 중 큰 값을 DP로 비교해 보세요.
- 호환 가능한 이전 광고 인덱스는 선형 탐색 대신 이분 탐색으로 찾아야 큰 입력도 통과할 수 있습니다.

## 해설
이 문제는 **weighted interval scheduling**에 냉각 시간 조건이 추가된 형태입니다.

핵심은 광고를 종료 시각 오름차순으로 정렬한 뒤,
각 광고 `i`에 대해 다음 두 선택을 비교하는 것입니다.

1. `i`번 광고를 고르지 않는다.
   - 답은 `dp[i - 1]`
2. `i`번 광고를 고른다.
   - `i`번 광고와 함께 선택 가능한 마지막 광고 `p(i)`를 찾고
   - 답은 `revenue[i] + dp[p(i)]`

따라서 점화식은 다음과 같습니다.

```js
dp[i] = Math.max(dp[i - 1], revenue[i] + dp[p(i)])
```

여기서 중요한 점은 호환 조건입니다.
단순히 `previous.end <= current.start`가 아니라,
**냉각 시간까지 포함해서**

```txt
previous.end + cooldown <= current.start
```

을 만족해야 합니다.

정렬된 종료 시각 배열이 있으면 `current.start - cooldown` 이하인 마지막 종료 시각 위치를 이분 탐색으로 찾을 수 있습니다.
이렇게 하면 각 광고마다 `O(log n)`에 `p(i)`를 찾을 수 있고,
전체 시간 복잡도는 정렬 포함 `O(n log n)`입니다.

예를 들어 `[[1, 4, 80], [3, 5, 50], [6, 8, 70], [9, 10, 30]]`, `cooldown = 3`이라면:
- `[1, 4, 80]` 뒤에는 시작 시각이 `7` 이상인 광고만 바로 붙일 수 있습니다.
- 그래서 `[6, 8, 70]`은 붙일 수 없고 `[9, 10, 30]`만 가능합니다.
- `[3, 5, 50]` 뒤에도 시작 시각이 `8` 이상이어야 하므로 `[9, 10, 30]`은 붙일 수 있습니다.

그래서 최선은 `[1, 4, 80] + [9, 10, 30] = 110`입니다.

이 방식은 큰 입력에서도 안정적으로 동작하고, 냉각 시간이 `0`인 경우에는 일반 weighted interval scheduling과 완전히 같은 형태가 됩니다.
