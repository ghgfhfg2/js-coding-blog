---
title: 로봇의 마지막 방향
slug: robot-final-direction
track: today
difficulty: easy
topic: simulation
tags:
  - daily
  - beginner
  - simulation
  - direction
  - modular-arithmetic
order: 5
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(commands) {
    let answer = '';

    // 여기에 코드를 작성하세요.

    return answer;
  }
test_cases:
  - input: [["L", "L", "R"]]
    output: "W"
  - input: [["R", "R", "R", "R"]]
    output: "N"
  - input: [[]]
    output: "N"
  - input: [["R", "L", "L", "L"]]
    output: "W"
---

로봇은 처음에 북쪽(`N`)을 바라보고 있습니다. 회전 명령이 순서대로 담긴 배열 `commands`가 주어질 때, 모든 명령을 처리한 뒤 로봇이 바라보는 최종 방향을 반환하는 `solution` 함수를 작성하세요.

명령의 의미는 다음과 같습니다.
- `"L"`: 왼쪽으로 90도 회전
- `"R"`: 오른쪽으로 90도 회전

## 제한사항
- `commands`는 문자열 배열입니다.
- 각 원소는 `"L"` 또는 `"R"` 중 하나입니다.
- `commands`의 길이는 0 이상 100 이하입니다.
- 반환값은 `"N"`, `"E"`, `"S"`, `"W"` 중 하나의 문자열입니다.

## 예시
- 입력: `["L", "L", "R"]` → 출력: `"W"`
- 입력: `["R", "R", "R", "R"]` → 출력: `"N"`
- 입력: `[]` → 출력: `"N"`

## 힌트
- 방향은 `N → E → S → W`처럼 원형으로 이어져 있습니다.
- 현재 방향을 인덱스로 관리하면 왼쪽과 오른쪽 회전을 쉽게 처리할 수 있습니다.

## 해설
이 문제의 핵심은 방향을 문자열로 바로 바꾸기보다, 순서가 있는 상태로 관리하는 것입니다.

예를 들어 방향 순서를 `['N', 'E', 'S', 'W']`로 두고 현재 위치를 인덱스로 저장하면:
- 오른쪽 회전 `R`은 인덱스를 `+1`
- 왼쪽 회전 `L`은 인덱스를 `-1`
처럼 처리할 수 있습니다.

다만 배열의 끝을 넘어갈 수 있으므로 원형처럼 계산해야 합니다.
예를 들어 `N`에서 왼쪽으로 돌면 `W`가 되어야 하므로, 단순히 `-1`이 아니라 나머지 연산을 사용해 마지막 방향으로 연결해 주면 됩니다.

이렇게 명령을 한 번만 순서대로 처리하면 되므로, 구현은 간단하고 시간 복잡도는 `O(n)`입니다.
