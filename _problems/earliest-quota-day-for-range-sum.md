---
title: 누적 구간 합이 목표를 넘는 가장 빠른 날
slug: earliest-quota-day-for-range-sum
track: today
difficulty: hard
topic: parallel-binary-search
tags:
  - daily
  - hard
  - parallel-binary-search
  - fenwick-tree
  - range-update
  - prefix-sum
  - offline-query
order: 1006
function_name: earliestQuotaDay
time_limit_ms: 800
primaryMethod: parallel-binary-search-with-dual-fenwick
coreIdea: 여러 구간 합 질의의 정답 날을 동시에 이분 탐색하면서 각 mid 날짜까지의 구간 증가 연산만 Fenwick Tree에 반영해 모든 질의를 오프라인으로 처리한다
gimmick: 각 질의를 따로 이분 탐색하면 같은 날짜의 업데이트를 반복 적용해 너무 느리므로 같은 mid를 묶어 한 번만 스캔해야 하고 target이 0 이하인 질의는 0일차가 정답이 될 수 있다
starter_code: |
  function earliestQuotaDay(n, updates, queries) {
    return [];
  }
test_cases:
  - input:
      - 5
      - [[1, 3, 2], [2, 5, 1], [4, 5, 3]]
      - [[1, 2, 3], [3, 5, 6], [4, 4, 4]]
    output: [1, 3, 3]
  - input:
      - 4
      - [[2, 4, 2], [1, 1, 5]]
      - [[1, 4, 4], [3, 3, 3], [1, 2, 10]]
    output: [1, -1, -1]
  - input:
      - 3
      - [[1, 3, 1], [2, 2, 5]]
      - [[1, 3, 0], [2, 2, 6], [1, 1, 2]]
    output: [0, 2, -1]
  - input:
      - 6
      - [[1, 6, 1], [2, 5, 2], [3, 4, 3], [1, 2, 4]]
      - [[3, 4, 8], [1, 6, 18], [1, 2, 10], [5, 6, 4]]
    output: [3, 4, 4, 2]
---
여러 번의 구간 증가 작업이 순서대로 일어날 때, 각 구간이 목표 합을 처음 넘기는 날짜를 찾는 문제입니다.

## 문제 설명
길이가 `n`인 배열이 있고 모든 값은 처음에 `0`입니다.

`updates[i] = [l, r, delta]`는 **i+1일째**에 인덱스 `l`부터 `r`까지의 모든 값을 `delta`만큼 증가시키는 작업을 뜻합니다.

`queries[j] = [l, r, target]`는 구간 `l..r`의 합이 **처음으로** `target` 이상이 되는 가장 빠른 날짜를 묻습니다.

각 질의에 대해:
- 어떤 날짜 `d`까지의 업데이트를 모두 적용했을 때 구간 합이 처음 `target` 이상이 되면 `d`를 반환하고
- 끝까지 가도 한 번도 `target` 이상이 되지 않으면 `-1`을 반환하세요.
- `target <= 0`이면 아무 업데이트 전에도 조건을 만족하므로 정답은 `0`입니다.

`earliestQuotaDay(n, updates, queries)` 함수를 작성하세요.

## 제한사항
- `1 <= n <= 100,000`
- `1 <= updates.length <= 100,000`
- `1 <= queries.length <= 100,000`
- `updates[i] = [l, r, delta]`
- `1 <= l <= r <= n`
- `1 <= delta <= 1,000,000`
- `queries[j] = [l, r, target]`
- `1 <= l <= r <= n`
- `-1,000,000,000 <= target <= 10^15`
- 각 질의의 정답은 `0` 이상 `updates.length` 이하의 정수이거나, 불가능하면 `-1`입니다.
- 합이 매우 커질 수 있으므로 JavaScript에서는 `Number` 범위 안에서 안전하게 처리된다고 가정합니다.

## 예시
- 입력:
  - `n = 5`
  - `updates = [[1, 3, 2], [2, 5, 1], [4, 5, 3]]`
  - `queries = [[1, 2, 3], [3, 5, 6], [4, 4, 4]]`
  → 출력: `[1, 3, 3]`

- 입력:
  - `n = 3`
  - `updates = [[1, 3, 1], [2, 2, 5]]`
  - `queries = [[1, 3, 0], [2, 2, 6], [1, 1, 2]]`
  → 출력: `[0, 2, -1]`

## 힌트
- 질의 하나마다 날짜를 따로 이분 탐색하고, 그때마다 1일부터 mid일까지 업데이트를 다시 적용하면 너무 느립니다.
- 같은 mid 날짜를 검사하는 질의들을 한 번에 묶어서 처리해 보세요.
- 구간 증가와 구간 합 조회를 빠르게 처리하려면 Fenwick Tree(또는 세그먼트 트리) 같은 자료구조가 필요합니다.

## 해설
이 문제의 핵심은 **각 질의를 독립적으로 처리하지 않는 것**입니다.

질의마다 “몇 일째부터 조건을 만족하는가?”를 보면 정답 날짜에 대해 이분 탐색이 가능합니다. 어떤 질의가 `mid`일까지는 조건을 만족한다면, 그보다 뒤 날짜도 계속 만족하기 때문입니다.

하지만 질의마다 매번 1일부터 `mid`일까지 업데이트를 새로 적용하면 시간 초과가 납니다. 그래서 **parallel binary search**를 사용합니다.

### 1. 모든 질의를 동시에 이분 탐색한다
각 질의마다 가능한 날짜 구간을 `lo..hi`로 둡니다.
- `target <= 0`이면 답은 바로 `0`
- 나머지는 처음에 `lo = 1`, `hi = updates.length + 1`로 둡니다.
  - 여기서 `hi = updates.length + 1`은 “끝까지 해도 불가능”을 뜻하는 sentinel입니다.

각 라운드마다 아직 답이 확정되지 않은 질의들을 `mid = Math.floor((lo + hi) / 2)` 기준으로 묶습니다.

### 2. mid가 같은 질의들을 날짜 순서대로 한 번에 검사한다
`mid = 1, 2, 3, ...` 순서로 보면서, 그 날짜까지의 업데이트를 Fenwick Tree에 차례로 반영합니다.

그러면 어떤 질의가 “`mid`일까지 적용했을 때 `l..r`의 합이 target 이상인가?”를 빠르게 물을 수 있습니다.

이때 필요한 연산은:
- 구간 `l..r`에 `delta` 더하기
- 구간 `l..r`의 합 구하기

Fenwick Tree를 두 개 쓰면 **구간 증가 + 구간 합 조회**를 모두 `O(log n)`에 처리할 수 있습니다.

### 3. 질의의 탐색 범위를 줄인다
- `sum(l..r) >= target`이면 정답은 `mid` 이하에 있으므로 `hi = mid`
- 아니면 아직 부족하므로 `lo = mid + 1`

이 과정을 모든 질의의 `lo == hi`가 될 때까지 반복합니다.

### 4. 최종 답 정리
- `lo == updates.length + 1`이면 끝까지 만족한 적이 없으므로 `-1`
- 아니면 그 값이 가장 빠른 날짜입니다.

### 왜 이 방법이 빠를까?
질의마다 따로 처리하면 같은 날짜의 업데이트를 수없이 반복 적용하게 됩니다.
반면 parallel binary search는 **같은 mid를 공유하는 질의를 묶어서**, 각 라운드마다 업데이트 배열을 많아야 한 번만 앞에서부터 스캔합니다.

그래서 전체 복잡도는 대략:
- `O((updates.length + queries.length) log updates.length log n)`
정도로 줄어듭니다.

입력이 큰 hard 문제에서 자주 쓰이는 **오프라인 질의 처리 패턴**이라는 점이 이 문제의 핵심입니다.
