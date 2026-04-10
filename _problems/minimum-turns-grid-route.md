---
title: 방향 전환이 가장 적은 격자 경로
slug: minimum-turns-grid-route
track: today
difficulty: hard
topic: zero-one-bfs
tags:
  - daily
  - hard
  - graph
  - grid
  - deque
  - 0-1-bfs
  - shortest-path
  - direction-state
order: 38
function_name: solution
time_limit_ms: 500
primaryMethod: deque-zero-one-bfs-direction-state
coreIdea: 각 칸에 어느 방향으로 도착했는지까지 상태로 확장하고 직진은 비용 0, 방향 전환은 비용 1인 그래프로 본 뒤 0-1 BFS로 최소 방향 전환 수를 구한다
gimmick: 이동 횟수가 아니라 방향이 바뀐 횟수를 최소화해야 하므로 같은 칸도 도착 방향이 다르면 서로 다른 상태로 관리해야 하고 첫 이동은 전환으로 세지 않는다
starter_code: |
  function solution(grid) {
    return -1;
  }
test_cases:
  - input: [["S..", "##.", "..E"]]
    output: 1
  - input: [["S#E", "...", "..."]]
    output: 2
  - input: [["S.E"]]
    output: 0
  - input: [["S#.", "###", ".E."]]
    output: -1
  - input: [["S...", ".##.", "...E"]]
    output: 1
---
격자에서 출발점에서 도착점까지 이동할 때, **방향을 몇 번 꺾는지**를 최소화하는 문제입니다.

## 문제 설명
문자 격자 `grid`가 주어집니다. 각 문자열의 길이는 모두 같으며, 문자의 의미는 다음과 같습니다.

- `S`: 출발점
- `E`: 도착점
- `.`: 이동 가능한 빈 칸
- `#`: 벽

상하좌우로만 한 칸씩 이동할 수 있고, 벽은 통과할 수 없습니다.

경로의 비용은 **이동 칸 수가 아니라 방향 전환 횟수**입니다.
처음 한 번 움직이는 방향은 전환으로 세지 않으며, 그다음부터 직전 이동 방향과 다른 방향으로 움직일 때마다 전환 횟수가 1 증가합니다.

출발점 `S`에서 도착점 `E`까지 갈 수 있다면 필요한 **최소 방향 전환 횟수**를 반환하고, 갈 수 없으면 `-1`을 반환하는 `solution` 함수를 작성하세요.

## 제한사항
- `1 <= grid.length <= 300`
- `1 <= grid[i].length <= 300`
- `grid`의 각 원소는 길이가 같은 문자열입니다.
- `grid`에는 `S`와 `E`가 정확히 하나씩 존재합니다.
- `S`, `E`, `.`, `#` 외의 문자는 주어지지 않습니다.
- 이동은 상하좌우 4방향만 가능합니다.
- 반환값은 `S`에서 `E`까지 가는 경로 중 최소 방향 전환 횟수이며, 불가능하면 `-1`입니다.

## 예시
- 입력: `["S..", "##.", "..E"]` → 출력: `1`
- 입력: `["S#E", "...", "..."]` → 출력: `2`
- 입력: `["S.E"]` → 출력: `0`
- 입력: `["S#.", "###", ".E."]` → 출력: `-1`

## 힌트
- 어떤 칸에 도착했다는 사실만으로는 정보가 부족합니다.
- 같은 칸이어도 **어느 방향으로 들어왔는지**에 따라 다음 전환 비용이 달라집니다.
- 직진은 비용 `0`, 회전은 비용 `1`인 그래프로 바꿔 보면 일반 BFS보다 더 잘 맞는 방법이 있습니다.
- 간선 가중치가 `0` 또는 `1`뿐일 때는 덱을 활용한 0-1 BFS가 매우 강력합니다.

## 해설
이 문제는 단순 최단 거리 BFS처럼 보이지만, 실제로 최소화해야 하는 값은 **칸 수가 아니라 회전 수**입니다.

예를 들어 같은 칸 `(r, c)`에 도착했더라도:
- 왼쪽에서 들어왔는지
- 위에서 들어왔는지

에 따라 다음 이동에서 회전 비용이 달라집니다.
따라서 상태를 `(행, 열)`만으로 두면 정보가 부족하고, **도착 방향까지 포함한 상태**가 필요합니다.

### 상태 정의
방향을 4개로 두고 다음처럼 거리를 정의합니다.

- `dist[r][c][d]`: `(r, c)` 칸에 방향 `d`로 도착했을 때의 최소 방향 전환 수

여기서 `d`는 예를 들어 상, 우, 하, 좌 중 하나입니다.

### 비용 규칙
현재 방향이 `d`이고 다음 이동 방향이 `nd`라면:
- `d === nd`이면 직진이므로 추가 비용 `0`
- `d !== nd`이면 방향 전환이므로 추가 비용 `1`

단, **첫 이동은 이전 방향이 없으므로 비용 0**으로 시작해야 합니다.
그래서 시작점에서는 인접한 이동 가능한 칸들을 각 방향 상태로 모두 비용 0으로 넣어 주거나, 시작점을 특별한 방향 없는 상태로 처리하면 됩니다.

### 왜 0-1 BFS인가?
각 이동의 추가 비용이 오직 `0` 또는 `1`뿐이므로, 다익스트라 대신 **0-1 BFS**를 사용할 수 있습니다.

- 비용이 `0`인 이동은 덱의 앞쪽에 넣기
- 비용이 `1`인 이동은 덱의 뒤쪽에 넣기

이렇게 하면 항상 현재까지 비용이 가장 작은 상태부터 효율적으로 처리할 수 있습니다.

### 풀이 흐름
1. 격자에서 `S`와 `E`의 위치를 찾습니다.
2. `dist[row][col][4]`를 무한대로 초기화합니다.
3. 시작점에서 갈 수 있는 첫 이동들을 비용 `0`으로 덱에 넣습니다.
4. 덱에서 상태를 꺼내며 4방향 이웃을 확인합니다.
5. 직진이면 앞쪽, 회전이면 뒤쪽에 넣으며 거리를 갱신합니다.
6. 도착점 `E`에 대한 4개 방향 상태 중 최솟값이 정답입니다.

### 구현 예시
```js
function solution(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  let sr = -1;
  let sc = -1;
  let er = -1;
  let ec = -1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 'S') {
        sr = r;
        sc = c;
      }
      if (grid[r][c] === 'E') {
        er = r;
        ec = c;
      }
    }
  }

  if (sr === er && sc === ec) return 0;

  const INF = Number.MAX_SAFE_INTEGER;
  const dist = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Array(4).fill(INF))
  );

  const deque = [];
  let head = 0;

  const pushFront = (state) => {
    if (head === 0) {
      deque.unshift(state);
    } else {
      deque[--head] = state;
    }
  };

  const pushBack = (state) => {
    deque.push(state);
  };

  for (let d = 0; d < 4; d++) {
    const nr = sr + dirs[d][0];
    const nc = sc + dirs[d][1];

    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
    if (grid[nr][nc] === '#') continue;

    dist[nr][nc][d] = 0;
    pushBack([nr, nc, d]);
  }

  while (head < deque.length) {
    const [r, c, dir] = deque[head++];
    const current = dist[r][c][dir];

    for (let nd = 0; nd < 4; nd++) {
      const nr = r + dirs[nd][0];
      const nc = c + dirs[nd][1];

      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] === '#') continue;

      const extra = dir === nd ? 0 : 1;
      const nextCost = current + extra;

      if (nextCost >= dist[nr][nc][nd]) continue;
      dist[nr][nc][nd] = nextCost;

      if (extra === 0) {
        pushFront([nr, nc, nd]);
      } else {
        pushBack([nr, nc, nd]);
      }
    }
  }

  const answer = Math.min(...dist[er][ec]);
  return answer === INF ? -1 : answer;
}
```

이 문제의 핵심은 **칸이 아니라 칸 + 방향을 정점으로 보는 상태 확장**입니다.
그렇게 바꾸면 회전 최소화 문제는 가중치가 `0/1`인 최단 경로 문제가 되고, 0-1 BFS로 `O(R * C)`에 가깝게 해결할 수 있습니다.
