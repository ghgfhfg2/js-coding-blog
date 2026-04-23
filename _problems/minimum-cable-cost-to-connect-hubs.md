---
title: 모든 허브를 잇는 최소 케이블 비용
slug: minimum-cable-cost-to-connect-hubs
track: algorithm
difficulty: medium
topic: minimum-spanning-tree
tags:
  - algorithm
  - graph
  - minimum-spanning-tree
  - kruskal
  - union-find
  - greedy
order: 50
function_name: minimumCableCostToConnectHubs
time_limit_ms: 400
primaryMethod: kruskal-sort-union-find
coreIdea: 케이블 후보를 비용 오름차순으로 정렬한 뒤 서로 다른 연결 요소를 잇는 간선만 union 하며 선택하면 모든 허브를 연결하는 최소 비용을 구할 수 있다
gimmick: 비용이 싼 간선이라도 이미 같은 연결 요소 안을 잇는 간선이면 사이클만 만들 뿐이라 반드시 건너뛰어야 하고 끝까지 선택한 간선 수가 n - 1에 못 미치면 연결 자체가 불가능하다
starter_code: |
  function minimumCableCostToConnectHubs(n, cables) {
    return 0;
  }
test_cases:
  - input: [4, [[0, 1, 1], [1, 2, 4], [0, 2, 2], [2, 3, 3], [1, 3, 5]]]
    output: 6
  - input: [3, [[0, 1, 7], [1, 2, 2], [0, 2, 10]]]
    output: 9
  - input: [5, [[0, 1, 1], [1, 2, 2], [3, 4, 1]]]
    output: -1
  - input: [1, []]
    output: 0
  - input: [4, [[0, 1, 5], [1, 2, 5], [2, 3, 5], [0, 3, 5], [0, 2, 100]]]
    output: 15
---
여러 케이블 후보 중 일부만 골라 **모든 허브를 가장 싼 비용으로 연결**하는 최소 스패닝 트리(MST) 문제입니다.

## 문제 설명
정점 개수가 `n`개인 네트워크 허브가 있습니다. 허브 번호는 `0`부터 `n - 1`까지입니다.

케이블 후보 목록 `cables`가 주어지며, 각 원소는 `[a, b, cost]` 형태입니다.
- `a`와 `b`는 연결할 수 있는 두 허브 번호
- `cost`는 그 케이블을 설치하는 비용

이 후보들 중 일부를 골라 **모든 허브가 서로 도달 가능하도록 연결**하려고 합니다.

가능한 연결 방법 중 총 비용의 최솟값을 반환하는 `minimumCableCostToConnectHubs` 함수를 작성하세요.

만약 주어진 케이블만으로는 모든 허브를 하나의 네트워크로 연결할 수 없다면 `-1`을 반환하세요.

## 제한사항
- `1 <= n <= 100,000`
- `0 <= cables.length <= 200,000`
- `cables[i] = [a, b, cost]`
- `0 <= a, b < n`
- `a !== b`
- `1 <= cost <= 1,000,000`
- 같은 두 허브를 잇는 케이블이 여러 개 있을 수 있습니다.
- 반환값은 모든 허브를 연결하는 최소 총 비용이며, 불가능하면 `-1`입니다.

## 예시
- 입력: `n = 4`, `cables = [[0,1,1],[1,2,4],[0,2,2],[2,3,3],[1,3,5]]` → 출력: `6`
- 입력: `n = 3`, `cables = [[0,1,7],[1,2,2],[0,2,10]]` → 출력: `9`
- 입력: `n = 5`, `cables = [[0,1,1],[1,2,2],[3,4,1]]` → 출력: `-1`
- 입력: `n = 1`, `cables = []` → 출력: `0`

## 힌트
- 비용이 싼 케이블부터 보되, 이미 서로 연결된 두 허브를 다시 잇는 케이블은 굳이 선택할 필요가 없습니다.
- 현재 두 허브가 같은 그룹에 속하는지 빠르게 확인하려면 **Union-Find(Disjoint Set Union)** 자료구조가 잘 맞습니다.
- 모든 허브가 연결되려면 최종적으로 선택된 케이블 수가 정확히 `n - 1`개여야 합니다.

## 해설
이 문제의 핵심은 **최소 스패닝 트리(MST)** 입니다. 모든 정점을 연결하면서 사이클은 만들지 않고, 총 비용은 최소가 되도록 간선을 골라야 합니다.

여기서는 **크루스칼(Kruskal) 알고리즘**이 가장 자연스럽습니다.

### 1. 왜 비용이 싼 케이블부터 봐도 될까?
크루스칼 알고리즘은 간선을 비용 오름차순으로 정렬한 뒤, 지금 선택해도 사이클이 생기지 않는 간선만 고릅니다.

이 방식이 가능한 이유는, 어떤 시점에 서로 다른 두 연결 요소를 잇는 가장 싼 간선은 최소 비용 연결에 포함되어도 손해가 없기 때문입니다.

### 2. 사이클은 어떻게 판별할까?
간선 `[a, b, cost]`를 보았을 때:
- `a`와 `b`가 아직 다른 연결 요소에 있으면 선택
- 이미 같은 연결 요소에 있으면 건너뜀

이 판단을 빠르게 하려면 **Union-Find**를 씁니다.

- `find(x)`: x가 속한 대표(parent) 찾기
- `union(a, b)`: 두 그룹 합치기

경로 압축과 union by size/rank를 함께 쓰면 거의 상수 시간처럼 동작합니다.

### 3. 연결이 불가능한 경우는?
정점이 `n`개라면, 모두 연결된 트리는 간선이 정확히 `n - 1`개 필요합니다.

따라서 간선을 다 본 뒤에도 선택한 간선 수가 `n - 1`보다 작다면,
중간에 끊어진 허브가 있다는 뜻이므로 `-1`을 반환해야 합니다.

### 4. 풀이 흐름
1. `cables`를 비용 기준으로 오름차순 정렬합니다.
2. Union-Find를 초기화합니다.
3. 각 케이블을 앞에서부터 보며:
   - 두 허브의 대표가 다르면 선택하고 비용을 더합니다.
   - 같은 그룹이면 건너뜁니다.
4. 선택한 케이블 수가 `n - 1`이면 누적 비용 반환
5. 아니면 `-1` 반환

### 구현 예시
```js
function minimumCableCostToConnectHubs(n, cables) {
  if (n <= 1) {
    return 0;
  }

  const parent = Array.from({ length: n }, (_, i) => i);
  const size = Array(n).fill(1);

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(a, b) {
    let rootA = find(a);
    let rootB = find(b);

    if (rootA === rootB) {
      return false;
    }

    if (size[rootA] < size[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }

    parent[rootB] = rootA;
    size[rootA] += size[rootB];
    return true;
  }

  const sorted = [...cables].sort((a, b) => a[2] - b[2]);
  let totalCost = 0;
  let usedEdges = 0;

  for (const [a, b, cost] of sorted) {
    if (!union(a, b)) {
      continue;
    }

    totalCost += cost;
    usedEdges += 1;

    if (usedEdges === n - 1) {
      return totalCost;
    }
  }

  return -1;
}
```

예를 들어 `[[0,1,1],[0,2,2],[2,3,3],[1,2,4],[1,3,5]]`를 보면:
- `0-1(1)` 선택
- `0-2(2)` 선택
- `2-3(3)` 선택
- 이미 4개 허브가 모두 연결됨

총 비용은 `1 + 2 + 3 = 6`입니다.

이 알고리즘의 시간 복잡도는 정렬 때문에 `O(m log m)`이고, `m`은 케이블 개수입니다. Union-Find 연산은 매우 빠르므로 큰 입력에도 잘 동작합니다.
