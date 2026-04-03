---
title: 알림 코드 접두사 확인하기
slug: check-alert-prefix
track: js-basic
difficulty: easy
topic: string-methods
tags:
  - beginner
  - string
  - js-method
  - startsWith
  - prefix
order: 9
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(code) {
    return false;
  }
test_cases:
  - input: ["ALERT-102"]
    output: true
  - input: ["INFO-77"]
    output: false
  - input: ["ALERT"]
    output: false
  - input: ["ALERT-system"]
    output: true
---

문자열 `code`가 주어질 때, 이 문자열이 `"ALERT-"`로 시작하면 `true`, 아니면 `false`를 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`startsWith()`는 문자열이 특정 접두사(prefix)로 시작하는지 빠르게 확인할 때 사용하는 메서드입니다.

## 메서드 설명
이 문제에서는 알림 코드가 `"ALERT-"`로 시작하는지 검사해야 합니다.
`startsWith()`를 사용하면 문자열 앞부분을 직접 잘라 비교하지 않아도, 원하는 시작 문자열과 일치하는지 바로 확인할 수 있습니다.

## 기본 문법
```js
str.startsWith(searchString)
```

## 사용 예시
```js
'ALERT-102'.startsWith('ALERT-') // true
'INFO-77'.startsWith('ALERT-') // false
'warning'.startsWith('wa') // true
```

## 주의할 점
- `startsWith()`는 대소문자를 구분합니다.
- 문자열이 완전히 같지 않아도, **시작 부분만 맞으면** `true`를 반환합니다.
- `"ALERT"`는 `"ALERT-"`로 시작하지 않으므로 `false`입니다.

## 제한사항
- `code`는 길이 1 이상 100 이하의 문자열입니다.
- `code`는 영문 대문자, 영문 소문자, 숫자, 하이픈(`-`)으로만 이루어져 있다고 가정합니다.
- 반환값은 불리언 값 `true` 또는 `false`입니다.

## 예시
- 입력: `"ALERT-102"` → 출력: `true`
- 입력: `"INFO-77"` → 출력: `false`
- 입력: `"ALERT"` → 출력: `false`

## 힌트
- 문자열의 맨 앞부분이 `"ALERT-"`인지 확인하면 됩니다.
- 앞에서 몇 글자를 직접 자르기보다, 문자열 시작 여부를 검사하는 메서드를 떠올려 보세요.

## 해설
이 문제는 문자열의 **접두사 검사**를 연습하는 문제입니다.

풀이 방법은 간단합니다.
1. 문자열 `code`에 대해 `startsWith('ALERT-')`를 호출합니다.
2. 결과로 나온 `true` 또는 `false`를 그대로 반환합니다.

예를 들어 `"ALERT-system"`은 앞부분이 `"ALERT-"`이므로 `true`입니다.
반면 `"INFO-77"`은 시작 문자열이 다르므로 `false`입니다.

이 문제의 학습 포인트는 문자열의 시작 패턴을 확인할 때 `startsWith()`를 쓰면 코드가 더 읽기 쉬워진다는 점입니다.
직접 앞부분을 잘라 비교하는 방식보다 의도가 더 분명하게 드러납니다.
