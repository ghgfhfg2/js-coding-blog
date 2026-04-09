---
title: 원형 진열대에서 가장 긴 중복 없는 구간
slug: longest-unique-circular-streak
track: today
difficulty: medium
topic: circular-sliding-window
tags:
  - daily
  - medium
  - sliding-window
  - circular-array
  - hash-set
  - two-pointers
order: 34
function_name: solution
time_limit_ms: 300
primaryMethod: doubled-array-two-pointers-unique-window
coreIdea: 원형 배열을 두 번 이어 붙인 것처럼 보면서 길이가 n을 넘지 않는 투 포인터 윈도우를 유지하고 중복 상품이 생기면 왼쪽을 줄여 가장 긴 중복 없는 연속 구간 길이를 구한다
gimmick: 원형이라는 이유로 배열을 무한히 돌 수는 없으므로 윈도우 길이를 원래 배열 길이 이하로 강제로 제한해야 한다
starter_code: |
  function solution(products) {
    return 0;
  }
test_cases:
  - input: [["A", "B", "C", "A"]]
    output: 3
  - input: [["apple", "banana", "apple", "orange"]]
    output: 3
  - input: [["x", "x", "x"]]
    output: 1
  - input: [["p", "q", "r", "s"]]
    output: 4
  - input: [["solo"]]
    output: 1
---
같은 상품명이 다시 나오기 전까지, 원형 진열대를 따라 연속으로 볼 수 있는 가장 긴 구간 길이를 구하는 문제입니다.

## 문제 설명
상품명이 순서대로 담긴 배열 `products`가 주어집니다. 이 배열은 **원형 진열대**를 나타내므로, 마지막 다음에는 다시 첫 번째 상품으로 이어집니다.

이때, 진열대를 따라 **연속해서 이동하며 본 상품들 중 같은 이름이 두 번 이상 나오지 않는 가장 긴 구간의 길이**를 반환하는 `solution` 함수를 작성하세요.

단, 한 바퀴를 넘겨 같은 칸을 두 번 이상 세는 것은 허용하지 않으므로, 선택한 구간의 길이는 `products.length`를 초과할 수 없습니다.

예를 들어 `products = ["A", "B", "C", "A"]`라면, 원형으로 이어 보더라도 `A`가 두 번 등장하는 순간 더 이상 포함할 수 없으므로 중복 없는 최장 구간 길이는 `3`입니다.

## 제한사항
- `1 <= products.length <= 200,000`
- 각 상품명은 길이 1 이상 20 이하의 문자열입니다.
- 상품명은 대소문자를 구분합니다.
- 배열은 원형으로 이어져 있습니다.
- 선택한 연속 구간의 길이는 `products.length`를 넘을 수 없습니다.

## 예시
- 입력: `["A", "B", "C", "A"]` → 출력: `3`
- 입력: `["apple", "banana", "apple", "orange"]` → 출력: `3`
- 입력: `["x", "x", "x"]` → 출력: `1`
- 입력: `["p", "q", "r", "s"]` → 출력: `4`

두 번째 예시에서는 `banana → apple → orange` 길이 3 구간이 가능하지만, 그보다 길게 가면 `apple`이 다시 등장해 중복이 생깁니다.

## 힌트
- 원형 배열은 시작점을 모든 위치로 바꿔 보려 하면 비효율적입니다.
- 배열을 두 번 이어 붙인 것처럼 생각하면 원형 구간을 일반 연속 구간처럼 다룰 수 있습니다.
- 다만 윈도우 길이가 원래 배열 길이보다 길어지면 한 바퀴를 넘긴 것이므로 허용하면 안 됩니다.
- 현재 윈도우 안에서 상품이 중복되지 않게 관리하면 됩니다.

## 해설
이 문제는 **원형 배열 + 중복 없는 최장 연속 구간** 문제입니다.

원형이라는 점만 빼면, 일반 배열에서 중복 없는 가장 긴 부분 배열을 찾는 전형적인 슬라이딩 윈도우 문제와 비슷합니다. 문제는 구간이 배열 끝을 넘어 앞부분으로 이어질 수 있다는 점입니다.

이를 처리하는 쉬운 방법은 배열을 실제로 두 번 복사하지 않더라도, 인덱스를 `0`부터 `2n - 1`까지 움직이며 `products[index % n]`로 접근해 **배열을 두 번 이어 붙인 것처럼** 보는 것입니다.

그다음 투 포인터 윈도우를 유지합니다.

- 오른쪽 포인터를 한 칸씩 늘리며 새 상품을 포함합니다.
- 이미 윈도우 안에 같은 상품이 있다면, 중복이 사라질 때까지 왼쪽 포인터를 줄입니다.
- 또한 윈도우 길이가 `n`을 넘으면 한 바퀴를 초과한 것이므로 왼쪽 포인터를 줄여 길이를 다시 `n` 이하로 맞춥니다.
- 각 단계에서 가능한 최대 길이를 갱신합니다.

왜 이 방식이 맞을까요?

- 원형에서 가능한 모든 연속 구간은, 길이 `n` 이하라는 조건만 붙이면 `products + products` 위의 어떤 연속 구간으로 표현할 수 있습니다.
- 따라서 두 배 길이 구간만 훑어도 원형 구간 후보를 모두 확인할 수 있습니다.
- 각 상품은 윈도우에 들어오고 나가는 일이 많아야 한 번씩이므로 전체 시간 복잡도는 `O(n)`입니다.

예를 들어 `products = ["A", "B", "C", "A"]`를 보겠습니다.

- `A, B, C`까지는 모두 달라 길이 3
- 다음 `A`를 넣으면 처음 `A`와 중복되므로 왼쪽을 줄여 중복을 없앱니다.
- 원형으로 이어지는 구간까지 모두 확인해도 `A`를 두 번 포함하지 않는 최장 길이는 3입니다.

구현에서는 `Set`으로 현재 윈도우에 있는 상품을 관리하면 직관적으로 풀 수 있습니다.

```js
function solution(products) {
  const n = products.length;
  const seen = new Set();
  let left = 0;
  let answer = 0;

  for (let right = 0; right < n * 2; right += 1) {
    const current = products[right % n];

    while (seen.has(current) || right - left + 1 > n) {
      seen.delete(products[left % n]);
      left += 1;
    }

    seen.add(current);
    answer = Math.max(answer, right - left + 1);
  }

  return answer;
}
```

이 방식은 길이 제한과 중복 제거를 동시에 처리하므로, 큰 입력도 충분히 빠르게 해결할 수 있습니다.
