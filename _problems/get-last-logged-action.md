---
title: 마지막 기록 행동 가져오기
slug: get-last-logged-action
track: js-basic
difficulty: easy
topic: array-access-methods
tags:
  - beginner
  - array
  - js-method
  - at
  - last-item
  - indexing
order: 48
function_name: getLastLoggedAction
time_limit_ms: 200
primaryMethod: Array.at
coreIdea: 행동 기록 배열의 마지막 요소를 at(-1)로 간단히 읽고, 비어 있으면 null을 반환하는 배열 끝 접근 문제
gimmick: 음수 인덱스인 at(-1)를 쓰면 length - 1 계산 없이 마지막 값을 읽을 수 있고 빈 배열에서는 undefined가 나오므로 null로 바꿔야 한다
starter_code: |
  function getLastLoggedAction(actions) {
    return null;
  }
test_cases:
  - input: [["login", "click", "logout"]]
    output: "logout"
  - input: [["save"]]
    output: "save"
  - input: [[]]
    output: null
  - input: [["open", "edit", "preview", "publish"]]
    output: "publish"
---
사용자 행동 기록 배열에서 가장 마지막 행동만 빠르게 꺼내 보세요.

## 오늘의 메서드
- `Array.at()`

## 메서드 설명
`Array.at()`은 배열의 특정 위치에 있는 값을 읽을 때 사용하는 메서드입니다.
특히 음수 인덱스를 사용할 수 있어서, `-1`을 넣으면 배열의 마지막 요소를 바로 가져올 수 있습니다.

## 기본 문법
```js
arr.at(index)
```

## 사용 예시
```js
const actions = ['login', 'click', 'logout'];

actions.at(0);  // 'login'
actions.at(-1); // 'logout'
[].at(-1);      // undefined
```

## 주의할 점
- `at()`은 **원본 배열을 바꾸지 않습니다.**
- `at(-1)`은 마지막 요소를 읽을 때 편리합니다.
- 빈 배열에서 `at(-1)`을 호출하면 `undefined`가 나오므로, 이 문제에서는 `null`로 바꿔서 반환해야 합니다.
- 범위를 벗어난 인덱스를 넣어도 에러가 아니라 `undefined`를 반환합니다.

## 제한사항
- `actions`는 문자열로 이루어진 배열입니다.
- `0 <= actions.length <= 100`
- 각 문자열의 길이는 `1` 이상 `30` 이하입니다.
- 배열이 비어 있으면 `null`을 반환합니다.

## 예시
- 입력: `actions = ["login", "click", "logout"]` → 출력: `"logout"`
- 입력: `actions = ["save"]` → 출력: `"save"`
- 입력: `actions = []` → 출력: `null`

## 힌트
- 마지막 요소는 보통 `length - 1` 위치에 있습니다.
- `Array.at()`은 음수 인덱스를 지원하므로 마지막 요소를 더 읽기 쉽게 가져올 수 있습니다.
- 빈 배열에서는 `at(-1)` 결과가 `undefined`라는 점을 처리해 보세요.

## 해설
이 문제는 배열의 **마지막 값에 접근하는 가장 간단한 방법**을 익히는 문제입니다.

보통 마지막 요소를 가져올 때는 `actions[actions.length - 1]`처럼 씁니다.
하지만 `Array.at()`을 쓰면 `actions.at(-1)`처럼 더 직관적으로 쓸 수 있습니다.

풀이 순서는 간단합니다.

1. `actions.at(-1)`으로 마지막 요소를 읽습니다.
2. 결과가 `undefined`라면 배열이 비어 있었다는 뜻이므로 `null`을 반환합니다.
3. 그렇지 않으면 읽은 문자열을 그대로 반환합니다.

예를 들어 `actions = ["open", "edit", "preview", "publish"]`라면:
- `actions.at(-1)`은 `"publish"`를 반환합니다.

반면 `actions = []`라면:
- `actions.at(-1)`은 `undefined`입니다.
- 문제 조건에 맞게 `null`을 반환하면 됩니다.

이 문제를 통해 `Array.at()`의 음수 인덱스 사용법과, 메서드 결과를 문제 요구사항에 맞게 후처리하는 감각을 함께 익힐 수 있습니다.
