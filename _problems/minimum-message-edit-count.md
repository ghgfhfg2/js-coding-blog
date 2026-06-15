---
title: 두 문구를 맞추는 최소 수정 횟수
slug: minimum-message-edit-count
track: algorithm
difficulty: medium
topic: edit-distance
tags:
  - intermediate
  - dynamic-programming
  - string
  - edit-distance
  - space-optimization
order: 1460
function_name: minimumMessageEditCount
time_limit_ms: 500
primaryMethod: two-row-levenshtein-dp
coreIdea: 두 문자열의 접두사끼리 필요한 최소 삽입·삭제·교체 횟수를 DP로 계산하되 직전 행과 현재 행만 유지해 공간 사용량을 줄인다
gimmick: 한쪽 접두사가 비어 있는 초기 상태를 길이만큼의 삽입 또는 삭제 횟수로 채우고 같은 문자를 만났을 때는 수정 비용을 더하지 않는다
starter_code: |
  function minimumMessageEditCount(source, target) {
    return 0;
  }
test_cases:
  - input: ["cat", "cut"]
    output: 1
  - input: ["kitten", "sitting"]
    output: 3
  - input: ["abc", ""]
    output: 3
  - input: ["", "code"]
    output: 4
  - input: ["same", "same"]
    output: 0
---

두 문구를 같게 만들기 위해 필요한 최소 수정 횟수를 구하세요.

## 문제 설명

문자열 `source`와 `target`이 주어집니다.

한 번의 수정으로 다음 연산 중 하나를 수행할 수 있습니다.

- 문자 하나를 삽입합니다.
- 문자 하나를 삭제합니다.
- 문자 하나를 다른 문자로 교체합니다.

`source`를 `target`과 같게 만드는 데 필요한 최소 수정 횟수를 반환하는 `minimumMessageEditCount` 함수를 작성하세요.

## 제한사항

- `0 <= source.length, target.length <= 2,000`
- 두 문자열은 영문 소문자로만 이루어져 있습니다.
- 빈 문자열이 입력될 수 있습니다.
- 삽입, 삭제, 교체는 각각 수정 횟수 `1`로 계산합니다.

## 예시

- 입력: `source = "cat"`, `target = "cut"` -> 출력: `1`
  - `a`를 `u`로 한 번 교체합니다.
- 입력: `source = "kitten"`, `target = "sitting"` -> 출력: `3`
- 입력: `source = "abc"`, `target = ""` -> 출력: `3`
- 입력: `source = "same"`, `target = "same"` -> 출력: `0`

## 힌트

- `dp[i][j]`를 `source`의 앞 `i`글자를 `target`의 앞 `j`글자로 바꾸는 최소 수정 횟수라고 생각해 보세요.
- 마지막 문자가 같으면 이전 접두사의 정답을 그대로 사용할 수 있습니다.
- 마지막 문자가 다르면 삽입, 삭제, 교체 중 가장 적은 비용을 선택합니다.

## 해설

문자열 전체를 한 번에 비교하기보다 두 문자열의 접두사 문제부터 해결하면 더 긴 문자열의 정답을 만들 수 있습니다.

`source`의 앞 `i`글자와 `target`의 앞 `j`글자를 비교한다고 합시다. 마지막 문자가 같다면 새 수정이 필요 없으므로 `dp[i - 1][j - 1]`을 그대로 사용합니다. 마지막 문자가 다르면 다음 세 경우 중 최솟값에 `1`을 더합니다.

- 삽입: `dp[i][j - 1]`
- 삭제: `dp[i - 1][j]`
- 교체: `dp[i - 1][j - 1]`

한쪽 접두사가 비어 있다면 다른 쪽의 모든 문자를 삽입하거나 삭제해야 합니다. 따라서 `dp[0][j] = j`, `dp[i][0] = i`로 초기화합니다.

현재 상태는 직전 행과 현재 행의 값만 참조합니다. 전체 2차원 배열을 저장하지 않고 두 행만 번갈아 사용하면 공간 복잡도를 `O(target.length)`로 줄일 수 있습니다. 두 문자열 중 짧은 쪽을 열로 두면 공간 사용량은 `O(min(source.length, target.length))`가 됩니다.

시간 복잡도는 `O(source.length * target.length)`, 공간 복잡도는 `O(min(source.length, target.length))`입니다.
