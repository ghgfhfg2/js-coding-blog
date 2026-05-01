---
title: 설정 객체에 해당 키가 직접 있는지 확인하기
slug: check-direct-setting-key
track: js-basic
difficulty: easy
topic: object-membership-methods
tags:
  - beginner
  - object
  - js-method
  - Object.hasOwn
  - key-check
order: 1140
function_name: hasDirectSettingKey
time_limit_ms: 200
primaryMethod: Object.hasOwn
coreIdea: 설정 객체에 특정 키가 직접 존재하는지 Object.hasOwn로 확인해 값이 false여도 키가 있으면 true를 반환한다
gimmick: 프로토타입 체인에서 물려받은 키는 제외하고 객체 자신의 키만 확인해야 하며 값이 false나 null이어도 키 존재 여부와는 별개다
starter_code: |
  function hasDirectSettingKey(settings, keyName) {
    return false;
  }
test_cases:
  - input: [{ darkMode: true, notifications: false }, "notifications"]
    output: true
  - input: [{ volume: 0, theme: "light" }, "language"]
    output: false
  - input: [{ premium: null }, "premium"]
    output: true
  - input: [{ constructor: "custom" }, "constructor"]
    output: true
---
## 문제 설명
설정 객체 `settings`와 문자열 `keyName`이 주어집니다.

객체에 `keyName`이 **직접 정의된 키**로 존재하는지 확인해 `true` 또는 `false`를 반환하는 `hasDirectSettingKey` 함수를 작성하세요.

단, 값이 `false`, `0`, `null`이어도 키만 존재하면 `true`여야 하며, 프로토타입 체인에서 물려받은 키는 제외합니다.

설정 객체에 어떤 키가 **직접 들어 있는지** `Object.hasOwn()`으로 확인해 보는 문제입니다.

## 오늘의 메서드
- `Object.hasOwn()`

## 메서드 설명
- `Object.hasOwn(object, propertyKey)`는 객체가 **자기 자신의 키**로 `propertyKey`를 가지고 있으면 `true`를 반환합니다.
- 값이 `false`, `0`, `null`이어도 키만 존재하면 `true`입니다.
- 프로토타입 체인에서 물려받은 키는 세지 않습니다.

## 기본 문법
```js
Object.hasOwn(object, propertyKey)
```

## 사용 예시
```js
const settings = {
  darkMode: true,
  notifications: false,
};

Object.hasOwn(settings, 'darkMode'); // true
Object.hasOwn(settings, 'notifications'); // true
Object.hasOwn(settings, 'language'); // false
```

## 주의할 점
- 이 문제는 **값이 truthy인지**가 아니라 **키가 존재하는지**를 묻습니다.
- `settings[keyName]`가 `false`여도 키가 있으면 정답은 `true`입니다.
- 상속받은 키는 제외하고, 객체에 직접 정의된 키만 확인해야 합니다.

## 제한사항
- `settings`는 평범한 JavaScript 객체입니다.
- `keyName`은 확인할 키 이름 문자열입니다.
- 반환값은 `boolean`입니다.
- 값의 종류는 `boolean`, `number`, `string`, `null` 등 무엇이든 될 수 있습니다.

## 예시
- 입력: `settings = { darkMode: true, notifications: false }`, `keyName = "notifications"` → 출력: `true`
- 입력: `settings = { volume: 0, theme: "light" }`, `keyName = "language"` → 출력: `false`
- 입력: `settings = { premium: null }`, `keyName = "premium"` → 출력: `true`

## 힌트
- `settings[keyName]` 값을 그대로 반환하면 `false`, `0`, `null` 같은 값 때문에 틀릴 수 있습니다.
- 이 문제는 값 비교보다 **키 존재 여부 확인**에 맞는 메서드를 고르는 것이 핵심입니다.
- `Object.hasOwn(settings, keyName)` 형태를 바로 떠올려 보세요.

## 해설
이 문제의 핵심은 **객체에 해당 키가 직접 있는지** 확인하는 것입니다.

예를 들어 `notifications: false`처럼 값이 `false`인 경우,
```js
if (settings[keyName]) {
  ...
}
```
처럼 검사하면 `false`가 되어 키가 없는 것처럼 잘못 판단할 수 있습니다.

그래서 값이 아니라 **키 존재 여부**를 확인해야 하고, 이때 `Object.hasOwn()`이 잘 맞습니다.

```js
function hasDirectSettingKey(settings, keyName) {
  return Object.hasOwn(settings, keyName);
}
```

이 코드는:
- 키가 직접 있으면 `true`
- 없으면 `false`
- 값이 `false`, `0`, `null`이어도 키만 있으면 `true`
를 정확하게 처리합니다.

이 문제로 함께 익혀 두면 좋은 포인트는,
객체를 다룰 때는 **값이 있는지**와 **키가 존재하는지**를 구분해야 한다는 점입니다.
