---
title: 활성 설정 개수 세기
slug: count-enabled-settings
track: js-basic
difficulty: easy
topic: object-basics
tags:
  - beginner
  - object
  - js-method
  - Object.keys
  - counting
order: 23
function_name: solution
time_limit_ms: 200
primaryMethod: Object.keys
coreIdea: 설정 객체의 키 목록을 구한 뒤 각 키의 값이 true인지 확인해 활성 설정 개수를 센다
gimmick: 값이 false인 키도 객체에는 존재하므로 키 개수 자체가 아니라 값 비교로만 세야 한다
starter_code: |
  function solution(settings) {
    return 0;
  }
test_cases:
  - input: [{"darkMode": true, "emailAlert": false, "autoSave": true}]
    output: 2
  - input: [{"sound": false, "vibration": false}]
    output: 0
  - input: [{"backup": true}]
    output: 1
  - input: [{"sync": true, "beta": true, "ads": true, "location": false}]
    output: 3
---

불리언 값만 담긴 객체 `settings`가 주어질 때, 값이 `true`인 설정의 개수를 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`Object.keys()`는 객체에 들어 있는 **키 이름들만 배열로 꺼내는 메서드**입니다.

## 메서드 설명
이 문제에서는 설정 객체 안에 어떤 항목들이 들어 있는지 먼저 알아야 합니다.
`Object.keys()`를 사용하면 객체의 키들을 배열로 얻을 수 있고, 그 배열을 순회하면서 각 설정 값이 `true`인지 확인할 수 있습니다.

예를 들어 `{ darkMode: true, emailAlert: false, autoSave: true }`에 `Object.keys()`를 적용하면 `['darkMode', 'emailAlert', 'autoSave']`를 얻습니다.
이후 각 키로 원래 객체에 접근해서 값이 `true`인 항목만 세면 됩니다.

## 기본 문법
```js
Object.keys(obj)
```

## 사용 예시
```js
const settings = {
  darkMode: true,
  emailAlert: false,
  autoSave: true,
};

Object.keys(settings); // ['darkMode', 'emailAlert', 'autoSave']
settings['darkMode']; // true
settings['emailAlert']; // false
```

## 주의할 점
- `Object.keys()`의 결과는 **배열**입니다.
- `Object.keys()`는 키 이름만 알려 주므로, 실제 값은 `settings[key]`처럼 다시 꺼내야 합니다.
- 값이 `false`인 키도 객체 안에는 존재하므로, **키 개수 전체를 반환하면 안 됩니다.**
- 이 문제에서는 모든 값이 불리언이라고 가정합니다.

## 제한사항
- `settings`는 1개 이상 50개 이하의 키를 가진 객체입니다.
- 각 값은 `true` 또는 `false`입니다.
- 키 이름은 서로 중복되지 않습니다.
- 반환값은 값이 `true`인 설정의 개수입니다.

## 예시
- 입력: `{ darkMode: true, emailAlert: false, autoSave: true }` → 출력: `2`
- 입력: `{ sound: false, vibration: false }` → 출력: `0`
- 입력: `{ backup: true }` → 출력: `1`

## 힌트
- 먼저 객체의 키 목록을 배열로 꺼내 보세요.
- 키를 하나씩 보면서 `settings[key]`가 `true`인지 확인하면 됩니다.
- `true`일 때만 개수를 1 증가시키면 됩니다.

## 해설
이 문제의 핵심은 **객체의 모든 설정 항목을 순회하면서 활성화된 것만 세는 것**입니다.

풀이 흐름은 다음과 같습니다.

1. `Object.keys(settings)`로 설정 이름 목록을 배열로 만듭니다.
2. 그 배열을 처음부터 끝까지 확인합니다.
3. 현재 키를 `key`라고 할 때, `settings[key] === true`이면 개수를 1 증가시킵니다.
4. 순회가 끝나면 누적한 개수를 반환합니다.

예를 들어 `{ darkMode: true, emailAlert: false, autoSave: true }`라면:
- `darkMode`는 `true`이므로 카운트 +1
- `emailAlert`는 `false`이므로 그대로
- `autoSave`는 `true`이므로 카운트 +1

최종 결과는 `2`입니다.

이 문제의 학습 포인트는 객체를 다룰 때 `Object.keys()`로 **무슨 키가 들어 있는지 먼저 파악**하고, 그다음 각 키로 값에 접근하는 흐름을 익히는 것입니다.
초급 단계에서는 객체 전체를 바로 다루기보다, **키 목록을 배열처럼 순회한다**고 생각하면 이해하기 쉽습니다.
