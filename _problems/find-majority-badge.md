---
title: 과반 배지가 있는지 찾기
slug: find-majority-badge
track: today
difficulty: medium
topic: majority-vote
tags:
  - daily
  - medium
  - array
  - majority
  - voting
  - verification
order: 1160
function_name: findMajorityBadge
time_limit_ms: 300
primaryMethod: boyer-moore-candidate-verification
coreIdea: 배열을 한 번 훑으며 과반 후보와 균형 카운트를 압축해서 찾은 뒤 후보가 실제로 절반 초과 등장하는지 다시 세어 검증한다
gimmick: 첫 번째 순회에서 남은 후보가 항상 정답이라는 보장이 없으므로 반드시 두 번째 검증을 거쳐야 하고 과반이 없으면 null을 반환해야 한다
starter_code: |
  function findMajorityBadge(badges) {
    return null;
  }
test_cases:
  - input: [["A", "B", "A", "A", "C", "A"]]
    output: "A"
  - input: [["red", "blue", "red", "blue"]]
    output: null
  - input: [["solo"]]
    output: "solo"
  - input: [["x", "y", "x", "z", "x", "y", "x"]]
    output: "x"
  - input: [[]]
    output: null
---
배지 기록 배열에서 **절반을 초과해 등장한 값이 있는지** 찾아내는 문제입니다.

## 문제 설명
문자열 배열 `badges`가 주어집니다.

어떤 배지가 배열 길이의 절반보다 **엄격하게 많이** 등장하면 그 배지를 반환하고, 그런 배지가 없으면 `null`을 반환하세요.

과반 배지는 최대 하나만 존재할 수 있습니다.
`findMajorityBadge` 함수를 작성하세요.

## 제한사항
- `0 <= badges.length <= 100,000`
- `badges[i]`는 길이 `1` 이상 `20` 이하의 문자열입니다.
- 대소문자는 구분합니다.
- 과반의 기준은 `badges.length / 2`보다 **큰 횟수**입니다.
- 과반 배지가 없으면 반드시 `null`을 반환해야 합니다.

## 예시
- 입력: `badges = ["A", "B", "A", "A", "C", "A"]` → 출력: `"A"`
- 입력: `badges = ["red", "blue", "red", "blue"]` → 출력: `null`
- 입력: `badges = ["solo"]` → 출력: `"solo"`

## 힌트
- 모든 값의 개수를 해시 맵으로 세면 풀 수 있지만, 더 적은 추가 공간으로도 처리할 수 있습니다.
- 서로 다른 두 배지를 한 쌍씩 지워 나간다고 생각해 보세요.
- 마지막에 남은 후보가 정말 과반인지 다시 확인하는 단계가 필요합니다.

## 해설
이 문제는 **Boyer-Moore Majority Vote** 아이디어로 풀 수 있습니다.

핵심 관찰은 이렇습니다.
- 과반 배지가 실제로 존재한다면,
- 다른 배지와 하나씩 짝지어 지워도 끝까지 살아남습니다.

그래서 배열을 왼쪽부터 보면서
- 현재 후보 `candidate`
- 균형 카운트 `count`
를 관리합니다.

동작 방식은 다음과 같습니다.
1. `count`가 `0`이면 현재 배지를 새 후보로 삼습니다.
2. 현재 배지가 후보와 같으면 `count`를 1 늘립니다.
3. 다르면 `count`를 1 줄입니다.

이 과정을 마치면 **과반이 존재할 때 그 값이 후보로 남습니다.**
다만 과반이 아예 없는 배열에서도 어떤 값이 후보로 남을 수 있으므로, 후보의 실제 등장 횟수를 한 번 더 세어 검증해야 합니다.

예를 들어 `['A', 'B', 'A', 'A', 'C', 'A']`에서는
- `A`와 `B`가 상쇄되고,
- 남은 흐름에서도 `A`가 계속 우세해서 마지막 후보가 `A`가 됩니다.
- 실제 개수를 다시 세면 6개 중 4번 등장하므로 과반입니다.

반대로 `['red', 'blue', 'red', 'blue']`는 마지막 후보가 남더라도 실제 개수가 절반을 초과하지 않으므로 `null`을 반환해야 합니다.

시간 복잡도는 두 번 순회하므로 `O(n)`, 추가 공간은 `O(1)`입니다.
