---
title: "빈 슬롯 목록 같은 값으로 채우기"
slug: fill-empty-slot-list
track: js-basic
difficulty: easy
topic: array-fill-methods
tags:
  - beginner
  - array
  - js-method
  - fill
  - initialization
order: 1350
function_name: fillEmptySlotList
time_limit_ms: 200
primaryMethod: Array.fill
coreIdea: 길이가 정해진 새 배열을 만든 뒤 fill 메서드로 모든 칸을 같은 기본값으로 채운다
gimmick: count가 0이면 빈 배열을 반환하고, 값 사이에 다른 처리를 하지 않은 채 모든 슬롯을 같은 값으로 채운다
starter_code: |
  function fillEmptySlotList(count, value) {
    // 여기에 코드를 작성하세요
    return [];
  }
test_cases:
  - input: [3, "비어 있음"]
    output: ["비어 있음", "비어 있음", "비어 있음"]
  - input: [1, "예약 가능"]
    output: ["예약 가능"]
  - input: [0, "대기"]
    output: []
  - input: [4, 0]
    output: [0, 0, 0, 0]
---
정해진 개수만큼 슬롯을 만들고, 모든 칸을 같은 기본값으로 채우는 문제입니다.

## 오늘의 메서드
- `Array.prototype.fill()`

## 메서드 설명
- `fill()`은 배열의 모든 요소를 **같은 값으로 채우는 메서드**입니다.
- 새 배열을 일정한 기본값으로 초기화할 때 자주 사용합니다.
- 이 문제에서는 `Array(count)`로 길이만 있는 배열을 만든 뒤, `fill(value)`로 각 칸을 채웁니다.

## 기본 문법
```js
arr.fill(value)
```

필요하면 채울 시작 위치와 끝 위치도 지정할 수 있습니다.

```js
arr.fill(value, start, end)
```

## 사용 예시
```js
Array(3).fill('빈칸'); // ['빈칸', '빈칸', '빈칸']
Array(4).fill(0);      // [0, 0, 0, 0]
Array(0).fill('대기'); // []
```

## 주의할 점
- `fill()`은 호출한 배열 자체를 바꿉니다. 이 문제에서는 새로 만든 배열에 바로 사용하므로 괜찮습니다.
- `Array(count)`만 만들면 아직 실제 값이 채워진 상태가 아닙니다. `fill(value)`까지 호출해야 각 칸에 값이 들어갑니다.
- 객체나 배열 같은 참조값을 `fill()`로 채우면 모든 칸이 같은 참조를 공유합니다. 이 문제의 테스트는 문자열과 숫자처럼 단순한 값만 사용합니다.

## 제한사항
- `count`는 0 이상 100 이하의 정수입니다.
- `value`는 문자열 또는 숫자입니다.
- 반환값은 길이가 `count`이고, 모든 요소가 `value`인 새 배열입니다.
- `count`가 0이면 빈 배열 `[]`을 반환합니다.

## 예시
- 입력: `count = 3`, `value = '비어 있음'` → 출력: `['비어 있음', '비어 있음', '비어 있음']`
- 입력: `count = 1`, `value = '예약 가능'` → 출력: `['예약 가능']`
- 입력: `count = 0`, `value = '대기'` → 출력: `[]`

## 힌트
- 먼저 원하는 길이의 배열을 만들어야 합니다.
- `Array(count).fill(value)` 형태를 떠올려 보세요.
- `count`가 0이어도 별도 조건문 없이 자연스럽게 빈 배열이 만들어집니다.

## 해설
이 문제는 **같은 기본값으로 채워진 배열을 만드는 방법**을 연습합니다. 반복문으로 하나씩 `push`할 수도 있지만, JavaScript에서는 `fill()`을 사용하면 의도가 더 선명합니다.

예를 들어 `count = 3`, `value = '비어 있음'`이라면 먼저 길이가 3인 배열을 만들고:

```js
Array(3)
```

그 배열의 모든 칸을 같은 값으로 채우면 됩니다.

```js
Array(3).fill('비어 있음');
// ['비어 있음', '비어 있음', '비어 있음']
```

따라서 함수는 다음처럼 작성할 수 있습니다.

```js
function fillEmptySlotList(count, value) {
  return Array(count).fill(value);
}
```

이 풀이가 적합한 이유는 다음과 같습니다.
- 배열 길이와 초기값 설정이 한 줄에 드러납니다.
- `count`가 0일 때도 별도 분기 없이 `[]`가 반환됩니다.
- 같은 값을 반복해서 넣는 목적에는 `fill()`이 반복문보다 간단하고 읽기 쉽습니다.

즉, `fill()`은 **정해진 길이의 배열을 기본값으로 초기화할 때** 가장 먼저 떠올리면 좋은 메서드입니다.
