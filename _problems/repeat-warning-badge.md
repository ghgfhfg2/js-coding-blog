---
title: "경고 배지를 같은 기호로 반복 만들기"
slug: repeat-warning-badge
track: js-basic
difficulty: easy
topic: string-generation-methods
tags:
  - beginner
  - string
  - js-method
  - repeat
  - formatting
order: 49
function_name: repeatWarningBadge
time_limit_ms: 200
primaryMethod: String.repeat
coreIdea: 문자 하나를 repeat로 count번 반복해 길이가 일정한 경고 배지 문자열을 만든다
gimmick: 반복 횟수가 0이면 빈 문자열이 자연스럽게 반환되고 문자 하나만 반복해야 하므로 추가 구분자를 넣지 않는다
starter_code: |
  function repeatWarningBadge(symbol, count) {
    // 여기에 코드를 작성하세요
    return '';
  }
test_cases:
  - input: ["!", 5]
    output: "!!!!!"
  - input: ["#", 3]
    output: "###"
  - input: ["*", 0]
    output: ""
  - input: ["A", 1]
    output: "A"
---
문자 하나와 반복 횟수가 주어질 때, 같은 문자를 여러 번 이어 붙여 경고 배지 문자열을 만드는 문제입니다.

## 오늘의 메서드
- `repeat()`

## 메서드 설명
- `repeat()`는 문자열을 **지정한 횟수만큼 반복한 새 문자열**을 반환하는 메서드입니다.
- 원본 문자열은 바뀌지 않고, 반복된 결과만 새로 만들어집니다.
- 짧은 문자열을 일정한 패턴으로 늘려야 할 때 유용합니다.

## 기본 문법
```js
str.repeat(count)
```

## 사용 예시
```js
'!'.repeat(5); // '!!!!!'
'ab'.repeat(3); // 'ababab'
'*'.repeat(0); // ''
```

## 주의할 점
- `repeat()`는 문자열 메서드이므로 이 문제에서는 `symbol`을 문자열로 생각하고 사용하면 됩니다.
- 반복 횟수 `count`가 `0`이면 결과는 빈 문자열 `''`입니다.
- 이 문제에서는 **문자 하나만 반복**하면 되므로, 사이에 공백이나 다른 구분자를 넣으면 안 됩니다.

## 제한사항
- `symbol`은 길이가 정확히 1인 문자열입니다.
- `count`는 0 이상 100 이하의 정수입니다.
- 반환값은 `symbol`을 `count`번 이어 붙인 문자열입니다.

## 예시
- 입력: `symbol = '!'`, `count = 5` → 출력: `'!!!!!'`
- 입력: `symbol = '#'`, `count = 3` → 출력: `'###'`
- 입력: `symbol = '*'`, `count = 0` → 출력: `''`

## 힌트
- 같은 문자를 여러 번 붙이고 싶다면 반복문 대신 문자열 메서드를 바로 써도 됩니다.
- `symbol.repeat(count)` 형태를 떠올려 보세요.

## 해설
이 문제는 **문자 하나를 정해진 횟수만큼 반복한 문자열**을 만드는 연습입니다. 이런 상황에서는 `repeat()`가 가장 직접적입니다.

예를 들어 `symbol = '!'`, `count = 5`라면:

```js
'!'.repeat(5); // '!!!!!'
```

따라서 함수는 그대로 다음처럼 작성할 수 있습니다.

```js
function repeatWarningBadge(symbol, count) {
  return symbol.repeat(count);
}
```

이 풀이가 적합한 이유는 다음과 같습니다.
- 반복 의도가 코드에 바로 드러납니다.
- 직접 문자열을 이어 붙이는 반복문보다 짧고 읽기 쉽습니다.
- `count`가 `0`일 때도 별도 분기 없이 빈 문자열을 자연스럽게 얻을 수 있습니다.

즉, `repeat()`는 **같은 문자열을 여러 번 붙여 새 문자열을 만들 때** 가장 먼저 떠올리면 좋은 메서드입니다.
