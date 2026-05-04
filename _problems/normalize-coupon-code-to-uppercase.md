---
title: 쿠폰 코드를 대문자로 통일하기
slug: normalize-coupon-code-to-uppercase
track: js-basic
difficulty: easy
topic: string-uppercase-methods
tags:
  - beginner
  - string
  - js-method
  - toUpperCase
  - normalization
order: 1140
function_name: normalizeCouponCodeToUppercase
time_limit_ms: 200
primaryMethod: String.toUpperCase
coreIdea: 쿠폰 코드 문자열을 toUpperCase로 모두 대문자로 바꿔 비교와 저장에 쓰기 쉬운 통일된 형태로 만든다
gimmick: 하이픈과 숫자는 그대로 두고 알파벳만 대문자로 바뀌므로 형식은 유지하면서 대소문자만 정리할 수 있다
starter_code: |
  function normalizeCouponCodeToUppercase(code) {
    return code;
  }
test_cases:
  - input: ["sale2026"]
    output: "SALE2026"
  - input: ["vip-Gold"]
    output: "VIP-GOLD"
  - input: ["SAVE-10"]
    output: "SAVE-10"
  - input: ["new member"]
    output: "NEW MEMBER"
---
쿠폰 코드 문자열을 `toUpperCase()`로 대문자로 통일하는 문제입니다.

## 오늘의 메서드
- `String.prototype.toUpperCase()`

## 메서드 설명
- `toUpperCase()`는 문자열 속 알파벳을 모두 대문자로 바꾼 새 문자열을 반환합니다.
- 원본 문자열을 직접 수정하지 않고, 변환된 결과를 새로 돌려줍니다.
- 쿠폰 코드처럼 대소문자를 통일해 비교하거나 저장할 때 자주 사용합니다.

## 기본 문법
```js
code.toUpperCase()
```

## 사용 예시
```js
"sale2026".toUpperCase() // "SALE2026"
"vip-Gold".toUpperCase() // "VIP-GOLD"
"SAVE-10".toUpperCase() // "SAVE-10"
```

## 주의할 점
- `toUpperCase()`는 **알파벳만** 대문자로 바꿉니다.
- 숫자, 공백, 하이픈 같은 문자는 그대로 유지됩니다.
- 원본 문자열이 바뀌는 것이 아니라 **새 문자열이 반환**됩니다.
- 이미 대문자인 글자는 그대로 유지됩니다.

## 제한사항
- `code`는 길이 `1` 이상 `50` 이하의 문자열입니다.
- `code`에는 알파벳 대소문자, 숫자, 공백, 하이픈이 들어갈 수 있습니다.
- 반환값은 `code`를 모두 대문자로 바꾼 문자열입니다.
- 숫자와 기호의 위치는 바뀌면 안 됩니다.

## 예시
- 입력: `code = "sale2026"` → 출력: `"SALE2026"`
- 입력: `code = "vip-Gold"` → 출력: `"VIP-GOLD"`
- 입력: `code = "SAVE-10"` → 출력: `"SAVE-10"`

## 힌트
- 문자열 전체를 한 번에 대문자로 바꾸는 메서드를 떠올려 보세요.
- 문자 하나씩 직접 비교해서 바꿀 필요는 없습니다.
- 숫자나 하이픈은 그대로 두어도 메서드가 알아서 처리해 줍니다.

## 해설
이 문제는 쿠폰 코드 문자열의 **대소문자만 통일**하면 됩니다.
알파벳을 하나씩 검사할 필요 없이 `toUpperCase()`를 호출하면 문자열 전체가 한 번에 대문자로 변환됩니다.

```js
function normalizeCouponCodeToUppercase(code) {
  return code.toUpperCase();
}
```

예를 들어 `"vip-Gold"`에 `toUpperCase()`를 적용하면 `"VIP-GOLD"`가 됩니다.
이때 하이픈(`-`)과 숫자는 그대로 남고, 소문자 알파벳만 대문자로 바뀝니다.

이 문제의 핵심 학습 포인트는 다음과 같습니다.
- **문자열 전체의 대소문자를 빠르게 통일할 때 `toUpperCase()`를 쓸 수 있다.**
- **문자열 메서드는 원본을 바꾸지 않고 새 문자열을 반환한다.**
- **숫자와 기호는 그대로 유지되고 알파벳만 변환된다.**

시간 복잡도는 문자열 길이를 `n`이라고 할 때 `O(n)`입니다. 주어진 제한에서는 충분히 빠르게 동작합니다.
