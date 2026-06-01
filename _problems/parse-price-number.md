---
title: 가격 문자열에서 숫자만 읽기
slug: parse-price-number
track: js-basic
difficulty: easy
topic: number-parsing-methods
tags:
  - beginner
  - number
  - js-method
  - parseInt
  - conversion
order: 1361
function_name: parsePriceNumber
time_limit_ms: 200
primaryMethod: Number.parseInt
coreIdea: 숫자로 시작하는 가격 문자열에서 Number.parseInt로 앞쪽의 정수 부분을 읽어 숫자 값으로 변환한다
gimmick: 숫자 뒤에 원이나 개 같은 단위가 붙어도 앞에서 읽을 수 있는 정수 부분까지만 숫자로 바뀐다
starter_code: |
  function parsePriceNumber(priceText) {
    // 여기에 코드를 작성하세요
    return 0;
  }
test_cases:
  - input: ["1200원"]
    output: 1200
  - input: ["45개"]
    output: 45
  - input: ["007번"]
    output: 7
  - input: ["0원"]
    output: 0
---
숫자로 시작하는 문자열에서 앞쪽 정수 부분을 읽어 실제 숫자로 반환하는 문제입니다.

## 오늘의 메서드
- `Number.parseInt()`

## 메서드 설명
- `Number.parseInt()`는 문자열의 앞부분을 읽어 정수로 바꾸는 메서드입니다.
- 숫자로 해석할 수 있는 부분까지만 읽고, 그 뒤의 문자 단위는 무시합니다.
- 이 문제에서는 `"1200원"`처럼 숫자 뒤에 단위가 붙은 문자열에서 숫자 값만 꺼내는 데 사용합니다.

## 기본 문법
```js
Number.parseInt(string, radix)
```

- `string`: 숫자로 바꾸고 싶은 문자열입니다.
- `radix`: 몇 진수로 해석할지 나타내는 값입니다. 보통 10진수라면 `10`을 넣습니다.

## 사용 예시
```js
Number.parseInt('1200원', 10); // 1200
Number.parseInt('45개', 10);   // 45
Number.parseInt('007번', 10);  // 7
```

## 주의할 점
- 문자열이 숫자로 시작하지 않으면 `NaN`이 나올 수 있습니다.
- 소수점이 있어도 정수 부분까지만 읽습니다.
- 10진수로 읽는 의도를 분명히 하려면 두 번째 인자로 `10`을 함께 적는 습관이 좋습니다.
- `Number.parseInt()`는 원본 문자열을 바꾸지 않습니다.

## 제한사항
- `priceText`는 문자열입니다.
- `priceText`는 0 이상의 정수로 시작합니다.
- 숫자 뒤에는 한글 단위, 영문자, 기호가 붙을 수 있습니다.
- 숫자 부분은 0 이상 100000 이하입니다.
- 반환값은 문자열이 아니라 숫자입니다.

## 예시
- 입력: `"1200원"` -> 출력: `1200`
- 입력: `"45개"` -> 출력: `45`
- 입력: `"007번"` -> 출력: `7`
- 입력: `"0원"` -> 출력: `0`

## 힌트
- 문자열 앞에서부터 읽을 수 있는 숫자만 정수로 바꾸면 됩니다.
- `Number.parseInt(priceText, 10)`의 결과를 그대로 반환해 보세요.
- 앞에 붙은 `0`은 숫자로 변환되면서 자연스럽게 사라집니다.

## 해설
이 문제는 문자열 안에 들어 있는 숫자 표현을 실제 숫자 타입으로 바꾸는 연습입니다.

`priceText`는 항상 숫자로 시작하므로, 앞부분을 정수로 읽으면 됩니다. 예를 들어 `"1200원"`은 앞의 `"1200"`까지만 숫자로 해석되고 뒤의 `"원"`은 결과에 포함되지 않습니다.

풀이 흐름은 간단합니다.

1. `parsePriceNumber(priceText)`로 문자열을 받습니다.
2. `Number.parseInt(priceText, 10)`을 호출합니다.
3. 변환된 숫자를 그대로 반환합니다.

정답 코드는 다음처럼 작성할 수 있습니다.

```js
function parsePriceNumber(priceText) {
  return Number.parseInt(priceText, 10);
}
```

이 풀이가 적합한 이유는 숫자 뒤에 단위가 붙은 문자열에서도 앞쪽 정수 부분만 깔끔하게 읽을 수 있기 때문입니다. 직접 한 글자씩 검사해 숫자만 모을 수도 있지만, 입력이 숫자로 시작한다는 조건이 있을 때는 `Number.parseInt()`가 더 짧고 의도가 분명합니다.
