---
title: 같은 칸 수만큼 민 암호인지 확인하기
slug: uniform-alphabet-shift-check
track: today
difficulty: easy
topic: cyclic-shift-check
tags:
  - daily
  - beginner
  - string
  - alphabet
  - modulo
order: 47
function_name: isUniformAlphabetShift
time_limit_ms: 200
primaryMethod: single-offset-mod-check
coreIdea: 첫 글자에서 계산한 알파벳 이동 칸 수를 기준으로 모든 위치의 문자 쌍이 같은 순환 이동량을 가지는지 검사한다
gimmick: Z 다음은 다시 A로 이어지는 원형 알파벳 규칙을 써야 하며 빈 문자열 두 개는 이동 규칙을 깨지 않았으므로 true다
starter_code: |
  function isUniformAlphabetShift(source, target) {
    return false;
  }
test_cases:
  - input: ["ABC", "DEF"]
    output: true
  - input: ["AZ", "BA"]
    output: true
  - input: ["CAT", "DBU"]
    output: true
  - input: ["CAT", "DOG"]
    output: false
  - input: ["", ""]
    output: true
  - input: ["ZOO", "APP"]
    output: true
---
## 문제 설명
두 문자열 `source`와 `target`이 주어집니다.

`source`의 모든 글자를 **같은 칸 수만큼 앞으로 밀어서** `target`을 만들 수 있으면 `true`, 아니면 `false`를 반환하는 `isUniformAlphabetShift` 함수를 작성하세요.

알파벳은 원형처럼 이어집니다. 즉, `Z`를 한 칸 밀면 `A`가 됩니다.

예를 들어 `"ABC"`를 3칸 밀면 `"DEF"`가 되므로 `true`입니다. `"AZ"`를 1칸 밀면 `"BA"`가 되므로 이것도 `true`입니다.

## 제한사항
- `source`와 `target`의 길이는 서로 같습니다.
- 각 문자열의 길이는 `0` 이상 `100,000` 이하입니다.
- 문자열은 영문 대문자로만 이루어집니다.
- 모든 글자를 각각 다른 칸 수로 미는 것이 아니라, **한 번 정한 이동 칸 수를 전체 문자열에 똑같이 적용**해야 합니다.
- 반환값은 조건을 만족하면 `true`, 아니면 `false`입니다.

## 예시
- 입력: `source = "ABC"`, `target = "DEF"` → 출력: `true`
- 입력: `source = "AZ"`, `target = "BA"` → 출력: `true`
- 입력: `source = "CAT"`, `target = "DOG"` → 출력: `false`
- 입력: `source = ""`, `target = ""` → 출력: `true`

## 힌트
- 첫 번째 문자에서 몇 칸 이동했는지 먼저 구해 보세요.
- 그 뒤 나머지 문자들도 같은 이동 칸 수를 가지는지만 확인하면 됩니다.
- `Z` 다음이 `A`가 되므로 나머지 연산을 이용하면 편합니다.

## 해설
이 문제의 핵심은 **모든 위치에서 알파벳 이동량이 같아야 한다**는 점입니다.

1. 두 문자열이 모두 빈 문자열이면 이동 규칙을 어기지 않았으므로 `true`입니다.
2. 첫 글자 `source[0]`와 `target[0]` 사이의 이동 칸 수를 구합니다.
3. 문자열을 왼쪽부터 끝까지 순회합니다.
4. 각 위치마다 `(target의 알파벳 번호 - source의 알파벳 번호 + 26) % 26`을 계산합니다.
5. 이 값이 처음 구한 이동 칸 수와 한 번이라도 다르면 `false`를 반환합니다.
6. 끝까지 모두 같으면 `true`를 반환합니다.

예를 들어 `source = "AZ"`, `target = "BA"`이면:
- `A -> B` 는 1칸 이동
- `Z -> A` 도 원형으로 보면 1칸 이동

따라서 전체 문자열이 같은 칸 수만큼 밀린 경우이므로 `true`입니다.

반면 `source = "CAT"`, `target = "DOG"`이면:
- `C -> D` 는 1칸
- `A -> O` 는 14칸

이동량이 서로 다르므로 `false`입니다.

이 방식은 문자열을 한 번만 순회하므로 시간 복잡도는 `O(n)`이고, 추가 공간은 `O(1)`입니다.
