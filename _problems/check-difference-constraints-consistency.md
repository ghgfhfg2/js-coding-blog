---
title: 차이 조건이 모순 없는지 확인하기
slug: check-difference-constraints-consistency
track: algorithm
difficulty: medium
topic: weighted-disjoint-set
tags:
  - intermediate
  - union-find
  - weighted-disjoint-set
  - graph
  - consistency-check
order: 1420
function_name: checkDifferenceConstraintsConsistency
time_limit_ms: 400
primaryMethod: union-find-potential-difference-consistency
coreIdea: 각 변수의 부모까지의 누적 차이를 함께 저장하는 가중 Union-Find로 두 변수 사이의 차이 조건을 합치고, 이미 같은 집합이면 기존 차이와 새 조건이 일치하는지 확인한다
gimmick: 연결되지 않은 변수 묶음은 서로 독립적으로 둘 수 있으며, 자기 자신과의 차이는 반드시 0이어야 하므로 자기 차이 조건도 모순 검사가 필요하다
starter_code: |
  function checkDifferenceConstraintsConsistency(n, constraints) {
    return false;
  }
test_cases:
  - input: [3, [[1, 2, 4], [2, 3, -1], [1, 3, 3]]]
    output: true
  - input: [3, [[1, 2, 4], [2, 3, -1], [1, 3, 2]]]
    output: false
  - input: [4, [[1, 2, 0], [3, 4, -5], [4, 3, 5]]]
    output: true
  - input: [2, [[1, 1, 0]]]
    output: true
  - input: [2, [[1, 1, 1]]]
    output: false
---

변수 사이의 차이 조건들이 모두 동시에 성립할 수 있는지 확인하세요.

## 문제 설명
1번부터 `n`번까지 번호가 붙은 변수가 있습니다.

`constraints[i] = [a, b, diff]`는 `value[b] - value[a] = diff`라는 뜻입니다.

모든 차이 조건을 동시에 만족하도록 각 변수에 정수 값을 배정할 수 있으면 `true`, 조건 사이에 모순이 있으면 `false`를 반환하는 `checkDifferenceConstraintsConsistency` 함수를 작성하세요.

## 제한사항
- `1 <= n <= 100,000`
- `0 <= constraints.length <= 200,000`
- `constraints[i]`는 `[a, b, diff]` 형태입니다.
- `1 <= a, b <= n`
- `-1,000,000,000 <= diff <= 1,000,000,000`
- 변수 값 자체를 반환할 필요는 없습니다.
- 서로 연결되지 않은 변수 묶음은 독립적으로 값을 정할 수 있습니다.
- 반환값은 모든 조건의 동시 만족 가능 여부입니다.

## 예시
- 입력: `3, [[1, 2, 4], [2, 3, -1], [1, 3, 3]]` -> 출력: `true`
- 입력: `3, [[1, 2, 4], [2, 3, -1], [1, 3, 2]]` -> 출력: `false`
- 입력: `4, [[1, 2, 0], [3, 4, -5], [4, 3, 5]]` -> 출력: `true`
- 입력: `2, [[1, 1, 1]]` -> 출력: `false`

## 힌트
- 단순 Union-Find는 같은 집합인지 여부만 알 수 있습니다. 이 문제에서는 부모까지의 누적 차이도 함께 저장해야 합니다.
- `value[b] - value[a]`를 빠르게 구할 수 있다면, 이미 같은 집합에 속한 두 변수의 새 조건이 모순인지 바로 확인할 수 있습니다.
- `a`와 `b`가 아직 다른 집합이라면, 두 루트를 합치면서 루트 사이의 차이를 새 조건에 맞게 정하면 됩니다.

## 해설
이 문제는 관계를 간선으로 보고 매번 그래프 탐색을 하면 느려질 수 있습니다. 조건이 하나씩 추가될 때마다 두 변수가 같은 연결 요소인지, 그리고 이미 정해진 차이와 새 차이가 같은지만 빠르게 확인하면 됩니다.

이를 위해 **가중 Union-Find**를 사용할 수 있습니다. 일반 Union-Find의 `parent[x]`에 더해, `weight[x]`를 `value[x] - value[parent[x]]`로 저장합니다. 경로 압축을 할 때는 부모가 바뀌므로 `weight[x]`도 루트까지의 누적 차이가 되도록 함께 갱신합니다.

그러면 어떤 변수 `x`에 대해 루트까지의 누적값을 `potential(x)`처럼 사용할 수 있습니다. 두 변수 `a`, `b`가 같은 루트를 가진다면 다음 값이 이미 정해져 있습니다.

```js
value[b] - value[a] = potential(b) - potential(a)
```

따라서 새 조건 `[a, b, diff]`를 볼 때 두 변수가 이미 같은 집합이면, `potential(b) - potential(a) === diff`인지 확인합니다. 다르면 앞선 조건들과 새 조건을 동시에 만족할 수 없으므로 `false`입니다.

두 변수가 다른 집합이면 아직 상대적인 위치가 정해지지 않았습니다. 이때 한 루트를 다른 루트 밑으로 붙이면서 루트 사이의 `weight`를 새 조건이 성립하도록 계산해 저장합니다. 예를 들어 `rootA`를 `rootB` 밑으로 붙인다면, `value[b] - value[a] = diff`가 되도록 `rootA`의 부모 방향 차이를 맞춰야 합니다.

풀이 흐름은 다음과 같습니다.

1. 각 변수를 자기 자신이 부모인 집합으로 시작합니다.
2. `find(x)`는 루트를 찾으면서 `weight[x]`를 루트까지의 누적 차이로 압축합니다.
3. 조건 `[a, b, diff]`마다 `a`, `b`의 루트를 확인합니다.
4. 루트가 같으면 기존 차이와 `diff`가 같은지 검사합니다.
5. 루트가 다르면 두 집합을 조건에 맞게 합칩니다.
6. 모든 조건을 통과하면 `true`를 반환합니다.

자기 자신에 대한 조건도 같은 방식으로 처리됩니다. `value[a] - value[a]`는 항상 `0`이므로 `[a, a, 0]`은 가능하지만 `[a, a, 1]`은 즉시 모순입니다.

각 조건마다 Union-Find 연산을 거의 상수 시간에 처리하므로 시간 복잡도는 `O((n + constraints.length) * α(n))`이고, 공간 복잡도는 `O(n)`입니다.
