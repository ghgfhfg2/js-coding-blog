---
title: 세탁 예약을 처리하는 최소 기계 수
slug: minimum-laundry-machines
track: today
difficulty: medium
topic: interval-partition
tags:
  - daily
  - medium
  - heap
  - interval
  - scheduling
  - resource-allocation
order: 37
function_name: solution
time_limit_ms: 200
primaryMethod: min-heap-end-times
coreIdea: 예약 구간을 시작 시각 기준으로 정렬한 뒤 현재 사용 중인 기계들의 종료 시각을 최소 힙으로 관리하면 같은 기계를 재사용할 수 있는지 빠르게 판단하며 필요한 최소 기계 수를 구할 수 있다
gimmick: 어떤 예약의 시작 시각이 가장 빨리 끝나는 예약의 종료 시각과 같다면 같은 기계를 바로 이어서 재사용할 수 있다
starter_code: |
  function solution(bookings) {
    return 0;
  }
test_cases:
  - input: [["09:00-10:00", "09:20-10:30", "10:00-11:00", "10:10-10:40"]]
    output: 3
  - input: [["09:00-09:30", "09:30-10:00", "10:00-10:30"]]
    output: 1
  - input: [["12:00-12:30", "11:00-11:20", "11:10-12:10", "12:10-12:40"]]
    output: 2
  - input: [["08:00-09:00"]]
    output: 1
  - input: [[]]
    output: 0
---
## 문제 설명
세탁실 예약 목록 `bookings`가 주어집니다. 각 예약은 `"HH:MM-HH:MM"` 형식의 문자열이며, 하나의 기계는 한 번에 하나의 예약만 처리할 수 있습니다.

예약 시작 시각이 어떤 기계의 직전 예약 종료 시각과 **같거나 늦으면** 그 기계를 다시 사용할 수 있습니다.

모든 예약을 처리하기 위해 필요한 **최소 기계 수**를 반환하는 `solution` 함수를 작성하세요.

예를 들어 `['09:00-10:00', '09:20-10:30', '10:00-11:00', '10:10-10:40']`라면 어떤 시점에는 동시에 3개의 예약이 겹치므로 정답은 `3`입니다.

## 제한사항
- `bookings`의 길이는 `0` 이상 `100,000` 이하입니다.
- 각 예약 문자열은 항상 `"HH:MM-HH:MM"` 형식입니다.
- 시각은 같은 날 안에서만 주어집니다.
- 모든 예약은 `start < end`를 만족합니다.
- 입력 순서는 정렬되어 있지 않을 수 있습니다.
- 반환값은 모든 예약을 처리하는 데 필요한 최소 기계 수입니다.

## 예시
- 입력: `["09:00-10:00", "09:20-10:30", "10:00-11:00", "10:10-10:40"]` → 출력: `3`
- 입력: `["09:00-09:30", "09:30-10:00", "10:00-10:30"]` → 출력: `1`
- 입력: `["12:00-12:30", "11:00-11:20", "11:10-12:10", "12:10-12:40"]` → 출력: `2`
- 입력: `[]` → 출력: `0`

## 힌트
- 예약을 먼저 시작 시각 기준으로 정렬해 보세요.
- 지금 사용 중인 기계들 중에서 가장 빨리 비는 기계만 알면 충분합니다.
- 가장 빨리 끝나는 종료 시각을 빠르게 꺼내고 다시 넣을 수 있는 자료구조를 떠올려 보세요.

## 해설
핵심은 **지금 쓰고 있는 기계들 중 가장 빨리 끝나는 예약**만 빠르게 확인하면 된다는 점입니다.

풀이 흐름은 다음과 같습니다.

1. 모든 예약 문자열을 `(start, end)` 분 단위 숫자로 바꿉니다.
2. 예약을 `start` 오름차순으로 정렬합니다.
3. 최소 힙에는 현재 사용 중인 기계들의 **종료 시각**만 넣습니다.
4. 새 예약을 볼 때 힙의 최솟값이 현재 예약의 시작 시각 이하라면, 그 기계는 이미 비었으므로 재사용할 수 있습니다.
5. 재사용 가능한 기계가 있으면 힙에서 하나 꺼내고, 현재 예약의 종료 시각을 다시 넣습니다.
6. 힙 크기의 최댓값이 곧 필요한 최소 기계 수입니다.

왜 이 방식이 맞을까요?

- 시작 시각이 빠른 예약부터 처리하면, 그 시점까지 필요한 기계 수를 자연스럽게 추적할 수 있습니다.
- 여러 기계 중 무엇을 재사용할지 고민할 필요 없이, **가장 빨리 끝나는 기계**만 확인하면 됩니다.
- 그 기계도 아직 안 비었다면 다른 기계들은 더 늦게 비므로 새 기계가 반드시 필요합니다.

예를 들어 `09:00-10:00`, `09:20-10:30`, `10:00-11:00`, `10:10-10:40`를 순서대로 보면:

- `09:00-10:00` 배정 → 기계 1대 사용
- `09:20-10:30` 배정 → 기존 기계가 아직 안 비어 2대 필요
- `10:00-11:00` 배정 → `10:00`에 끝난 기계를 재사용 가능
- `10:10-10:40` 배정 → 남은 가장 빠른 종료가 `10:30`이라 아직 안 비어 3대 필요

따라서 정답은 `3`입니다.

```js
function solution(bookings) {
  if (bookings.length === 0) return 0;

  const times = bookings
    .map((booking) => {
      const [start, end] = booking.split('-');
      return [toMinutes(start), toMinutes(end)];
    })
    .sort((a, b) => a[0] - b[0]);

  const heap = [];
  let answer = 0;

  for (const [start, end] of times) {
    if (heap.length > 0 && heap[0] <= start) {
      popMin(heap);
    }

    pushMin(heap, end);
    answer = Math.max(answer, heap.length);
  }

  return answer;
}

function toMinutes(time) {
  const [hh, mm] = time.split(':').map(Number);
  return hh * 60 + mm;
}

function pushMin(heap, value) {
  heap.push(value);
  let index = heap.length - 1;

  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (heap[parent] <= heap[index]) break;
    [heap[parent], heap[index]] = [heap[index], heap[parent]];
    index = parent;
  }
}

function popMin(heap) {
  const min = heap[0];
  const last = heap.pop();

  if (heap.length > 0) {
    heap[0] = last;
    let index = 0;

    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < heap.length && heap[left] < heap[smallest]) {
        smallest = left;
      }

      if (right < heap.length && heap[right] < heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;
      [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
      index = smallest;
    }
  }

  return min;
}
```

정렬에 `O(n log n)`, 각 예약 처리에 힙 연산 `O(log n)`이 들어가므로 전체 시간 복잡도는 `O(n log n)`입니다.
