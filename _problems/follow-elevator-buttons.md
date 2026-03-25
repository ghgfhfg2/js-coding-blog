---
title: 엘리베이터 버튼 따라가기
slug: follow-elevator-buttons
track: today
difficulty: easy
topic: simulation
tags:
  - daily
  - beginner
  - simulation
  - array
  - movement
order: 5
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(startFloor, commands) {
    return startFloor;
  }
test_cases:
  - input: [3, ["U", "U", "D"]]
    output: 4
  - input: [0, ["D", "D", "U"]]
    output: 1
  - input: [7, []]
    output: 7
  - input: [1, ["D", "D", "D"]]
    output: 0
---

시작 층과 버튼 기록이 주어질 때, 엘리베이터가 마지막에 멈춘 층을 구하는 `solution` 함수를 작성하세요.

## 문제 설명
정수 `startFloor`와 버튼 기록 배열 `commands`가 주어집니다.

- `"U"`는 한 층 위로 이동합니다.
- `"D"`는 한 층 아래로 이동합니다.
- 단, 현재 층이 `0`일 때 `"D"`를 눌러도 더 내려가지 않고 그대로 `0`층에 머뭅니다.

모든 버튼 기록을 순서대로 적용한 뒤, 최종 층을 반환하세요.

## 제한사항
- `startFloor`는 0 이상 100 이하의 정수입니다.
- `commands`는 길이 0 이상 100 이하의 배열입니다.
- `commands`의 각 원소는 `"U"` 또는 `"D"`입니다.
- 반환값은 최종 층을 나타내는 정수입니다.

## 예시
- 입력: `3, ["U", "U", "D"]` → 출력: `4`
- 입력: `0, ["D", "D", "U"]` → 출력: `1`
- 입력: `1, ["D", "D", "D"]` → 출력: `0`

## 힌트
- 현재 층을 저장할 변수를 하나 두고, 버튼을 앞에서부터 하나씩 적용해 보세요.
- 아래로 내려가는 버튼을 눌렀을 때 `0`층보다 작아지지 않도록 처리하면 됩니다.

## 해설
이 문제의 핵심은 **명령을 순서대로 시뮬레이션하는 것**입니다.

1. 현재 층을 `startFloor`로 시작합니다.
2. `commands`를 앞에서부터 하나씩 확인합니다.
3. `"U"`면 현재 층을 1 증가시킵니다.
4. `"D"`면 현재 층을 1 감소시키되, 이미 `0`층이라면 그대로 둡니다.
5. 모든 명령을 처리한 뒤 현재 층을 반환합니다.

예를 들어 `startFloor = 0`, `commands = ["D", "D", "U"]`라면:

- 처음 층: `0`
- `"D"` → 여전히 `0`
- `"D"` → 여전히 `0`
- `"U"` → `1`

따라서 정답은 `1`입니다.

이 문제는 배열을 순회하면서 상태값 하나를 계속 갱신하는 가장 기본적인 시뮬레이션 문제입니다.