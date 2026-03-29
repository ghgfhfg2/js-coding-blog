---
title: 메뉴 이름 하이픈으로 잇기
slug: join-menu-items
track: js-basic
difficulty: easy
topic: array-methods
tags:
  - beginner
  - array
  - js-method
  - join
  - formatting
order: 14
primaryMethod: join
coreIdea: 문자열 배열의 모든 요소를 join('-')으로 연결해 하이픈 구분 문자열을 만든다
gimmick: 요소가 하나면 구분자 없이 그대로 반환되고 원본 배열은 바뀌지 않는다
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(items) {
    return '';
  }
test_cases:
  - input: [["coffee", "latte", "tea"]]
    output: "coffee-latte-tea"
  - input: [["solo"]]
    output: "solo"
  - input: [["red", "blue"]]
    output: "red-blue"
  - input: [["2026", "03", "29"]]
    output: "2026-03-29"
---

문자열 배열 `items`가 주어질 때, 각 요소를 하이픈(`-`)으로 연결한 문자열을 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`join()`은 배열의 요소들을 하나의 문자열로 이어 붙일 때 사용하는 메서드입니다.

## 메서드 설명
이 문제에서는 메뉴 이름이나 코드 조각처럼 여러 문자열을 한 줄로 묶어야 합니다.
`join('-')`을 사용하면 배열 요소 사이에 하이픈을 넣어 깔끔하게 연결할 수 있습니다.

예를 들어 `['coffee', 'latte', 'tea'].join('-')`는 `'coffee-latte-tea'`를 반환합니다.

## 기본 문법
```js
arr.join(separator)
```

## 사용 예시
```js
['coffee', 'latte', 'tea'].join('-') // 'coffee-latte-tea'
['2026', '03', '29'].join('-') // '2026-03-29'
['solo'].join('-') // 'solo'
```

## 주의할 점
- `join()`은 **배열 메서드**입니다.
- 원본 배열을 바꾸지 않고 **새 문자열을 반환**합니다.
- 요소가 1개라면 구분자는 들어가지 않고 그 요소만 그대로 반환됩니다.
- 이 문제에서는 배열의 모든 요소가 문자열이라고 가정합니다.

## 제한사항
- `items`는 길이 1 이상 20 이하의 문자열 배열입니다.
- 각 문자열은 비어 있지 않습니다.
- 반환값은 배열 요소들을 `-`로 연결한 문자열입니다.

## 예시
- 입력: `["coffee", "latte", "tea"]` → 출력: `"coffee-latte-tea"`
- 입력: `["solo"]` → 출력: `"solo"`
- 입력: `["2026", "03", "29"]` → 출력: `"2026-03-29"`

## 힌트
- 배열을 순서대로 이어 붙여야 합니다.
- 요소 사이마다 같은 구분자 `-`를 넣는 메서드를 떠올려 보세요.

## 해설
이 문제의 핵심은 **배열 요소 사이에 같은 구분자를 넣어 하나의 문자열로 만드는 것**입니다.

반복문으로 직접 문자열을 이어 붙일 수도 있지만, `join()`을 사용하면 훨씬 간단합니다.

1. `items` 배열을 준비합니다.
2. `join('-')`을 호출합니다.
3. 배열의 각 요소 사이에 `-`가 들어간 새 문자열이 만들어집니다.

예를 들어 `['red', 'blue']`에 `join('-')`을 적용하면 `'red-blue'`가 됩니다.
배열 길이가 1인 `['solo']`는 이어 붙일 대상이 하나뿐이라 `'solo'` 그대로 반환됩니다.

이 문제를 통해 `join()`이 **배열 데이터를 사람이 읽기 좋은 문자열 형식으로 바꿀 때** 자주 사용된다는 점을 함께 익힐 수 있습니다.
