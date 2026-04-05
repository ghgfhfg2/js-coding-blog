---
title: 합이 0이 되는 가장 긴 구간
slug: longest-zero-balance-window
track: today
difficulty: medium
topic: prefix-sum
tags:
  - daily
  - medium
  - prefix-sum
  - hash-map
  - subarray
  - tie-break
order: 15
function_name: solution
time_limit_ms: 300
starter_code: |
  function solution(changes) {
    return [-1, -1];
  }
test_cases:
  - input: [[3, -1, -2, 4, -4, 2, -2]]
    output: [0, 6]
  - input: [[1, 2, -3, 3, -3, 2]]
    output: [0, 4]
  - input: [[5, -2, -3, 1, 2]]
    output: [0, 2]
  - input: [[1, 2, 3]]
    output: [-1, -1]
  - input: [[]]
    output: [-1, -1]
---
정수 배열 `changes`가 주어질 때, **합이 정확히 0이 되는 연속 구간 중 가장 긴 구간의 시작 인덱스와 끝 인덱스**를 반환하세요.

길이가 가장 긴 구간이 여러 개라면 **시작 인덱스가 더 작은 구간**을 반환합니다. 그런 구간이 없으면 `[-1, -1]`을 반환하면 됩니다.

## 제한사항
- `changes`의 길이는 `0` 이상 `100,000` 이하입니다.
- 각 원소는 `-100,000` 이상 `100,000` 이하의 정수입니다.
- 반환값은 `[start, end]` 형태의 길이 2 배열입니다.
- 합이 0인 연속 구간이 없으면 `[-1, -1]`을 반환합니다.

## 예시
- 입력: `[3, -1, -2, 4, -4, 2, -2]` → 출력: `[0, 6]`
- 입력: `[1, 2, -3, 3, -3, 2]` → 출력: `[0, 4]`
- 입력: `[1, 2, 3]` → 출력: `[-1, -1]`

## 힌트
- 어떤 구간의 합이 0이라는 것은, 그 구간의 **앞까지의 누적합**과 **구간 끝까지의 누적합**이 같다는 뜻입니다.
- 같은 누적합이 처음 나온 위치를 기억해 두면, 현재 위치까지의 0합 구간 길이를 바로 계산할 수 있습니다.
- 가장 긴 구간을 갱신할 때 길이뿐 아니라 **동점일 때 시작 인덱스 비교**도 함께 처리해 보세요.

## 해설
이 문제는 모든 연속 구간의 합을 직접 구하면 `O(n^2)`이 되어 길이가 큰 입력에서 너무 느립니다.

핵심 아이디어는 **누적합(prefix sum)** 입니다.

- 인덱스 `i`까지의 누적합을 `prefix`라고 합시다.
- 서로 다른 두 위치에서 누적합 값이 같다면, 그 사이 구간의 합은 0입니다.
- 따라서 각 누적합이 **처음 등장한 인덱스**만 저장해 두면, 현재 인덱스에서 만들 수 있는 가장 긴 0합 구간을 바로 구할 수 있습니다.

진행 방식은 아래와 같습니다.

1. `prefix = 0`에서 시작합니다.
2. 누적합 `0`은 배열 시작 전 인덱스 `-1`에서 처음 등장한 것으로 기록합니다.
3. 배열을 왼쪽부터 순회하며 누적합을 갱신합니다.
4. 현재 누적합이 예전에 나온 적 있으면, 그 다음 인덱스부터 현재 인덱스까지의 합은 0입니다.
5. 그 길이가 지금까지의 최장 길이보다 길면 정답을 갱신합니다.
6. 길이가 같다면 시작 인덱스가 더 작은 구간으로 갱신합니다.
7. 현재 누적합이 처음 나온 경우에만 인덱스를 저장합니다. 그래야 가장 긴 구간을 만들 수 있습니다.

시간 복잡도는 `O(n)`, 추가 공간 복잡도도 `O(n)`입니다.

```js
function solution(changes) {
  const firstIndex = new Map();
  firstIndex.set(0, -1);

  let prefix = 0;
  let bestStart = -1;
  let bestEnd = -1;
  let bestLength = 0;

  for (let i = 0; i < changes.length; i++) {
    prefix += changes[i];

    if (firstIndex.has(prefix)) {
      const start = firstIndex.get(prefix) + 1;
      const length = i - firstIndex.get(prefix);

      if (
        length > bestLength ||
        (length === bestLength && bestStart !== -1 && start < bestStart) ||
        (length === bestLength && bestStart === -1)
      ) {
        bestLength = length;
        bestStart = start;
        bestEnd = i;
      }
    } else {
      firstIndex.set(prefix, i);
    }
  }

  return bestStart === -1 ? [-1, -1] : [bestStart, bestEnd];
}
```
