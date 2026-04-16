---
title: 메시지 속 금지어 모두 가리기
slug: mask-banned-word-in-message
track: js-basic
difficulty: easy
topic: string-replacement-methods
tags:
  - beginner
  - string
  - js-method
  - replaceAll
  - masking
order: 53
function_name: maskBannedWord
time_limit_ms: 200
primaryMethod: String.replaceAll
coreIdea: 문자열에서 금지어와 정확히 일치하는 모든 부분을 replaceAll로 한 번에 바꿔 첫 번째만이 아니라 전체 등장 위치를 마스킹한다
gimmick: replace는 기본적으로 첫 번째만 바꿀 수 있지만 replaceAll은 같은 문자열이 여러 번 나와도 전부 바꾸며, 금지어가 없으면 원본 문자열이 그대로 반환된다
starter_code: |
  function maskBannedWord(message, bannedWord) {
    return message;
  }
test_cases:
  - input: ["sale sale today", "sale"]
    output: "*** *** today"
  - input: ["spam-free zone", "spam"]
    output: "***-free zone"
  - input: ["clean message", "ad"]
    output: "clean message"
  - input: ["vip vip vip", "vip"]
    output: "*** *** ***"
---
문자열 안에 있는 특정 금지어를 모두 찾아 `***`로 바꾸는 문제입니다.

## 오늘의 메서드
- `String.replaceAll()`

## 메서드 설명
`replaceAll()`은 문자열 안에서 찾고 싶은 내용을 **모두** 다른 문자열로 바꿔 새 문자열을 반환합니다.
원본 문자열은 바뀌지 않고, 결과만 새로 만들어집니다.

## 기본 문법
```js
message.replaceAll(target, replacement)
```

## 사용 예시
```js
"sale sale today".replaceAll("sale", "***");
// "*** *** today"

"spam-free zone".replaceAll("spam", "***");
// "***-free zone"
```

## 주의할 점
- `replaceAll()`은 **모든** 일치 항목을 바꿉니다.
- 대소문자를 자동으로 무시하지 않습니다. 예를 들어 `"Sale"`과 `"sale"`은 다르게 봅니다.
- 원본 문자열 자체를 수정하지 않고 새 문자열을 반환합니다.
- 찾는 금지어가 없으면 원래 문자열과 같은 내용이 반환됩니다.

## 제한사항
- `message`의 길이는 1 이상 1,000 이하입니다.
- `bannedWord`의 길이는 1 이상 20 이하입니다.
- `message`와 `bannedWord`는 영문 소문자, 공백, 하이픈(`-`)으로만 이루어집니다.
- `bannedWord`가 나타나는 모든 위치를 `***`로 바꾼 결과를 반환합니다.
- 대소문자는 구분합니다.

## 예시
- 입력: `message = "sale sale today"`, `bannedWord = "sale"` → 출력: `"*** *** today"`
- 입력: `message = "spam-free zone"`, `bannedWord = "spam"` → 출력: `"***-free zone"`
- 입력: `message = "clean message"`, `bannedWord = "ad"` → 출력: `"clean message"`

## 힌트
- 첫 번째만 바꾸는 것이 아니라 같은 금지어가 여러 번 나와도 모두 바꿔야 합니다.
- 문자열 메서드 하나로 전체 치환을 처리할 수 있습니다.
- 바꿀 문자열은 항상 `***`입니다.

## 해설
이 문제는 문자열 안의 특정 단어를 **한 번만** 찾는 것이 아니라 **모든 등장 위치**를 바꾸는 연습입니다.

`String.replaceAll()`을 사용하면 금지어를 찾을 때마다 `***`로 바꾼 새 문자열을 바로 얻을 수 있습니다.

예를 들어 `message`가 `"sale sale today"`이고 `bannedWord`가 `"sale"`이면:

```js
"sale sale today".replaceAll("sale", "***")
```

결과는 `"*** *** today"`입니다.

풀이 함수는 아주 간단합니다.

```js
function maskBannedWord(message, bannedWord) {
  return message.replaceAll(bannedWord, "***");
}
```

이 풀이가 좋은 이유는 다음과 같습니다.
- 문자열을 직접 잘라 붙이지 않아도 됩니다.
- 같은 금지어가 여러 번 나와도 한 번에 처리됩니다.
- 금지어가 없을 때도 별도 예외 처리 없이 원래 문자열이 그대로 반환됩니다.

이 문제의 학습 포인트는 `replaceAll()`이 **첫 번째만이 아니라 전체를 치환하는 메서드**라는 점입니다.
문자열 정리, 마스킹, 문구 치환 같은 작업에서 자주 쓰입니다.
