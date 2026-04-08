---
title: 한 번 할인할 수 있는 최소 이동 비용
slug: minimum-route-cost-with-one-discount
track: today
difficulty: hard
topic: state-graph
tags:
  - daily
  - hard
  - graph
  - dijkstra
  - shortest-path
  - state-space
  - discount
order: 27
function_name: solution
time_limit_ms: 600
primaryMethod: layered-dijkstra-single-discount
coreIdea: 정점마다 할인 미사용 상태와 사용 완료 상태를 분리한 2층 그래프로 보고 다익스트라를 수행해 출발점에서 도착점까지 할인 기회를 최대 한 번만 쓰는 최소 비용을 구한다
gimmick: 할인은 선택적으로 한 번만 사용할 수 있고 비용이 floor(cost / 2)로 줄어들기 때문에 가장 비싼 간선에 무조건 쓰는 전략이 아니라 전체 경로 기준 최적 선택이 필요하다
starter_code: |
  function solution(n, edges, start, end) {
    return 0;
  }
test_cases:
  - input: [4, [[0, 1, 10], [1, 3, 10], [0, 2, 3], [2, 3, 20]], 0, 3]
    output: 13
  - input: [5, [[0, 1, 8], [1, 4, 8], [0, 2, 5], [2, 3, 5], [3, 4, 5]], 0, 4]
    output: 12
  - input: [3, [[0, 1, 1], [1, 2, 1], [0, 2, 5]], 0, 2]
    output: 2
  - input: [4, [[0, 1, 7], [1, 2, 9]], 0, 3]
    output: -1
  - input: [6, [[0, 1, 4], [1, 5, 20], [0, 2, 11], [2, 3, 11], [3, 5, 1], [1, 4, 2], [4, 5, 20]], 0, 5]
    output: 14
---
## 문제 설명
도시 수 `n`, 단방향 도로 정보 `edges`, 출발 도시 `start`, 도착 도시 `end`가 주어집니다.

각 도로는 `[from, to, cost]` 형태이며, 이동 비용 `cost`가 있습니다.
당신은 **전체 경로에서 단 한 번만** 할인권을 사용할 수 있고, 할인권을 쓴 도로의 비용은 `floor(cost / 2)`가 됩니다.

출발 도시에서 도착 도시까지 이동할 때 얻을 수 있는 **최소 총 비용**을 반환하는 `solution` 함수를 작성하세요.
도착할 수 없으면 `-1`을 반환합니다.

예를 들어 `0 -> 2 -> 3` 경로의 비용이 `3 + 20 = 23`이고, 비용 20인 도로에 할인권을 쓰면 `3 + 10 = 13`이 되어 최소가 될 수 있습니다.

## 제한사항
- `2 <= n <= 100000`
- `0 <= edges.length <= 200000`
- 각 도로는 `[from, to, cost]` 형태입니다.
- `0 <= from, to < n`
- `from !== to`
- `1 <= cost <= 1000000000`
- 그래프는 단방향입니다.
- 할인권은 **사용하지 않아도 되지만**, 사용할 수 있다면 전체 경로 중 최대 한 번만 사용할 수 있습니다.
- 도착 도시까지 갈 수 없으면 `-1`을 반환합니다.

## 예시
- 입력: `n = 4`, `edges = [[0, 1, 10], [1, 3, 10], [0, 2, 3], [2, 3, 20]]`, `start = 0`, `end = 3` → 출력: `13`
- 입력: `n = 5`, `edges = [[0, 1, 8], [1, 4, 8], [0, 2, 5], [2, 3, 5], [3, 4, 5]]`, `start = 0`, `end = 4` → 출력: `12`
- 입력: `n = 3`, `edges = [[0, 1, 1], [1, 2, 1], [0, 2, 5]]`, `start = 0`, `end = 2` → 출력: `2`

첫 번째 예시를 보면:
- `0 -> 1 -> 3`의 기본 비용은 `20`이고, 둘 중 하나에 할인권을 써도 `15`
- `0 -> 2 -> 3`의 기본 비용은 `23`이지만, 비용 20인 도로에 할인권을 쓰면 `13`
- 따라서 정답은 `13`입니다.

## 힌트
- 어떤 도시에 도착했다는 사실만으로는 정보가 부족합니다.
- **할인권을 아직 안 쓴 상태로 도착했는지**, **이미 쓴 상태로 도착했는지**를 구분해야 합니다.
- 즉, 도시 하나를 상태 1개가 아니라 상태 2개로 생각해 보세요.
- 가중치가 모두 음수가 아니므로 우선순위 큐 기반 최단 경로 탐색이 잘 맞습니다.

## 해설
이 문제의 핵심은 `도시 번호`만으로 최단 거리를 관리하면 안 된다는 점입니다.

예를 들어 같은 도시 `u`에 도착했더라도:
- 아직 할인권을 안 쓴 상태
- 이미 할인권을 쓴 상태

이 둘은 이후 선택지가 완전히 다릅니다.

그래서 각 도시를 다음 두 상태로 나눠 생각합니다.

- `dist[city][0]`: 할인권을 아직 사용하지 않고 `city`에 도착하는 최소 비용
- `dist[city][1]`: 할인권을 이미 사용하고 `city`에 도착하는 최소 비용

이렇게 보면 원래 그래프 위에 **2층짜리 상태 그래프**를 만든 것과 같습니다.

### 상태 전이
현재 `city`에서 다음 도로 `(city -> next, cost)`를 본다면:

1. **할인권을 쓰지 않고 이동**
   - `dist[next][used]`를 `current + cost`로 갱신할 수 있습니다.

2. **아직 할인권을 안 썼다면 이번 도로에서 사용**
   - `dist[next][1]`를 `current + floor(cost / 2)`로 갱신할 수 있습니다.

즉, 간선을 따라가면서
- 같은 층 안에서 그대로 이동할 수도 있고
- 미사용 층에서 사용 완료 층으로 한 번 내려갈 수도 있습니다.

### 왜 다익스트라인가?
모든 이동 비용은 양수이고, 할인 적용 후에도 `floor(cost / 2)`는 음수가 되지 않습니다.
따라서 상태 그래프에서도 간선 가중치는 모두 0 이상이고, 다익스트라를 그대로 적용할 수 있습니다.

우선순위 큐에는 `(현재까지 비용, 도시, 할인 사용 여부)`를 넣고,
가장 비용이 작은 상태부터 꺼내며 갱신하면 됩니다.

### 시간 복잡도
- 상태 수: `2 * n`
- 간선 수: 원래 도로마다 최대 2가지 전이를 만들 수 있으므로 `O(edges.length)` 수준
- 전체 시간 복잡도: `O((n + m) log n)`에 가깝게 처리할 수 있습니다.

### 구현 예시
```js
function solution(n, edges, start, end) {
  const graph = Array.from({ length: n }, () => []);

  for (const [from, to, cost] of edges) {
    graph[from].push([to, cost]);
  }

  const INF = Number.MAX_SAFE_INTEGER;
  const dist = Array.from({ length: n }, () => [INF, INF]);
  dist[start][0] = 0;

  const heap = [];

  const push = (item) => {
    heap.push(item);
    let index = heap.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (heap[parent][0] <= heap[index][0]) break;
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

      if (left < heap.length && heap[left][0] < heap[smallest][0]) {
        smallest = left;
      }

      if (right < heap.length && heap[right][0] < heap[smallest][0]) {
        smallest = right;
      }

      if (smallest === index) break;
      [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
      index = smallest;
    }

    return top;
  };

  push([0, start, 0]);

  while (heap.length > 0) {
    const [currentCost, city, used] = pop();

    if (currentCost !== dist[city][used]) continue;

    for (const [next, cost] of graph[city]) {
      const normalCost = currentCost + cost;
      if (normalCost < dist[next][used]) {
        dist[next][used] = normalCost;
        push([normalCost, next, used]);
      }

      if (used === 0) {
        const discountedCost = currentCost + Math.floor(cost / 2);
        if (discountedCost < dist[next][1]) {
          dist[next][1] = discountedCost;
          push([discountedCost, next, 1]);
        }
      }
    }
  }

  const answer = Math.min(dist[end][0], dist[end][1]);
  return answer === INF ? -1 : answer;
}
```

이 풀이의 포인트는 **도시 자체가 아니라 “도시 + 할인 사용 여부”를 하나의 정점처럼 다루는 것**입니다.
그 관점으로 바꾸면, 일반적인 최단 경로 문제로 자연스럽게 풀립니다.
