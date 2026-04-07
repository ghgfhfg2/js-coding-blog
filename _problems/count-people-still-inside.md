---
title: 토글 출입 기록 뒤 남아 있는 사람 수
slug: count-people-still-inside
track: today
difficulty: easy
topic: set
tags:
  - daily
  - beginner
  - set
  - toggle
  - counting
order: 24
function_name: solution
time_limit_ms: 200
primaryMethod: set-toggle-membership
coreIdea: 현재 안에 있는 사람만 Set으로 관리하며 이름이 다시 나오면 제거하고 처음 나오면 추가해 마지막 남은 인원 수를 구한다
gimmick: 각 사람의 정확한 출입 상태 전부를 저장할 필요 없이 등장 횟수의 홀짝성만 추적하면 된다
starter_code: |
  function solution(records) {
    return 0;
  }
test_cases:
  - input: [["mina", "jun", "mina", "sora", "jun"]]
    output: 1
  - input: [["a", "b", "a", "b"]]
    output: 0
  - input: [["neo"]]
    output: 1
  - input: [[]]
    output: 0
  - input: [["ki", "ki", "ki", "ha", "ha", "po"]]
    output: 2
---
출입 기록 배열 `records`가 주어집니다. 같은 이름이 기록에 나타날 때마다 상태가 **입장 ↔ 퇴장**으로 토글된다고 할 때, 마지막에 안에 남아 있는 사람 수를 반환하세요.

## 제한사항
- `records`의 길이는 `0` 이상 `100,000` 이하입니다.
- 각 원소는 길이 `1` 이상 `20` 이하의 문자열입니다.
- 이름은 대소문자를 구분합니다.
- 어떤 이름이 한 번 등장하면 입장, 두 번 등장하면 다시 퇴장, 세 번 등장하면 다시 입장한 것으로 봅니다.
- 반환값은 마지막에 안에 남아 있는 사람의 수입니다.

## 예시
- 입력: `["mina", "jun", "mina", "sora", "jun"]` → 출력: `1`
- 입력: `["a", "b", "a", "b"]` → 출력: `0`
- 입력: `["ki", "ki", "ki", "ha", "ha", "po"]` → 출력: `2`

## 힌트
- 현재 안에 있는 사람만 모아 두면 됩니다.
- 어떤 이름이 다시 나오면 그 이름을 제거하고, 처음 나오면 추가해 보세요.

## 해설
이 문제는 각 사람의 **등장 횟수의 홀짝성**만 중요합니다.

- 홀수 번 등장한 이름은 마지막에 안에 남아 있습니다.
- 짝수 번 등장한 이름은 마지막에 밖에 있습니다.

그래서 현재 안에 있는 사람만 `Set`으로 관리하면 깔끔하게 풀 수 있습니다.

1. 기록을 앞에서부터 하나씩 봅니다.
2. 이름이 이미 `Set`에 있으면 제거합니다. (`퇴장`)
3. 이름이 없으면 추가합니다. (`입장`)
4. 모든 기록을 처리한 뒤 `Set`의 크기를 반환합니다.

이 방식은 각 기록을 한 번씩만 처리하므로 시간 복잡도는 `O(n)`입니다.

```js
function solution(records) {
  const inside = new Set();

  for (const name of records) {
    if (inside.has(name)) {
      inside.delete(name);
    } else {
      inside.add(name);
    }
  }

  return inside.size;
}
```