---
title: 팰린드롬으로 만드는 최소 삽입 횟수
slug: palindrome-min-insertions
track: algorithm
difficulty: medium
topic: dynamic-programming
tags:
  - algorithm
  - dynamic-programming
  - string
  - interval-dp
  - palindrome
  - intermediate
order: 45
function_name: minInsertionsToPalindrome
primaryMethod: interval-dp-two-end-match
time_limit_ms: 300
coreIdea: 문자열의 양 끝 문자가 같으면 안쪽 구간의 답을 그대로 쓰고 다르면 한쪽 끝에 맞춰 문자를 삽입하는 두 선택 중 더 적은 값을 택하는 구간 DP로 최소 삽입 횟수를 구한다
gimmick: 문자를 실제로 만들어 보지 않고 부분 문자열별 최소 삽입 횟수만 저장해도 전체 최적해를 구할 수 있으며 빈 문자열과 한 글자 문자열은 이미 팰린드롬이다
starter_code: |
  function minInsertionsToPalindrome(s) {
    return 0;
  }
test_cases:
  - input: ["race"]
    output: 3
  - input: ["abca"]
    output: 1
  - input: ["zzazz"]
    output: 0
  - input: [""]
    output: 0
  - input: ["mbadm"]
    output: 2
---
## 문제 설명
문자열 `s`가 주어질 때, 몇 개의 문자를 **아무 위치에나 삽입**해서 문자열 전체를 팰린드롬으로 만들 수 있습니다.

이때 필요한 **최소 삽입 횟수**를 반환하는 `minInsertionsToPalindrome` 함수를 작성하세요.

팰린드롬은 앞에서 읽어도 뒤에서 읽어도 같은 문자열입니다.

예를 들어 `"abca"`는 `b` 뒤에 `c`를 하나 삽입해 `"abcba"`로 만들 수 있으므로 정답은 `1`입니다.

## 제한사항
- `s.length`는 `0` 이상 `500` 이하입니다.
- `s`는 영어 소문자로만 이루어집니다.
- 문자는 문자열의 아무 위치에나 삽입할 수 있습니다.
- 반환값은 팰린드롬을 만들기 위한 최소 삽입 횟수입니다.

## 예시
- 입력: `"race"` → 출력: `3`
- 입력: `"abca"` → 출력: `1`
- 입력: `"zzazz"` → 출력: `0`
- 입력: `""` → 출력: `0`

## 힌트
- 양 끝 문자가 이미 같다면, 그 둘은 그대로 두고 안쪽 부분만 생각해도 됩니다.
- 양 끝 문자가 다르면 왼쪽 문자를 맞춰 넣을지, 오른쪽 문자를 맞춰 넣을지 두 경우를 비교해 보세요.
- 전체 문자열을 한 번에 보지 말고, `s[left...right]` 같은 부분 문자열의 답을 쌓아 가면 정리가 됩니다.

## 해설
이 문제는 **부분 문자열의 최소 삽입 횟수**를 저장하는 구간 DP로 풀 수 있습니다.

`dp[left][right]`를 `s[left...right]`를 팰린드롬으로 만들기 위한 최소 삽입 횟수라고 정의해 봅시다.

### 1. 양 끝 문자가 같은 경우
`s[left] === s[right]`라면 양 끝은 이미 서로 짝이 맞습니다.
따라서 안쪽 부분 문자열만 팰린드롬으로 만들면 됩니다.

```js
dp[left][right] = dp[left + 1][right - 1]
```

### 2. 양 끝 문자가 다른 경우
둘 중 하나에 맞춰 문자를 하나 삽입해야 합니다.

- `s[left]`에 맞는 문자를 오른쪽 쪽에 삽입하고 `s[left + 1...right]`를 해결
- `s[right]`에 맞는 문자를 왼쪽 쪽에 삽입하고 `s[left...right - 1]`를 해결

둘 중 더 적게 드는 쪽을 고르면 됩니다.

```js
dp[left][right] = Math.min(dp[left + 1][right], dp[left][right - 1]) + 1
```

### 3. 초기값
- 길이 0 또는 1인 문자열은 이미 팰린드롬이므로 비용이 `0`입니다.

### 4. 채우는 순서
짧은 부분 문자열부터 긴 부분 문자열 순서로 DP 테이블을 채우면, 필요한 더 작은 구간 값이 항상 먼저 준비되어 있습니다.

예를 들어 `"mbadm"`은:
- 양 끝 `m`과 `m`은 이미 같으므로 안쪽 `"bad"`만 보면 됩니다.
- `"bad"`는 최소 2번 삽입이 필요하므로 전체 답도 `2`입니다.

이 풀이의 시간 복잡도는 `O(n^2)`, 공간 복잡도도 `O(n^2)`입니다. 문자열 길이가 500 이하라서 충분히 사용할 수 있습니다.
