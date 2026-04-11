---
title: 한 글자만 바꿔 만들 수 있는 가장 긴 동일 문자 구간
slug: longest-uniform-streak-after-one-edit
track: today
difficulty: medium
topic: frequency-window
tags:
  - daily
  - medium
  - sliding-window
  - hash-map
  - frequency
  - string
order: 40
function_name: longestUniformStreakAfterOneEdit
time_limit_ms: 200
primaryMethod: sliding-window-max-frequency
coreIdea: 슬라이딩 윈도우 안에서 가장 많이 나온 문자 수를 유지하면 구간 길이에서 그 값을 뺀 수가 1 이하일 때만 한 번 수정으로 모두 같은 문자로 만들 수 있다
gimmick: 윈도우 내부 최빈 문자 기준으로 바꿔야 할 문자 수를 즉시 판정해 가장 긴 유효 구간만 남긴다
starter_code: |
  function longestUniformStreakAfterOneEdit(s) {
    // 여기에 코드를 작성하세요.
  }
test_cases:
  - input: ["AABABBA"]
    output: 4
  - input: ["AAAA"]
    output: 4
  - input: ["ABCD"]
    output: 2
  - input: ["BAAAC"]
    output: 4
---
문자열에서 **최대 한 글자만 다른 문자로 바꿀 수 있을 때**, 같은 문자만으로 이루어진 가장 긴 연속 구간의 길이를 구하세요.

예를 들어 `"AABABBA"`에서는 한 글자를 바꿔 `"AAAA"` 같은 길이 4 구간을 만들 수 있습니다.

## 제한사항
- `1 <= s.length <= 100,000`
- `s`는 영어 대문자로만 이루어집니다.
- 한 글자를 바꾸지 않아도 됩니다.
- 반환값은 만들 수 있는 가장 긴 동일 문자 연속 구간의 길이입니다.

## 예시
- 입력: `"AABABBA"` → 출력: `4`
- 입력: `"AAAA"` → 출력: `4`
- 입력: `"ABCD"` → 출력: `2`
- 입력: `"BAAAC"` → 출력: `4`

## 힌트
- 어떤 구간 안에서 가장 많이 등장한 문자를 기준으로 생각해 보세요.
- 현재 구간 길이에서 `가장 많이 나온 문자 개수`를 빼면, 바꿔야 하는 문자 수를 알 수 있습니다.
- 바꿔야 하는 문자가 2개 이상이 되면 왼쪽 경계를 줄여야 합니다.

## 해설
슬라이딩 윈도우로 현재 연속 구간 후보를 관리합니다.

구간 안에서 가장 많이 나온 문자의 개수를 `maxFreq`라고 하면,
이 구간을 전부 같은 문자로 만들기 위해 바꿔야 하는 글자 수는:

`구간 길이 - maxFreq`

입니다.

우리는 **최대 한 글자만** 바꿀 수 있으므로,
이 값이 `1` 이하인 구간만 유효합니다.

따라서 오른쪽 포인터를 한 칸씩 늘리면서 문자 빈도를 세고,
`구간 길이 - maxFreq > 1` 이 되는 순간 왼쪽 포인터를 이동시켜 구간을 다시 줄입니다.
그 과정에서 만들 수 있는 최대 구간 길이를 계속 갱신하면 됩니다.

예를 들어 `"BAAAC"`를 보면:
- `"BAAA"` 구간에서는 `A`가 3개이므로 1글자만 바꾸면 전부 같은 문자로 만들 수 있습니다.
- 길이 4가 가능하므로 정답 후보는 4입니다.
- `"BAAAC"` 전체는 길이 5인데 가장 많이 나온 문자는 `A` 3개뿐이라 2글자를 바꿔야 해서 불가능합니다.

이 방식은 문자열을 한 번 훑으면서 처리할 수 있어 시간 복잡도는 `O(n)`입니다.
