---
title: 기준 길이 이상인 첫 단어 찾기
slug: find-first-long-word
track: js-basic
difficulty: easy
topic: high-order-functions
tags:
  - beginner
  - array
  - js-method
  - find
  - predicate
order: 28
function_name: findFirstLongWord
time_limit_ms: 200
primaryMethod: Array.find
coreIdea: 배열을 앞에서부터 보며 길이가 minLength 이상인 첫 단어를 find로 찾고 없으면 null로 바꿔 반환한다
gimmick: find는 못 찾으면 undefined를 주므로 문제 요구사항인 null로 후처리해야 한다
starter_code: |
  function findFirstLongWord(words, minLength) {
    // 여기에 코드를 작성하세요
    return null;
  }
test_cases:
  - input: [["hi", "sun", "planet", "sky"], 5]
    output: "planet"
  - input: [["cat", "tree", "apple"], 4]
    output: "tree"
  - input: [["a", "be", "see"], 4]
    output: null
  - input: [["code", "javascript", "web"], 4]
    output: "code"
---
주어진 단어 배열에서 길이가 `minLength` 이상인 **첫 번째 단어**를 찾아 반환하세요. 조건을 만족하는 단어가 없으면 `null`을 반환하면 됩니다.

## 오늘의 메서드
- `find()`

## 메서드 설명
- `find()`는 배열을 앞에서부터 확인하면서 **조건을 처음 만족하는 요소 하나**를 반환하는 메서드입니다.
- 조건에 맞는 요소를 찾으면 바로 탐색을 멈춥니다.
- 끝까지 찾지 못하면 `undefined`를 반환합니다.

## 기본 문법
```js
arr.find((element) => 조건식)
```

## 사용 예시
```js
const words = ['hi', 'sun', 'planet', 'sky'];

words.find((word) => word.length >= 5); // 'planet'
words.find((word) => word.length >= 10); // undefined
```

## 주의할 점
- `find()`는 **배열 전체**가 아니라 **조건을 처음 만족한 요소 1개만** 반환합니다.
- 조건을 만족하는 요소가 없으면 `undefined`가 나오므로, 이 문제에서는 그 경우 `null`로 바꿔서 반환해야 합니다.
- 원본 배열을 변경하지 않습니다.

## 제한사항
- `words`는 길이 1 이상 100 이하의 문자열 배열입니다.
- 각 단어는 영어 소문자로만 이루어져 있습니다.
- `minLength`는 1 이상 20 이하의 정수입니다.
- 조건을 만족하는 단어가 없으면 `null`을 반환합니다.

## 예시
- 입력: `['hi', 'sun', 'planet', 'sky']`, `5` → 출력: `'planet'`
- 입력: `['cat', 'tree', 'apple']`, `4` → 출력: `'tree'`
- 입력: `['a', 'be', 'see']`, `4` → 출력: `null`

## 힌트
- 각 단어를 하나씩 보면서 `word.length >= minLength`인지 확인해 보세요.
- `find()`의 결과가 `undefined`인지 확인한 뒤, 없으면 `null`을 반환하면 됩니다.

## 해설
이 문제의 핵심은 **조건을 만족하는 첫 번째 값만 찾는 것**입니다. 이런 상황에서는 `find()`가 잘 맞습니다.

먼저 `words.find(...)`를 사용해 길이가 `minLength` 이상인 첫 단어를 찾습니다.

```js
const found = words.find((word) => word.length >= minLength);
```

이렇게 하면 조건을 만족하는 첫 단어가 있으면 그 값을 얻고, 없으면 `undefined`를 얻게 됩니다.
이 문제에서는 결과가 없을 때 `null`을 반환해야 하므로 마지막에 한 번 더 처리하면 됩니다.

```js
function findFirstLongWord(words, minLength) {
  const found = words.find((word) => word.length >= minLength);
  return found === undefined ? null : found;
}
```

이 풀이가 적합한 이유는:
- 앞에서부터 순서대로 확인한다
- 첫 번째 정답만 찾으면 바로 멈춘다
- 코드가 짧고 의도가 분명하다

즉, `find()`는 **"조건을 만족하는 첫 요소 찾기"** 패턴을 익히기에 좋은 메서드입니다.
