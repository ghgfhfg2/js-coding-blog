---
title: 짝수 자리와 홀수 자리 합 비교하기
slug: compare-even-odd-position-sums
track: today
difficulty: easy
topic: index-parity-scan
tags:
  - daily
  - beginner
  - string
  - digit
  - parity
order: 145
function_name: solution
time_limit_ms: 200
primaryMethod: even-odd-index-accumulation
coreIdea: 숫자 문자열을 왼쪽부터 순회하며 0번 기준 짝수 인덱스와 홀수 인덱스의 숫자 합을 따로 누적한 뒤 두 합이 같은지 판별한다
gimmick: 자릿수의 홀짝이 아니라 문자열에서의 인덱스 홀짝을 기준으로 나누며 빈 문자열은 두 합이 모두 0이라 true다
starter_code: |
  function solution(code) {
    return false;
  }
test_cases:
  - input: ["121"]
    output: true
  - input: ["1234"]
    output: false
  - input: [""]
    output: true
  - input: ["0"]
    output: true
  - input: ["9090"]
    output: false
---
## 문제 설명
숫자로만 이루어진 문자열 `code`가 주어질 때, **0번 위치부터 센 짝수 인덱스의 숫자 합**과 **홀수 인덱스의 숫자 합**이 같으면 `true`, 다르면 `false`를 반환하는 `solution` 함수를 작성하세요.

예를 들어 `code = "121"`이면 짝수 인덱스 숫자는 `1`, `1`이고 합은 `2`입니다. 홀수 인덱스 숫자는 `2`이고 합도 `2`이므로 `true`를 반환합니다.

## 제한사항
- `code`는 숫자 문자(`0`~`9`)로만 이루어진 문자열입니다.
- `code`의 길이는 0 이상 100,000 이하입니다.
- 인덱스는 문자열의 맨 왼쪽을 `0`번으로 봅니다.
- 빈 문자열은 짝수 인덱스 합과 홀수 인덱스 합이 모두 `0`이므로 `true`를 반환합니다.
- 반환값은 불리언(`true` 또는 `false`)입니다.

## 예시
- 입력: `"121"` → 출력: `true`
- 입력: `"1234"` → 출력: `false`
- 입력: `""` → 출력: `true`

## 힌트
- 문자열을 왼쪽부터 한 글자씩 확인해 보세요.
- 현재 위치 `i`가 짝수인지 홀수인지에 따라 다른 합계에 더하면 됩니다.
- 숫자 문자는 `Number(code[i])`처럼 숫자로 바꿀 수 있습니다.

## 해설
이 문제는 숫자의 값이 짝수인지 홀수인지 보는 문제가 아니라, **문자가 놓인 위치의 인덱스가 짝수인지 홀수인지**를 구분하는 문제입니다.

풀이 흐름은 다음과 같습니다.

1. 짝수 인덱스 합 `evenSum`과 홀수 인덱스 합 `oddSum`을 `0`으로 시작합니다.
2. 문자열 `code`를 앞에서부터 순회합니다.
3. 현재 인덱스가 짝수이면 현재 숫자를 `evenSum`에 더합니다.
4. 현재 인덱스가 홀수이면 현재 숫자를 `oddSum`에 더합니다.
5. 순회가 끝난 뒤 두 합이 같은지 비교해 반환합니다.

문자열을 한 번만 확인하면 되므로 시간 복잡도는 `O(n)`이고, 추가 공간은 상수만 사용합니다.
