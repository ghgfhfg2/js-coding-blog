---
title: 목표 거리까지 가는 최소 충전 횟수
slug: minimum-refuel-stops-to-target
track: today
difficulty: hard
topic: refuel-greedy
tags:
  - daily
  - hard
  - greedy
  - heap
  - priority-queue
  - refuel
  - retroactive-choice
order: 43
function_name: solution
time_limit_ms: 600
primaryMethod: max-heap-retroactive-refuel
coreIdea: 현재 연료로 갈 수 있는 충전소들의 연료량만 최대 힙에 모아 두고 더 이상 전진할 수 없는 순간마다 지금까지 지나온 충전소 중 가장 많은 연료를 주는 곳을 선택해 최소 충전 횟수로 목표 거리에 도달한다
gimmick: 충전할 시점을 미리 정하지 않고 막히는 순간에만 지나온 충전소 중 최댓값을 꺼내는 역선택 greedy가 핵심이며, 도착 지점을 연료 0인 마지막 충전소처럼 함께 처리하면 구현이 깔끔해진다
starter_code: |
  function solution(target, startFuel, stations) {
    return 0;
  }
test_cases:
  - input: [100, 10, [[10, 60], [20, 30], [30, 30], [60, 40]]]
    output: 2
  - input: [100, 1, [[10, 100]]]
    output: -1
  - input: [100, 100, []]
    output: 0
  - input: [120, 25, [[25, 25], [50, 25], [75, 25], [100, 25]]]
    output: 4
  - input: [150, 40, [[20, 20], [30, 60], [60, 30], [90, 40], [120, 30]]]
    output: 3
---
## 문제 설명
목표 거리 `target`, 시작 연료 `startFuel`, 그리고 충전소 정보 `stations`가 주어집니다.

각 충전소는 `[position, fuel]` 형태이며, 시작점에서 `position`만큼 떨어진 곳에 있고 도착하면 `fuel`만큼 연료를 모두 얻을 수 있습니다.
차는 연료 1로 거리 1을 이동하며, 연료가 음수가 될 수는 없습니다.

목표 지점까지 도달하기 위해 필요한 **최소 충전 횟수**를 반환하는 `solution` 함수를 작성하세요. 도달할 수 없으면 `-1`을 반환합니다.

충전소를 지나칠 수는 있지만, 이미 지나친 충전소로 되돌아갈 수는 없습니다.

## 제한사항
- `1 <= target <= 1000000000`
- `0 <= startFuel <= 1000000000`
- `0 <= stations.length <= 100000`
- `stations[i] = [position, fuel]`
- `1 <= position < target`
- `1 <= fuel <= 1000000000`
- `stations`는 `position` 기준 오름차순으로 주어집니다.
- 목표 지점에 도달하면 종료합니다.
- 반환값은 최소 충전 횟수이며, 불가능하면 `-1`입니다.

## 예시
- 입력: `target = 100`, `startFuel = 10`, `stations = [[10, 60], [20, 30], [30, 30], [60, 40]]` → 출력: `2`
- 입력: `target = 100`, `startFuel = 1`, `stations = [[10, 100]]` → 출력: `-1`
- 입력: `target = 100`, `startFuel = 100`, `stations = []` → 출력: `0`

첫 번째 예시에서는:
- 시작 연료 10으로 위치 10까지 간 뒤 60을 얻을 수 있습니다.
- 이후 위치 20, 30의 충전소도 지나며 후보로 볼 수 있지만, 실제로 막히는 순간에는 지금까지 본 충전소 중 가장 큰 연료를 선택하는 것이 유리합니다.
- 최소 2번 충전하면 100에 도달할 수 있습니다.

## 힌트
- 지금 당장 충전할지 말지를 매 충전소에서 결정하려고 하면 복잡해집니다.
- 대신 **현재 연료로 도달 가능한 충전소들**의 연료량만 모아 두세요.
- 더 이상 다음 지점으로 갈 수 없는 순간이 오면, 그동안 지나온 충전소 중 가장 많은 연료를 주는 곳을 선택하는 방식이 최소 횟수와 잘 맞습니다.
- 최대값을 반복해서 꺼내야 하므로 최대 힙이 잘 어울립니다.

## 해설
이 문제의 핵심은 **충전 결정을 미루다가 정말 필요할 때 가장 큰 연료를 선택하는 것**입니다.

충전소를 만날 때마다 즉시 충전할 필요는 없습니다. 중요한 것은, 현재까지 지나온 충전소들 중 어떤 곳에서 연료를 받을 수 있었는지입니다.

### 왜 큰 연료부터 꺼내야 할까?
막히는 순간이 왔다는 것은 현재 연료만으로는 다음 충전소나 목표 지점에 갈 수 없다는 뜻입니다.
이때 이미 지나온 충전소들 중 하나를 골라 충전해야 한다면, 같은 1번 충전으로 가장 멀리 갈 수 있게 해 주는 **가장 큰 연료량**을 선택하는 것이 항상 유리합니다.

즉,
1. 현재 연료로 도달 가능한 충전소는 전부 후보에 넣습니다.
2. 다음 지점으로 갈 수 없으면 후보 중 가장 큰 연료를 꺼내 충전합니다.
3. 이 과정을 목표 지점에 도달할 때까지 반복합니다.

### 구현 아이디어
도착 지점 `target`도 연료량이 0인 가상의 마지막 충전소처럼 생각하면 편합니다.

예를 들어 `stations + [[target, 0]]`를 순서대로 보면서:
- 이전 위치에서 현재 위치까지 이동하는 데 필요한 연료를 계산합니다.
- 연료가 부족하면, 최대 힙에서 가장 큰 연료를 꺼내 충전합니다.
- 힙이 비어 있는데도 부족하면 도달 불가능이므로 `-1`입니다.
- 현재 위치까지 도착했다면, 이 충전소의 연료를 힙에 넣고 다음으로 갑니다.

### 시간 복잡도
- 각 충전소는 힙에 한 번 들어갑니다.
- 필요할 때 힙에서 꺼내는 연산도 최대 한 번씩입니다.
- 따라서 전체 시간 복잡도는 `O(n log n)`입니다.
- 추가 공간은 힙 때문에 `O(n)`입니다.

### 구현 예시
```js
function solution(target, startFuel, stations) {
  const points = [...stations, [target, 0]];
  const heap = [];

  const push = (value) => {
    heap.push(value);
    let index = heap.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (heap[parent] >= heap[index]) break;
      [heap[parent], heap[index]] = [heap[index], heap[parent]];
      index = parent;
    }
  };

  const pop = () => {
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();

    const top = heap[0];
    heap[0] = heap.pop();
    let index = 0;

    while (true) {
      let largest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < heap.length && heap[left] > heap[largest]) {
        largest = left;
      }

      if (right < heap.length && heap[right] > heap[largest]) {
        largest = right;
      }

      if (largest === index) break;
      [heap[index], heap[largest]] = [heap[largest], heap[index]];
      index = largest;
    }

    return top;
  };

  let fuel = startFuel;
  let previous = 0;
  let refuels = 0;

  for (const [position, amount] of points) {
    fuel -= position - previous;

    while (fuel < 0) {
      const extra = pop();
      if (extra === null) return -1;
      fuel += extra;
      refuels += 1;
    }

    push(amount);
    previous = position;
  }

  return refuels;
}
```

이 풀이의 포인트는 **충전소를 지날 때 결정하지 않고, 막히는 순간마다 지나온 후보 중 최선 하나를 역으로 고르는 것**입니다. 이 관점으로 바꾸면 최소 충전 횟수를 자연스럽게 구할 수 있습니다.
