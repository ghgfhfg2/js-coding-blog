---
title: 설정 항목 개수 세기
slug: count-setting-keys
track: js-basic
difficulty: easy
topic: object-basics
tags:
  - beginner
  - object
  - js-method
  - object-keys
  - count
primaryMethod: object-keys-length
coreIdea: 설정 객체의 키 목록을 Object.keys()로 배열로 바꾼 뒤 length로 항목 수를 센다
gimmick: 값이 아니라 객체의 key 개수를 세는 문제라서 배열 길이와 다른 객체 접근 감각이 필요하다
order: 11
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(settings) {
    return 0;
  }
test_cases:
  - input: [{"theme":"dark","fontSize":"large","language":"ko"}]
    output: 3
  - input: [{"sound":true}]
    output: 1
  - input: [{}]
    output: 0
  - input: [{"wifi":false,"bluetooth":false,"airplaneMode":true,"location":true}]
    output: 4
---

설정 정보를 담은 객체 `settings`가 주어질 때, 들어 있는 설정 항목의 개수를 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`Object.keys()`는 객체에 들어 있는 **key 이름들만 모아 배열로 반환**하는 메서드입니다.

## 메서드 설명
이 문제에서는 설정 객체 안에 몇 개의 항목이 들어 있는지 세어야 합니다.
객체는 배열처럼 바로 `length`를 쓸 수 없기 때문에, 먼저 `Object.keys(settings)`로 key 목록을 배열로 만든 뒤 그 배열의 길이를 확인하면 됩니다.

예를 들어 `{ theme: 'dark', language: 'ko' }`에 `Object.keys()`를 적용하면 `['theme', 'language']`가 되고, 길이는 `2`입니다.

## 기본 문법
```js
Object.keys(obj)
```

## 사용 예시
```js
Object.keys({ theme: 'dark', language: 'ko' })
// ['theme', 'language']

Object.keys({ sound: true }).length
// 1

Object.keys({}).length
// 0
```

## 주의할 점
- `Object.keys()`의 결과는 **배열**이므로, 개수를 셀 때는 `.length`를 사용합니다.
- 객체 자체에는 배열처럼 바로 `length`가 없습니다.
- 이 메서드는 **value가 아니라 key 기준**으로 항목을 셉니다.
- 빈 객체 `{}`에 `Object.keys()`를 사용하면 빈 배열 `[]`이 반환됩니다.

## 제한사항
- `settings`는 문자열 key를 가지는 객체입니다.
- 각 value의 자료형은 문자열, 숫자, 불리언 등 무엇이든 될 수 있습니다.
- 설정 항목 수는 0 이상 100 이하입니다.
- 반환값은 객체에 들어 있는 key의 개수입니다.

## 예시
- 입력: `{ theme: 'dark', fontSize: 'large', language: 'ko' }` → 출력: `3`
- 입력: `{ sound: true }` → 출력: `1`
- 입력: `{}` → 출력: `0`

## 힌트
- 객체에 들어 있는 항목 이름들을 먼저 배열로 바꿔 보세요.
- 객체의 개수를 셀 때는 `Object.keys()`가 자주 사용됩니다.
- key 목록을 얻은 뒤에는 배열의 길이를 확인하면 됩니다.

## 해설
이 문제의 핵심은 **객체의 항목 수를 세는 기본 방법**을 익히는 것입니다.

풀이 흐름은 간단합니다.

1. `Object.keys(settings)`를 호출합니다.
2. 객체의 모든 key가 배열로 반환됩니다.
3. 그 배열의 `.length`를 구합니다.
4. 그 값을 반환하면 됩니다.

예를 들어 `{ wifi: false, bluetooth: false, airplaneMode: true, location: true }`라면 key는 다음 네 개입니다.

- `wifi`
- `bluetooth`
- `airplaneMode`
- `location`

따라서 `Object.keys(settings).length`는 `4`가 됩니다.

이 문제에서 배워야 할 포인트는 객체는 배열과 다르게 바로 길이를 알 수 없다는 점입니다.
그래서 `Object.keys()`로 **객체의 key 목록을 배열로 바꾼 뒤 길이를 센다**는 패턴을 익혀 두면, 이후 객체 다루기 문제에서도 아주 유용합니다.
