---
title: 가게 재고 이름 목록 만들기
slug: list-inventory-item-names
track: js-basic
difficulty: easy
topic: object-basics
tags:
  - beginner
  - object
  - js-method
  - Object.keys
  - keys
order: 24
primaryMethod: Object.keys
coreIdea: 재고 객체에서 값은 무시하고 Object.keys()로 키 이름만 한 번에 배열로 꺼내 상품명 목록을 반환한다
gimmick: 수량이 0인 상품도 키 자체는 남아 있으므로 값 조건 없이 모든 key를 그대로 반환해야 한다
function_name: getItemNames
time_limit_ms: 200
starter_code: |
  function getItemNames(inventory) {
    // 여기에 코드를 작성하세요
    return [];
  }
test_cases:
  - input:
      - { apple: 3, banana: 5, melon: 1 }
    output: ["apple", "banana", "melon"]
  - input:
      - { notebook: 12 }
    output: ["notebook"]
  - input:
      - {}
    output: []
  - input:
      - { pen: 0, eraser: 2, ruler: 4 }
    output: ["pen", "eraser", "ruler"]
---
재고 객체에 들어 있는 상품 이름들만 배열로 뽑아 반환하는 문제입니다.

## 오늘의 메서드
- `Object.keys()`

## 메서드 설명
`Object.keys()`는 객체에 들어 있는 **키(key) 이름들만 모아서 배열로 반환**하는 메서드입니다.
예를 들어 `{ apple: 3, banana: 5 }`가 있으면 `['apple', 'banana']`를 얻을 수 있습니다.

## 기본 문법
```js
Object.keys(object)
```

## 사용 예시
```js
const inventory = {
  apple: 3,
  banana: 5,
  melon: 1,
};

Object.keys(inventory); // ['apple', 'banana', 'melon']
```

## 주의할 점
- 반환값은 **배열**입니다.
- 키의 순서는 보통 객체에 작성한 순서를 따릅니다.
- `Object.keys()`는 **값(value)** 이 아니라 **키(key)** 만 꺼냅니다.
- 원본 객체를 수정하지 않습니다.

## 제한사항
- `inventory`는 상품 이름을 key로, 수량을 value로 가지는 객체입니다.
- 상품 이름은 비어 있지 않은 문자열입니다.
- 수량은 0 이상의 정수입니다.
- 빈 객체가 들어올 수도 있습니다.
- 반환값은 `inventory`의 상품 이름만 담은 배열이어야 합니다.

## 예시
- 입력: `{ apple: 3, banana: 5, melon: 1 }`
  출력: `['apple', 'banana', 'melon']`
- 입력: `{ notebook: 12 }`
  출력: `['notebook']`
- 입력: `{}`
  출력: `[]`

## 힌트
객체에서 값은 필요 없고, 이름만 필요합니다. 객체의 key 목록을 한 번에 배열로 바꾸는 메서드를 떠올려 보세요.

## 해설
이 문제의 핵심은 객체에서 **상품 이름들만 꺼내는 것**입니다.
재고 정보는 `{ 상품이름: 수량 }` 형태이므로, 우리가 원하는 것은 각 속성의 이름입니다.

이때 `Object.keys(inventory)`를 사용하면 객체의 key들만 배열로 바로 얻을 수 있습니다.

```js
function getItemNames(inventory) {
  return Object.keys(inventory);
}
```

이 풀이가 적합한 이유는 다음과 같습니다.
- 반복문을 직접 만들지 않아도 됩니다.
- 객체의 key만 정확하게 꺼낼 수 있습니다.
- 초보자도 객체를 배열처럼 다루는 첫 감각을 익히기 좋습니다.

예를 들어 `{ pen: 0, eraser: 2, ruler: 4 }`가 들어오면,
`Object.keys()`의 결과는 `['pen', 'eraser', 'ruler']`가 됩니다.

즉, 이 문제는 `Object.keys()`로 **객체의 속성 이름 목록을 얻는 기본 사용법**을 익히는 연습입니다.
