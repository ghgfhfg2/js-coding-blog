---
title: 서로 다른 로그 조각 개수 세기
slug: count-distinct-log-snippets
track: today
difficulty: hard
topic: suffix-automaton
tags:
  - daily
  - hard
  - string
  - suffix-automaton
  - counting
  - distinct-substrings
order: 1221
function_name: countDistinctLogSnippets
time_limit_ms: 600
primaryMethod: suffix-automaton-length-delta-sum
coreIdea: 문자열을 왼쪽부터 suffix automaton에 추가하면서 각 상태가 새로 대표하게 되는 부분 문자열 개수 len[state] - len[link[state]]를 누적해 서로 다른 부분 문자열 수를 센다
gimmick: 문자를 붙일 때 이미 있던 전이를 그대로 재사용할 수도 있고 clone 상태를 만들어 suffix link를 재배선해야 할 수도 있는데, 각 단계에서 마지막 상태가 새로 기여하는 길이 구간만 더하면 전체 distinct substring 수가 된다
starter_code: |
  function countDistinctLogSnippets(log) {
    return 0;
  }
test_cases:
  - input: ["ababa"]
    output: 9
  - input: ["aaaa"]
    output: 4
  - input: ["banana"]
    output: 15
  - input: ["ababc"]
    output: 12
---
문자열 `log`가 주어질 때, **한 번 이상 등장하는 서로 다른 연속 부분 문자열의 개수**를 구하는 고급 문자열 문제입니다.

## 문제 설명
운영 로그 문자열 `log`가 주어집니다.

`log`에서 시작 위치와 끝 위치를 골라 만들 수 있는 **연속 부분 문자열**들 가운데,
내용이 서로 다른 것만 남겼을 때의 개수를 반환하는 `countDistinctLogSnippets` 함수를 작성하세요.

예를 들어 `log = "ababa"`라면 가능한 부분 문자열은 많이 생기지만,
서로 다른 값만 세면 다음 9개입니다.

- 길이 1: `a`, `b`
- 길이 2: `ab`, `ba`
- 길이 3: `aba`, `bab`
- 길이 4: `abab`, `baba`
- 길이 5: `ababa`

따라서 정답은 `9`입니다.

## 제한사항
- `1 <= log.length <= 200,000`
- `log`는 영문 소문자만으로 이루어집니다.
- 반환값은 JavaScript의 안전한 정수 범위 안에 들어온다고 가정합니다.

## 예시
- 입력: `log = "ababa"` → 출력: `9`
- 입력: `log = "aaaa"` → 출력: `4`
- 입력: `log = "banana"` → 출력: `15`
- 입력: `log = "ababc"` → 출력: `12`

## 힌트
- 모든 부분 문자열을 Set에 넣으면 `O(n^2)`개 후보가 생겨 너무 느립니다.
- suffix automaton의 각 상태는 여러 부분 문자열의 끝 위치 집합을 압축해서 표현합니다.
- 어떤 상태가 담당하는 서로 다른 부분 문자열 개수는 `len[state] - len[link[state]]`로 계산할 수 있습니다.
- 문자열을 한 글자씩 추가할 때 마지막 상태가 새로 만든 부분 문자열 수만 누적해도 됩니다.

## 해설
이 문제를 완전탐색으로 풀면 시작점과 끝점을 모두 골라야 해서 부분 문자열 후보가 `O(n^2)`개 생깁니다. 길이가 200,000까지 갈 수 있으므로 이런 방식은 통과할 수 없습니다.

핵심은 **suffix automaton**입니다.

suffix automaton의 각 상태는 다음 두 값을 중심으로 생각하면 됩니다.
- `len[state]`: 그 상태가 표현할 수 있는 부분 문자열들 중 가장 긴 길이
- `link[state]`: 같은 끝 위치 집합을 가지는 더 짧은 대표 상태

어떤 상태 `state`가 대표하는 서로 다른 부분 문자열들의 길이 범위는:

```text
len[link[state]] + 1 부터 len[state] 까지
```

입니다. 그래서 이 상태가 새롭게 담당하는 서로 다른 부분 문자열 개수는 정확히

```text
len[state] - len[link[state]]
```

가 됩니다.

문자 하나를 suffix automaton에 추가할 때마다:
1. 새로운 마지막 상태 `cur`를 만든다.
2. 이전 상태들에서 현재 문자 전이가 없던 곳에 `cur`로 가는 전이를 채운다.
3. 이미 같은 문자 전이가 있는데 길이 조건이 맞지 않으면 **clone 상태**를 만들어 전이를 복사하고 suffix link를 다시 연결한다.
4. 마지막에 새 상태 `cur`가 기여한 값 `len[cur] - len[link[cur]]`를 답에 더한다.

이 누적값이 왜 전체 서로 다른 부분 문자열 수가 될까요?
- 새 문자를 뒤에 붙이면, 새로 생기는 부분 문자열은 반드시 "현재 위치에서 끝나는 부분 문자열"입니다.
- suffix automaton의 마지막 상태 `cur`가 바로 그 새 끝점에서 생긴 서로 다른 부분 문자열들을 압축해서 대표합니다.
- 그 개수가 `len[cur] - len[link[cur]]`이므로, 매 단계 이 값만 더하면 중복 없이 전체 개수를 셀 수 있습니다.

시간 복잡도는 `O(n)`이고, 공간 복잡도도 `O(n)`입니다. 큰 입력에서도 안정적으로 동작하는 전형적인 hard 문자열 문제입니다.
