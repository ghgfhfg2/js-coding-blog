---
title: 가장 길게 대칭인 배너 구간
slug: longest-palindrome-banner-segment
track: today
difficulty: hard
topic: manacher
tags:
  - daily
  - hard
  - string
  - palindrome
  - manacher
  - linear-time
  - substring
order: 1100
function_name: longestPalindromeBannerSegment
time_limit_ms: 250
primaryMethod: manacher-center-radius-propagation
coreIdea: 구분 문자를 끼운 변환 문자열에서 각 중심의 팰린드롬 반지름을 관리하고, 이미 계산된 대칭 구간 정보를 재사용해 가장 긴 팰린드롬 부분 문자열을 선형 시간에 찾는다
gimmick: 홀수 길이와 짝수 길이 팰린드롬을 같은 구조로 처리할 수 있고, 현재 가장 오른쪽까지 확장된 팰린드롬의 거울 위치 반지름을 재사용해 불필요한 재확장을 크게 줄인다
starter_code: |
  function longestPalindromeBannerSegment(s) {
    return "";
  }
test_cases:
  - input: ["babad"]
    output: "bab"
  - input: ["cbbd"]
    output: "bb"
  - input: ["forgeeksskeegfor"]
    output: "geeksskeeg"
  - input: ["abacdfgdcaba"]
    output: "aba"
  - input: [""]
    output: ""
---
문자열에서 가장 길게 좌우 대칭인 연속 구간을 찾는 문제입니다.

## 문제 설명
문자열 `s`가 주어집니다.

`s`의 **연속된 부분 문자열** 중에서, 앞에서 읽어도 뒤에서 읽어도 같은 가장 긴 문자열을 찾아 반환하는 `longestPalindromeBannerSegment` 함수를 작성하세요.

길이가 가장 긴 팰린드롬 부분 문자열이 여러 개라면, **가장 먼저 시작하는 문자열**을 반환합니다.

## 제한사항
- `0 <= s.length <= 200000`
- `s`는 영문 소문자로만 이루어집니다.
- 반환값은 `s`의 연속된 부분 문자열이어야 합니다.
- 길이가 같은 최장 팰린드롬이 여러 개면 시작 인덱스가 가장 작은 것을 반환합니다.

## 예시
- 입력: `s = "babad"` → 출력: `"bab"`
- 입력: `s = "cbbd"` → 출력: `"bb"`
- 입력: `s = "forgeeksskeegfor"` → 출력: `"geeksskeeg"`
- 입력: `s = "abacdfgdcaba"` → 출력: `"aba"`

## 힌트
- 모든 중심에서 양쪽으로 확장하면 구현은 쉽지만 긴 문자열에서는 너무 느릴 수 있습니다.
- 홀수 길이 팰린드롬과 짝수 길이 팰린드롬을 같은 방식으로 다루려면 문자열 사이사이에 구분 문자를 넣는 아이디어가 유용합니다.
- 이미 가장 오른쪽까지 확인해 둔 팰린드롬이 있다면, 그 안쪽 중심의 반지름 일부는 새로 비교하지 않아도 됩니다.

## 해설
가장 단순한 방법은 각 위치를 중심으로 좌우를 확장해 보는 것입니다. 하지만 이 방식은 문자열 길이가 `n`일 때 최악의 경우 `O(n^2)`이 걸립니다.

이 문제의 제한에서는 **Manacher 알고리즘**처럼 각 중심의 팰린드롬 반지름을 재사용하는 방식이 적절합니다.

### 1. 문자열 변환
홀수 길이와 짝수 길이 팰린드롬을 한 번에 처리하려고, 문자열 사이마다 구분 문자 `#`를 넣습니다.

예를 들어

```txt
"abba" -> "#a#b#b#a#"
```

처럼 바꾸면 모든 팰린드롬을 “중심이 하나 있는 형태”로 통일해서 볼 수 있습니다.

### 2. 반지름 배열 관리
`radius[i]`를 변환 문자열에서 중심 `i`를 기준으로 좌우로 몇 칸까지 팰린드롬이 확장되는지 저장한다고 합시다.

또한 다음 두 값을 유지합니다.
- `center`: 현재 가장 오른쪽까지 뻗은 팰린드롬의 중심
- `right`: 그 팰린드롬이 도달한 가장 오른쪽 인덱스

현재 위치 `i`가 `right` 안에 있다면, `i`의 거울 위치 `mirror = 2 * center - i`를 볼 수 있습니다.
이미 계산된 `radius[mirror]`를 그대로 일부 재사용할 수 있으므로, 시작 반지름을

```js
radius[i] = Math.min(right - i, radius[mirror]);
```

로 둘 수 있습니다.

그 뒤에만 실제 문자 비교를 하며 더 확장하면 됩니다.

### 3. 최장 구간 갱신
각 중심에서 얻은 반지름이 지금까지의 최장 길이보다 크면 정답을 갱신합니다.
변환 문자열 기준 반지름 `radius[i]`를 원래 문자열의 시작 인덱스로 바꾸는 공식은 다음과 같습니다.

```js
start = Math.floor((i - radius[i]) / 2)
```

입니다.

길이가 같을 때는 더 이른 시작 인덱스를 고르면 됩니다.

### 4. 복잡도
변환 문자열 길이는 `2n + 1`이고, 각 위치는 재사용 정보 덕분에 전체적으로 많아야 상수 번씩만 확장됩니다.
따라서 전체 시간 복잡도는 `O(n)`, 추가 공간 복잡도도 `O(n)`입니다.
