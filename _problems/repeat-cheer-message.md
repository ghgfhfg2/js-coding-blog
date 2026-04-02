---
title: 응원 문구 여러 번 붙이기
slug: repeat-cheer-message
track: js-basic
difficulty: easy
topic: string-building
tags:
  - beginner
  - string
  - js-method
  - repeat
  - pattern
order: 34
primaryMethod: repeat
coreIdea: 문자열 word를 repeat(count)로 같은 순서를 유지한 채 count번 이어 붙여 반복 패턴 문자열을 만든다
gimmick: count가 0이면 에러가 아니라 빈 문자열이 반환되고, 반복문 없이도 같은 문구를 정확한 횟수만큼 만들 수 있다
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(word, count) {
    return '';
  }
test_cases:
  - input: ["go", 3]
    output: "gogogo"
  - input: ["hi!", 1]
    output: "hi!"
  - input: ["a", 0]
    output: ""
  - input: ["Na", 4]
    output: "NaNaNaNa"
---

문자열 `word`와 정수 `count`가 주어질 때, `word`를 `count`번 이어 붙인 문자열을 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`repeat()`는 문자열을 원하는 횟수만큼 반복해서 새 문자열로 만드는 메서드입니다.

## 메서드 설명
이 문제에서는 같은 문구를 여러 번 이어 붙여야 합니다.
예를 들어 `"go"`를 3번 반복하면 `"gogogo"`가 되어야 합니다.
이럴 때 `repeat()`를 쓰면 반복문으로 직접 이어 붙이지 않아도 간단하게 결과를 만들 수 있습니다.

`"go".repeat(3)`은 `"gogogo"`를 반환하고, `"a".repeat(0)`은 빈 문자열 `""`을 반환합니다.

## 기본 문법
```js
str.repeat(count)
```

## 사용 예시
```js
'go'.repeat(3) // 'gogogo'
'Na'.repeat(4) // 'NaNaNaNa'
'hi!'.repeat(1) // 'hi!'
'a'.repeat(0) // ''
```

## 주의할 점
- `repeat()`는 **문자열 메서드**입니다.
- 반복 횟수 `count`는 0 이상의 정수여야 합니다.
- 원본 문자열을 바꾸는 것이 아니라 **새 문자열을 반환**합니다.
- `count`가 0이면 빈 문자열이 반환됩니다.

## 제한사항
- `word`는 길이 1 이상 20 이하의 문자열입니다.
- `count`는 0 이상 100 이하의 정수입니다.
- 반환값은 `word`를 정확히 `count`번 이어 붙인 문자열입니다.

## 예시
- 입력: `word = "go"`, `count = 3` → 출력: `"gogogo"`
- 입력: `word = "hi!"`, `count = 1` → 출력: `"hi!"`
- 입력: `word = "a"`, `count = 0` → 출력: `""`

## 힌트
- 같은 문자열을 여러 번 붙여야 할 때 사용할 수 있는 문자열 메서드를 떠올려 보세요.
- `word.repeat(count)`가 어떤 결과를 만드는지 확인해 보세요.

## 해설
이 문제의 핵심은 **같은 문자열을 원하는 횟수만큼 반복해 새 문자열을 만드는 것**입니다.

가장 단순하게는 반복문으로 문자열을 하나씩 이어 붙일 수도 있습니다.
하지만 JavaScript에는 이런 작업을 바로 처리해 주는 `repeat()` 메서드가 있습니다.

풀이 흐름은 다음과 같습니다.

1. 문자열 `word`를 확인합니다.
2. 반복할 횟수 `count`를 확인합니다.
3. `word.repeat(count)`를 호출합니다.
4. 만들어진 새 문자열을 반환합니다.

예를 들어 `word = "Na"`, `count = 4`라면 `repeat(4)`의 결과는 `"NaNaNaNa"`입니다.
또 `count = 0`이면 아무 것도 붙이지 않으므로 빈 문자열 `""`이 됩니다.

이 문제를 통해 `repeat()`가 **배너 문구 만들기, 구분선 만들기, 패턴 문자열 생성**처럼 같은 문자열을 여러 번 써야 하는 상황에서 유용하다는 점을 익힐 수 있습니다.
