---
title: 중계기 하나가 꺼질 때 끊기는 최대 통신 쌍
slug: max-disconnected-pairs-after-relay-failure
track: today
difficulty: hard
topic: articulation-points
tags:
  - daily
  - hard
  - graph
  - dfs
  - articulation-point
  - low-link
  - connectivity
order: 1001
function_name: maxDisconnectedPairsAfterRelayFailure
time_limit_ms: 600
primaryMethod: tarjan-low-link-component-size-counting
coreIdea: 각 정점을 제거했을 때 분리되는 연결 컴포넌트들의 크기를 DFS low-link로 한 번에 계산하고 컴포넌트 크기들의 쌍 곱 합으로 끊기는 정점 쌍 수를 구한다
gimmick: 단절점의 각 자식 서브트리 중 low 값이 현재 정점의 발견 순서 이상인 것만 제거 후 독립 컴포넌트가 되며 나머지 정점들은 하나의 leftover 컴포넌트로 묶어 함께 계산해야 한다
starter_code: |
  function maxDisconnectedPairsAfterRelayFailure(n, edges) {
    return 0;
  }
test_cases:
  - input: [5, [[0, 1], [0, 2], [0, 3], [0, 4]]]
    output: 6
  - input: [4, [[0, 1], [1, 2], [2, 3], [3, 0]]]
    output: 0
  - input: [6, [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5]]]
    output: 8
  - input: [7, [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4], [3, 5], [5, 6]]]
    output: 11
---
서로 연결된 통신망에서 **중계기 하나가 고장났을 때 가장 많은 정점 쌍이 서로 통신 불가**가 되는 상황을 찾는 문제입니다.

## 문제 설명
정점 개수가 `n`개인 **무방향 연결 그래프**가 주어집니다. 정점 번호는 `0`부터 `n - 1`까지입니다.

각 간선 `[a, b]`는 정점 `a`와 `b` 사이에 양방향 통신선이 있다는 뜻입니다.

이제 정점 하나를 골라 네트워크에서 제거한다고 가정합니다. 그러면 그 정점과 연결된 모든 간선도 함께 사라집니다.

어떤 정점을 제거한 뒤, 남아 있는 정점들 중 **서로 다른 컴포넌트에 속하게 되어 더 이상 통신할 수 없는 unordered pair(순서 없는 정점 쌍)** 의 개수를 계산할 수 있습니다.

모든 정점에 대해 이 값을 계산했을 때, 가능한 **최댓값**을 반환하는 `maxDisconnectedPairsAfterRelayFailure` 함수를 작성하세요.

## 제한사항
- `2 <= n <= 200000`
- `n - 1 <= edges.length <= 200000`
- `edges[i] = [u, v]`
- `0 <= u, v < n`
- `u !== v`
- 같은 간선이 중복으로 주어지지 않습니다.
- 입력 그래프는 연결 그래프입니다.
- 반환값은 중계기 하나를 제거했을 때 서로 통신할 수 없게 되는 정점 쌍 수의 최댓값입니다.

## 예시
- 입력: `n = 5`, `edges = [[0,1],[0,2],[0,3],[0,4]]` → 출력: `6`
- 입력: `n = 4`, `edges = [[0,1],[1,2],[2,3],[3,0]]` → 출력: `0`
- 입력: `n = 6`, `edges = [[0,1],[1,2],[2,3],[1,4],[4,5]]` → 출력: `8`
- 입력: `n = 7`, `edges = [[0,1],[1,2],[2,0],[1,3],[3,4],[3,5],[5,6]]` → 출력: `11`

## 힌트
- 어떤 정점을 제거했을 때 그래프가 여러 조각으로 갈라지는지 판단하려면 **단절점(articulation point)** 개념이 중요합니다.
- DFS에서 구하는 `disc`, `low` 값은 “이 자식 서브트리가 부모보다 더 위로 되돌아갈 길이 있는지”를 알려 줍니다.
- 제거 후 컴포넌트 크기가 `s1, s2, ..., sk`라면, 서로 다른 컴포넌트에 속하는 정점 쌍 수는 `s1*s2 + s1*s3 + ...` 형태로 계산할 수 있습니다.
- 모든 정점마다 BFS/DFS를 다시 하면 너무 느립니다. 한 번의 DFS에서 필요한 정보를 같이 모아야 합니다.

## 해설
정점 `v`를 제거한 뒤 남은 정점들이 여러 연결 컴포넌트로 나뉜다고 합시다.
그 컴포넌트 크기를 `s1, s2, ..., sk`라고 하면, 서로 통신할 수 없게 된 unordered pair의 수는

`sum_{i < j} si * sj`

입니다.

즉, 핵심은 **각 정점을 제거했을 때 생기는 컴포넌트 크기들**을 빠르게 알아내는 것입니다.

### 1. 왜 단절점 DFS가 필요한가?
정점 `v`를 제거해도 그래프가 여전히 하나로 이어져 있으면 답은 `0`입니다.
반대로 그래프가 여러 조각으로 갈라지는 정점이 바로 **단절점**입니다.

Tarjan DFS에서 다음 값을 둡니다.

- `disc[v]`: DFS에서 `v`를 처음 방문한 순서
- `low[v]`: `v`의 서브트리에서 back edge를 이용해 도달할 수 있는 가장 이른 방문 순서
- `subSize[v]`: DFS 트리에서 `v`를 루트로 하는 서브트리 크기

어떤 DFS 트리 간선 `v -> to`에 대해

- `low[to] >= disc[v]`

라면, `to`의 서브트리는 `v`를 제거했을 때 위쪽으로 이어질 길이 없이 **독립된 컴포넌트 하나**가 됩니다.
그 크기는 `subSize[to]`입니다.

### 2. 제거 후 컴포넌트는 어떻게 모이나?
정점 `v`를 제거했을 때 생기는 컴포넌트는 두 종류입니다.

1. `low[to] >= disc[v]`를 만족하는 자식 서브트리들
2. 나머지 모든 정점이 합쳐진 **leftover 컴포넌트**

왜 leftover가 하나로 묶일까요?
`low[to] < disc[v]`인 자식 서브트리는 back edge를 통해 `v`보다 위쪽과 이어질 수 있으므로, `v`를 제거해도 위쪽 부분과 함께 하나의 컴포넌트로 남습니다.

그래서 각 정점 `v`마다:

- 분리되는 자식 컴포넌트 크기들을 모으고
- 그 합을 뺀 나머지 `n - 1 - separatedSum`을 leftover 크기로 추가하면 됩니다.

### 3. 쌍 개수 계산
컴포넌트 크기 배열이 `parts`라면

`sum_{i < j} parts[i] * parts[j]`

를 계산하면 됩니다.

이 값은 누적합으로 `O(k)`에 구할 수 있습니다.

```js
let disconnectedPairs = 0;
let seen = 0;

for (const size of parts) {
  disconnectedPairs += seen * size;
  seen += size;
}
```

### 4. 전체 알고리즘
1. 인접 리스트를 만듭니다.
2. DFS를 한 번 돌며 `disc`, `low`, `subSize`를 계산합니다.
3. 각 정점 `v`에서 `low[to] >= disc[v]`인 자식들의 `subSize[to]`를 `parts`에 담습니다.
4. leftover 크기 `n - 1 - separatedSum`이 0보다 크면 `parts`에 추가합니다.
5. `parts`의 쌍 곱 합을 계산해 `v` 제거 시 끊기는 정점 쌍 수를 얻습니다.
6. 그 최댓값을 답으로 반환합니다.

### 구현 예시
```js
function maxDisconnectedPairsAfterRelayFailure(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const disc = Array(n).fill(0);
  const low = Array(n).fill(0);
  const subSize = Array(n).fill(0);
  let order = 0;
  let answer = 0;

  function dfs(node, parent) {
    disc[node] = ++order;
    low[node] = disc[node];
    subSize[node] = 1;

    const parts = [];
    let separatedSum = 0;

    for (const next of graph[node]) {
      if (next === parent) continue;

      if (!disc[next]) {
        dfs(next, node);
        subSize[node] += subSize[next];
        low[node] = Math.min(low[node], low[next]);

        if (low[next] >= disc[node]) {
          parts.push(subSize[next]);
          separatedSum += subSize[next];
        }
      } else {
        low[node] = Math.min(low[node], disc[next]);
      }
    }

    const leftover = n - 1 - separatedSum;
    if (leftover > 0) {
      parts.push(leftover);
    }

    let seen = 0;
    let disconnectedPairs = 0;
    for (const size of parts) {
      disconnectedPairs += seen * size;
      seen += size;
    }

    answer = Math.max(answer, disconnectedPairs);
  }

  dfs(0, -1);
  return answer;
}
```

### 루트도 같은 방식으로 되나?
됩니다.
루트에서는 `low[child] >= disc[root]`가 항상 성립하므로 각 DFS 자식 서브트리가 각각의 분리 컴포넌트가 됩니다. 그리고 leftover는 루트보다 위쪽이 없어서 자동으로 0이 됩니다.

### 복잡도
- 시간 복잡도: `O(n + m)`
- 공간 복잡도: `O(n + m)`
  - 여기서 `m = edges.length`

이 문제의 핵심은 **정점을 하나씩 지워 보지 않고**, DFS low-link 정보만으로 “지웠을 때 갈라지는 컴포넌트 크기”를 한 번에 복원하는 것입니다.
그 뒤에는 컴포넌트 크기들의 조합 수를 세는 문제로 바뀝니다.
