---
title: 쉼표로 적힌 참석자 이름 나누기
slug: split-attendee-names
track: js-basic
difficulty: easy
topic: string-splitting-methods
tags:
  - beginner
  - string
  - js-method
  - split
  - csv
order: 1070
function_name: splitAttendeeNames
time_limit_ms: 200
primaryMethod: String.split
coreIdea: 쉼표로 이어진 이름 목록 문자열을 split(',')으로 나눠 원래 순서를 유지한 배열로 반환하고, 빈 문자열은 빈 배열로 처리한다
gimmick: 입력이 빈 문자열이면 split 결과가 ['']가 되기 쉬우므로 먼저 예외 처리해 실제 참가자가 없는 경우는 빈 배열을 반환해야 한다
starter_code: |
  function splitAttendeeNames(namesText) {
    return [];
  }
test_cases:
  - input: ["mina,jun,seo"]
    output: ["mina", "jun", "seo"]
  - input: [""]
    output: []
  - input: ["hana"]
    output: ["hana"]
  - input: ["noah,emma,liam,zoe"]
    output: ["noah", "emma", "liam", "zoe"]
---
쉼표로 이어진 이름 목록 문자열을 배열로 나누는 문제입니다.

## 오늘의 메서드
`split()`

## 메서드 설명
`split()`은 문자열을 특정 구분자를 기준으로 잘라 배열로 바꾸는 메서드입니다.
이 문제에서는 쉼표(`,`)를 기준으로 참가자 이름을 나누면 됩니다.

## 기본 문법
```js
str.split(separator)
```

## 사용 예시
```js
'mina,jun,seo'.split(',') // ['mina', 'jun', 'seo']
'hana'.split(',') // ['hana']
```

## 주의할 점
- `split()`은 원본 문자열을 바꾸지 않습니다.
- 구분자가 문자열에 없으면 원본 전체가 요소 1개인 배열로 반환됩니다.
- 빈 문자열 `""`에 바로 `split(',')`을 하면 `['']`가 되므로, 이 문제에서는 먼저 빈 문자열인지 확인해야 합니다.

## 제한사항
- `namesText`는 길이 0 이상 100 이하의 문자열입니다.
- 이름은 영문 소문자로만 이루어져 있다고 가정합니다.
- 이름 사이 구분자는 항상 쉼표(`,`) 하나입니다.
- 앞뒤 공백이나 비어 있는 이름은 주어지지 않습니다.

## 예시
- 입력: `"mina,jun,seo"` → 출력: `["mina", "jun", "seo"]`
- 입력: `""` → 출력: `[]`
- 입력: `"hana"` → 출력: `["hana"]`

## 힌트
- 먼저 참가자 목록이 아예 비어 있는 문자열인지 확인해 보세요.
- 비어 있지 않다면 쉼표를 기준으로 한 번만 나누면 됩니다.

## 해설
이 문제의 핵심은 **문자열을 쉼표 기준으로 배열로 바꾸는 것**입니다.

1. `namesText`가 빈 문자열이면 참가자가 없는 상태이므로 `[]`를 반환합니다.
2. 그렇지 않다면 `namesText.split(',')`을 호출합니다.
3. 그러면 쉼표로 구분된 이름들이 순서대로 배열에 들어갑니다.

예를 들어 `"mina,jun,seo"`에 `split(',')`을 적용하면:

```js
['mina', 'jun', 'seo']
```

가 됩니다.

또 `"hana"`처럼 쉼표가 없는 문자열은:

```js
['hana']
```

로 반환됩니다.

이 문제는 `split()`이 **문자열을 구분자 기준으로 나눈다**는 가장 기본적인 사용법을 익히기에 좋습니다. 시간 복잡도는 문자열 길이를 한 번 훑는 `O(n)`입니다.
