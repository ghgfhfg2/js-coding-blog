---
title: 정답표와 맞은 칸 개수 세기
slug: count-matching-answer-slots
track: today
difficulty: easy
topic: same-position-comparison
tags:
  - daily
  - beginner
  - string
  - comparison
  - counting
order: 148
function_name: solution
time_limit_ms: 200
primaryMethod: index-wise-equality-count
coreIdea: 같은 길이의 두 문자열을 왼쪽부터 같은 인덱스끼리 비교하며 문자가 일치하는 칸의 개수를 센다
gimmick: 전체 문자열이 같은지 보는 것이 아니라 각 위치별 일치 횟수만 세며 빈 문자열은 0을 반환한다
starter_code: |
  function solution(answer, guess) {
    return 0;
  }
test_cases:
  - input: ["ABCD", "ABCF"]
    output: 3
  - input: ["AAAA", "BBBB"]
    output: 0
  - input: ["", ""]
    output: 0
  - input: ["OXOXO", "OOXXO"]
    output: 3
---

## 문제 설명
정답표 문자열 `answer`와 제출한 답 문자열 `guess`가 주어집니다. 두 문자열의 길이는 항상 같다고 할 때, **같은 위치에 같은 문자가 적힌 칸의 개수**를 반환하는 `solution` 함수를 작성하세요.

예를 들어 `answer = "ABCD"`, `guess = "ABCF"`라면 0번, 1번, 2번 위치가 같으므로 `3`을 반환합니다.

## 제한사항
- `answer`와 `guess`는 문자열입니다.
- 두 문자열의 길이는 같습니다.
- 문자열 길이는 0 이상 100,000 이하입니다.
- 각 문자는 영문 대문자 또는 `O`, `X` 같은 기호일 수 있습니다.
- 반환값은 같은 위치에서 문자가 일치한 칸의 개수입니다.

## 예시
- 입력: `"ABCD"`, `"ABCF"` → 출력: `3`
- 입력: `"AAAA"`, `"BBBB"` → 출력: `0`
- 입력: `""`, `""` → 출력: `0`

## 힌트
- 두 문자열을 같은 인덱스 `i`로 동시에 확인해 보세요.
- `answer[i]`와 `guess[i]`가 같을 때만 개수를 1 늘리면 됩니다.

## 해설
이 문제는 두 문자열 전체가 같은지 판단하는 문제가 아니라, **각 위치별로 문자가 같은 횟수**를 세는 문제입니다.

풀이 흐름은 다음과 같습니다.

1. 일치한 칸 수를 저장할 변수 `count`를 `0`으로 시작합니다.
2. 인덱스 `0`부터 `answer.length - 1`까지 순회합니다.
3. 현재 위치에서 `answer[i]`와 `guess[i]`가 같으면 `count`를 1 증가시킵니다.
4. 모든 위치를 확인한 뒤 `count`를 반환합니다.

문자열을 한 번만 순회하므로 시간 복잡도는 `O(n)`이고, 추가 공간은 상수만 사용합니다.
