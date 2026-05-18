---
title: XOR 값이 목표가 되는 연속 구간 개수
slug: count-xor-target-subarrays
track: today
difficulty: medium
topic: xor-prefix
tags:
  - daily
  - medium
  - array
  - bitwise-xor
  - prefix
  - hash-map
order: 1263
function_name: countXorTargetSubarrays
time_limit_ms: 300
primaryMethod: prefix-xor-frequency-map
coreIdea: 누적 XOR 값의 빈도를 해시 맵에 저장해 현재 누적값과 target을 만족시키는 이전 누적값 개수만큼 연속 구간을 한 번에 센다
gimmick: XOR은 같은 값을 두 번 적용하면 사라지는 성질이 있어 prefixXor ^ previousXor = target 조건을 previousXor = prefixXor ^ target으로 바꿔 찾는다
starter_code: |
  function countXorTargetSubarrays(nums, target) {
    return 0;
  }
test_cases:
  - input: [[4, 2, 2, 6, 4], 6]
    output: 4
  - input: [[1, 1, 1], 0]
    output: 2
  - input: [[0, 0, 0], 0]
    output: 6
  - input: [[5, 1, 5, 1], 4]
    output: 3
  - input: [[7], 7]
    output: 1
---
정수 배열에서 bitwise XOR 값이 `target`이 되는 연속 구간의 개수를 구하세요.

## 문제 설명
정수 배열 `nums`와 정수 `target`이 주어집니다.

연속된 하나 이상의 원소를 골랐을 때, 그 구간의 모든 값을 bitwise XOR 한 결과가 `target`과 같으면 유효한 구간입니다.

유효한 연속 구간의 총개수를 반환하는 `countXorTargetSubarrays` 함수를 작성하세요.

## 제한사항
- `1 <= nums.length <= 100,000`
- `0 <= nums[i] <= 1,000,000,000`
- `0 <= target <= 1,000,000,000`
- 구간은 비어 있을 수 없습니다.
- 반환값은 XOR 값이 `target`이 되는 연속 구간의 개수입니다.

## 예시
- 입력: `nums = [4, 2, 2, 6, 4]`, `target = 6` → 출력: `4`
- 입력: `nums = [1, 1, 1]`, `target = 0` → 출력: `2`
- 입력: `nums = [0, 0, 0]`, `target = 0` → 출력: `6`
- 입력: `nums = [5, 1, 5, 1]`, `target = 4` → 출력: `3`

## 힌트
- 구간 합 문제처럼, XOR도 누적값을 이용할 수 있습니다.
- `a ^ b = target`이라면 `b = a ^ target`으로 바꿔 생각할 수 있습니다.
- 현재 위치까지의 누적 XOR이 `prefix`일 때, 어떤 이전 누적 XOR이 있어야 현재까지의 구간 XOR이 `target`이 될까요?

## 해설
핵심은 모든 시작점과 끝점을 직접 비교하지 않는 것입니다.

`prefix[i]`를 `nums[0]`부터 `nums[i]`까지 XOR 한 값이라고 생각해 봅시다.
어떤 구간 `l..r`의 XOR 값은 `prefix[r] ^ prefix[l - 1]`로 표현할 수 있습니다.

이 값이 `target`이어야 하므로 다음 조건을 만족해야 합니다.

```js
prefix[r] ^ prefix[l - 1] === target
```

XOR은 같은 값을 양쪽에 다시 XOR 하면 사라지는 성질이 있으므로,
현재 누적 XOR을 `prefix`라고 할 때 필요한 이전 누적 XOR은 다음과 같습니다.

```js
needed = prefix ^ target
```

따라서 왼쪽부터 배열을 순회하며:
1. 현재 값을 누적 XOR에 반영합니다.
2. `prefix ^ target` 값이 이전에 몇 번 나왔는지 확인합니다.
3. 그 횟수만큼 정답에 더합니다.
4. 현재 `prefix`의 등장 횟수를 1 늘립니다.

처음부터 시작하는 구간도 세기 위해, 순회 전에는 누적 XOR `0`이 한 번 있었다고 기록합니다.

예를 들어 `nums = [4, 2, 2, 6, 4]`, `target = 6`이라면 조건을 만족하는 구간은 다음 4개입니다.

- `[4, 2]`
- `[2, 2, 6]`
- `[6]`
- `[2, 6, 4]`

`[0, 0, 0]`처럼 0이 많이 들어 있는 경우도 중요합니다.
XOR 값이 0인 구간은 여러 개가 겹쳐서 생길 수 있으므로, 단순히 값 하나만 확인하면 안 되고 누적 XOR의 **빈도**를 세야 합니다.

이 방법은 배열을 한 번만 순회하므로 시간 복잡도는 `O(n)`, 추가 공간은 서로 다른 누적 XOR 값 수에 따라 `O(n)`입니다.
