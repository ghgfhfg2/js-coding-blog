---
title: 최소 길이 이상 단어만 고르기
slug: filter-words-by-min-length
track: js-basic
difficulty: easy
topic: high-order-functions
tags:
  - beginner
  - array
  - js-method
  - filter
  - length
order: 9
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(words, minLength) {
    return [];
  }
test_cases:
  - input: [["sun", "apple", "go", "planet"], 5]
    output: ["apple", "planet"]
  - input: [["a", "ab", "abc"], 2]
    output: ["ab", "abc"]
  - input: [["cat", "dog"], 4]
    output: []
  - input: [["code", "js", "array", "map"], 4]
    output: ["code", "array"]
---

문자열 배열 `words`와 정수 `minLength`가 주어질 때, 길이가 `minLength` 이상인 단어만 담은 새 배열을 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`filter()`는 배열에서 조건을 만족하는 요소만 골라 새로운 배열로 만들 때 사용하는 메서드입니다.

## 메서드 설명
이 문제에서는 단어 배열에서 **길이가 충분한 단어만 남기기**가 핵심입니다.
`filter()`를 사용하면 각 단어를 하나씩 검사하면서 조건을 만족하는 값만 자연스럽게 추릴 수 있습니다.

예를 들어 `minLength`가 `5`라면, 각 단어의 `length`를 확인해서 `5` 이상인 단어만 결과 배열에 담으면 됩니다.

## 기본 문법
```js
arr.filter((item) => 조건식)
```

## 사용 예시
```js
[1, 2, 3, 4, 5].filter((num) => num >= 3)
// [3, 4, 5]

['sun', 'apple', 'go', 'planet'].filter((word) => word.length >= 5)
// ['apple', 'planet']
```

## 주의할 점
- `filter()`는 **원본 배열을 바꾸지 않고** 새 배열을 반환합니다.
- 조건을 만족하는 요소가 하나도 없으면 빈 배열 `[]`을 반환합니다.
- 이 문제에서는 문자열 자체를 바꾸는 것이 아니라, **남길지 말지 판단**하는 것이 핵심입니다.
- `word.length > minLength`가 아니라 `word.length >= minLength` 조건인지 헷갈리지 않도록 주의하세요.

## 제한사항
- `words`의 길이는 1 이상 100 이하입니다.
- `words`의 각 원소는 길이 1 이상 20 이하의 영어 소문자 문자열입니다.
- `minLength`는 1 이상 20 이하의 정수입니다.
- 반환값은 길이가 `minLength` 이상인 단어들만 담은 배열입니다.

## 예시
- 입력: `['sun', 'apple', 'go', 'planet'], 5` → 출력: `['apple', 'planet']`
- 입력: `['a', 'ab', 'abc'], 2` → 출력: `['ab', 'abc']`
- 입력: `['cat', 'dog'], 4` → 출력: `[]`

## 힌트
- 배열을 처음부터 끝까지 보면서 각 단어의 길이를 확인해 보세요.
- 어떤 단어를 결과에 넣을지 결정하는 문제라면 `filter()`가 잘 어울립니다.
- 조건식 안에서는 `word.length >= minLength`처럼 비교하면 됩니다.

## 해설
이 문제는 단어 배열에서 **조건에 맞는 단어만 골라내는 연습**입니다.

풀이 흐름은 간단합니다.

1. `words` 배열에 `filter()`를 적용합니다.
2. 각 단어를 `word`라고 할 때 `word.length >= minLength`인지 검사합니다.
3. 조건을 만족하면 결과 배열에 남고, 만족하지 않으면 제외됩니다.
4. 완성된 새 배열을 반환하면 됩니다.

예를 들어 `['sun', 'apple', 'go', 'planet']`와 `5`가 주어지면:

- `'sun'` → 길이 3, 제외
- `'apple'` → 길이 5, 포함
- `'go'` → 길이 2, 제외
- `'planet'` → 길이 6, 포함

그래서 결과는 `['apple', 'planet']`입니다.

이 문제에서 중요한 학습 포인트는 `filter()`가 **조건에 맞는 요소만 남기는 메서드**라는 점입니다.
반복문으로 직접 새 배열을 만들어도 되지만, `filter()`를 쓰면 의도가 더 분명하게 드러납니다.
