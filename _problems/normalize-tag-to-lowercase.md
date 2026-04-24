---
title: 태그를 소문자로 정리하기
slug: normalize-tag-to-lowercase
track: js-basic
difficulty: easy
topic: string-case-methods
tags:
  - beginner
  - string
  - js-method
  - toLowerCase
  - normalization
order: 55
function_name: normalizeTagToLowercase
time_limit_ms: 200
primaryMethod: String.toLowerCase
coreIdea: 태그 문자열을 toLowerCase로 모두 소문자로 바꿔 검색이나 비교에 쓰기 쉬운 형태로 정리한다
gimmick: 공백이나 숫자처럼 대소문자가 없는 문자는 그대로 두고 알파벳만 소문자로 변환된다
starter_code: |
  function normalizeTagToLowercase(tag) {
    return tag;
  }
test_cases:
  - input: ["JavaScript"]
    output: "javascript"
  - input: ["API Guide"]
    output: "api guide"
  - input: ["CSS3"]
    output: "css3"
  - input: ["already-small"]
    output: "already-small"
---
태그 문자열 `tag`가 주어질 때, 모든 영문자를 소문자로 바꾼 문자열을 반환하는 `normalizeTagToLowercase` 함수를 작성하세요.

## 오늘의 메서드
- `String.toLowerCase()`

## 메서드 설명
`toLowerCase()`는 문자열 안의 영문 대문자를 소문자로 바꾼 새 문자열을 반환하는 메서드입니다.
검색어 비교나 태그 정리처럼 대소문자를 통일하고 싶을 때 자주 사용합니다.

## 기본 문법
```js
str.toLowerCase()
```

## 사용 예시
```js
"JavaScript".toLowerCase(); // "javascript"
"API Guide".toLowerCase();  // "api guide"
"CSS3".toLowerCase();       // "css3"
```

## 주의할 점
- `toLowerCase()`는 원본 문자열을 직접 바꾸지 않고 새 문자열을 반환합니다.
- 영문자가 아닌 공백, 숫자, 하이픈 같은 문자는 그대로 유지됩니다.
- 이미 소문자인 문자열에 써도 에러가 나지 않고 그대로 같은 형태가 반환됩니다.
- 이 문제에서는 문자열 전체를 한 번에 소문자로 바꾸면 됩니다.

## 제한사항
- `tag`는 길이 1 이상 50 이하의 문자열입니다.
- `tag`는 영문 대소문자, 숫자, 공백, 하이픈(`-`)을 포함할 수 있습니다.
- 반환값은 `tag`의 영문자를 모두 소문자로 바꾼 문자열입니다.

## 예시
- 입력: `"JavaScript"` → 출력: `"javascript"`
- 입력: `"API Guide"` → 출력: `"api guide"`
- 입력: `"CSS3"` → 출력: `"css3"`

## 힌트
- 문자열의 일부만 바꿀 필요가 아니라 전체를 소문자로 통일하면 됩니다.
- 반복문 없이 문자열 메서드 하나로 해결할 수 있습니다.
- 대문자만 바뀌고 숫자나 공백은 그대로 남는다는 점을 떠올려 보세요.

## 해설
이 문제의 핵심은 문자열의 **대소문자 형태를 일정하게 맞추는 방법**을 익히는 것입니다.

태그나 검색 키워드는 `JavaScript`, `JAVASCRIPT`, `javascript`처럼 여러 형태로 들어올 수 있습니다.
이럴 때 `String.toLowerCase()`를 사용하면 모든 영문자를 소문자로 바꿔 비교하기 쉬운 형태로 만들 수 있습니다.

예를 들어 `tag`가 `"API Guide"`라면:

```js
tag.toLowerCase(); // "api guide"
```

공백과 숫자는 그대로 유지됩니다.

```js
"CSS3".toLowerCase(); // "css3"
```

따라서 정답 코드는 아주 간단합니다.

```js
function normalizeTagToLowercase(tag) {
  return tag.toLowerCase();
}
```

이 문제에서 배우면 좋은 점은 다음과 같습니다.
- 문자열의 대소문자를 통일할 때 `toLowerCase()`를 바로 떠올릴 수 있습니다.
- 원본 문자열을 바꾸지 않고 새 문자열을 반환한다는 점을 익힐 수 있습니다.
- 검색, 태그 정리, 비교 전처리 같은 기초 문자열 처리 감각을 키울 수 있습니다.
