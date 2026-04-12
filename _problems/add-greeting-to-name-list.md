---
title: 이름 목록에 환영 인사 붙이기
slug: add-greeting-to-name-list
track: js-basic
difficulty: easy
topic: array-transformation-methods
tags:
  - beginner
  - array
  - js-method
  - map
  - transformation
order: 44
function_name: addGreetingToNameList
time_limit_ms: 200
primaryMethod: Array.map
coreIdea: 이름 배열의 각 요소를 같은 순서로 순회하며 map으로 새로운 환영 인사 문자열 배열로 변환한다
gimmick: 원본 배열은 바꾸지 않고 빈 배열도 그대로 빈 결과 배열로 자연스럽게 처리된다
starter_code: |
  function addGreetingToNameList(names) {
    return [];
  }
test_cases:
  - input: [["Mina", "Jisoo", "Noah"]]
    output: ["Hello, Mina!", "Hello, Jisoo!", "Hello, Noah!"]
  - input: [["Alex"]]
    output: ["Hello, Alex!"]
  - input: [[]]
    output: []
  - input: [["A", "B B"]]
    output: ["Hello, A!", "Hello, B B!"]
---
이름이 담긴 배열 `names`가 주어질 때, 각 이름 앞에 `Hello, `를 붙이고 뒤에 `!`를 붙인 새 배열을 반환하는 `addGreetingToNameList` 함수를 작성하세요.

## 오늘의 메서드
- `Array.map()`

## 메서드 설명
- `map()`은 배열의 각 요소를 원하는 형태로 바꿔서 **새 배열**을 만드는 메서드입니다.
- 원본 배열을 직접 수정하지 않고, 변환된 결과를 같은 길이의 새 배열로 돌려줍니다.
- 배열의 모든 요소를 같은 규칙으로 바꾸고 싶을 때 자주 사용합니다.

## 기본 문법
```js
arr.map((item) => {
  return transformedItem;
});
```

## 사용 예시
```js
const names = ['Mina', 'Jisoo'];
const greeted = names.map((name) => `Hello, ${name}!`);

console.log(greeted); // ['Hello, Mina!', 'Hello, Jisoo!']
console.log(names);   // ['Mina', 'Jisoo']
```

## 주의할 점
- `map()`은 원본 배열을 바꾸지 않습니다.
- 반환값은 항상 **새 배열**입니다.
- 콜백 함수에서 값을 `return`하지 않으면 해당 위치에 `undefined`가 들어갑니다.
- 요소 개수는 유지되고, 각 요소만 변환됩니다.

## 제한사항
- `names`는 문자열만 담긴 배열입니다.
- `0 <= names.length <= 100`
- 각 이름의 길이는 `1` 이상 `20` 이하입니다.
- 이름 내부의 공백은 그대로 유지합니다.
- 반환값은 각 이름이 `Hello, 이름!` 형태로 바뀐 새로운 문자열 배열입니다.

## 예시
- 입력: `['Mina', 'Jisoo', 'Noah']` → 출력: `['Hello, Mina!', 'Hello, Jisoo!', 'Hello, Noah!']`
- 입력: `['Alex']` → 출력: `['Hello, Alex!']`
- 입력: `[]` → 출력: `[]`

## 힌트
- 배열의 각 이름을 하나씩 꺼내 같은 형식의 문자열로 바꾸면 됩니다.
- `for`문으로도 풀 수 있지만, 오늘은 `map()`으로 새 배열을 만드는 연습이 핵심입니다.
- 템플릿 문자열 `` `Hello, ${name}!` `` 을 활용해 보세요.

## 해설
이 문제는 배열의 각 요소를 **같은 규칙으로 새 값으로 바꾸는 연습**입니다.

입력 배열 `names`의 각 원소는 이름 문자열 하나입니다. 우리가 해야 할 일은 각 이름을 `Hello, 이름!` 형태의 문자열로 바꾸는 것입니다. 이런 작업은 `Array.map()`과 아주 잘 맞습니다.

예를 들어 `['Mina', 'Jisoo']`가 들어오면:

1. `Mina`를 `Hello, Mina!`로 변환합니다.
2. `Jisoo`를 `Hello, Jisoo!`로 변환합니다.
3. 변환된 결과를 새 배열로 반환합니다.

코드는 다음처럼 작성할 수 있습니다.

```js
function addGreetingToNameList(names) {
  return names.map((name) => `Hello, ${name}!`);
}
```

이 풀이의 장점은 다음과 같습니다.

- 배열을 앞에서부터 자연스럽게 읽을 수 있습니다.
- 원본 배열을 건드리지 않습니다.
- 각 요소를 새 값으로 바꾼다는 의도가 코드에 잘 드러납니다.

빈 배열이 들어오면 `map()`은 그냥 빈 배열을 반환하므로 별도 예외 처리도 필요 없습니다.

시간 복잡도는 배열을 한 번 순회하므로 `O(n)`입니다.
