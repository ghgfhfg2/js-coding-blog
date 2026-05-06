---
title: 두 참가자 목록 이어 붙이기
slug: concat-attendee-lists
track: js-basic
difficulty: easy
topic: array-combination-methods
tags:
  - beginner
  - array
  - js-method
  - concat
  - merge
order: 1261
function_name: concatAttendeeLists
time_limit_ms: 200
primaryMethod: Array.concat
coreIdea: 두 참가자 이름 배열을 concat으로 앞 배열 뒤에 뒷 배열 순서대로 이어 붙여 새 배열을 만든다
gimmick: 한쪽 배열이 비어 있어도 자연스럽게 처리되고 원본 배열 두 개는 바뀌지 않아야 한다
starter_code: |
  function concatAttendeeLists(morningList, afternoonList) {
    return [];
  }
test_cases:
  - input: [["민지", "현우"], ["서준", "하린"]]
    output: ["민지", "현우", "서준", "하린"]
  - input: [[], ["지우"]]
    output: ["지우"]
  - input: [["도윤"], []]
    output: ["도윤"]
  - input: [[], []]
    output: []
---
오전 참가자 목록과 오후 참가자 목록이 주어질 때, 두 목록을 순서대로 이어 붙인 새 배열을 반환하는 문제입니다.

## 오늘의 메서드
- `Array.concat()`

## 메서드 설명
- `Array.concat()`은 여러 배열이나 값을 **하나의 새 배열로 이어 붙일 때** 사용하는 메서드입니다.
- 원본 배열을 직접 바꾸지 않고, 합쳐진 결과를 새 배열로 돌려줍니다.
- 이 문제에서는 오전 목록 뒤에 오후 목록을 그대로 이어 붙이면 됩니다.

## 기본 문법
```js
array1.concat(array2)
```

## 사용 예시
```js
['민지', '현우'].concat(['서준', '하린'])
// ['민지', '현우', '서준', '하린']

[].concat(['지우'])
// ['지우']
```

## 주의할 점
- `concat()`은 원본 배열을 수정하지 않습니다.
- 앞 배열의 요소가 먼저 오고, 뒤 배열의 요소가 그다음에 붙습니다.
- 한쪽 배열이 비어 있어도 에러 없이 다른 쪽 배열을 그대로 담은 새 배열이 반환됩니다.

## 제한사항
- `morningList`와 `afternoonList`는 길이 0 이상 50 이하의 문자열 배열입니다.
- 각 이름은 길이 1 이상 20 이하의 문자열입니다.
- 반환값은 오전 목록 뒤에 오후 목록을 붙인 새 배열입니다.

## 예시
- 입력: `['민지', '현우']`, `['서준', '하린']` → 출력: `['민지', '현우', '서준', '하린']`
- 입력: `[]`, `['지우']` → 출력: `['지우']`
- 입력: `['도윤']`, `[]` → 출력: `['도윤']`

## 힌트
- 첫 번째 배열 뒤에 두 번째 배열을 붙이는 메서드를 떠올려 보세요.
- 반복문으로 하나씩 옮기지 않아도 됩니다.
- 원본 배열을 바꾸지 않고 새 배열을 만들어야 합니다.

## 해설
이 문제의 핵심은 **두 배열을 순서대로 자연스럽게 합치는 것**입니다. 이런 상황에서는 `Array.concat()`이 잘 맞습니다.

`morningList.concat(afternoonList)`를 사용하면 오전 목록의 요소들이 먼저 들어가고, 그 뒤에 오후 목록의 요소들이 이어 붙습니다.

예를 들어:
1. `morningList`가 `['민지', '현우']`이고
2. `afternoonList`가 `['서준', '하린']`이면
3. `concat()` 결과는 `['민지', '현우', '서준', '하린']`입니다.

또한 한쪽 배열이 비어 있어도 별도 예외 처리 없이 자연스럽게 동작합니다. 예를 들어 `[].concat(['지우'])`는 `['지우']`가 됩니다.

```js
function concatAttendeeLists(morningList, afternoonList) {
  return morningList.concat(afternoonList);
}
```

이 문제를 통해 `Array.concat()`이 **배열을 원본 유지 상태로 이어 붙이는 기본 메서드**라는 점을 익힐 수 있습니다.
