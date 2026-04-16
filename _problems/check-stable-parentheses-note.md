---
title: 닫는 괄호가 앞서지 않는 올바른 기록
slug: check-stable-parentheses-note
track: today
difficulty: easy
topic: balance-check
tags:
  - daily
  - beginner
  - string
  - parentheses
  - validation
order: 50
function_name: solution
time_limit_ms: 200
primaryMethod: running-balance-no-negative
coreIdea: 문자열을 왼쪽부터 보며 여는 괄호는 1 늘리고 닫는 괄호는 1 줄이면서 중간에 음수가 되는지와 마지막 합계가 0인지 확인해 올바른 괄호열인지 판별한다
gimmick: 마지막 개수만 맞는다고 충분하지 않고 닫는 괄호가 먼저 나오는 순간 즉시 실패해야 하며 빈 문자열은 올바른 괄호열로 본다
starter_code: |
  function solution(record) {
    return false;
  }
test_cases:
  - input: ["(())()"]
    output: true
  - input: [")("]
    output: false
  - input: ["(()"]
    output: false
  - input: [""]
    output: true
  - input: ["())(()"]
    output: false
---
## 문제 설명
괄호 기록 문자열 `record`가 주어질 때, 이 문자열이 **올바른 괄호열**이면 `true`, 아니면 `false`를 반환하는 `solution` 함수를 작성하세요.

올바른 괄호열이란 다음 두 조건을 모두 만족하는 문자열입니다.

- 여는 괄호 `(` 와 닫는 괄호 `)` 의 개수가 같다.
- 문자열을 왼쪽부터 읽는 모든 순간에, 닫는 괄호의 개수가 여는 괄호보다 많아지지 않는다.

예를 들어 `"(())()"`는 올바르지만, `")("`와 `"(()"`는 올바르지 않습니다.

## 제한사항
- `record`의 길이는 0 이상 100,000 이하입니다.
- `record`는 `(` 와 `)` 로만 이루어집니다.
- 빈 문자열은 올바른 괄호열로 봅니다.
- 반환값은 불리언 값입니다.

## 예시
- 입력: `"(())()"` → 출력: `true`
- 입력: `")("` → 출력: `false`
- 입력: `"(()"` → 출력: `false`
- 입력: `""` → 출력: `true`

## 힌트
- 전체 개수만 세면 `")("` 같은 경우를 놓칠 수 있습니다.
- 문자열을 왼쪽부터 보면서 현재 열려 있는 괄호 수를 하나의 숫자로 관리해 보세요.
- 어떤 시점에 그 숫자가 음수가 되면 더 볼 필요 없이 실패입니다.

## 해설
이 문제의 핵심은 **현재까지 닫히지 않은 여는 괄호 개수**를 추적하는 것입니다.

문자를 왼쪽부터 보면서:

- `(` 를 만나면 열려 있는 괄호 수를 1 증가
- `)` 를 만나면 1 감소

시키면 됩니다.

하지만 마지막에 개수가 0인지 보는 것만으로는 부족합니다.
예를 들어 `")("`는 여는 괄호와 닫는 괄호 개수는 같지만, 첫 글자부터 닫는 괄호가 먼저 나와 올바른 괄호열이 아닙니다.

그래서 순회 도중에 열린 괄호 수가 음수가 되는 순간 바로 `false`를 반환해야 합니다.

풀이 순서는 다음과 같습니다.

1. `balance = 0`으로 시작합니다.
2. 문자열을 왼쪽부터 한 글자씩 확인합니다.
3. `(` 면 `balance += 1`, `)` 면 `balance -= 1` 합니다.
4. 중간에 `balance < 0` 이 되면 즉시 `false`를 반환합니다.
5. 끝까지 확인한 뒤 `balance === 0` 이면 `true`, 아니면 `false`를 반환합니다.

이 방식은 문자열을 한 번만 순회하므로 시간 복잡도는 `O(n)`입니다.
