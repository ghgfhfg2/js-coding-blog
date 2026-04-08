---
title: 실시간 K번째 최고 점수
slug: rolling-kth-high-score
track: today
difficulty: medium
topic: heap
tags:
  - daily
  - medium
  - heap
  - priority-queue
  - streaming
  - kth-largest
order: 26
function_name: solution
time_limit_ms: 400
primaryMethod: fixed-size-min-heap
coreIdea: 점수가 하나씩 들어올 때마다 상위 k개만 최소 힙으로 유지하면 힙의 루트가 항상 현재 K번째 최고 점수가 된다
gimmick: 아직 점수가 k개 미만이면 K번째 점수가 존재하지 않으므로 null을 넣고, 같은 점수도 서로 다른 기록으로 개수에 포함해야 한다
starter_code: |
  function solution(scores, k) {
    return [];
  }
test_cases:
  - input: [[50, 30, 70, 60, 90], 3]
    output: [null, null, 30, 50, 60]
  - input: [[100, 100, 100], 2]
    output: [null, 100, 100]
  - input: [[5, -1, 7, 3, 9], 1]
    output: [5, 5, 7, 7, 9]
  - input: [[8, 2, 6, 4], 5]
    output: [null, null, null, null]
  - input: [[10, 4, 10, 8, 6, 12], 4]
    output: [null, null, null, 4, 6, 8]
---
## 문제 설명
게임 점수가 시간순으로 담긴 배열 `scores`와 정수 `k`가 주어집니다.

각 점수가 하나씩 도착할 때마다 **지금까지 나온 점수들 중 K번째로 큰 점수**를 구해 배열로 반환하세요.

단, 아직 점수가 `k`개보다 적다면 K번째 점수가 존재하지 않으므로 그 위치에는 `null`을 넣어야 합니다.

예를 들어 `scores = [50, 30, 70, 60, 90]`, `k = 3`이면 각 시점의 K번째 최고 점수는 `[null, null, 30, 50, 60]`입니다.

## 제한사항
- `1 <= scores.length <= 200,000`
- `1 <= k <= 200,000`
- 각 점수는 `-1,000,000,000` 이상 `1,000,000,000` 이하의 정수입니다.
- 같은 점수가 여러 번 나와도 **서로 다른 기록**으로 취급합니다.
- 점수가 `k`개보다 적은 시점에는 `null`을 반환해야 합니다.

## 예시
- 입력: `[50, 30, 70, 60, 90]`, `k = 3` → 출력: `[null, null, 30, 50, 60]`
- 입력: `[100, 100, 100]`, `k = 2` → 출력: `[null, 100, 100]`
- 입력: `[8, 2, 6, 4]`, `k = 5` → 출력: `[null, null, null, null]`

첫 번째 예시를 보면:
- `50`만 있을 때는 3번째 최고 점수가 없으므로 `null`
- `50, 30`일 때도 아직 2개뿐이므로 `null`
- `50, 30, 70`이 되면 정렬 결과는 `[70, 50, 30]`이고 답은 `30`
- 그다음 `60`이 들어오면 상위 3개는 `70, 60, 50`이므로 답은 `50`
- 마지막으로 `90`이 들어오면 상위 3개는 `90, 70, 60`이므로 답은 `60`

## 힌트
- 매 시점마다 전체 점수를 다시 정렬하면 너무 느릴 수 있습니다.
- 정말 필요한 것은 **상위 k개 점수만 유지하는 것**입니다.
- 상위 k개 중 가장 작은 값을 빠르게 꺼낼 수 있으면, 그 값이 바로 현재 K번째 최고 점수입니다.

## 해설
이 문제를 매번 정렬로 풀면 각 시점마다 지금까지의 점수를 다시 정렬해야 해서 비효율적입니다.

핵심은 **상위 k개만 유지하면 충분하다**는 점입니다.

예를 들어 `k = 3`이라면, 지금까지 나온 점수 중 4등 이하 점수들은 현재 3번째 최고 점수에 영향을 줄 수 없습니다. 따라서 우리는 항상 **가장 높은 점수 3개만** 들고 있으면 됩니다.

이때 가장 잘 맞는 자료구조가 **크기가 최대 k인 최소 힙(min-heap)** 입니다.

- 힙 크기가 아직 `k`보다 작으면 새 점수를 그냥 넣습니다.
- 힙 크기가 이미 `k`라면:
  - 새 점수가 힙의 최솟값보다 크면, 최솟값을 빼고 새 점수를 넣습니다.
  - 새 점수가 더 작거나 같으면 상위 k개에 못 들어가므로 버립니다.
- 힙 크기가 정확히 `k`가 되었을 때, 힙의 루트(최솟값)가 바로 **현재 K번째 최고 점수**입니다.

왜냐하면 힙 안에는 항상 **지금까지 나온 점수 중 가장 큰 k개만** 남아 있고, 그중 가장 작은 값이 바로 전체 기준 K등이기 때문입니다.

예를 들어 `scores = [50, 30, 70, 60, 90]`, `k = 3`이라면:

1. `50` → 힙: `[50]` → 아직 3개 미만이므로 `null`
2. `30` → 힙: `[30, 50]` → 아직 3개 미만이므로 `null`
3. `70` → 힙: `[30, 50, 70]` → 답 `30`
4. `60` → 현재 최솟값 `30`보다 크므로 교체 → 힙: `[50, 60, 70]` → 답 `50`
5. `90` → 현재 최솟값 `50`보다 크므로 교체 → 힙: `[60, 70, 90]` → 답 `60`

이 방식은 각 점수마다 힙 연산이 최대 한 번씩만 일어나므로 시간 복잡도는 `O(n log k)`이고, 추가 공간은 `O(k)`입니다.

```js
function solution(scores, k) {
  const heap = [];
  const result = [];

  const push = (value) => {
    heap.push(value);
    let index = heap.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (heap[parent] <= heap[index]) break;
      [heap[parent], heap[index]] = [heap[index], heap[parent]];
      index = parent;
    }
  };

  const pop = () => {
    if (heap.length === 1) return heap.pop();

    const top = heap[0];
    heap[0] = heap.pop();
    let index = 0;

    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < heap.length && heap[left] < heap[smallest]) {
        smallest = left;
      }

      if (right < heap.length && heap[right] < heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;
      [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
      index = smallest;
    }

    return top;
  };

  for (const score of scores) {
    if (heap.length < k) {
      push(score);
    } else if (score > heap[0]) {
      pop();
      push(score);
    }

    result.push(heap.length === k ? heap[0] : null);
  }

  return result;
}
```