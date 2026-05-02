---
title: 1번부터 N번까지 번호표 만들기
slug: build-seat-number-list
track: js-basic
difficulty: easy
topic: array-creation-methods
tags:
  - beginner
  - array
  - js-method
  - Array.from
  - sequence
order: 1180
function_name: buildSeatNumberList
time_limit_ms: 200
primaryMethod: Array.from
coreIdea: 길이가 n인 배열 비슷한 객체를 만든 뒤 Array.from과 인덱스를 활용해 1부터 n까지 증가하는 번호 배열을 생성한다
gimmick: n이 0이면 빈 배열이 자연스럽게 반환되고 값이 아니라 인덱스를 이용해 숫자를 만들어야 한다
starter_code: |
  function buildSeatNumberList(n) {
    return [];
  }
test_cases:
  - input: [5]
    output: [1, 2, 3, 4, 5]
  - input: [1]
    output: [1]
  - input: [0]
    output: []
  - input: [3]
    output: [1, 2, 3]
---
숫자 `n`이 주어질 때, `1`부터 `n`까지 순서대로 담긴 배열을 만드는 문제입니다.

## 오늘의 메서드
- `Array.from()`

## 메서드 설명
- `Array.from()`은 배열처럼 길이를 가진 값을 **진짜 배열로 만들 때** 자주 쓰는 메서드입니다.
- 두 번째 인수로 함수를 넣으면 각 위치의 값을 원하는 규칙으로 바로 만들 수 있습니다.
- 이 문제에서는 인덱스 `0, 1, 2, ...`를 이용해 `1, 2, 3, ...` 형태의 번호표 배열을 만들면 됩니다.

## 기본 문법
```js
Array.from({ length: n }, (_, index) => index + 1)
```

## 사용 예시
```js
Array.from({ length: 5 }, (_, index) => index + 1)
// [1, 2, 3, 4, 5]

Array.from({ length: 0 }, (_, index) => index + 1)
// []
```

## 주의할 점
- `Array.from()`의 첫 번째 인수로는 `{ length: n }`처럼 길이 정보가 있는 객체를 넣을 수 있습니다.
- 인덱스는 `0`부터 시작하므로 번호를 만들 때는 `index + 1`로 바꿔야 합니다.
- 원본 배열을 바꾸는 문제가 아니라, **새 배열을 만드는 문제**입니다.
- `n`이 `0`이면 빈 배열 `[]`을 반환해야 합니다.

## 제한사항
- `n`은 `0` 이상 `100` 이하의 정수입니다.
- 반환값은 `1`부터 `n`까지의 정수를 순서대로 담은 배열입니다.
- `n`이 `0`이면 빈 배열을 반환합니다.

## 예시
- 입력: `n = 5` → 출력: `[1, 2, 3, 4, 5]`
- 입력: `n = 1` → 출력: `[1]`
- 입력: `n = 0` → 출력: `[]`

## 힌트
- 먼저 길이가 `n`인 빈 틀을 만든다고 생각해 보세요.
- 각 칸에는 실제 값 대신 현재 위치 번호를 넣으면 됩니다.
- 인덱스가 `0`부터 시작한다는 점만 조심하면 `Array.from()` 하나로 해결할 수 있습니다.

## 해설
이 문제의 핵심은 **반복문 없이 규칙적인 숫자 배열을 만드는 것**입니다. 이런 상황에서는 `Array.from()`이 잘 맞습니다.

`Array.from({ length: n }, (_, index) => index + 1)`는 다음 순서로 동작합니다.

1. `{ length: n }`으로 길이가 `n`인 배열 같은 대상을 준비합니다.
2. 각 위치마다 `index`를 전달받습니다.
3. `index`는 `0`부터 시작하므로 `index + 1`을 반환합니다.
4. 그 결과가 모여 `[1, 2, 3, ..., n]` 배열이 됩니다.

예를 들어 `n = 5`라면 각 위치에서 만들어지는 값은 다음과 같습니다.
- index 0 → 1
- index 1 → 2
- index 2 → 3
- index 3 → 4
- index 4 → 5

그래서 최종 결과는 `[1, 2, 3, 4, 5]`입니다.

`n = 0`이면 길이가 0인 배열을 만들기 때문에 별도 분기 없이도 빈 배열 `[]`이 자연스럽게 반환됩니다.

```js
function buildSeatNumberList(n) {
  return Array.from({ length: n }, (_, index) => index + 1);
}
```

이 문제를 통해 `Array.from()`이 **길이 정보를 바탕으로 새 배열을 생성할 때 매우 편리한 메서드**라는 점을 익힐 수 있습니다.
