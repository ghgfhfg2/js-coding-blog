---
title: 금지 단어를 피하는 최소 수정 횟수
slug: minimum-edits-avoid-banned-words
track: today
difficulty: hard
topic: automaton-dp
tags:
  - daily
  - hard
  - aho-corasick
  - dynamic-programming
  - string
order: 1550
function_name: minimumEditsAvoidBannedWords
time_limit_ms: 700
primaryMethod: aho-corasick-state-dp
coreIdea: 금지 단어들을 Aho-Corasick 자동자로 묶고 문자열을 왼쪽부터 만들며 현재 자동자 상태별 최소 수정 횟수를 DP로 갱신해 금지 패턴이 등장하지 않는 최소 비용을 구한다
gimmick: 현재 위치의 문자를 그대로 쓸 수도 바꿀 수도 있지만, 전이 후 금지 단어가 끝나는 상태는 즉시 버려야 한다
starter_code: |
  function minimumEditsAvoidBannedWords(message, banned) {
    return 0;
  }
test_cases:
  - input: ["ababa", ["aba", "bb"]]
    output: 1
  - input: ["aaaa", ["aa"]]
    output: 2
  - input: ["abcde", ["ab", "bc", "cd", "de", "ace"]]
    output: 2
  - input: ["abc", ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]]
    output: -1
  - input: ["", ["a"]]
    output: 0
---

## 문제 설명
소문자로 이루어진 문자열 `message`와 금지 단어 목록 `banned`가 주어집니다.

`message`의 각 문자는 원하는 소문자 한 글자로 바꿀 수 있고, 한 글자를 바꾸는 비용은 `1`입니다. 문자를 바꾸지 않는 비용은 `0`입니다.

수정이 끝난 문자열 안에 `banned`의 어떤 단어도 연속 부분 문자열로 등장하지 않게 만들 때 필요한 최소 수정 횟수를 반환하는 `minimumEditsAvoidBannedWords` 함수를 작성하세요. 어떤 방식으로 수정해도 조건을 만족할 수 없다면 `-1`을 반환합니다.

## 제한사항
- `0 <= message.length <= 2000`
- `1 <= banned.length <= 200`
- `1 <= banned[i].length <= 50`
- `message`와 `banned[i]`는 모두 알파벳 소문자 `a`부터 `z`까지만 포함합니다.
- 같은 금지 단어가 여러 번 주어질 수 있습니다.
- 반환값은 금지 단어가 하나도 등장하지 않게 만드는 최소 수정 횟수입니다.

## 예시
- 입력: `message = "ababa"`, `banned = ["aba", "bb"]` -> 출력: `1`
- 입력: `message = "aaaa"`, `banned = ["aa"]` -> 출력: `2`
- 입력: `message = "abcde"`, `banned = ["ab", "bc", "cd", "de", "ace"]` -> 출력: `2`
- 입력: `message = "abc"`, `banned = ["a", "b", ..., "z"]` -> 출력: `-1`
- 입력: `message = ""`, `banned = ["a"]` -> 출력: `0`

## 힌트
- 금지 단어를 하나씩 검사하면 각 후보 문자열마다 너무 많은 비교가 필요합니다.
- 여러 패턴을 동시에 추적할 수 있는 자동자를 만들면, 현재까지 만든 접미사가 어떤 금지 단어의 접두사와 일치하는지 상태 하나로 표현할 수 있습니다.
- DP 상태는 "현재 위치까지 처리했고 자동자의 어느 상태에 있는가"로 잡아 보세요.

## 해설
이 문제는 단순히 금지 단어를 발견할 때마다 문자를 바꾸는 방식으로는 풀기 어렵습니다. 한 글자 수정이 여러 금지 단어를 동시에 없앨 수도 있고, 반대로 지금 안전해 보이는 선택이 뒤에서 더 큰 비용을 만들 수도 있기 때문입니다.

먼저 `banned`의 모든 단어를 Aho-Corasick 자동자에 넣습니다. 각 노드는 지금까지 만든 문자열의 접미사가 어떤 금지 단어 접두사와 맞는지를 나타냅니다. 실패 링크를 만든 뒤에는 어떤 문자로 이동하더라도 다음 상태를 `O(1)`에 알 수 있게 전이를 채웁니다.

이때 어떤 노드가 금지 단어의 끝이거나 실패 링크를 따라가다 금지 단어 끝을 만난다면, 그 상태는 이미 금지 단어가 등장한 상태입니다. 따라서 DP 전이에서 그런 상태는 사용할 수 없습니다.

DP는 다음처럼 진행합니다.

1. `dp[state]`를 현재까지 처리한 뒤 자동자 `state`에 있을 때의 최소 수정 횟수로 둡니다.
2. 시작은 루트 상태 비용 `0`입니다.
3. `message`의 각 위치마다 `'a'`부터 `'z'`까지 모든 후보 문자를 시도합니다.
4. 후보 문자가 원래 문자와 같으면 비용 `0`, 다르면 비용 `1`을 더합니다.
5. 후보 문자로 전이한 상태가 금지 상태라면 버립니다.
6. 모든 문자를 처리한 뒤 남은 상태 비용 중 최솟값을 답으로 반환합니다.

예를 들어 `message = "aaaa"`, `banned = ["aa"]`라면 같은 문자가 연속으로 두 번 나오면 안 됩니다. `"abab"`처럼 두 위치를 바꾸면 조건을 만족할 수 있고, 한 번만 수정해서는 길이 4 안의 모든 인접 쌍을 피할 수 없으므로 답은 `2`입니다.

자동자 노드 수를 `S`, 문자열 길이를 `n`이라고 하면 DP는 각 위치마다 모든 상태와 26개 문자를 확인하므로 시간 복잡도는 `O(n * S * 26)`입니다. `S`는 금지 단어 전체 길이의 합 이하입니다. 공간 복잡도는 현재 행과 다음 행만 유지하면 `O(S)`입니다.
