---
title: 멘토와 시간대를 최대한 많이 연결하기
slug: maximum-mentor-slot-matches
track: today
difficulty: hard
topic: bipartite-matching
tags:
  - daily
  - hard
  - graph
  - bipartite-matching
  - hopcroft-karp
  - augmenting-path
order: 1170
function_name: maximumMentorSlotMatches
time_limit_ms: 500
primaryMethod: hopcroft-karp-layered-augmenting-path
coreIdea: 멘토와 시간대를 양쪽 정점으로 보는 이분 그래프를 만들고 BFS로 최단 증가 경로 층을 만든 뒤 DFS로 여러 증가 경로를 한 번에 흘려 최대 매칭 수를 구한다
gimmick: 단순 DFS 증가 경로를 매번 하나씩 찾으면 큰 입력에서 느리므로 같은 길이의 증가 경로를 한 라운드에 여러 개 처리해 매칭을 빠르게 늘려야 한다
starter_code: |
  function maximumMentorSlotMatches(mentorCount, slotCount, availabilities) {
    return 0;
  }
test_cases:
  - input: [3, 3, [[0, 0], [0, 1], [1, 1], [2, 2]]]
    output: 3
  - input: [4, 3, [[0, 0], [1, 0], [1, 1], [2, 1], [3, 2]]]
    output: 3
  - input: [2, 2, [[0, 0], [0, 1], [1, 0]]]
    output: 2
  - input: [5, 4, []]
    output: 0
  - input: [6, 5, [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3], [3, 0], [3, 3], [4, 3], [4, 4], [5, 4]]]
    output: 5
---
각 멘토를 가능한 시간대 하나에만 배정하면서, **전체 배정 수를 최대로** 만드는 문제입니다.

## 문제 설명
멘토는 `0`번부터 `mentorCount - 1`번까지 있고,
시간대는 `0`번부터 `slotCount - 1`번까지 있습니다.

`availabilities`는 `[mentorIndex, slotIndex]` 형태의 배열이며,
해당 멘토가 그 시간대에 배정될 수 있음을 뜻합니다.

각 멘토는 **최대 한 개의 시간대**에만 배정할 수 있고,
각 시간대도 **최대 한 명의 멘토**만 받을 수 있습니다.

이때 가능한 배정 수의 최댓값을 반환하는 `maximumMentorSlotMatches` 함수를 작성하세요.

## 제한사항
- `1 <= mentorCount <= 20,000`
- `1 <= slotCount <= 20,000`
- `0 <= availabilities.length <= 200,000`
- 각 `availabilities[i]`는 `[mentorIndex, slotIndex]` 형태입니다.
- `0 <= mentorIndex < mentorCount`
- `0 <= slotIndex < slotCount`
- 같은 간선이 여러 번 들어올 수 있습니다. 중복이 있어도 결과는 동일해야 합니다.
- 반환값은 만들 수 있는 최대 매칭 수입니다.

## 예시
- 입력: `mentorCount = 3`, `slotCount = 3`, `availabilities = [[0, 0], [0, 1], [1, 1], [2, 2]]` → 출력: `3`
- 입력: `mentorCount = 4`, `slotCount = 3`, `availabilities = [[0, 0], [1, 0], [1, 1], [2, 1], [3, 2]]` → 출력: `3`
- 입력: `mentorCount = 5`, `slotCount = 4`, `availabilities = []` → 출력: `0`

## 힌트
- 멘토 집합과 시간대 집합이 서로 분리되어 있으므로 **이분 그래프 최대 매칭**으로 볼 수 있습니다.
- 이미 배정된 간선을 적절히 뒤집어 더 많은 배정을 만드는 **증가 경로** 개념이 핵심입니다.
- 큰 입력에서는 단순 DFS로 증가 경로를 하나씩 찾기보다, 같은 길이의 증가 경로를 묶어서 처리하는 방식이 유리합니다.

## 해설
이 문제는 전형적인 **이분 그래프 최대 매칭** 문제입니다.

왼쪽 정점을 멘토, 오른쪽 정점을 시간대로 두고,
`availabilities`의 각 쌍을 연결 가능한 간선으로 생각하면 됩니다.

목표는 서로 겹치지 않는 간선을 최대한 많이 고르는 것입니다.
즉,
- 한 멘토는 한 번만 사용
- 한 시간대도 한 번만 사용
이라는 조건을 만족하는 최대 간선 집합을 찾으면 됩니다.

가장 중요한 개념은 **증가 경로(augmenting path)** 입니다.
현재 매칭 상태에서
- 매칭되지 않은 멘토에서 시작해서
- 매칭되지 않은 시간대에서 끝나는
- 매칭 간선과 비매칭 간선이 번갈아 나타나는 경로를 찾으면,
그 경로의 간선 선택 여부를 뒤집어서 매칭 크기를 1 늘릴 수 있습니다.

단순한 DFS로 증가 경로를 매번 하나씩 찾는 방법도 가능하지만,
입력이 큰 경우 너무 느릴 수 있습니다.
그래서 **Hopcroft-Karp**를 사용합니다.

동작은 두 단계입니다.

1. **BFS**
   - 현재 매칭되지 않은 멘토들에서 시작해
   - 증가 경로의 최단 길이 층(layer)을 만듭니다.
   - 이번 라운드에서 어디까지 탐색할지 거리 정보를 구합니다.

2. **DFS**
   - BFS가 만든 층 정보를 따라가며
   - 서로 겹치지 않는 최단 증가 경로를 여러 개 찾습니다.
   - 한 라운드에 매칭을 여러 개 늘릴 수 있어 훨씬 빠릅니다.

예를 들어
`[[0, 0], [0, 1], [1, 1], [2, 2]]`라면
- `0 -> 0`
- `1 -> 1`
- `2 -> 2`
로 모두 배정 가능하므로 답은 `3`입니다.

반면 어떤 시간대에 여러 멘토가 몰리면,
누구를 어디에 배정해야 전체 개수가 최대가 되는지를 봐야 하므로
단순 greedy로는 안전하지 않습니다.

시간 복잡도는 Hopcroft-Karp 기준으로 대체로 `O(E * sqrt(V))`이며,
이 문제의 큰 입력 제한에서도 충분히 통과 가능한 방식입니다.
