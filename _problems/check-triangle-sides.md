---
title: 삼각형을 만들 수 있는지 확인하기
slug: check-triangle-sides
track: today
difficulty: easy
topic: numeric-validation
tags:
  - daily
  - beginner
  - math
  - validation
  - sorting
order: 1262
function_name: canFormTriangle
time_limit_ms: 200
primaryMethod: sorted-sides-triangle-inequality
coreIdea: 세 변의 길이를 오름차순으로 정렬한 뒤 가장 짧은 두 변의 합이 가장 긴 변보다 큰지 확인해 삼각형 가능 여부를 판별한다
gimmick: 변의 길이가 0 이하이면 바로 false이고, 두 짧은 변의 합이 가장 긴 변과 같은 경우도 삼각형이 될 수 없다
starter_code: |
  function canFormTriangle(a, b, c) {
    return false;
  }
test_cases:
  - input: [3, 4, 5]
    output: true
  - input: [1, 2, 3]
    output: false
  - input: [7, 7, 7]
    output: true
  - input: [0, 4, 4]
    output: false
  - input: [10, 2, 7]
    output: false
---

## 문제 설명
세 정수 `a`, `b`, `c`가 주어집니다. 이 세 값을 각각 변의 길이로 사용해 **삼각형을 만들 수 있는지**를 반환하는 `canFormTriangle` 함수를 작성하세요.

삼각형이 되려면 모든 변의 길이가 양수여야 하며, 가장 긴 변의 길이는 나머지 두 변의 길이의 합보다 작아야 합니다.

## 제한사항
- `a`, `b`, `c`는 정수입니다.
- 각 값은 `0` 이상 `1,000,000` 이하입니다.
- 세 변으로 삼각형을 만들 수 있으면 `true`, 만들 수 없으면 `false`를 반환합니다.
- 두 짧은 변의 합이 가장 긴 변과 정확히 같으면 삼각형이 아니므로 `false`를 반환합니다.

## 예시
- 입력: `a = 3`, `b = 4`, `c = 5` → 출력: `true`
- 입력: `a = 1`, `b = 2`, `c = 3` → 출력: `false`
- 입력: `a = 7`, `b = 7`, `c = 7` → 출력: `true`
- 입력: `a = 0`, `b = 4`, `c = 4` → 출력: `false`

## 힌트
- 세 수를 오름차순으로 정렬하면 가장 긴 변을 쉽게 찾을 수 있습니다.
- 가장 짧은 두 변의 합이 가장 긴 변보다 커야 합니다.
- 길이가 `0`인 변이 있으면 삼각형을 만들 수 없습니다.

## 해설
삼각형을 만들 수 있는지 확인할 때는 세 변을 모두 복잡하게 비교할 필요가 없습니다.

세 변을 오름차순으로 정렬해 `[x, y, z]`라고 하면 `z`가 가장 긴 변입니다. 이때 삼각형이 되려면 다음 조건을 만족해야 합니다.

- `x > 0`
- `x + y > z`

예를 들어 `3, 4, 5`는 정렬해도 `[3, 4, 5]`이고 `3 + 4 > 5`이므로 삼각형을 만들 수 있습니다.

반대로 `1, 2, 3`은 `1 + 2 = 3`입니다. 두 짧은 변을 이어도 가장 긴 변과 같은 길이밖에 되지 않으므로 실제 삼각형을 만들 수 없습니다.

풀이 흐름은 다음과 같습니다.

1. 세 값을 배열에 담아 오름차순으로 정렬합니다.
2. 가장 작은 값이 `0` 이하라면 `false`를 반환합니다.
3. 가장 짧은 두 변의 합이 가장 긴 변보다 큰지 확인합니다.
4. 조건을 만족하면 `true`, 아니면 `false`를 반환합니다.

정렬하는 값이 항상 3개뿐이므로 시간과 공간 사용은 사실상 상수입니다.
