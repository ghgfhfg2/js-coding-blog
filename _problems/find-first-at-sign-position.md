---
title: 이메일에서 @ 위치 찾기
slug: find-first-at-sign-position
track: js-basic
difficulty: easy
topic: string-position-methods
tags:
  - beginner
  - string
  - js-method
  - indexOf
  - position
order: 1222
function_name: findAtSignPosition
time_limit_ms: 200
primaryMethod: String.indexOf
coreIdea: "이메일 문자열에서 @ 문자가 처음 나타나는 위치를 indexOf로 찾고 없으면 자동으로 -1을 반환받는다"
gimmick: "@가 여러 번 나와도 첫 번째 위치만 반환하며 맨 앞에 있으면 0이 정답이라 0과 -1을 헷갈리지 않는 것이 핵심이다"
starter_code: |
  function findAtSignPosition(email) {
    return email.indexOf('@');
  }
test_cases:
  - input: ["hello@example.com"]
    output: 5
  - input: ["no-at-sign"]
    output: -1
  - input: ["@start.com"]
    output: 0
  - input: ["name@@domain.com"]
    output: 4
---
이메일 문자열에서 `@` 문자가 처음 나타나는 위치를 찾아 반환하세요.

## 오늘의 메서드
- `String.indexOf()`

## 메서드 설명
- `indexOf()`는 문자열 안에서 특정 문자나 문자열이 **처음 등장하는 위치**를 찾을 때 사용합니다.
- 찾는 값이 없으면 `-1`을 반환합니다.

## 기본 문법
```js
str.indexOf(searchValue)
```

## 사용 예시
```js
'hello@example.com'.indexOf('@') // 5
'no-at-sign'.indexOf('@') // -1
```

## 주의할 점
- `indexOf()`는 **처음 찾은 위치만** 반환합니다.
- 찾는 문자가 없으면 `0`이 아니라 `-1`입니다.
- 문자열 인덱스는 **0부터 시작**합니다.

## 제한사항
- `email`은 길이 1 이상 100 이하의 문자열입니다.
- 반환값은 `@`의 첫 위치이며, 없으면 `-1`입니다.
- 대소문자는 이 문제와 관계없습니다.

## 예시
- 입력: `"hello@example.com"` → 출력: `5`
- 입력: `"no-at-sign"` → 출력: `-1`
- 입력: `"@start.com"` → 출력: `0`

## 힌트
- 문자열 전체를 직접 한 글자씩 비교하지 않아도 됩니다.
- `@`가 처음 나오는 위치를 바로 알려 주는 메서드를 떠올려 보세요.

## 해설
이 문제는 문자열 안에서 특정 문자의 위치를 찾는 가장 기본적인 연습입니다.

`email.indexOf('@')`를 사용하면 `@`가 처음 등장하는 인덱스를 바로 얻을 수 있습니다. 만약 `@`가 전혀 없다면 `indexOf()`는 자동으로 `-1`을 반환하므로 별도의 복잡한 처리도 필요하지 않습니다.

예를 들어 `"name@@domain.com"`에서는 `@`가 두 번 나오지만, `indexOf('@')`는 첫 번째 `@`의 위치인 `4`를 반환합니다. 그래서 "처음 위치 찾기" 문제에 잘 맞습니다.
