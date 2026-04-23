---
title: 원형 다이얼 최소 이동 수
slug: minimum-circular-dial-moves
track: today
difficulty: easy
topic: circular-distance
tags:
  - daily
  - beginner
  - string
  - digits
  - circular
  - greedy
order: 54
function_name: minimumCircularDialMoves
time_limit_ms: 200
primaryMethod: per-digit-circular-min-distance
coreIdea: 같은 길이의 숫자 문자열 두 개를 각 자리별로 비교하며 시계 방향 거리와 반시계 방향 거리 중 더 작은 값을 누적해 전체 최소 이동 수를 구한다
gimmick: 0과 9가 맞닿아 있는 원형 다이얼이라 단순 차이의 절댓값이 아니라 10에서 그 차이를 뺀 우회 거리도 함께 비교해야 한다
starter_code: |
  function minimumCircularDialMoves(current, target) {
    return 0;
  }
test_cases:
  - input: ["039", "920"]
    output: 3
  - input: ["5555", "5555"]
    output: 0
  - input: ["9", "0"]
    output: 1
  - input: ["000", "999"]
    output: 3
  - input: ["109", "808"]
    output: 4
---
두 숫자 문자열을 같은 길이의 원형 다이얼로 보고, 목표 숫자로 바꾸는 데 필요한 최소 이동 수를 구하는 문제입니다.

## 문제 설명
현재 다이얼 상태를 나타내는 문자열 `current`와 목표 상태를 나타내는 문자열 `target`이 주어집니다.

각 자리의 다이얼은 `0`부터 `9`까지 원형으로 이어져 있습니다. 즉, `9`에서 한 칸 앞으로 가면 `0`, `0`에서 한 칸 뒤로 가면 `9`가 됩니다.

각 자리는 서로 독립적으로 움직일 수 있습니다. 각 자리에서 시계 방향 또는 반시계 방향으로 움직일 수 있을 때, `current`를 `target`으로 바꾸기 위한 **최소 총 이동 수**를 반환하는 `minimumCircularDialMoves` 함수를 작성하세요.

## 제한사항
- `current`와 `target`의 길이는 서로 같습니다.
- 각 문자열의 길이는 `1` 이상 `100,000` 이하입니다.
- 각 문자열은 숫자 문자 (`0`~`9`)로만 이루어집니다.
- 한 번 움직일 때 한 자리의 숫자는 1만큼 변합니다.
- 반환값은 필요한 최소 총 이동 수입니다.

## 예시
- 입력: `current = "039"`, `target = "920"` → 출력: `3`
- 입력: `current = "5555"`, `target = "5555"` → 출력: `0`
- 입력: `current = "9"`, `target = "0"` → 출력: `1`
- 입력: `current = "000"`, `target = "999"` → 출력: `3`

## 힌트
- 각 자리는 다른 자리와 상관없이 최소 이동 수를 따로 계산할 수 있습니다.
- 두 숫자의 차이를 `diff`라고 하면, 반대 방향으로 도는 비용은 `10 - diff`입니다.
- 각 자리에서 `Math.min(diff, 10 - diff)`를 더해 보세요.

## 해설
핵심은 **각 자리를 독립적으로 보고 더 짧은 회전 방향을 고르는 것**입니다.

예를 들어 `3`에서 `8`로 가는 방법은 두 가지입니다.
- 시계 방향으로 5칸 이동
- 반시계 방향으로 5칸 이동

또 `9`에서 `0`으로 가는 경우는:
- 시계 방향으로 1칸 이동
- 반시계 방향으로 9칸 이동

따라서 각 자리마다 다음 과정을 반복하면 됩니다.

1. `current[i]`와 `target[i]`를 숫자로 바꿉니다.
2. 두 값의 차이의 절댓값을 `diff`로 구합니다.
3. `diff`와 `10 - diff` 중 더 작은 값을 선택합니다.
4. 그 값을 정답에 누적합니다.

`current = "039"`, `target = "920"`이면:
- `0 -> 9`: 1칸
- `3 -> 2`: 1칸
- `9 -> 0`: 1칸
- 총합은 `3`

다른 예시로 `current = "109"`, `target = "808"`이면:
- `1 -> 8`: 최소 3칸
- `0 -> 0`: 0칸
- `9 -> 8`: 1칸
- 총합은 `4`

이처럼 각 자리의 최소 회전 수를 모두 더하면 전체 최소 이동 수를 구할 수 있습니다.

이 방법은 문자열을 한 번만 순회하므로 시간 복잡도는 `O(n)`이고, 추가 공간은 `O(1)`입니다.
