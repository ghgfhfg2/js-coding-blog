---
title: 가장 길게 이어진 같은 알림 종류
slug: longest-same-alert-streak
track: today
difficulty: easy
topic: streak-tracking
tags:
  - daily
  - beginner
  - array
  - run-length
  - streak
order: 1007
function_name: longestSameAlertStreak
time_limit_ms: 200
primaryMethod: run-length-max-tracking
coreIdea: 배열을 한 번 순회하며 직전 알림과 같으면 현재 연속 길이를 늘리고 다르면 1로 리셋하면서 최대 연속 길이를 기록한다
gimmick: 빈 배열은 0을 반환하고 같은 값이 여러 번 이어질 때만 길이가 늘어나므로 단순 빈도 최댓값과 연속 최댓값을 구분해야 한다
starter_code: |
  function longestSameAlertStreak(alerts) {
    return 0;
  }
test_cases:
  - input: [["info", "info", "warn", "warn", "warn", "error"]]
    output: 3
  - input: [["ping", "pong", "ping", "pong"]]
    output: 1
  - input: [["critical"]]
    output: 1
  - input: [[]]
    output: 0
  - input: [["a", "a", "a", "a"]]
    output: 4
---
알림 기록에서 같은 종류가 가장 길게 연속된 구간의 길이를 찾는 문제입니다.

## 문제 설명
문자열 배열 `alerts`가 주어집니다.

배열에는 시간 순서대로 알림 종류가 들어 있습니다. 서로 같은 문자열이 **연속해서** 이어진 구간들 중에서, 가장 긴 구간의 길이를 반환하는 `longestSameAlertStreak` 함수를 작성하세요.

예를 들어 `alerts = ["info", "info", "warn", "warn", "warn", "error"]`라면 `"warn"`가 3번 연속으로 이어지므로 정답은 `3`입니다.

빈 배열이면 `0`을 반환합니다.

## 제한사항
- `alerts`의 길이는 `0` 이상 `100,000` 이하입니다.
- 각 원소는 길이 `1` 이상 `20` 이하의 문자열입니다.
- 대소문자는 구분합니다.
- 같은 종류의 총 등장 횟수가 아니라, **연속해서 붙어 있는 길이**를 기준으로 판단합니다.
- 빈 배열이면 `0`을 반환합니다.

## 예시
- 입력: `alerts = ["info", "info", "warn", "warn", "warn", "error"]` → 출력: `3`
- 입력: `alerts = ["ping", "pong", "ping", "pong"]` → 출력: `1`
- 입력: `alerts = ["critical"]` → 출력: `1`
- 입력: `alerts = []` → 출력: `0`

## 힌트
- 현재 보고 있는 값이 바로 앞 값과 같은지만 확인하면 됩니다.
- 연속이 끊기면 현재 길이를 `1`로 다시 시작하세요.
- 순회하면서 현재 연속 길이와 최대 연속 길이를 따로 관리해 보세요.

## 해설
이 문제는 각 알림 종류의 **전체 개수**를 세는 문제가 아니라, **연속 구간의 길이**를 구하는 문제입니다.

예를 들어 `[
  "info", "info", "warn", "info", "info", "info"
]`에서는
- `info`가 총 5번 나오지만
- 가장 긴 연속 구간은 마지막 `info, info, info`이므로 정답은 `3`입니다.

따라서 해시 맵으로 빈도를 세기보다는, 배열을 왼쪽부터 한 번 순회하며 현재 연속 길이를 관리하는 쪽이 맞습니다.

진행 방식은 다음과 같습니다.

1. 빈 배열이면 바로 `0`을 반환합니다.
2. 첫 원소부터 시작해 `current = 1`, `maxStreak = 1`로 둡니다.
3. 현재 원소가 바로 이전 원소와 같으면 `current`를 1 늘립니다.
4. 다르면 새로운 연속 구간이 시작된 것이므로 `current = 1`로 리셋합니다.
5. 매 단계마다 `maxStreak`를 갱신합니다.

이렇게 하면 배열을 한 번만 보면 되므로 시간 복잡도는 `O(n)`이고, 추가 공간은 `O(1)`입니다.
