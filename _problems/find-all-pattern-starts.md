---
title: 패턴이 시작되는 모든 위치 찾기
slug: find-all-pattern-starts
track: algorithm
difficulty: medium
topic: kmp
tags:
  - algorithm
  - string
  - kmp
  - prefix-function
  - pattern-matching
  - intermediate
order: 47
function_name: findAllPatternStarts
time_limit_ms: 300
primaryMethod: prefix-function-kmp-search
coreIdea: 패턴의 접두사이자 접미사인 길이 정보를 미리 만들어 두고, 본문 문자열을 한 번만 훑으면서 불일치 시 점프해 모든 매칭 시작 위치를 찾는다
gimmick: 매칭이 끝난 뒤에도 prefix 정보로 즉시 다음 가능한 상태로 이어 가야 겹쳐서 나타나는 패턴까지 놓치지 않는다
starter_code: |
  function findAllPatternStarts(text, pattern) {
    return [];
  }
test_cases:
  - input: ["ababaaba", "aba"]
    output: [0, 2, 5]
  - input: ["aaaaa", "aa"]
    output: [0, 1, 2, 3]
  - input: ["codingtest", "test"]
    output: [6]
  - input: ["hello", "world"]
    output: []
  - input: ["abc", ""]
    output: []
---
본문 문자열 `text` 안에서 패턴 문자열 `pattern`이 시작되는 모든 인덱스를 오름차순으로 구해 보세요.

## 문제 설명
문자열 `text`와 `pattern`이 주어집니다.

`text` 안에서 `pattern`과 정확히 일치하는 부분 문자열이 시작되는 모든 위치를 찾아 배열로 반환하는 `findAllPatternStarts` 함수를 작성하세요.

반환하는 인덱스는 **0부터 시작**합니다.
같은 패턴이 서로 **겹쳐서** 나타나는 경우도 모두 포함해야 합니다.

예를 들어 `text = "aaaaa"`, `pattern = "aa"`이면 시작 위치는 `0, 1, 2, 3`입니다.

## 제한사항
- `0 <= text.length <= 200000`
- `0 <= pattern.length <= 200000`
- `text`와 `pattern`은 영문 소문자로만 이루어집니다.
- `pattern`이 빈 문자열이면 빈 배열 `[]`을 반환합니다.
- 반환값은 `pattern`이 시작되는 모든 인덱스를 오름차순으로 담은 배열입니다.

## 예시
- 입력: `text = "ababaaba"`, `pattern = "aba"` → 출력: `[0, 2, 5]`
- 입력: `text = "aaaaa"`, `pattern = "aa"` → 출력: `[0, 1, 2, 3]`
- 입력: `text = "codingtest"`, `pattern = "test"` → 출력: `[6]`
- 입력: `text = "hello"`, `pattern = "world"` → 출력: `[]`

## 힌트
- 매 위치마다 패턴을 처음부터 다시 비교하면 최악의 경우 너무 느립니다.
- 패턴 내부에서, 어떤 접두사와 접미사가 같은 길이로 이어지는지 미리 알면 불일치가 났을 때 비교를 많이 건너뛸 수 있습니다.
- 패턴을 다 찾은 직후에도 바로 0으로 리셋하지 말고, 다음 가능한 접두사 길이로 이어 가야 겹치는 매칭을 찾을 수 있습니다.

## 해설
이 문제는 문자열 검색의 대표 알고리즘인 **KMP**를 연습하는 문제입니다.

### 왜 단순 비교로는 아쉬울까?
`text`의 각 위치에서 `pattern`을 처음부터 끝까지 비교하면 최악의 경우 `O(n * m)`이 될 수 있습니다.
문자열 길이가 최대 200,000까지 가능하므로 더 효율적인 방법이 필요합니다.

### 핵심 아이디어
KMP는 `pattern`에 대해 먼저 **lps 배열**(longest prefix suffix)을 만듭니다.

`lps[i]`는 `pattern[0..i]` 구간에서,
- 자기 자신 전체는 제외하고
- 접두사이면서 접미사인 문자열의 최대 길이입니다.

이 정보를 알고 있으면 비교하다가 불일치가 났을 때,
이미 맞았던 부분 중 다시 활용할 수 있는 가장 긴 접두사 길이로 즉시 점프할 수 있습니다.

### 풀이 순서
1. `pattern`이 빈 문자열이면 바로 `[]`를 반환합니다.
2. `pattern`의 `lps` 배열을 만듭니다.
3. `text`를 왼쪽부터 한 번 순회하면서 현재까지 몇 글자를 맞췄는지 `j`로 관리합니다.
4. 문자가 다를 때는 `j = lps[j - 1]`로 줄이며 다시 비교합니다.
5. 문자가 같으면 `j`를 1 늘립니다.
6. `j === pattern.length`가 되면 매칭 하나를 찾은 것이므로 시작 인덱스 `i - pattern.length + 1`를 답에 넣습니다.
7. 그다음 `j = lps[j - 1]`로 바꿔, 겹치는 다음 매칭 가능성까지 이어서 탐색합니다.

### 겹치는 매칭이 왜 중요한가?
`text = "aaaaa"`, `pattern = "aa"`를 보겠습니다.

- `0`에서 한 번 찾고 끝내 버리면 `[0, 2]`처럼 잘못 셀 수 있습니다.
- 하지만 실제로는 `[0, 1, 2, 3]`이 맞습니다.

매칭 직후에도 `j`를 완전히 0으로 돌리지 않고 `lps`를 따라 이어 가야 이런 겹침을 놓치지 않습니다.

### 예시 흐름
`text = "ababaaba"`, `pattern = "aba"`

- `text[0..2] = "aba"` → 시작 위치 `0`
- 매칭 후에도 prefix 정보를 이용해 이어 가면 `text[2..4] = "aba"` → 시작 위치 `2`
- 다시 진행하면 `text[5..7] = "aba"` → 시작 위치 `5`

따라서 정답은 `[0, 2, 5]`입니다.

### 복잡도
- `lps` 배열 생성: `O(m)`
- `text` 검색: `O(n)`
- 전체 시간 복잡도: `O(n + m)`
- 추가 공간 복잡도: `O(m)`

문자열 검색을 반복해서 처음부터 다시 하지 않고, 패턴의 자기 구조를 이용해 점프하는 감각을 익히기 좋은 문제입니다.
