---
title: 교대로 깜빡이는 신호인지 확인하기
slug: check-alternating-signal
track: today
difficulty: easy
topic: alternation-check
tags:
  - daily
  - beginner
  - string
  - pattern
  - adjacency
order: 41
function_name: isAlternatingSignal
time_limit_ms: 200
primaryMethod: adjacent-pair-validation
coreIdea: 문자열을 왼쪽부터 한 번 순회하며 인접한 두 문자가 같은 순간이 있는지만 확인해 교대 패턴 여부를 판별한다
gimmick: 시작 문자가 무엇인지는 상관없고 길이가 0 또는 1인 문자열도 자동으로 교대 패턴으로 본다
starter_code: |
  function isAlternatingSignal(signal) {
    return false;
  }
test_cases:
  - input: ["RGRG"]
    output: true
  - input: ["RRGG"]
    output: false
  - input: ["B"]
    output: true
  - input: [""]
    output: true
  - input: ["XYXYX"]
    output: true
  - input: ["ABBA"]
    output: false
---
## 문제 설명
문자열 `signal`이 주어질 때, **인접한 두 문자가 항상 서로 다르면** `true`, 하나라도 같으면 `false`를 반환하는 `isAlternatingSignal` 함수를 작성하세요.

예를 들어 `"RGRG"`는 매번 다른 문자가 이어지므로 `true`입니다. 반면 `"RRGG"`는 맨 앞의 `R` 두 개가 연속으로 같으므로 `false`입니다.

## 제한사항
- `signal`의 길이는 `0` 이상 `100,000` 이하입니다.
- `signal`은 영문 대문자로만 이루어집니다.
- 시작 문자는 무엇이든 상관없습니다.
- 반환값은 교대 패턴이면 `true`, 아니면 `false`입니다.

## 예시
- 입력: `"RGRG"` → 출력: `true`
- 입력: `"RRGG"` → 출력: `false`
- 입력: `"B"` → 출력: `true`
- 입력: `""` → 출력: `true`

## 힌트
- 문자열 전체 패턴을 미리 정해 둘 필요는 없습니다.
- 현재 문자와 바로 앞 문자만 비교해도 충분합니다.
- 같은 문자가 연속으로 한 번이라도 나오면 바로 답을 낼 수 있습니다.

## 해설
이 문제의 핵심은 **인접한 문자끼리만 검사하면 된다**는 점입니다.

문자열이 교대로 이루어졌는지 확인하려면, 각 위치에서 바로 이전 문자와 현재 문자만 비교하면 됩니다.

1. 인덱스 `1`부터 문자열 끝까지 순회합니다.
2. `signal[i]`와 `signal[i - 1]`를 비교합니다.
3. 두 문자가 같으면 교대 패턴이 깨졌으므로 즉시 `false`를 반환합니다.
4. 끝까지 같은 인접 쌍이 없으면 `true`를 반환합니다.

예를 들어 `"XYXYX"`는:
- `X`와 `Y` 다름
- `Y`와 `X` 다름
- `X`와 `Y` 다름
- `Y`와 `X` 다름

따라서 `true`입니다.

반대로 `"ABBA"`는:
- `A`와 `B` 다름
- `B`와 `B` 같음 → 즉시 `false`

이 방식은 문자열을 한 번만 보므로 시간 복잡도는 `O(n)`이고, 추가 공간은 거의 쓰지 않아 `O(1)`입니다.
