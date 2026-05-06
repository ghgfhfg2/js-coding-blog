---
title: 엘리베이터 명령 뒤 최종 층수
slug: final-floor-after-commands
track: today
difficulty: easy
topic: net-displacement
tags:
  - daily
  - beginner
  - string
  - simulation
  - accumulation
order: 1230
function_name: finalFloorAfterCommands
time_limit_ms: 200
primaryMethod: signed-step-accumulation
coreIdea: 시작 층수에서 출발해 명령 문자열을 한 글자씩 읽으며 U는 1층 상승, D는 1층 하강으로 누적해 최종 층수를 구한다
gimmick: 빈 명령 문자열은 시작 층수를 그대로 반환하고 위아래 이동이 섞여도 순서대로 모두 반영한 순이동 결과만 남는다
starter_code: |
  function finalFloorAfterCommands(startFloor, commands) {
    return startFloor;
  }
test_cases:
  - input: [3, "UUDDUD"]
    output: 3
  - input: [0, "UUUD"]
    output: 2
  - input: [-2, "DUU"]
    output: -1
  - input: [5, ""]
    output: 5
  - input: [1, "DDDD"]
    output: -3
---
엘리베이터의 시작 층수와 위아래 이동 명령이 주어질 때 마지막에 몇 층에 도착하는지 구하는 문제입니다.

## 문제 설명
정수 `startFloor`와 명령 문자열 `commands`가 주어집니다.

`commands`는 다음 두 글자로만 이루어집니다.
- `"U"`: 현재 층에서 1층 올라갑니다.
- `"D"`: 현재 층에서 1층 내려갑니다.

명령을 왼쪽부터 순서대로 모두 수행했을 때 최종 층수를 반환하는 `finalFloorAfterCommands` 함수를 작성하세요.

예를 들어 시작 층수가 `3`이고 명령이 `"UUDDUD"`라면,
위로 2번, 아래로 2번, 위로 1번, 아래로 1번 이동하므로 다시 `3`층이 됩니다.

## 제한사항
- `startFloor`는 `-100,000` 이상 `100,000` 이하의 정수입니다.
- `commands`의 길이는 `0` 이상 `100,000` 이하입니다.
- `commands`는 `"U"`와 `"D"`로만 이루어집니다.
- 빈 문자열이 들어오면 아무 이동도 하지 않은 것이므로 `startFloor`를 그대로 반환합니다.

## 예시
- 입력: `startFloor = 3`, `commands = "UUDDUD"` → 출력: `3`
- 입력: `startFloor = 0`, `commands = "UUUD"` → 출력: `2`
- 입력: `startFloor = -2`, `commands = "DUU"` → 출력: `-1`
- 입력: `startFloor = 5`, `commands = ""` → 출력: `5`

## 힌트
- 현재 층수를 하나 변수에 저장해 두세요.
- 문자열을 한 글자씩 보면서 `U`면 `+1`, `D`면 `-1` 하면 됩니다.
- 모든 명령을 처리한 뒤 남은 현재 층수가 정답입니다.

## 해설
이 문제는 명령을 순서대로 그대로 시뮬레이션하면 됩니다.

현재 층수를 `startFloor`로 시작한 뒤,
문자열 `commands`를 왼쪽부터 한 글자씩 확인합니다.

- `U`를 만나면 현재 층수에 `1`을 더합니다.
- `D`를 만나면 현재 층수에 `1`을 뺍니다.

예를 들어 `startFloor = -2`, `commands = "DUU"`라면
- `D` → `-3`
- `U` → `-2`
- `U` → `-1`

이므로 최종 답은 `-1`입니다.

문자열을 한 번만 순회하므로 시간 복잡도는 `O(n)`이고, 추가 공간은 `O(1)`입니다.
