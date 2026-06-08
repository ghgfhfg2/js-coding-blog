---
title: 선반별 상품 목록 한 줄로 펼치기
slug: flatten-shelf-item-groups
track: js-basic
difficulty: easy
topic: array-flattening-methods
tags:
  - beginner
  - array
  - js-method
  - flat
  - nested-array
order: 1362
function_name: flattenShelfItemGroups
time_limit_ms: 200
primaryMethod: flat
coreIdea: 2차원 상품 배열을 Array.flat()으로 한 단계 펼쳐 선반 순서와 상품 순서를 유지한 1차원 배열로 만든다
gimmick: 빈 선반 배열은 결과에 아무 항목도 더하지 않으며 원본 groups 배열은 변경하지 않는다
starter_code: |
  function flattenShelfItemGroups(groups) {
    return groups;
  }
test_cases:
  - input: [[["apple", "banana"], ["milk"], ["bread", "jam"]]]
    output: ["apple", "banana", "milk", "bread", "jam"]
  - input: [[[], ["pen"], []]]
    output: ["pen"]
  - input: [[["a"], ["b", "c"], ["d"]]]
    output: ["a", "b", "c", "d"]
  - input: [[]]
    output: []
---

선반별로 나뉘어 있는 상품 목록을 하나의 배열로 펼쳐 반환하세요.

## 오늘의 메서드
- 오늘 배울 메서드는 `Array.flat()`입니다.
- 중첩된 배열을 지정한 깊이만큼 펼쳐 새 배열을 만들 때 사용합니다.

## 메서드 설명
`flat()`은 배열 안에 들어 있는 배열 요소를 꺼내서 더 평평한 배열로 만들어 줍니다.

기본 깊이는 `1`이므로, `[[1, 2], [3]]`처럼 한 단계만 중첩된 배열을 펼칠 때 바로 사용할 수 있습니다.

## 기본 문법
```js
arr.flat()
arr.flat(depth)
```

## 사용 예시
```js
const groups = [["apple", "banana"], ["milk"], ["bread"]];

groups.flat(); // ["apple", "banana", "milk", "bread"]
```

## 주의할 점
- `flat()`은 원본 배열을 바꾸지 않고 새 배열을 반환합니다.
- 기본값은 한 단계만 펼치는 `flat(1)`과 같습니다.
- 더 깊게 중첩된 배열까지 모두 펼치려면 깊이를 따로 지정해야 합니다.
- 빈 배열은 펼치는 과정에서 결과에 아무 요소도 추가하지 않습니다.

## 제한사항
- `groups`는 문자열 배열들이 들어 있는 2차원 배열입니다.
- `groups.length`는 0 이상 30 이하입니다.
- 각 안쪽 배열의 길이는 0 이상 20 이하입니다.
- 상품 이름은 길이 1 이상 20 이하의 문자열입니다.
- 선반 순서와 각 선반 안의 상품 순서는 그대로 유지해야 합니다.

## 예시
- 입력: `[["apple", "banana"], ["milk"], ["bread", "jam"]]` -> 출력: `["apple", "banana", "milk", "bread", "jam"]`
- 입력: `[[], ["pen"], []]` -> 출력: `["pen"]`
- 입력: `[]` -> 출력: `[]`

## 힌트
- 이미 `groups`는 배열 안에 배열이 들어 있는 형태입니다.
- 한 단계만 펼치면 모든 상품 이름이 같은 배열 안에 모입니다.

## 해설
이 문제는 2차원 배열을 1차원 배열로 바꾸는 연습입니다.

`groups.flat()`을 사용하면 각 선반 배열 안의 상품들이 순서대로 꺼내져 하나의 새 배열에 담깁니다. 원본 배열을 직접 수정하지 않기 때문에, 필요한 결과만 깔끔하게 반환할 수 있습니다.

```js
function flattenShelfItemGroups(groups) {
  return groups.flat();
}
```
