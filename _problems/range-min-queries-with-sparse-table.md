---
title: 고정 배열 구간 최솟값 빠르게 찾기
slug: range-min-queries-with-sparse-table
track: algorithm
difficulty: medium
topic: sparse-table
tags:
  - algorithm
  - sparse-table
  - range-minimum-query
  - array
  - preprocessing
  - idempotent
order: 1010
function_name: rangeMinQueries
time_limit_ms: 400
primaryMethod: sparse-table-overlapping-power-blocks
coreIdea: 변경되지 않는 배열에 대해 길이가 2의 거듭제곱인 구간들의 최솟값을 전처리해 두고 각 질의를 두 개의 겹치는 블록 최솟값으로 O(1)에 합성한다
gimmick: 합과 달리 최솟값은 같은 원소가 두 번 포함되어도 결과가 변하지 않으므로 길이 2^k 블록 두 개가 겹쳐도 그대로 합쳐 쓸 수 있다
starter_code: |
  function rangeMinQueries(nums, queries) {
    return [];
  }
test_cases:
  - input: [[5, 2, 7, 3, 6, 1, 4], [[0, 3], [2, 5], [5, 5]]]
    output: [2, 1, 1]
  - input: [[9, 9, 9, 9], [[0, 0], [0, 3], [1, 2]]]
    output: [9, 9, 9]
  - input: [[8, -1, 4, -3, 2], [[0, 4], [1, 3], [2, 2]]]
    output: [-3, -3, 4]
  - input: [[42], [[0, 0]]]
    output: [42]
---
숫자 배열이 바뀌지 않는 상황에서 여러 구간의 최솟값을 빠르게 묻는 문제입니다.

## 문제 설명
정수 배열 `nums`와 여러 개의 구간 질의 `queries`가 주어집니다. 각 질의는 `[left, right]` 형태이며, `nums[left]`부터 `nums[right]`까지의 **최솟값**을 구해야 합니다.

모든 질의의 답을 순서대로 담은 배열을 반환하는 `rangeMinQueries` 함수를 작성하세요.

예를 들어 `nums = [5, 2, 7, 3, 6, 1, 4]`, `queries = [[0, 3], [2, 5], [5, 5]]`라면 각 구간의 최솟값은 차례대로 `2`, `1`, `1`이므로 `[2, 1, 1]`을 반환합니다.

## 제한사항
- `1 <= nums.length <= 100000`
- `-10^9 <= nums[i] <= 10^9`
- `1 <= queries.length <= 100000`
- `queries[i] = [left, right]`
- `0 <= left <= right < nums.length`
- 배열 `nums`는 질의 처리 중 **변하지 않습니다**.

## 예시
- 입력: `nums = [5, 2, 7, 3, 6, 1, 4]`, `queries = [[0, 3], [2, 5], [5, 5]]` → 출력: `[2, 1, 1]`
- 입력: `nums = [9, 9, 9, 9]`, `queries = [[0, 0], [0, 3], [1, 2]]` → 출력: `[9, 9, 9]`
- 입력: `nums = [8, -1, 4, -3, 2]`, `queries = [[0, 4], [1, 3], [2, 2]]` → 출력: `[-3, -3, 4]`

## 힌트
- 배열이 바뀌지 않는다면, 질의마다 매번 선형 탐색하는 대신 **전처리**를 할 수 있습니다.
- 길이가 `1, 2, 4, 8, ...`인 구간들의 최솟값을 미리 저장해 보세요.
- 길이 `len` 구간은 `2^k <= len < 2^(k+1)`인 `k`를 잡으면, 길이 `2^k`인 구간 두 개로 덮을 수 있습니다.

## 해설
이 문제는 **Sparse Table**의 대표 예시입니다.

배열이 바뀌지 않고, 최솟값처럼 **겹쳐 합쳐도 문제가 없는 연산**이라면 전처리를 통해 질의를 매우 빠르게 처리할 수 있습니다.

### 1. 전처리 정의
`st[k][i]`를 다음처럼 정의합니다.

- `st[k][i]` = `nums[i]`부터 시작하는 길이 `2^k` 구간의 최솟값

예를 들면:
- `st[0][i]`는 길이 1 구간이므로 그냥 `nums[i]`
- `st[1][i]`는 길이 2 구간의 최솟값
- `st[2][i]`는 길이 4 구간의 최솟값

점화식은 다음과 같습니다.

```js
st[k][i] = Math.min(st[k - 1][i], st[k - 1][i + 2 ** (k - 1)]);
```

즉, 길이 `2^k` 구간을 앞 절반과 뒤 절반 두 개의 길이 `2^(k-1)` 구간으로 나눠 계산합니다.

### 2. 질의 처리
질의 `[left, right]`의 길이를 `len = right - left + 1`이라 하겠습니다.
그때 `k = floor(log2(len))`를 잡으면, 길이 `2^k` 구간 두 개로 전체 구간을 덮을 수 있습니다.

- 첫 번째 구간: `[left, left + 2^k - 1]`
- 두 번째 구간: `[right - 2^k + 1, right]`

최솟값은 다음처럼 구합니다.

```js
Math.min(st[k][left], st[k][right - 2 ** k + 1])
```

두 구간이 **겹쳐도 괜찮다**는 점이 핵심입니다. 최솟값은 같은 원소를 두 번 포함해도 결과가 달라지지 않기 때문입니다.

### 3. 왜 이 방식이 좋은가?
- 전처리: `O(n log n)`
- 각 질의: `O(1)`
- 전체: 질의가 많을수록 매우 유리

반대로 질의마다 직접 순회하면 `O(qn)`까지 커질 수 있어 큰 입력에서 느립니다.

이 문제를 통해 익혀야 할 포인트는 다음 두 가지입니다.

1. **배열이 고정되어 있을 때는 전처리를 고려한다**
2. **최솟값/최댓값처럼 idempotent 한 연산은 sparse table로 O(1) 질의가 가능하다**
