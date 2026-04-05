---
title: 처음으로 한 번만 나온 문자
slug: first-unique-character
track: today
difficulty: easy
topic: hash
tags:
  - daily
  - beginner
  - hash
  - string
  - frequency
order: 14
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(s) {
    return '';
  }
test_cases:
  - input: ["swiss"]
    output: "w"
  - input: ["aabbccdeeff"]
    output: "d"
  - input: ["aabbcc"]
    output: ""
  - input: [""]
    output: ""
  - input: ["z"]
    output: "z"
---
문자열에서 **한 번만 등장한 문자들 중 가장 먼저 나온 문자**를 찾아 반환하세요. 그런 문자가 없으면 빈 문자열 `""`을 반환하면 됩니다.

## 제한사항
- 입력 `s`는 길이 `0` 이상 `100,000` 이하의 문자열입니다.
- 문자열은 영문 소문자로만 이루어져 있습니다.
- 한 번만 나온 문자가 없으면 빈 문자열 `""`을 반환합니다.
- 반환값은 길이 1의 문자열 또는 빈 문자열입니다.

## 예시
- 입력: `"swiss"` → 출력: `"w"`
- 입력: `"aabbccdeeff"` → 출력: `"d"`
- 입력: `"aabbcc"` → 출력: `""`

## 힌트
- 먼저 각 문자가 몇 번 나왔는지 세어 보세요.
- 그다음 원래 문자열을 다시 앞에서부터 보면서, 등장 횟수가 1인 문자를 찾으면 됩니다.

## 해설
이 문제의 핵심은 **등장 횟수 계산**과 **원래 순서 유지**를 분리하는 것입니다.

1. 첫 번째 순회에서 각 문자의 등장 횟수를 객체나 `Map`에 저장합니다.
2. 두 번째 순회에서 문자열을 다시 앞에서부터 확인합니다.
3. 등장 횟수가 1인 문자를 처음 만나면 바로 반환합니다.
4. 끝까지 없으면 빈 문자열을 반환합니다.

이 방식은 문자열을 두 번만 순회하므로 시간 복잡도는 `O(n)`입니다.

```js
function solution(s) {
  const count = {};

  for (const ch of s) {
    count[ch] = (count[ch] || 0) + 1;
  }

  for (const ch of s) {
    if (count[ch] === 1) {
      return ch;
    }
  }

  return '';
}
```
