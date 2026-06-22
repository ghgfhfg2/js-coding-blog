---
title: 배송 코드를 뒤쪽 기호로 채우기
slug: pad-shipping-code-suffix
track: js-basic
difficulty: easy
topic: string-padding-methods
tags:
  - beginner
  - string
  - js-method
  - padEnd
  - formatting
order: 1520
function_name: padShippingCodeSuffix
time_limit_ms: 200
primaryMethod: String.padEnd
coreIdea: 배송 코드 문자열이 목표 길이보다 짧으면 padEnd로 뒤쪽에 지정한 기호를 붙여 일정한 길이로 맞춘다
gimmick: 이미 목표 길이 이상이면 자르지 않고 그대로 반환하며 채움 문자는 뒤쪽에만 추가해야 한다
starter_code: |
  function padShippingCodeSuffix(code, targetLength, fillChar) {
    return code;
  }
test_cases:
  - input: ["AB7", 6, "-"]
    output: "AB7---"
  - input: ["BOX", 3, "*"]
    output: "BOX"
  - input: ["Q", 4, "0"]
    output: "Q000"
  - input: ["DELIVERY", 5, "."]
    output: "DELIVERY"
---

## 문제 설명
배송 코드가 목표 길이보다 짧으면 뒤쪽에 기호를 붙여 같은 길이의 문자열로 만들어 반환하세요.

## 오늘의 메서드
- 오늘 배울 메서드는 `String.padEnd()`입니다.
- 문자열의 길이가 부족할 때 뒤쪽을 원하는 문자로 채우는 데 사용합니다.

## 메서드 설명
`padEnd()`는 문자열의 길이가 지정한 목표 길이에 도달할 때까지 문자열 뒤쪽에 채움 문자열을 붙입니다.

이미 문자열 길이가 목표 길이 이상이면 원본 문자열과 같은 값을 그대로 반환합니다.

## 기본 문법
```js
str.padEnd(targetLength, padString)
```

- `targetLength`: 만들고 싶은 최종 문자열 길이입니다.
- `padString`: 부족한 길이를 채울 문자열입니다.
- 반환값은 뒤쪽이 채워진 새 문자열입니다.

## 사용 예시
```js
"A7".padEnd(5, "-"); // "A7---"
"BOX".padEnd(3, "*"); // "BOX"
```

## 주의할 점
- `padEnd()`는 문자열 뒤쪽을 채웁니다.
- 앞쪽을 채우고 싶을 때는 `padStart()`를 사용합니다.
- 원본 문자열을 직접 바꾸지 않고 새 문자열을 반환합니다.
- 목표 길이보다 이미 긴 문자열은 잘라내지 않습니다.
- 채움 문자열이 여러 글자면 필요한 길이에 맞춰 잘려 들어갈 수 있지만, 이 문제에서는 한 글자만 사용합니다.

## 제한사항
- `code`는 길이 1 이상 20 이하의 문자열입니다.
- `targetLength`는 1 이상 30 이하의 정수입니다.
- `fillChar`는 길이가 1인 문자열입니다.
- `code`의 길이가 `targetLength`보다 짧으면 뒤쪽에 `fillChar`를 붙입니다.
- `code`의 길이가 `targetLength` 이상이면 `code`를 그대로 반환합니다.

## 예시
- 입력: `"AB7", 6, "-"` -> 출력: `"AB7---"`
- 입력: `"BOX", 3, "*"` -> 출력: `"BOX"`
- 입력: `"Q", 4, "0"` -> 출력: `"Q000"`
- 입력: `"DELIVERY", 5, "."` -> 출력: `"DELIVERY"`

## 힌트
- 직접 반복문으로 채움 문자를 붙이지 않아도 됩니다.
- `code.padEnd(targetLength, fillChar)` 형태로 호출하면 부족한 길이만큼 뒤쪽이 채워집니다.

## 해설
이 문제는 문자열을 일정한 길이로 맞추는 연습입니다.

배송 코드처럼 화면이나 라벨에서 길이를 맞춰 보여주고 싶을 때, 부족한 부분을 뒤쪽에 채우는 방식이 필요할 수 있습니다. `padEnd()`는 현재 문자열 길이를 확인하고 목표 길이에 도달할 때까지만 채움 문자열을 붙여 줍니다.

```js
function padShippingCodeSuffix(code, targetLength, fillChar) {
  return code.padEnd(targetLength, fillChar);
}
```

직접 `while`문으로 길이를 비교하며 문자를 붙일 수도 있지만, `padEnd()`를 쓰면 "뒤쪽을 채워 길이를 맞춘다"는 의도가 훨씬 분명하게 드러납니다.
