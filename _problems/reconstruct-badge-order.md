---
title: 배지 추첨 순서 복원하기
slug: reconstruct-badge-order
track: today
difficulty: medium
topic: order-statistics
tags:
  - daily
  - medium
  - fenwick-tree
  - order-statistics
  - reconstruction
order: 1540
function_name: reconstructBadgeOrder
time_limit_ms: 400
primaryMethod: fenwick-kth-empty-slot-selection
coreIdea: 아직 남아 있는 배지 번호 중 몇 번째로 작은 번호를 고를지 나타내는 rank 배열을 보며 Fenwick Tree로 k번째 남은 번호를 빠르게 찾고 제거해 최종 순서를 복원한다
gimmick: rank는 원래 전체 배지 번호 기준이 아니라 매 단계에서 아직 제거되지 않은 번호들 사이의 0-based 순위이므로, 하나를 고른 뒤에는 이후 순위의 기준 집합이 줄어든다
starter_code: |
  function reconstructBadgeOrder(pickRanks) {
    return [];
  }
test_cases:
  - input: [[2, 0, 1, 0]]
    output: [3, 1, 4, 2]
  - input: [[0, 0, 0]]
    output: [1, 2, 3]
  - input: [[3, 2, 1, 0]]
    output: [4, 3, 2, 1]
  - input: [[1, 1, 1, 0]]
    output: [2, 3, 4, 1]
  - input: [[]]
    output: []
---

## 문제 설명
번호가 `1`부터 `n`까지 붙은 배지가 오름차순으로 놓여 있습니다.

배지를 하나씩 뽑아 새 줄을 만들 때, 배열 `pickRanks`의 `i`번째 값은 그 순간 아직 남아 있는 배지들 중 **0부터 세었을 때 몇 번째로 작은 배지**를 뽑는지를 뜻합니다.

모든 선택이 끝났을 때 만들어지는 배지 번호 순서를 반환하는 `reconstructBadgeOrder` 함수를 작성하세요.

예를 들어 `pickRanks = [2, 0, 1, 0]`이면 처음에는 `[1, 2, 3, 4]` 중 0-based 2번째인 `3`을 뽑습니다. 이후 남은 배지는 `[1, 2, 4]`이고, 0번째인 `1`을 뽑습니다. 최종 결과는 `[3, 1, 4, 2]`입니다.

## 제한사항
- `0 <= pickRanks.length <= 100000`
- `n = pickRanks.length`입니다.
- 각 단계 `i`에서 `0 <= pickRanks[i] < n - i`를 만족하는 입력만 주어집니다.
- 반환값은 선택된 배지 번호를 순서대로 담은 배열입니다.
- 단순히 배열에서 `splice`로 제거하는 풀이는 큰 입력에서 느릴 수 있습니다.

## 예시
- 입력: `pickRanks = [2, 0, 1, 0]` -> 출력: `[3, 1, 4, 2]`
- 입력: `pickRanks = [0, 0, 0]` -> 출력: `[1, 2, 3]`
- 입력: `pickRanks = [3, 2, 1, 0]` -> 출력: `[4, 3, 2, 1]`
- 입력: `pickRanks = [1, 1, 1, 0]` -> 출력: `[2, 3, 4, 1]`

## 힌트
- 남아 있는 배지는 1, 제거된 배지는 0으로 생각해 보세요.
- "남아 있는 배지 중 k번째"를 빠르게 찾으려면 누적 개수를 기준으로 이분 탐색할 수 있습니다.
- Fenwick Tree를 쓰면 특정 번호가 남아 있는지 갱신하고, 앞쪽에 남은 배지가 몇 개인지 빠르게 계산할 수 있습니다.

## 해설
매번 남아 있는 배지 배열에서 `pickRanks[i]`번째 원소를 직접 꺼내고 삭제하면, 중간 원소 삭제 때문에 최악의 경우 `O(n^2)` 시간이 걸립니다.

배지 번호 `1..n`을 모두 남아 있는 상태로 보고 Fenwick Tree에 각 위치의 값을 `1`로 저장합니다. 어떤 배지를 뽑으면 해당 번호 위치를 `0`으로 갱신합니다.

이제 `pickRanks[i]`가 `r`일 때 실제로 필요한 것은 남아 있는 배지 중 `r + 1`번째 번호입니다. Fenwick Tree의 누적합은 특정 번호 이하에 남아 있는 배지 개수를 뜻하므로, 누적합이 처음으로 `r + 1` 이상이 되는 가장 작은 번호를 찾으면 됩니다.

그 번호를 정답 배열에 넣고 Fenwick Tree에서 `-1`로 갱신하면 다음 단계의 순위 기준이 자동으로 줄어듭니다.

각 단계마다 Fenwick Tree 탐색과 갱신을 `O(log n)`에 수행하므로 전체 시간 복잡도는 `O(n log n)`, 공간 복잡도는 `O(n)`입니다.
