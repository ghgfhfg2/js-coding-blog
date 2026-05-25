---
title: 모든 티켓을 쓰는 사전순 여행 경로
slug: lexicographic-ticket-route
track: today
difficulty: hard
topic: eulerian-trail
tags:
  - daily
  - hard
  - graph
  - eulerian-trail
  - dfs
  - lexicographical-order
order: 1330
function_name: findLexicographicTicketRoute
time_limit_ms: 500
primaryMethod: hierholzer-lexicographic-eulerian-trail
coreIdea: 출발지별 도착지를 사전순으로 꺼낼 수 있게 정렬한 뒤 DFS로 막다른 길부터 경로 앞에 붙이는 Hierholzer 알고리즘으로 모든 티켓을 정확히 한 번 쓰는 사전순 최소 경로를 만든다
gimmick: 당장 사전순으로 가장 작은 도착지를 선택해도 이후 막힐 수 있으므로 방문 순서를 바로 정답에 넣지 않고 더 이상 쓸 티켓이 없을 때 역순으로 확정해야 한다
starter_code: |
  function findLexicographicTicketRoute(tickets, start) {
    return [];
  }
test_cases:
  - input: [[['ICN', 'SFO'], ['ICN', 'ATL'], ['SFO', 'ATL'], ['ATL', 'ICN'], ['ATL', 'SFO']], 'ICN']
    output: ['ICN', 'ATL', 'ICN', 'SFO', 'ATL', 'SFO']
  - input: [[['A', 'B'], ['A', 'B'], ['B', 'A'], ['B', 'C'], ['C', 'B']], 'A']
    output: ['A', 'B', 'A', 'B', 'C', 'B']
  - input: [[['ICN', 'A'], ['ICN', 'B'], ['A', 'ICN'], ['B', 'C'], ['C', 'ICN']], 'ICN']
    output: ['ICN', 'A', 'ICN', 'B', 'C', 'ICN']
  - input: [[['S', 'A'], ['A', 'C'], ['S', 'B'], ['B', 'A'], ['C', 'S']], 'S']
    output: ['S', 'A', 'C', 'S', 'B', 'A']
---
## 문제 설명
항공권 목록 `tickets`와 시작 공항 `start`가 주어집니다.

각 항공권은 `[출발, 도착]` 형태이며, 모든 항공권을 정확히 한 번씩 사용해 만들 수 있는 여행 경로 중 사전순으로 가장 앞서는 경로를 반환하는 `findLexicographicTicketRoute` 함수를 작성하세요.

경로는 방문한 공항 이름 배열로 반환합니다. 항공권이 `n`장이라면 정답 배열의 길이는 `n + 1`입니다.

## 제한사항
- `tickets`의 길이는 `1` 이상 `20,000` 이하입니다.
- 각 공항 이름은 길이 `1` 이상 `10` 이하의 영문 대문자 문자열입니다.
- 같은 `[출발, 도착]` 항공권이 여러 장 있을 수 있으며, 이 경우 각각 별도의 티켓으로 봅니다.
- `start`에서 출발해 모든 티켓을 정확히 한 번씩 사용하는 경로가 항상 존재합니다.
- 사전순 비교는 공항 이름 배열을 앞에서부터 비교합니다.
- 반환값은 공항 이름 배열입니다.

## 예시
- 입력: `tickets = [["ICN","SFO"],["ICN","ATL"],["SFO","ATL"],["ATL","ICN"],["ATL","SFO"]]`, `start = "ICN"` → 출력: `["ICN","ATL","ICN","SFO","ATL","SFO"]`
- 입력: `tickets = [["A","B"],["A","B"],["B","A"],["B","C"],["C","B"]]`, `start = "A"` → 출력: `["A","B","A","B","C","B"]`
- 입력: `tickets = [["ICN","A"],["ICN","B"],["A","ICN"],["B","C"],["C","ICN"]]`, `start = "ICN"` → 출력: `["ICN","A","ICN","B","C","ICN"]`

## 힌트
- 출발지별 도착지 목록을 사전순으로 관리해 보세요.
- 단순히 방문한 순서대로 정답에 넣으면 막다른 길을 만났을 때 처리하기 어렵습니다.
- 더 이상 사용할 수 있는 티켓이 없는 공항부터 경로의 뒤쪽으로 확정하면 모든 티켓을 한 번씩 쓰는 경로를 만들 수 있습니다.

## 해설
이 문제는 모든 간선을 정확히 한 번씩 사용하는 경로를 찾는 문제입니다. 공항을 정점, 항공권을 방향 간선으로 보면 오일러 경로를 구성해야 합니다.

주의할 점은 사전순입니다. 현재 공항에서 갈 수 있는 도착지 중 가장 작은 곳을 먼저 고르고 싶지만, 그 선택을 곧바로 최종 경로에 넣으면 이후에 사용하지 못한 티켓이 남는 막다른 상황을 처리하기 어렵습니다.

이를 해결하기 위해 Hierholzer 알고리즘을 사용합니다.

1. 출발지별 도착지 배열을 만듭니다.
2. 각 도착지 배열을 사전순 역순으로 정렬합니다.
3. DFS에서 현재 공항의 도착지 배열에서 `pop()`을 반복해 사전순으로 가장 작은 티켓부터 사용합니다.
4. 현재 공항에서 더 이상 쓸 티켓이 없으면 그 공항을 결과 배열에 넣습니다.
5. DFS가 끝난 뒤 결과 배열을 뒤집으면 실제 여행 경로가 됩니다.

역순 정렬 후 `pop()`을 쓰는 이유는 배열의 앞에서 꺼내는 `shift()`보다 효율적으로 티켓을 제거하기 위해서입니다. 도착지를 `['ATL', 'SFO']`처럼 사전순으로 쓰고 싶다면 내부 배열을 `['SFO', 'ATL']`로 보관하고 뒤에서 꺼내면 됩니다.

예를 들어 `ICN`에서 `ATL`, `SFO`로 갈 수 있다면 `ATL`을 먼저 사용합니다. 하지만 정답 배열에는 바로 넣지 않고, 그 경로에서 더 이상 진행할 수 없을 때 뒤쪽부터 확정합니다. 이렇게 하면 중간에 사이클이나 막다른 분기가 있어도 모든 티켓을 빠짐없이 소모한 뒤 올바른 순서로 경로가 복원됩니다.

시간 복잡도는 티켓 수를 `n`이라고 할 때 정렬에 `O(n log n)`, DFS 간선 소비에 `O(n)`이 걸립니다.
