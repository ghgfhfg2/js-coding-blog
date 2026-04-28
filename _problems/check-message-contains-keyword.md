---
title: 메시지에 안내 키워드가 들어 있는지 확인하기
slug: check-message-contains-keyword
track: js-basic
difficulty: easy
topic: string-search-methods
tags:
  - beginner
  - string
  - js-method
  - includes
  - search
order: 1120
function_name: checkMessageContainsKeyword
time_limit_ms: 200
primaryMethod: String.includes
coreIdea: 메시지 문자열에 찾고 싶은 키워드가 그대로 포함되어 있는지 includes로 검사해 불리언 값을 반환한다
gimmick: 대소문자를 바꾸지 않고 그대로 비교하므로 같은 글자여도 대문자와 소문자가 다르면 포함된 것으로 보지 않는다
starter_code: |
  function checkMessageContainsKeyword(message, keyword) {
    return false;
  }
test_cases:
  - input: ["배송이 시작되었습니다", "배송"]
    output: true
  - input: ["오늘은 휴무입니다", "영업"]
    output: false
  - input: ["Code Review", "Review"]
    output: true
  - input: ["Code Review", "review"]
    output: false
---
문자열 안에 원하는 키워드가 들어 있는지 `includes`로 확인하는 문제입니다.

## 문제 설명
문자열 `message`와 `keyword`가 주어집니다.

`message` 안에 `keyword`가 **그대로 포함되어 있으면** `true`, 아니면 `false`를 반환하는 `checkMessageContainsKeyword` 함수를 작성하세요.

## 오늘의 메서드
- `String.prototype.includes()`

## 메서드 설명
- `includes()`는 문자열 안에 특정 문자열이 포함되어 있는지 확인합니다.
- 포함되어 있으면 `true`, 없으면 `false`를 반환합니다.
- 처음 등장한 위치가 몇 번째인지는 알려주지 않고, 포함 여부만 빠르게 확인할 때 적합합니다.

## 기본 문법
```js
message.includes(keyword)
```

## 사용 예시
```js
"배송이 시작되었습니다".includes("배송") // true
"Code Review".includes("review") // false
"오늘은 휴무입니다".includes("영업") // false
```

## 주의할 점
- 문자열 `includes()`는 **대소문자를 구분**합니다.
- 공백도 문자열의 일부이므로 띄어쓰기 차이까지 그대로 비교합니다.
- 반환값은 위치가 아니라 `true` 또는 `false`입니다.
- 빈 문자열 `""`을 찾으면 JavaScript에서는 `true`가 되지만, 이 문제에서는 `keyword`가 빈 문자열로 주어지지 않습니다.

## 제한사항
- `message`는 길이 `1` 이상 `100` 이하의 문자열입니다.
- `keyword`는 길이 `1` 이상 `20` 이하의 문자열입니다.
- `message`와 `keyword`는 공백을 포함할 수 있습니다.
- 대소문자는 구분해서 비교합니다.
- `keyword`가 `message` 안에 그대로 들어 있으면 `true`, 아니면 `false`를 반환하세요.

## 예시
- 입력: `message = "배송이 시작되었습니다"`, `keyword = "배송"` → 출력: `true`
- 입력: `message = "오늘은 휴무입니다"`, `keyword = "영업"` → 출력: `false`
- 입력: `message = "Code Review"`, `keyword = "review"` → 출력: `false`

## 힌트
- 문자열 안에 특정 부분 문자열이 들어 있는지만 확인하면 됩니다.
- 위치를 구할 필요가 없으니 `indexOf()`보다 `includes()`가 더 읽기 쉽습니다.
- 문제 조건에서 대소문자를 구분하므로 문자열을 변환하지 말고 그대로 비교하세요.

## 해설
이 문제는 `message` 안에 `keyword`가 **그대로 포함되어 있는지** 검사하면 됩니다.

가장 간단한 방법은 문자열 메서드 `includes()`를 사용하는 것입니다.

```js
function checkMessageContainsKeyword(message, keyword) {
  return message.includes(keyword);
}
```

예를 들어 `message`가 `"배송이 시작되었습니다"`이고 `keyword`가 `"배송"`이면,
`"배송"`이라는 부분 문자열이 실제로 들어 있으므로 `true`를 반환합니다.

반대로 `"Code Review".includes("review")`는 `false`입니다.
문자 모양은 비슷해 보여도 `R`과 `r`은 다른 문자이기 때문입니다.

이 문제의 핵심 학습 포인트는 다음과 같습니다.
- **포함 여부만 필요할 때는 `includes()`가 가장 직관적이다.**
- **문자열 비교는 기본적으로 대소문자를 구분한다.**

시간 복잡도는 문자열 길이를 `n`이라고 할 때 일반적으로 `O(n)` 수준으로 생각할 수 있어, 주어진 제한에서 충분히 빠릅니다.
