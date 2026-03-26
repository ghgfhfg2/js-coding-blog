---
title: 단어 목록을 대시로 이어 붙이기
slug: join-words-with-dash
track: js-basic
difficulty: easy
topic: array-methods
tags:
  - beginner
  - array
  - js-method
  - join
  - string
primaryMethod: join-separator
coreIdea: 문자열 배열의 순서를 유지한 채 join 메서드에 구분자 대시를 넣어 한 번에 합친다
gimmick: 마지막 구분자 처리 같은 반복문 예외를 join 하나로 없앤 메서드 학습형 문제
order: 10
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(words) {
    return '';
  }
test_cases:
  - input: [["red", "blue", "green"]]
    output: "red-blue-green"
  - input: [["hello"]]
    output: "hello"
  - input: [["js", "basic", "study", "day"]]
    output: "js-basic-study-day"
  - input: [[""]]
    output: ""
---

문자열 배열 `words`가 주어질 때, 모든 단어를 `-` 기호로 이어 붙인 문자열을 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`join()`은 배열의 모든 요소를 하나의 문자열로 합칠 때 사용하는 메서드입니다.

## 메서드 설명
이 문제에서는 단어들이 배열로 들어옵니다.
각 단어를 순서대로 유지하면서 사이사이에 `-`를 넣어 하나의 문자열로 만들어야 합니다.
이럴 때 `join('-')`을 사용하면 반복문으로 직접 붙이지 않아도 깔끔하게 해결할 수 있습니다.

예를 들어 `['red', 'blue', 'green']`에 `join('-')`을 적용하면 `'red-blue-green'`이 됩니다.

## 기본 문법
```js
arr.join(separator)
```

## 사용 예시
```js
['red', 'blue', 'green'].join('-')
// 'red-blue-green'

['hello'].join('-')
// 'hello'

['a', 'b', 'c'].join('')
// 'abc'
```

## 주의할 점
- `join()`은 **배열을 문자열로 바꿔 반환**합니다.
- 원본 배열 자체를 수정하지 않습니다.
- 구분자를 넣지 않으면 기본값은 쉼표 `,`입니다.
  - 예: `['a', 'b'].join()` → `'a,b'`
- 단어가 하나뿐이면 구분자가 추가되지 않고 그 단어만 그대로 반환됩니다.

## 제한사항
- `words`의 길이는 1 이상 100 이하입니다.
- `words`의 각 원소는 빈 문자열 또는 영어 소문자 문자열입니다.
- 배열의 순서는 바꾸지 않습니다.
- 반환값은 각 단어를 `-`로 이어 붙인 문자열입니다.

## 예시
- 입력: `['red', 'blue', 'green']` → 출력: `'red-blue-green'`
- 입력: `['hello']` → 출력: `'hello'`
- 입력: `['js', 'basic', 'study', 'day']` → 출력: `'js-basic-study-day'`

## 힌트
- 배열의 각 요소 사이에 같은 구분자를 넣어 문자열을 만들고 싶다면 `join()`을 떠올려 보세요.
- 직접 `result += ...` 식으로 붙일 수도 있지만, 이 문제는 `join()` 연습에 더 잘 맞습니다.
- 구분자로 `'-'`를 전달하면 됩니다.

## 해설
이 문제의 핵심은 **배열을 순서대로 유지한 채 하나의 문자열로 합치는 것**입니다.

풀이 흐름은 간단합니다.

1. `words` 배열에 `join('-')`을 적용합니다.
2. 각 단어 사이에 `-`가 들어간 새 문자열이 만들어집니다.
3. 그 결과를 그대로 반환하면 됩니다.

예를 들어 `['red', 'blue', 'green']`이라면:

- `'red'`
- `'blue'`
- `'green'`

이 세 단어를 `-`로 연결하므로 결과는 `'red-blue-green'`입니다.

이 문제에서 배우려는 포인트는 `join()`이 **배열 → 문자열 변환**에 특화된 메서드라는 점입니다.
반복문으로 하나씩 이어 붙이면 마지막 구분자 처리 같은 사소한 조건을 신경 써야 할 때가 많습니다.
하지만 `join()`을 사용하면 그런 실수를 줄이고, 코드의 의도도 더 분명하게 드러납니다.
