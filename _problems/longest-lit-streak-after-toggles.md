---
title: 토글 뒤 가장 긴 점등 구간
slug: longest-lit-streak-after-toggles
track: today
difficulty: hard
topic: segment-tree
tags:
  - daily
  - hard
  - segment-tree
  - toggle
  - longest-streak
  - range-merge
order: 41
function_name: longestLitStreakAfterToggles
time_limit_ms: 500
primaryMethod: segment-tree-prefix-suffix-best
coreIdea: 전구 상태를 세그먼트 트리로 관리하면서 각 구간의 prefix suffix 최장 점등 길이를 병합하면 토글이 일어날 때마다 전체 최장 연속 1 구간 길이를 빠르게 갱신할 수 있다
gimmick: 단순히 켜진 개수만 세면 안 되고 양쪽 자식 경계를 가로질러 이어지는 연속 구간을 계산해야 하며 같은 위치를 여러 번 토글하는 경우도 정확히 반영해야 한다
starter_code: |
  function longestLitStreakAfterToggles(n, toggles) {
    // 여기에 코드를 작성하세요.
  }
test_cases:
  - input: [5, [1, 3, 2, 4]]
    output: [1, 1, 3, 4]
  - input: [4, [0, 1, 2, 3, 1]]
    output: [1, 2, 3, 4, 2]
  - input: [1, [0, 0, 0]]
    output: [1, 0, 1]
  - input: [7, [2, 3, 4, 3, 1, 5]]
    output: [1, 2, 3, 1, 2, 2]
---
전구가 일렬로 놓여 있을 때, 각 토글 뒤마다 **가장 긴 연속 점등 구간의 길이**를 구하세요.

## 문제 설명
길이 `n`인 전구 배열이 있고, 처음에는 모든 전구가 꺼져 있습니다.

토글 연산 배열 `toggles`가 주어질 때, 각 연산은 해당 인덱스의 전구 상태를 뒤집습니다.
- 꺼져 있으면 켜집니다.
- 켜져 있으면 꺼집니다.

각 토글이 끝날 때마다 현재 전구 배열에서 **1이 연속으로 가장 길게 이어진 구간의 길이**를 구해 배열로 반환하는 `longestLitStreakAfterToggles` 함수를 작성하세요.

예를 들어 `n = 5`, `toggles = [1, 3, 2, 4]`라면 상태 변화는 다음과 같습니다.
- `1` 토글 후: `01000` → 최장 길이 `1`
- `3` 토글 후: `01010` → 최장 길이 `1`
- `2` 토글 후: `01110` → 최장 길이 `3`
- `4` 토글 후: `01111` → 최장 길이 `4`

따라서 반환값은 `[1, 1, 3, 4]`입니다.

## 제한사항
- `1 <= n <= 100,000`
- `1 <= toggles.length <= 100,000`
- `0 <= toggles[i] < n`
- 모든 전구는 처음에 꺼져 있습니다.
- 반환값은 각 토글 직후의 최장 연속 점등 구간 길이를 순서대로 담은 배열입니다.

## 예시
- 입력: `n = 5`, `toggles = [1, 3, 2, 4]` → 출력: `[1, 1, 3, 4]`
- 입력: `n = 4`, `toggles = [0, 1, 2, 3, 1]` → 출력: `[1, 2, 3, 4, 2]`
- 입력: `n = 1`, `toggles = [0, 0, 0]` → 출력: `[1, 0, 1]`
- 입력: `n = 7`, `toggles = [2, 3, 4, 3, 1, 5]` → 출력: `[1, 2, 3, 1, 2, 2]`

## 힌트
- 매번 전체 배열을 다시 훑으면 너무 느립니다.
- 어떤 구간에 대해 다음 3가지 정보가 있으면 부모 구간도 합칠 수 있습니다.
  - 왼쪽부터 이어지는 최장 점등 길이
  - 오른쪽부터 이어지는 최장 점등 길이
  - 구간 내부 최장 점등 길이
- 두 자식 구간을 합칠 때, 정답이 왼쪽 내부나 오른쪽 내부에만 있는 것이 아니라 **경계를 가로질러 이어질 수도 있다**는 점이 핵심입니다.

## 해설
토글이 한 번 일어날 때마다 현재 배열 전체에서 최장 연속 `1` 구간을 알아내야 합니다.

가장 단순한 방법은 매 토글마다 배열 전체를 다시 스캔하는 것이지만, 이 경우 시간 복잡도는 `O(n * q)`가 되어 `n`, `q`가 모두 100,000일 때 너무 느립니다.

이 문제는 **세그먼트 트리**로 해결할 수 있습니다.

### 각 노드에 무엇을 저장할까?
세그먼트 트리의 각 노드는 어떤 구간 `[l, r]`를 담당합니다. 이 구간에 대해 아래 정보를 저장합니다.

- `len`: 구간 길이
- `prefix`: 구간의 왼쪽 끝에서 시작하는 최장 연속 점등 길이
- `suffix`: 구간의 오른쪽 끝에서 끝나는 최장 연속 점등 길이
- `best`: 구간 내부 어디에서든 가능한 최장 연속 점등 길이

예를 들어 구간 상태가 `01110`이라면:
- `prefix = 0`
- `suffix = 0`
- `best = 3`

구간 상태가 `11101`이라면:
- `prefix = 3`
- `suffix = 1`
- `best = 3`

### 두 자식 구간 병합
왼쪽 자식 `L`, 오른쪽 자식 `R`이 있을 때 부모 정보는 다음처럼 계산할 수 있습니다.

- `prefix`
  - 기본값은 `L.prefix`
  - 만약 왼쪽 구간 전체가 전부 켜져 있다면 `L.len + R.prefix`
- `suffix`
  - 기본값은 `R.suffix`
  - 만약 오른쪽 구간 전체가 전부 켜져 있다면 `R.len + L.suffix`
- `best`
  - `L.best`
  - `R.best`
  - `L.suffix + R.prefix`
  - 이 셋 중 최댓값

여기서 `L.suffix + R.prefix`가 바로 **경계를 가로질러 이어지는 연속 점등 구간**입니다.
이 값을 빼먹으면 `01110` 같은 형태를 제대로 계산할 수 없습니다.

### 토글은 어떻게 반영할까?
리프 노드는 전구 한 개를 뜻합니다.

- 전구가 꺼져 있으면 `prefix = suffix = best = 0`
- 전구가 켜져 있으면 `prefix = suffix = best = 1`

토글이 들어오면 해당 리프 값을 `0 ↔ 1`로 바꾼 뒤, 루트 방향으로 올라오며 부모 정보를 다시 병합합니다.
그러면 루트의 `best`가 곧 전체 배열의 최장 연속 점등 구간 길이입니다.

### 구현 예시
```js
function longestLitStreakAfterToggles(n, toggles) {
  const size = 4 * n;
  const prefix = Array(size).fill(0);
  const suffix = Array(size).fill(0);
  const best = Array(size).fill(0);
  const len = Array(size).fill(0);
  const state = Array(n).fill(0);

  function build(node, left, right) {
    len[node] = right - left + 1;
    if (left === right) return;

    const mid = Math.floor((left + right) / 2);
    build(node * 2, left, mid);
    build(node * 2 + 1, mid + 1, right);
  }

  function pull(node) {
    const leftNode = node * 2;
    const rightNode = node * 2 + 1;

    prefix[node] = prefix[leftNode];
    if (prefix[leftNode] === len[leftNode]) {
      prefix[node] = len[leftNode] + prefix[rightNode];
    }

    suffix[node] = suffix[rightNode];
    if (suffix[rightNode] === len[rightNode]) {
      suffix[node] = len[rightNode] + suffix[leftNode];
    }

    best[node] = Math.max(
      best[leftNode],
      best[rightNode],
      suffix[leftNode] + prefix[rightNode]
    );
  }

  function update(node, left, right, index) {
    if (left === right) {
      state[index] ^= 1;
      prefix[node] = state[index];
      suffix[node] = state[index];
      best[node] = state[index];
      return;
    }

    const mid = Math.floor((left + right) / 2);
    if (index <= mid) {
      update(node * 2, left, mid, index);
    } else {
      update(node * 2 + 1, mid + 1, right, index);
    }

    pull(node);
  }

  build(1, 0, n - 1);

  const answer = [];
  for (const index of toggles) {
    update(1, 0, n - 1, index);
    answer.push(best[1]);
  }

  return answer;
}
```

각 토글마다 세그먼트 트리의 높이만큼만 갱신하므로 `O(log n)`이 걸립니다.
전체 시간 복잡도는 `O((n + q) log n)`이 아니라, 위 구현처럼 초기 빌드가 길이 기록만 하는 수준이면 사실상 `O(n + q log n)`으로 볼 수 있습니다.

이 문제의 포인트는 단순 개수 집계가 아니라, **구간을 합칠 때 이어지는 연속 구간 정보를 유지하는 것**입니다.