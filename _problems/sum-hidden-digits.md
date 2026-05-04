---
title: 숨어 있는 숫자 자리수 합계
slug: sum-hidden-digits
track: today
difficulty: easy
topic: digit-scan
tags:
  - daily
  - beginner
  - string
  - digits
  - summation
order: 1180
function_name: sumHiddenDigits
time_limit_ms: 200
primaryMethod: character-digit-check-accumulation
coreIdea: 문자열을 왼쪽부터 한 글자씩 보며 숫자 문자만 골라 각 자리값을 누적해 전체 합을 구한다
gimmick: 연속된 숫자도 하나의 큰 수로 묶지 않고 각 글자를 독립적인 자리수로 더하며 숫자가 하나도 없으면 0을 반환한다
starter_code: |
  function sumHiddenDigits(message) {
    return 0;
  }
test_cases:
  - input: ["a1b2c3"]
    output: 6
  - input: ["room404"]
    output: 8
  - input: ["no-digits-here"]
    output: 0
  - input: ["9z9z9"]
    output: 27
  - input: [""]
    output: 0
---
문자열 속에 섞여 있는 숫자 글자들만 찾아 모두 더하는 문제입니다.

## 문제 설명
문자열 `message`가 주어집니다.

이 문자열에는 영문자, 기호, 숫자 문자가 섞여 있을 수 있습니다.
숫자 문자 `'0'`부터 `'9'`까지만 골라 **각 자리수 값의 합**을 구해 반환하는 `sumHiddenDigits` 함수를 작성하세요.

예를 들어 `"a1b2c3"`이라면 숫자 글자는 `1`, `2`, `3`이고 합은 `6`입니다.

주의할 점은 `"404"`처럼 숫자가 연속되어 있어도 이를 `404`라는 하나의 수로 보지 않고,
`4 + 0 + 4`처럼 **각 글자를 따로 더한다**는 점입니다.

## 제한사항
- `message`의 길이는 `0` 이상 `100,000` 이하입니다.
- `message`는 영어 대소문자, 숫자 문자, 일반 기호를 포함할 수 있습니다.
- 숫자가 하나도 없으면 `0`을 반환합니다.
- 연속된 숫자도 하나의 정수로 묶지 않고 각 자리수를 따로 더합니다.

## 예시
- 입력: `message = "a1b2c3"` → 출력: `6`
- 입력: `message = "room404"` → 출력: `8`
- 입력: `message = "no-digits-here"` → 출력: `0`
- 입력: `message = "9z9z9"` → 출력: `27`

## 힌트
- 문자열을 한 글자씩 확인해 보세요.
- 현재 글자가 숫자인지만 판별하면 됩니다.
- 숫자 글자라면 실제 숫자 값으로 바꿔 합계에 더하면 됩니다.

## 해설
이 문제는 문자열을 한 번만 순회하면서 숫자 문자인 경우에만 합계에 더하면 해결됩니다.

핵심은 두 가지입니다.

1. 현재 문자가 숫자인지 판별한다.
2. 숫자라면 그 글자를 숫자 값으로 바꿔 누적한다.

예를 들어 `"room404"`를 보면
- `r`, `o`, `o`, `m`은 숫자가 아니므로 건너뜁니다.
- `4`, `0`, `4`는 숫자이므로 `4 + 0 + 4 = 8`을 더합니다.

따라서 정답은 `8`입니다.

이 방식은 문자열 전체를 한 번만 보므로 시간 복잡도는 `O(n)`이고, 추가 공간은 `O(1)`입니다.
