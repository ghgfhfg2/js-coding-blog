---
title: 짧은 단어만 골라 목록 만들기
slug: filter-short-words-list
track: js-basic
difficulty: easy
topic: array-selection-methods
tags:
  - beginner
  - array
  - js-method
  - filter
  - length
  - selection
order: 42
function_name: solution
time_limit_ms: 200
primaryMethod: Array.filter
coreIdea: 단어 배열에서 길이가 maxLength 이하인 요소만 filter로 골라 새 배열로 반환한다
gimmick: 조건을 만족하지 않는 단어만 빠지고 원래 순서는 유지되며 빈 결과 배열도 자연스럽게 처리된다
starter_code: |
  function solution(words, maxLength) {
    return [];
  }
test_cases:
  - input: [["cat", "elephant", "sun", "tree"], 3]
    output: ["cat", "sun"]
  - input: [["a", "to", "code", "js"], 2]
    output: ["a", "to", "js"]
  - input: [["apple", "banana"], 4]
    output: []
  - input: [["hi", "book", "pen", "go"], 4]
    output: ["hi", "book", "pen", "go"]
---
주어진 단어 목록에서 길이가 너무 긴 단어를 빼고, 조건을 만족하는 단어만 새 배열로 반환하는 문제입니다.

## 오늘의 메서드
- `Array.filter()`

## 메서드 설명
`Array.filter()`는 배열의 각 요소를 검사해서, **조건을 만족하는 요소만 모은 새 배열**을 만들어 주는 메서드입니다.
원본 배열은 바꾸지 않고, 통과한 요소들만 순서를 유지한 채 반환합니다.

## 기본 문법
```js
arr.filter((item) => 조건식)
```

## 사용 예시
```js
const words = ["cat", "elephant", "sun", "tree"];

words.filter((word) => word.length <= 3);
// ["cat", "sun"]
```

## 주의할 점
- `filter()`는 조건을 만족한 요소들만 담은 **새 배열**을 반환합니다.
- 조건을 만족하는 요소가 하나도 없으면 빈 배열 `[]`이 반환됩니다.
- 원본 배열 자체는 변경되지 않습니다.
- `find()`처럼 하나만 찾는 것이 아니라, **조건에 맞는 모든 요소**를 고릅니다.

## 제한사항
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 20`
- `1 <= maxLength <= 20`
- `words[i]`는 영어 소문자로만 이루어집니다.
- 반환값은 길이가 `maxLength` 이하인 단어들만 담은 배열입니다.
- 반환 배열의 단어 순서는 입력 배열과 같아야 합니다.

## 예시
- 입력: `words = ["cat", "elephant", "sun", "tree"]`, `maxLength = 3` → 출력: `["cat", "sun"]`
- 입력: `words = ["a", "to", "code", "js"]`, `maxLength = 2` → 출력: `["a", "to", "js"]`
- 입력: `words = ["apple", "banana"]`, `maxLength = 4` → 출력: `[]`

## 힌트
- 단어를 하나씩 보면서 길이가 `maxLength` 이하인지 검사해 보세요.
- 조건에 맞는 단어를 직접 `push`해도 되지만, 오늘은 `filter()`로 더 간단하게 풀 수 있습니다.
- `word.length <= maxLength` 조건식을 콜백 안에 넣으면 됩니다.

## 해설
이 문제의 핵심은 **조건에 맞는 단어만 골라 새 배열을 만드는 것**입니다.

예를 들어 `words = ["cat", "elephant", "sun", "tree"]`, `maxLength = 3`이라면:
- `"cat"`은 길이 3이므로 포함
- `"elephant"`는 길이 8이므로 제외
- `"sun"`은 길이 3이므로 포함
- `"tree"`는 길이 4이므로 제외

그래서 결과는 `["cat", "sun"]`입니다.

이 상황은 `Array.filter()`와 아주 잘 맞습니다. 각 단어를 검사하면서 `word.length <= maxLength`가 `true`인 것만 남기면 되기 때문입니다.

```js
function solution(words, maxLength) {
  return words.filter((word) => word.length <= maxLength);
}
```

이 코드는:
1. `words` 배열을 앞에서부터 순회하고
2. 각 `word`의 길이가 `maxLength` 이하인지 확인한 뒤
3. 조건을 만족한 단어만 새 배열에 담아 반환합니다.

시간 복잡도는 각 단어를 한 번씩만 확인하므로 `O(n)`입니다.
초보자 입장에서는 `filter()`가 "조건에 맞는 것만 남긴다"는 감각을 익히기에 좋은 연습입니다.
