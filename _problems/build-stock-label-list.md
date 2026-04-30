---
title: 재고 객체를 이름표 목록으로 바꾸기
slug: build-stock-label-list
track: js-basic
difficulty: easy
topic: object-entry-methods
tags:
  - beginner
  - object
  - js-method
  - Object.entries
  - transformation
order: 1130
function_name: buildStockLabelList
time_limit_ms: 200
primaryMethod: Object.entries
coreIdea: '상품명-수량 형태의 객체를 Object.entries로 순회 가능한 쌍 배열로 바꾼 뒤 각 항목을 "이름: 수량개" 형식의 문자열 배열로 변환한다'
gimmick: '객체의 키와 값을 동시에 써야 하므로 키만 주는 Object.keys나 값만 주는 Object.values보다 entries가 자연스럽고 빈 객체는 빈 배열이 된다'
starter_code: |
  function buildStockLabelList(stock) {
    return [];
  }
test_cases:
  - input: [{ apple: 3, banana: 5 }]
    output: ["apple: 3개", "banana: 5개"]
  - input: [{ pencil: 1 }]
    output: ["pencil: 1개"]
  - input: [{}]
    output: []
  - input: [{ notebook: 10, eraser: 0 }]
    output: ["notebook: 10개", "eraser: 0개"]
---
객체의 키와 값을 함께 꺼내 `"이름: 수량개"` 형식의 문자열로 바꾸는 문제입니다.

## 오늘의 메서드
`Object.entries()`는 객체를 `[키, 값]` 쌍의 배열로 바꿔 줄 때 유용합니다.

## 메서드 설명
이 문제에서는 상품명과 수량을 **둘 다** 써서 문자열을 만들어야 합니다.
`Object.entries()`를 사용하면 객체를 순회하면서 각 상품의 이름과 수량을 한 번에 꺼낼 수 있습니다.
그 뒤 `map()`으로 원하는 형식의 문자열 배열을 만들면 됩니다.

## 기본 문법
```js
Object.entries(obj)
```

## 사용 예시
```js
Object.entries({ apple: 3, banana: 5 })
// [['apple', 3], ['banana', 5]]

Object.entries({ pencil: 1 }).map(([name, count]) => `${name}: ${count}개`)
// ['pencil: 1개']
```

## 주의할 점
- `Object.entries()`의 각 요소는 `[key, value]` 형태의 배열입니다.
- 키와 값을 함께 써야 하므로 `Object.keys()`나 `Object.values()`만으로는 바로 해결하기 불편합니다.
- 빈 객체를 넣으면 `Object.entries()` 결과도 빈 배열입니다.
- 수량이 `0`이어도 빠뜨리지 말고 그대로 문자열에 포함해야 합니다.

## 제한사항
- `stock`은 상품명을 키로, 재고 수량을 값으로 가지는 객체입니다.
- 각 상품명은 길이 1 이상 20 이하의 문자열입니다.
- 각 재고 수량은 0 이상 1000 이하의 정수입니다.
- 반환값은 각 상품을 `"상품명: 수량개"` 형식으로 바꾼 문자열 배열입니다.
- 결과 배열의 순서는 객체에 들어 있는 항목 순서를 그대로 따릅니다.

## 예시
- 입력: `stock = { apple: 3, banana: 5 }` → 출력: `["apple: 3개", "banana: 5개"]`
- 입력: `stock = { pencil: 1 }` → 출력: `["pencil: 1개"]`
- 입력: `stock = {}` → 출력: `[]`

## 힌트
- 먼저 객체를 `[키, 값]` 쌍의 배열로 바꿔 보세요.
- 각 쌍에서 상품명과 수량을 꺼내 문자열 하나로 만들면 됩니다.
- 새 배열을 만들어야 하므로 `Object.entries()` 뒤에 `map()`을 이어 붙이는 방식이 잘 맞습니다.

## 해설
이 문제의 핵심은 객체에서 **키와 값이 모두 필요하다**는 점입니다.
상품명만 있거나 수량만 있어서는 `"상품명: 수량개"` 형식을 만들 수 없으므로, `[키, 값]` 쌍을 주는 `Object.entries()`가 가장 자연스럽습니다.

풀이 흐름은 다음과 같습니다.
1. `Object.entries(stock)`으로 객체를 `[상품명, 수량]` 쌍의 배열로 바꿉니다.
2. `map()`으로 각 쌍을 순회합니다.
3. 템플릿 문자열을 사용해 `"상품명: 수량개"` 형식으로 바꿉니다.
4. 만들어진 문자열 배열을 반환합니다.

예를 들어 `{ apple: 3, banana: 5 }`는 `[['apple', 3], ['banana', 5]]`가 되고,
이를 각각 `"apple: 3개"`, `"banana: 5개"`로 바꾸면 정답이 됩니다.
빈 객체라면 쌍 배열도 비어 있으므로 결과도 자연스럽게 빈 배열이 됩니다.

```js
function buildStockLabelList(stock) {
  return Object.entries(stock).map(([name, count]) => `${name}: ${count}개`);
}
```

이 문제를 통해 `Object.entries()`가 **객체의 키와 값을 함께 다뤄야 할 때 유용한 메서드**라는 감각을 익힐 수 있습니다.
