---
title: 상충 규칙을 모두 만족할 수 있는 스위치
slug: satisfy-switch-rules-two-sat
track: today
difficulty: hard
topic: two-sat
tags:
  - daily
  - hard
  - graph
  - scc
  - two-sat
  - implication-graph
order: 1380
function_name: canSatisfySwitchRules
time_limit_ms: 800
primaryMethod: implication-graph-scc-check
coreIdea: 각 OR 규칙을 두 개의 함의 간선으로 바꾼 뒤 SCC를 구해 어떤 스위치와 그 반대 조건이 같은 컴포넌트에 들어가는지 확인한다
gimmick: 규칙 하나는 단순 조건 두 개가 아니라 반대 조건이 거짓일 때 다른 조건이 반드시 참이어야 한다는 방향 간선 두 개로 해석해야 한다
starter_code: |
  function canSatisfySwitchRules(n, rules) {
    return false;
  }
test_cases:
  - input: [3, [[1, 2], [-1, 3], [-2, -3]]]
    output: true
  - input: [1, [[1, 1], [-1, -1]]]
    output: false
  - input: [4, [[1, 2], [-1, 3], [-2, 3], [-3, 4], [-4, -1]]]
    output: true
  - input: [2, []]
    output: true
  - input: [2, [[1, 2], [-1, 2], [1, -2], [-1, -2]]]
    output: false
---
스위치의 켜짐/꺼짐 조건으로 이루어진 규칙들을 모두 동시에 만족할 수 있는지 판별하는 문제입니다.

## 문제 설명
`n`개의 스위치가 있고, 각 스위치는 `true`(켜짐) 또는 `false`(꺼짐) 중 하나의 상태를 가질 수 있습니다.
스위치 번호는 `1`부터 `n`까지입니다.

규칙 배열 `rules`가 주어집니다. 각 규칙은 `[a, b]` 형태이며, 두 조건 중 **하나 이상**이 참이어야 한다는 뜻입니다.

- 양수 `x`는 `x`번 스위치가 켜져 있어야 한다는 조건입니다.
- 음수 `-x`는 `x`번 스위치가 꺼져 있어야 한다는 조건입니다.

예를 들어 `[2, -3]`은 `2번 스위치가 켜져 있거나, 3번 스위치가 꺼져 있어야 한다`는 뜻입니다.

모든 규칙을 동시에 만족하는 스위치 상태 조합이 하나라도 있으면 `true`, 없으면 `false`를 반환하는 `canSatisfySwitchRules` 함수를 작성하세요.

## 제한사항
- `1 <= n <= 100000`
- `0 <= rules.length <= 200000`
- `rules[i] = [a, b]`
- `1 <= Math.abs(a), Math.abs(b) <= n`
- 하나의 규칙 안에서 같은 조건이 두 번 나올 수 있습니다.
- 반환값은 모든 규칙을 만족할 수 있는지 나타내는 불리언 값입니다.

## 예시
- 입력: `n = 3`, `rules = [[1,2],[-1,3],[-2,-3]]` → 출력: `true`
- 입력: `n = 1`, `rules = [[1,1],[-1,-1]]` → 출력: `false`
- 입력: `n = 4`, `rules = [[1,2],[-1,3],[-2,3],[-3,4],[-4,-1]]` → 출력: `true`
- 입력: `n = 2`, `rules = []` → 출력: `true`
- 입력: `n = 2`, `rules = [[1,2],[-1,2],[1,-2],[-1,-2]]` → 출력: `false`

## 힌트
- `(A 또는 B)`는 `A가 거짓이면 B가 참이어야 한다`, `B가 거짓이면 A가 참이어야 한다`로 바꿀 수 있습니다.
- 각 조건을 정점으로 보고, 조건 사이의 강제 관계를 방향 간선으로 표현해 보세요.
- 어떤 스위치의 `켜짐` 조건과 `꺼짐` 조건이 서로 같은 강한 연결 요소에 들어가면 모순입니다.

## 해설
이 문제는 전형적인 **2-SAT** 판별 문제입니다.
각 규칙은 두 리터럴의 OR 형태입니다.

`(A 또는 B)`라는 규칙은 아래 두 함의로 바꿀 수 있습니다.

- `not A -> B`
- `not B -> A`

즉, 어떤 조건이 거짓이라면 다른 조건은 반드시 참이어야 합니다.
이 함의 관계를 방향 그래프로 만들면, 모든 규칙은 그래프의 간선으로 표현됩니다.

### 1. 조건을 정점으로 바꾸기
각 스위치 `x`에는 두 정점이 필요합니다.

- `x`가 켜짐
- `x`가 꺼짐

총 정점 수는 `2 * n`개입니다.
`x`와 `not x`를 빠르게 오갈 수 있도록 인덱스를 짝수/홀수 쌍으로 잡으면 구현이 단순해집니다.

### 2. SCC로 모순 찾기
함의 그래프에서 어떤 스위치 `x`의 `켜짐` 정점과 `꺼짐` 정점이 같은 SCC에 있다면 모순입니다.

왜냐하면 같은 SCC 안에서는 서로 도달 가능하므로,

- `x가 켜짐이면 x가 꺼짐이어야 하고`
- `x가 꺼짐이면 x가 켜짐이어야 하는`

상황이 동시에 생깁니다.
하나의 스위치가 켜짐과 꺼짐을 동시에 만족할 수는 없으므로 전체 규칙은 불가능합니다.

반대로 모든 스위치에 대해 두 반대 조건이 서로 다른 SCC에 있다면, 적어도 하나의 만족 가능한 배정이 존재합니다.
이 문제는 실제 배정 배열을 요구하지 않으므로 그 여부만 반환하면 됩니다.

### 구현 예시
```js
function canSatisfySwitchRules(n, rules) {
  const size = n * 2;
  const graph = Array.from({ length: size }, () => []);
  const reversed = Array.from({ length: size }, () => []);

  function id(literal) {
    const base = (Math.abs(literal) - 1) * 2;
    return literal > 0 ? base : base + 1;
  }

  function neg(node) {
    return node ^ 1;
  }

  function addEdge(from, to) {
    graph[from].push(to);
    reversed[to].push(from);
  }

  for (const [a, b] of rules) {
    const A = id(a);
    const B = id(b);
    addEdge(neg(A), B);
    addEdge(neg(B), A);
  }

  const visited = Array(size).fill(false);
  const order = [];

  for (let start = 0; start < size; start++) {
    if (visited[start]) continue;

    const stack = [[start, 0]];
    visited[start] = true;

    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      const node = top[0];
      let index = top[1];

      if (index < graph[node].length) {
        const next = graph[node][index];
        top[1]++;
        if (!visited[next]) {
          visited[next] = true;
          stack.push([next, 0]);
        }
      } else {
        order.push(node);
        stack.pop();
      }
    }
  }

  const component = Array(size).fill(-1);

  let label = 0;
  for (let i = order.length - 1; i >= 0; i--) {
    const start = order[i];
    if (component[start] !== -1) continue;

    const stack = [start];
    component[start] = label;

    while (stack.length > 0) {
      const node = stack.pop();
      for (const next of reversed[node]) {
        if (component[next] === -1) {
          component[next] = label;
          stack.push(next);
        }
      }
    }

    label++;
  }

  for (let x = 0; x < n; x++) {
    if (component[x * 2] === component[x * 2 + 1]) {
      return false;
    }
  }

  return true;
}
```

### 복잡도
- 시간 복잡도: `O(n + rules.length)`
- 공간 복잡도: `O(n + rules.length)`

핵심은 OR 규칙을 직접 하나씩 시도하는 것이 아니라, **반대 조건이 강제하는 방향 관계**로 바꾸는 것입니다.
그 뒤에는 SCC 안에 서로 반대인 두 조건이 함께 들어가는지만 확인하면 됩니다.
