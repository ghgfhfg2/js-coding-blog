---
title: 금지 숫자를 피한 K번째 티켓 번호
slug: kth-clean-ticket-number
track: today
difficulty: hard
topic: digit-dp
tags:
  - daily
  - hard
  - digit-dp
  - binary-search
  - counting
  - number-construction
order: 49
function_name: kthCleanTicketNumber
time_limit_ms: 500
primaryMethod: digit-dp-count-with-binary-search
coreIdea: x 이하에서 금지 숫자가 없는 양의 정수 개수를 digit DP로 세고, 그 개수가 k 이상이 되는 가장 작은 x를 이분 탐색으로 찾는다
gimmick: 앞자리에 0이 올 수 없고 숫자 0 자체는 양의 정수에 포함되지 않으므로 started 상태를 둔 자릿수 DP가 핵심이다
starter_code: |
  function kthCleanTicketNumber(forbiddenDigits, k) {
    return 0;
  }
test_cases:
  - input: [[4, 7], 10]
    output: 12
  - input: [[0], 15]
    output: 16
  - input: [[1, 3, 5, 7, 9], 8]
    output: 26
  - input: [[0, 2, 4, 6, 8], 6]
    output: 11
---
금지된 숫자를 하나도 쓰지 않고 만들 수 있는 양의 정수들 중에서, 사전이 아니라 **숫자 크기 순서**로 보았을 때 `k`번째 값을 구하세요.

## 문제 설명
정수 배열 `forbiddenDigits`와 양의 정수 `k`가 주어집니다.

양의 정수를 1부터 차례대로 보면서, 십진수 표현 안에 `forbiddenDigits`에 포함된 숫자가 하나도 없는 수만 남깁니다.
그렇게 남은 수들 중 **오름차순으로 `k`번째** 수를 반환하는 `kthCleanTicketNumber` 함수를 작성하세요.

예를 들어 금지 숫자가 `[4, 7]`이면 허용되는 수는
`1, 2, 3, 5, 6, 8, 9, 10, 11, 12, ...` 이고, 10번째 수는 `12`입니다.

## 제한사항
- `1 <= forbiddenDigits.length <= 9`
- `forbiddenDigits`의 원소는 `0` 이상 `9` 이하의 정수이며 서로 다릅니다.
- `1 <= k <= 10^12`
- 적어도 하나 이상의 **0이 아닌 허용 숫자**가 보장됩니다.
- 반환값은 조건을 만족하는 `k`번째 양의 정수입니다.

## 예시
- 입력: `forbiddenDigits = [4, 7]`, `k = 10` → 출력: `12`
- 입력: `forbiddenDigits = [0]`, `k = 15` → 출력: `16`
- 입력: `forbiddenDigits = [1, 3, 5, 7, 9]`, `k = 8` → 출력: `26`
- 입력: `forbiddenDigits = [0, 2, 4, 6, 8]`, `k = 6` → 출력: `11`

## 힌트
- 어떤 값 `x`가 주어졌을 때, `1`부터 `x`까지 허용되는 수가 몇 개인지 빠르게 셀 수 있으면 정답을 찾기 쉬워집니다.
- “자릿수를 왼쪽부터 맞춰 가며 조건을 만족하는 수의 개수 세기”는 digit DP의 전형적인 패턴입니다.
- `count(x) >= k`를 만족하는 가장 작은 `x`를 찾으면 됩니다.

## 해설
브루트포스로 1부터 하나씩 검사하면 `k`가 매우 클 때 절대 버틸 수 없습니다.
핵심은 다음 두 단계를 합치는 것입니다.

1. `count(x)` = `1` 이상 `x` 이하에서 금지 숫자가 없는 수의 개수
2. `count(x) >= k`가 처음 성립하는 가장 작은 `x` 찾기

### 1. `count(x)`를 digit DP로 세기
`x`를 문자열로 두고 왼쪽 자리부터 채운다고 생각합니다.

DP 상태는 보통 아래 3개면 충분합니다.
- `pos`: 현재 몇 번째 자리를 보고 있는지
- `tight`: 지금까지 만든 앞부분이 `x`와 정확히 같은지
- `started`: 아직 앞자리를 시작하지 않았는지

각 자리에서 넣을 수 있는 숫자를 시도하되:
- `started`가 아직 `false`라면 0을 넣어 자릿수를 계속 비워 둘 수 있습니다.
- 실제 숫자를 시작하는 순간부터는 금지 숫자를 넣으면 안 됩니다.
- `tight`가 `true`면 현재 자리에 `x`의 해당 자리보다 큰 숫자는 못 넣습니다.

마지막 자리까지 갔을 때:
- 한 번도 시작하지 않았다면 그것은 숫자 `0`뿐이므로 세지 않습니다.
- 시작한 적이 있다면 유효한 양의 정수 1개로 셉니다.

이렇게 하면 `count(x)`를 자릿수 길이 기준 `O(len(x) * 2 * 2 * 10)` 정도로 계산할 수 있습니다.

### 2. 정답을 이분 탐색으로 찾기
`count(x)`는 `x`가 커질수록 절대 줄지 않습니다.
즉 단조성이 있으므로 이분 탐색이 가능합니다.

- 충분히 큰 상한 `hi`를 잡습니다. 보통 `count(hi) < k`인 동안 `hi *= 2`로 키우면 됩니다.
- 그 뒤 `[lo, hi]`에서 이분 탐색합니다.
- 중간값 `mid`에 대해 `count(mid) >= k`면 정답은 왼쪽에 있을 수 있으니 범위를 줄입니다.
- 끝나면 가장 작은 가능한 값이 정답입니다.

### 왜 이 방법이 맞을까?
우리가 찾는 수를 `ans`라고 하면:
- `ans`보다 작은 수 중 허용되는 수는 정확히 `k - 1`개 이하입니다.
- `ans` 이하의 허용되는 수는 적어도 `k`개입니다.

따라서 `count(x) >= k`가 처음 되는 가장 작은 `x`가 바로 `k`번째 허용 수입니다.

### 복잡도
- digit DP 한 번: `O(d * 10)` 수준 (`d`는 자릿수 수)
- 이분 탐색: `O(log answer)`번
- 전체: `O(d * 10 * log answer)`

자릿수 기반 계산이라 `k`가 매우 커도 충분히 처리할 수 있습니다.
