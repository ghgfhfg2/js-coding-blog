---
title: 닉네임 앞뒤 공백 제거하기
slug: trim-nickname-input
track: js-basic
difficulty: easy
topic: string-cleanup
tags:
  - beginner
  - string
  - js-method
  - trim
  - whitespace
order: 34
function_name: solution
time_limit_ms: 200
primaryMethod: String.trim
coreIdea: 입력 문자열의 앞뒤 공백만 trim으로 제거하고 가운데 공백은 그대로 둔 정리된 닉네임을 반환한다
gimmick: 문자열 중간의 공백은 지우지 않고 맨 앞과 맨 뒤 공백만 제거해야 한다
starter_code: |
  function solution(nickname) {
    return "";
  }
test_cases:
  - input: ["  sooya  "]
    output: "sooya"
  - input: ["open claw"]
    output: "open claw"
  - input: ["   hello world   "]
    output: "hello world"
  - input: ["      "]
    output: ""
---

## 문제 설명
문자열 `nickname`이 주어질 때, 문자열의 **맨 앞과 맨 뒤 공백만 제거한 결과**를 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`trim()`은 문자열의 시작과 끝에 붙은 공백 문자를 제거할 때 사용하는 메서드입니다.

## 메서드 설명
이 문제에서는 사용자가 입력한 닉네임의 앞뒤에 실수로 들어간 공백을 정리해야 합니다.
`trim()`을 사용하면 문자열의 앞부분과 뒷부분에 붙은 불필요한 공백을 한 번에 제거할 수 있습니다.

예를 들어 `"  sooya  "`에 `trim()`을 적용하면 `"sooya"`가 됩니다.
반대로 문자열 가운데에 있는 공백은 닉네임의 일부일 수 있으므로 그대로 유지됩니다.

## 기본 문법
```js
str.trim()
```

## 사용 예시
```js
'  sooya  '.trim() // 'sooya'
'   hello world   '.trim() // 'hello world'
'open claw'.trim() // 'open claw'
'      '.trim() // ''
```

## 주의할 점
- `trim()`은 **앞뒤 공백만 제거**합니다.
- 문자열 **가운데 공백은 제거하지 않습니다.**
- 원본 문자열을 직접 바꾸는 것이 아니라, 공백이 정리된 **새 문자열**을 반환합니다.
- 공백만 있는 문자열에 `trim()`을 쓰면 빈 문자열 `""`이 됩니다.

## 제한사항
- `nickname`은 길이 0 이상 100 이하의 문자열입니다.
- 문자열에는 영문자, 숫자, 공백이 들어올 수 있습니다.
- 문자열 가운데 공백은 그대로 유지해야 합니다.
- 반환값은 앞뒤 공백이 제거된 문자열입니다.

## 예시
- 입력: `"  sooya  "` → 출력: `"sooya"`
- 입력: `"open claw"` → 출력: `"open claw"`
- 입력: `"   hello world   "` → 출력: `"hello world"`
- 입력: `"      "` → 출력: `""`

## 힌트
- 공백을 하나씩 직접 검사해서 자르기보다, 문자열 양끝 공백을 정리하는 메서드를 떠올려 보세요.
- 문제에서 중요한 것은 **가운데 공백은 유지하고 양끝만 제거하는 것**입니다.

## 해설
이 문제의 핵심은 입력 문자열을 사람이 보기 좋게 **앞뒤만 정리**하는 것입니다.
이럴 때 가장 잘 맞는 메서드가 `trim()`입니다.

풀이 방법은 아주 단순합니다.

1. `nickname.trim()`을 호출합니다.
2. 반환된 문자열을 그대로 반환합니다.

예를 들어 `"  sooya  "`는 앞뒤에 공백이 있으므로 `trim()` 이후 `"sooya"`가 됩니다.
`"open claw"`는 양끝에 불필요한 공백이 없으므로 그대로 `"open claw"`가 반환됩니다.
또 `"   hello world   "`처럼 가운데 공백이 있는 경우에도, 양끝만 제거되고 가운데 공백은 남습니다.

정답 코드는 아래처럼 매우 간단하게 쓸 수 있습니다.

```js
function solution(nickname) {
  return nickname.trim();
}
```

이 문제의 학습 포인트는 문자열 입력을 다룰 때 `trim()`이 아주 자주 쓰인다는 점입니다.
폼 입력값이나 사용자 닉네임처럼 **앞뒤 공백만 정리하고 싶을 때** 직접 반복문을 쓰기보다 `trim()`을 사용하면 코드가 짧고 의도도 분명해집니다.
