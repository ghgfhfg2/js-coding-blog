---
title: 접수 번호를 네 자리로 맞추기
slug: format-ticket-number-with-padding
track: js-basic
difficulty: easy
topic: string-formatting-methods
tags:
  - beginner
  - string
  - js-method
  - padStart
  - formatting
order: 45
function_name: formatTicketNumberWithPadding
time_limit_ms: 200
primaryMethod: String.padStart
coreIdea: 숫자로 된 접수 번호 문자열이 목표 길이보다 짧으면 padStart로 앞쪽을 0으로 채워 일정한 자릿수 형식으로 맞춘다
gimmick: 이미 네 자리 이상인 문자열은 자르지 않고 그대로 반환되며 앞자리에만 0을 채워야 한다
starter_code: |
  function formatTicketNumberWithPadding(ticketNumber) {
    return "";
  }
test_cases:
  - input: ["7"]
    output: "0007"
  - input: ["42"]
    output: "0042"
  - input: ["1234"]
    output: "1234"
  - input: ["98765"]
    output: "98765"
---
숫자로 이루어진 접수 번호 문자열 `ticketNumber`가 주어질 때, 길이가 4보다 짧으면 앞을 `0`으로 채워 항상 최소 4자리처럼 보이게 만든 문자열을 반환하는 `formatTicketNumberWithPadding` 함수를 작성하세요.

## 오늘의 메서드
- `String.padStart()`

## 메서드 설명
- `padStart()`는 문자열의 길이가 원하는 길이보다 짧을 때, **앞쪽에 지정한 문자열을 채워서** 새 문자열을 만드는 메서드입니다.
- 원본 문자열은 바꾸지 않고, 채워진 결과를 새 문자열로 반환합니다.
- 번호, 코드, 날짜처럼 자릿수를 맞춰 보여주고 싶을 때 자주 사용합니다.

## 기본 문법
```js
str.padStart(targetLength, padString)
```

## 사용 예시
```js
const ticket = '42';

console.log(ticket.padStart(4, '0')); // '0042'
console.log(ticket); // '42'
```

## 주의할 점
- `padStart()`는 **문자열 메서드**이므로 숫자 자체가 아니라 문자열에 사용합니다.
- 문자열 길이가 이미 목표 길이 이상이면 그대로 반환합니다.
- 앞쪽을 채우는 메서드이며, 뒤쪽을 채우는 것은 `padEnd()`입니다.
- 원본 문자열은 변경되지 않습니다.

## 제한사항
- `ticketNumber`는 숫자 문자(`0`~`9`)로만 이루어진 문자열입니다.
- `1 <= ticketNumber.length <= 20`
- 반환값은 길이가 4 미만이면 앞을 `0`으로 채운 문자열입니다.
- 길이가 이미 4 이상이면 원래 문자열을 그대로 반환합니다.

## 예시
- 입력: `'7'` → 출력: `'0007'`
- 입력: `'42'` → 출력: `'0042'`
- 입력: `'1234'` → 출력: `'1234'`
- 입력: `'98765'` → 출력: `'98765'`

## 힌트
- 먼저 이 문제는 숫자 계산이 아니라 **문자열 형식 맞추기** 문제라는 점을 떠올려 보세요.
- 길이를 4로 맞추고, 부족한 만큼 앞쪽에 `0`을 붙이면 됩니다.
- `ticketNumber.padStart(4, '0')` 형태를 바로 사용할 수 있습니다.

## 해설
이 문제의 핵심은 **짧은 문자열의 앞부분을 일정한 문자로 채워 형식을 맞추는 것**입니다.

예를 들어 접수 번호가 `'7'`이면 그대로는 한 자리지만, 화면에는 `'0007'`처럼 네 자리로 보이게 만들고 싶을 수 있습니다. 이런 작업은 `String.padStart()`가 딱 맞습니다.

`padStart(4, '0')`는 문자열 길이가 4가 될 때까지 앞에서부터 `'0'`을 채웁니다.

- `'7'` → `'0007'`
- `'42'` → `'0042'`
- `'1234'` → 이미 길이가 4이므로 그대로 `'1234'`
- `'98765'` → 이미 4보다 길기 때문에 그대로 `'98765'`

정답 코드는 다음처럼 작성할 수 있습니다.

```js
function formatTicketNumberWithPadding(ticketNumber) {
  return ticketNumber.padStart(4, '0');
}
```

이 풀이가 적합한 이유는 다음과 같습니다.

- 문제 요구사항인 "앞을 0으로 채운다"를 메서드 하나로 직접 표현할 수 있습니다.
- 반복문이나 조건문을 길게 쓰지 않아도 됩니다.
- 문자열 포맷팅 상황에서 자주 쓰는 메서드 감각을 익힐 수 있습니다.

시간 복잡도는 문자열 길이에 비례하는 `O(n)`입니다.
