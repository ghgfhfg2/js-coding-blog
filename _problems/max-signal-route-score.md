---
title: 제한 점프로 모을 수 있는 최대 신호 점수
slug: max-signal-route-score
track: today
difficulty: hard
topic: monotonic-deque
tags:
  - daily
  - hard
  - monotonic-deque
  - dp
  - sliding-window-maximum
  - path-score
order: 21
function_name: solution
time_limit_ms: 400
primaryMethod: deque-dp-window-maximum
coreIdea: 이전 maxJump칸 안에서 도달 가능한 dp 최댓값만 단조 deque로 유지하며 각 칸의 최고 누적 점수를 O(n)에 계산한다
gimmick: 점프 시작점은 배열 밖 가상 위치이고 마지막 칸에 반드시 설 필요 없이 범위를 넘는 탈출 점프가 가능하다
starter_code: |
  function solution(signals, maxJump) {
    return 0;
  }
test_cases:
  - input: [[4, -2, 7, -3, 5], 2]
    output: 16
  - input: [[-5, 10, -1, -1, 20], 3]
    output: 30
  - input: [[8, -100, -100, 9], 3]
    output: 17
  - input: [[-4, -2, -7], 2]
    output: -2
---
일렬로 놓인 신호 증폭기 배열 `signals`가 있습니다. 시작점은 배열의 왼쪽 바깥(아직 어떤 칸에도 서지 않은 상태)이며, 한 번에 **1칸 이상 `maxJump`칸 이하**만큼 앞으로 점프할 수 있습니다.

점프해서 어떤 칸 `i`에 착지하면 `signals[i]`만큼 점수를 얻거나 잃습니다. 마지막에는 배열의 오른쪽 바깥으로 빠져나가면 되며, **배열 밖으로 나가는 마지막 점프도 길이가 `maxJump` 이하여야 합니다.**

이때, 규칙을 지키면서 배열을 통과할 때 얻을 수 있는 **최대 총 점수**를 반환하세요.

## 제한사항
- `1 <= signals.length <= 200,000`
- `1 <= maxJump <= 200,000`
- `-1,000,000 <= signals[i] <= 1,000,000`
- 시작점은 배열 바깥의 가상 위치 `-1`이라고 생각해도 됩니다.
- 시작점에서는 점수를 얻지 않습니다.
- 마지막 칸에 반드시 착지할 필요는 없습니다.
- 어떤 칸 `i`에 도달하려면 직전 위치 `j`가 `i - maxJump <= j <= i - 1` 이어야 합니다.
- 배열 밖으로 나가려면 어떤 마지막 착지 위치 `j`에서 `n - j <= maxJump`를 만족해야 합니다. 시작점에서 바로 배열 밖으로 나가는 것은 불가능합니다.

## 예시
- 입력: `signals = [4, -2, 7, -3, 5]`, `maxJump = 2` → 출력: `16`
  - `0 -> 2 -> 4`에 착지하면 `4 + 7 + 5 = 16`입니다.
- 입력: `signals = [-5, 10, -1, -1, 20]`, `maxJump = 3` → 출력: `30`
  - `1 -> 4`에 착지하면 `10 + 20 = 30`입니다.
- 입력: `signals = [8, -100, -100, 9]`, `maxJump = 3` → 출력: `17`
  - `0 -> 3`에 착지한 뒤 밖으로 나가면 `8 + 9 = 17`입니다.

## 힌트
- `dp[i]`를 **i번 칸에 마지막으로 착지했을 때 얻을 수 있는 최대 점수**라고 정의해 보세요.
- 그러면 `dp[i] = signals[i] + max(dp[j])` 형태가 되는데, 여기서 `j`는 최근 `maxJump`칸 안의 위치들입니다.
- 매 칸마다 그 구간의 최댓값을 다시 찾으면 느립니다. **값이 큰 후보만 남기는 단조 deque**를 떠올려 보세요.

## 해설
직접 점화식을 세우면 다음과 같습니다.

- 시작점은 가상 위치 `-1`
- `i`번 칸에 도달하려면 직전 위치는 `i - maxJump`부터 `i - 1` 사이여야 합니다.
- 따라서

```js
DP[i] = signals[i] + max(bestStart, DP[i - maxJump], ..., DP[i - 1])
```

여기서 `bestStart`는 시작점에서 한 번에 올 수 있는 칸들(`i < maxJump`)에 대해 사용할 수 있는 값 `0`입니다.

문제는 각 `i`마다 직전 `maxJump`개 칸의 최댓값을 다시 구하면 `O(n * maxJump)`가 된다는 점입니다. `signals.length`가 최대 200,000이므로 너무 느립니다.

그래서 **단조 deque(monotonic deque)** 를 사용합니다.

### 1. deque에 무엇을 넣나?
`[index, dpValue]` 형태의 후보를 넣습니다.

deque는 항상 `dpValue`가 **앞에서 뒤로 갈수록 감소**하도록 유지합니다.
그러면 맨 앞 원소가 언제나 현재 윈도우에서의 최댓값 후보가 됩니다.

### 2. 현재 칸에 쓸 수 없는 후보 제거
현재 위치가 `i`일 때, `i - maxJump`보다 작은 인덱스는 너무 멀어서 더 이상 직전 위치가 될 수 없습니다.
이 후보들을 deque 앞에서 제거합니다.

### 3. 현재 칸의 dp 계산
현재 칸 `i`에 올 수 있는 최고 점수는:
- 시작점에서 바로 올 수 있으면 `0`
- 아니면 deque 맨 앞의 `dpValue`
- 둘 다 가능하면 더 큰 값

즉,

```js
bestPrev = max(시작점 사용 가능 여부에 따른 0, deque.front.dpValue)
dp[i] = signals[i] + bestPrev
```

### 4. 현재 dp를 deque에 삽입
새로 계산한 `dp[i]`보다 작거나 같은 값은 앞으로도 최댓값 후보가 될 가능성이 낮습니다.
왜냐하면 현재 인덱스가 더 뒤쪽에 있어서 유효 기간도 더 길기 때문입니다.
그래서 deque 뒤에서부터 `dpValue <= dp[i]`인 원소를 제거한 뒤 현재 원소를 넣습니다.

### 5. 정답은 마지막 n-maxJump ... n-1 구간의 최고값
배열 밖으로 나가려면 마지막 착지 위치 `j`가 `n - j <= maxJump`를 만족해야 합니다.
즉 마지막 `maxJump`칸 안의 어느 위치에서든 탈출할 수 있습니다.

따라서 정답은 `dp[j]`들 중 `j >= n - maxJump`인 값의 최댓값입니다.

### 왜 O(n)인가?
각 인덱스는 deque에 **한 번 들어가고 한 번만 나옵니다.**
그래서 전체 시간 복잡도는 `O(n)`, 추가 공간 복잡도는 `O(n)`(dp 저장 시) 또는 `O(maxJump)` 수준으로 관리할 수 있습니다.

예시 `signals = [4, -2, 7, -3, 5]`, `maxJump = 2`를 보면:

- `dp[0] = 4`
- `dp[1] = -2 + max(0, 4) = 2`
- `dp[2] = 7 + max(4, 2) = 11`
- `dp[3] = -3 + max(2, 11) = 8`
- `dp[4] = 5 + max(11, 8) = 16`

마지막 2칸 안에서 탈출 가능하므로 `dp[3], dp[4]` 중 최댓값인 `16`이 정답입니다.
