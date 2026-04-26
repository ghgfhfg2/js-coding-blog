---
title: 재고 수량 값만 배열로 꺼내기
slug: extract-stock-values-array
track: js-basic
difficulty: easy
topic: object-value-methods
tags:
  - beginner
  - object
  - js-method
  - Object.values
  - extraction
order: 1020
function_name: extractStockValuesArray
time_limit_ms: 200
primaryMethod: Object.values
coreIdea: 상품명을 키로, 재고 수량을 값으로 가진 객체에서 Object.values로 값들만 순서대로 꺼내 새 배열로 반환한다
gimmick: 키 이름은 결과에 포함하지 않고 빈 객체도 별도 예외 처리 없이 빈 배열로 자연스럽게 반환된다
starter_code: |
  function extractStockValuesArray(stockByItem) {
    return [];
  }
test_cases:
  - input: [{"apple": 3, "banana": 5, "orange": 2}]
    output: [3, 5, 2]
  - input: [{"notebook": 10}]
    output: [10]
  - input: [{}]
    output: []
  - input: [{"pen": 0, "eraser": 4, "ruler": 1}]
    output: [0, 4, 1]
---
상품명을 키로, 재고 수량을 값으로 가진 객체 `stockByItem`이 주어질 때, 재고 수량 값들만 담은 배열을 반환하는 `extractStockValuesArray` 함수를 작성하세요.

## 오늘의 메서드
- `Object.values()`

## 메서드 설명
- `Object.values()`는 객체 안에 들어 있는 **값들만 배열로 꺼내는 메서드**입니다.
- 키 이름은 제외하고, 값만 순서대로 모은 새 배열을 반환합니다.
- 객체에 들어 있는 숫자, 문자열, 불리언 같은 값을 한 번에 배열로 바꿔 다루고 싶을 때 유용합니다.

## 기본 문법
```js
Object.values(obj)
```

## 사용 예시
```js
const stockByItem = {
  apple: 3,
  banana: 5,
  orange: 2,
};

Object.values(stockByItem); // [3, 5, 2]
```

## 주의할 점
- `Object.values()`는 **키가 아니라 값만** 반환합니다.
- 반환값은 항상 **배열**입니다.
- 원본 객체를 수정하지 않습니다.
- 빈 객체에 사용하면 빈 배열 `[]`이 반환됩니다.

## 제한사항
- `stockByItem`은 상품명을 키로, 0 이상 1000 이하의 정수를 값으로 가지는 객체입니다.
- 키 개수는 0개 이상 50개 이하입니다.
- 반환값은 객체의 값들만 담은 배열입니다.
- 값의 순서는 객체에 들어 있는 순서를 따른다고 가정합니다.

## 예시
- 입력: `{ apple: 3, banana: 5, orange: 2 }` → 출력: `[3, 5, 2]`
- 입력: `{ notebook: 10 }` → 출력: `[10]`
- 입력: `{}` → 출력: `[]`

## 힌트
- 키 이름은 필요 없고 값만 필요합니다.
- 객체를 배열처럼 직접 순회하려 하기보다, 먼저 값 배열로 바꾸면 더 간단합니다.
- 오늘의 메서드 이름 그대로 떠올려 보세요.

## 해설
이 문제의 핵심은 객체에서 **값들만 빠르게 꺼내는 방법**을 익히는 것입니다.

예를 들어 `{ apple: 3, banana: 5, orange: 2 }`가 들어오면 우리가 원하는 결과는 `[3, 5, 2]`입니다.
이때 `Object.values(stockByItem)`를 사용하면 바로 값들만 모인 배열을 만들 수 있습니다.

코드는 다음처럼 아주 간단하게 작성할 수 있습니다.

```js
function extractStockValuesArray(stockByItem) {
  return Object.values(stockByItem);
}
```

풀이 흐름은 이렇습니다.

1. `stockByItem` 객체를 받습니다.
2. `Object.values()`를 사용해 값들만 배열로 꺼냅니다.
3. 그 배열을 그대로 반환합니다.

빈 객체 `{}`가 들어와도 `Object.values({})`는 `[]`를 반환하므로, 따로 예외 처리를 하지 않아도 됩니다.

이 문제의 학습 포인트는 객체를 다룰 때
- 키가 필요하면 `Object.keys()`
- 값이 필요하면 `Object.values()`
처럼 목적에 맞는 메서드를 골라 쓰는 감각을 익히는 것입니다.
초급 단계에서는 객체를 바로 복잡하게 순회하기보다, 먼저 배열로 바꿔서 생각하면 훨씬 이해하기 쉽습니다.
