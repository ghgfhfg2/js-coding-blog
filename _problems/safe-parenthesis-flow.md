---
title: 괄호 흐름이 끝까지 안전한지 확인하기
slug: safe-parenthesis-flow
track: today
difficulty: easy
topic: validation
tags:
  - daily
  - beginner
  - parentheses
  - validation
  - scan
order: 20
primaryMethod: balance-counter-scan
coreIdea: 문자열을 왼쪽부터 한 번 훑으며 여는 괄호는 카운터를 늘리고 닫는 괄호는 줄여서, 중간 음수 여부와 최종 0 여부로 올바른 괄호 흐름을 판정한다
gimmick: 스택 전체를 저장할 필요 없이 카운터가 음수가 되는 첫 순간 즉시 실패 처리할 수 있다는 점이 핵심이다
function_name: isBalancedFlow
time_limit_ms: 200
starter_code: |
  function isBalancedFlow(s) {
    // 여기에 코드를 작성하세요
    return false;
  }
test_cases:
  - input: ["(())()"]
    output: true
  - input: [")("]
    output: false
  - input: ["(()(()))"]
    output: true
  - input: ["(()"]
    output: false
  - input: [""]
    output: true
---
괄호 문자열 `s`가 주어질 때, 왼쪽부터 읽어 가며 한 번도 잘못 닫히지 않고 마지막에 정확히 모두 닫히는지 확인하세요.

정상적인 괄호 흐름이면 `true`, 아니면 `false`를 반환하세요.

## 제한사항
- `s`는 `(` 와 `)` 로만 이루어진 문자열입니다.
- `0 <= s.length <= 100000`
- 중간 과정에서 닫는 괄호가 더 많아지는 순간이 있으면 올바른 흐름이 아닙니다.
- 모든 문자를 읽은 뒤 열린 괄호가 남아 있어도 올바른 흐름이 아닙니다.

## 예시
- 입력: `"(())()"` → 출력: `true`
- 입력: `")("` → 출력: `false`
- 입력: `"(()"` → 출력: `false`

## 힌트
- 현재까지 열려 있는 괄호 수만 추적해도 됩니다.
- 어느 시점이든 그 수가 음수가 되면 바로 실패입니다.
- 문자열을 끝까지 본 뒤 그 수가 `0`인지 확인해 보세요.

## 해설
이 문제는 스택을 직접 만들지 않아도 풀 수 있습니다. 괄호 종류가 한 가지뿐이기 때문입니다.

1. 카운터를 `0`으로 시작합니다.
2. `(` 를 만나면 `+1` 합니다.
3. `)` 를 만나면 `-1` 합니다.
4. 순회 도중 카운터가 음수가 되면, 아직 열리지도 않은 괄호를 먼저 닫았다는 뜻이므로 즉시 `false`입니다.
5. 순회가 끝난 뒤 카운터가 `0`이면 정확히 모두 닫힌 것이고, 아니면 열린 괄호가 남아 있으므로 `false`입니다.

예를 들어 `"(())()"` 는 카운터 흐름이 `1 → 2 → 1 → 0 → 1 → 0` 이라서 정상입니다. 반면 `")("` 는 첫 글자에서 바로 `-1` 이 되어 실패합니다.

이 방식은 문자열을 한 번만 훑으므로 시간 복잡도는 `O(n)`이고, 추가 공간은 카운터 하나만 써서 `O(1)`입니다.
