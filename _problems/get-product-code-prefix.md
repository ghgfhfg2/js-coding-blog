---
title: 상품 코드 앞 세 글자 가져오기
slug: get-product-code-prefix
track: js-basic
difficulty: easy
topic: string-extraction-methods
tags:
  - beginner
  - string
  - js-method
  - slice
  - prefix
order: 54
function_name: getProductCodePrefix
time_limit_ms: 200
primaryMethod: String.slice
coreIdea: 상품 코드 문자열의 앞에서 최대 3글자를 slice로 잘라 접두 코드만 반환한다
gimmick: 길이가 3보다 짧은 문자열도 slice(0, 3) 호출만으로 전체 문자열이 자연스럽게 반환된다
starter_code: |
  function getProductCodePrefix(code) {
    return code;
  }
test_cases:
  - input: ["ABC-2026"]
    output: "ABC"
  - input: ["XY"]
    output: "XY"
  - input: ["SALE"]
    output: "SAL"
  - input: ["Q"]
    output: "Q"
---
상품 코드 문자열에서 앞 세 글자만 잘라 접두 코드를 반환하는 문제입니다.

## 오늘의 메서드
- `String.slice()`

## 메서드 설명
`slice()`는 문자열의 원하는 시작 위치와 끝 위치를 정해서 일부만 잘라 새 문자열로 반환하는 메서드입니다.
이 문제에서는 맨 앞부터 세 글자까지만 잘라 접두 코드를 만들 때 사용합니다.

## 기본 문법
```js
str.slice(startIndex, endIndex)
```

## 사용 예시
```js
"ABC-2026".slice(0, 3); // "ABC"
"XY".slice(0, 3);       // "XY"
"SALE".slice(0, 3);     // "SAL"
```

## 주의할 점
- `slice()`는 원본 문자열을 바꾸지 않고 새 문자열을 반환합니다.
- 두 번째 인덱스는 포함되지 않습니다. 그래서 `slice(0, 3)`은 0, 1, 2 위치의 글자만 가져옵니다.
- 문자열 길이가 3보다 짧아도 에러가 나지 않고 가능한 부분까지만 반환합니다.
- 이 문제에서는 문자열 맨 앞에서만 잘라야 하므로 시작 인덱스는 항상 `0`입니다.

## 제한사항
- `code`는 길이 1 이상 50 이하의 문자열입니다.
- `code`는 영문 대문자, 영문 소문자, 숫자, 하이픈(`-`)으로 이루어집니다.
- 반환값은 `code`의 앞에서 최대 3글자를 잘라 만든 문자열입니다.

## 예시
- 입력: `code = "ABC-2026"` → 출력: `"ABC"`
- 입력: `code = "XY"` → 출력: `"XY"`
- 입력: `code = "SALE"` → 출력: `"SAL"`

## 힌트
- 문자열의 맨 앞 일부만 가져오고 싶다면 `slice()`를 떠올려 보세요.
- 시작 위치는 `0`이고, 끝 위치는 `3`으로 두면 됩니다.
- 문자열 길이가 3보다 짧은 경우를 따로 분기하지 않아도 됩니다.

## 해설
이 문제의 핵심은 문자열의 **앞부분 일부만 안전하게 잘라 내는 방법**을 익히는 것입니다.

`String.slice()`를 사용하면 원하는 범위의 문자열을 쉽게 추출할 수 있습니다.
접두 코드가 앞 세 글자이므로 `code.slice(0, 3)`을 사용하면 됩니다.

예를 들어 `code`가 `"ABC-2026"`이면:

```js
code.slice(0, 3); // "ABC"
```

`code`가 `"XY"`처럼 더 짧아도:

```js
code.slice(0, 3); // "XY"
```

이처럼 길이가 짧은 경우도 자동으로 처리해 주기 때문에 별도 예외 처리가 거의 필요 없습니다.

정답 코드는 다음처럼 간단합니다.

```js
function getProductCodePrefix(code) {
  return code.slice(0, 3);
}
```

이 문제에서 배우면 좋은 점은 다음과 같습니다.
- 문자열의 앞부분을 잘라 낼 때 `slice()`를 자연스럽게 떠올릴 수 있습니다.
- 끝 인덱스는 포함되지 않는다는 규칙을 익힐 수 있습니다.
- 짧은 문자열도 같은 코드로 처리할 수 있다는 점을 알 수 있습니다.
