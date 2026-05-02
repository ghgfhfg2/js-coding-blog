---
title: 가장 자주 나온 태그 K개 찾기
slug: top-k-frequent-tags
track: algorithm
difficulty: medium
topic: bucket-sort
tags:
  - algorithm
  - bucket-sort
  - hash-map
  - frequency
  - strings
  - top-k
order: 1140
function_name: topKFrequentTags
time_limit_ms: 300
primaryMethod: frequency-buckets-desc-scan
coreIdea: 각 태그의 등장 횟수를 해시 맵으로 센 뒤 빈도별 버킷에 태그를 모아 가장 큰 빈도부터 내려오며 K개를 수집한다
gimmick: 같은 빈도 안에서는 사전순으로 더 앞선 태그를 먼저 뽑아야 하므로 버킷 내부 정렬과 K개를 채우는 조기 종료를 함께 처리해야 한다
starter_code: |
  function topKFrequentTags(tags, k) {
    return [];
  }
test_cases:
  - input: [["api", "ui", "api", "db", "ui", "api"], 2]
    output: ["api", "ui"]
  - input: [["beta", "alpha", "beta", "alpha", "gamma"], 2]
    output: ["alpha", "beta"]
  - input: [["one"], 1]
    output: ["one"]
  - input: [["red", "blue", "red", "green", "blue", "green"], 2]
    output: ["blue", "green"]
  - input: [["x", "y", "z"], 0]
    output: []
---
태그 목록에서 **가장 자주 등장한 K개 태그**를 빠르게 골라내는 문제입니다.

## 문제 설명
문자열 배열 `tags`와 정수 `k`가 주어집니다.
각 태그의 등장 횟수를 기준으로 많이 나온 순서대로 `k`개를 골라 배열로 반환하는 `topKFrequentTags` 함수를 작성하세요.

정렬 기준은 다음과 같습니다.

1. 등장 횟수가 많은 태그가 먼저 온다.
2. 등장 횟수가 같다면 **사전순으로 더 앞선 태그**가 먼저 온다.

예를 들어 `tags = ["api", "ui", "api", "db", "ui", "api"]`, `k = 2`라면
- `api`는 3번
- `ui`는 2번
- `db`는 1번

등장하므로 결과는 `["api", "ui"]`입니다.

## 제한사항
- `1 <= tags.length <= 100000`
- `0 <= k <= 고유한 태그 수`
- `1 <= tags[i].length <= 20`
- `tags[i]`는 영문 소문자로만 이루어집니다.
- 반환 배열 길이는 `k`입니다.

## 예시
- 입력: `tags = ["api", "ui", "api", "db", "ui", "api"]`, `k = 2` → 출력: `["api", "ui"]`
- 입력: `tags = ["beta", "alpha", "beta", "alpha", "gamma"]`, `k = 2` → 출력: `["alpha", "beta"]`
- 입력: `tags = ["red", "blue", "red", "green", "blue", "green"]`, `k = 2` → 출력: `["blue", "green"]`
- 입력: `tags = ["x", "y", "z"]`, `k = 0` → 출력: `[]`

세 번째 예시에서는 세 태그가 모두 2번씩 등장하므로, 같은 빈도끼리는 사전순으로 정렬해 `blue`, `green`, `red` 순서가 됩니다. 그중 앞의 2개를 반환해야 합니다.

## 힌트
- 먼저 각 태그가 몇 번 나왔는지 세어야 합니다.
- 등장 횟수의 최댓값은 `tags.length`를 넘지 않습니다.
- 빈도별로 태그를 모아 두면, 가장 큰 빈도부터 내려오며 답을 만들 수 있습니다.
- 같은 빈도 안에서는 추가 정렬 기준이 있다는 점을 놓치지 마세요.

## 해설
이 문제를 단순하게 풀면 다음 순서가 됩니다.

1. 태그별 등장 횟수를 센다.
2. `(태그, 빈도)` 목록을 만든다.
3. 빈도 내림차순, 태그 사전순으로 정렬한다.
4. 앞에서 `k`개를 고른다.

이 방식도 가능하지만, 핵심 학습 포인트는 **빈도 자체를 인덱스로 쓰는 bucket sort 발상**입니다.

### 1. 해시 맵으로 빈도 세기
먼저 모든 태그를 순회하며 등장 횟수를 셉니다.

예를 들어

```js
["api", "ui", "api", "db", "ui", "api"]
```

라면 빈도는 다음과 같습니다.

- `api -> 3`
- `ui -> 2`
- `db -> 1`

### 2. 빈도별 버킷 만들기
어떤 태그의 등장 횟수도 `tags.length`보다 클 수 없으므로,
길이가 `tags.length + 1`인 버킷 배열을 만들 수 있습니다.

- `buckets[1]`에는 1번 나온 태그들
- `buckets[2]`에는 2번 나온 태그들
- `buckets[3]`에는 3번 나온 태그들

처럼 넣어 둡니다.

위 예시라면:

- `buckets[1] = ["db"]`
- `buckets[2] = ["ui"]`
- `buckets[3] = ["api"]`

### 3. 큰 빈도부터 내려오며 답 만들기
이제 버킷을 뒤에서부터 순회하면,
자동으로 **등장 횟수가 큰 태그부터** 보게 됩니다.

다만 같은 빈도 안에서는 사전순 정렬이 필요하므로,
각 버킷을 꺼낼 때 한 번 정렬해서 순서대로 답에 넣습니다.

예를 들어

```js
["beta", "alpha", "beta", "alpha", "gamma"]
```

에서는
- `alpha -> 2`
- `beta -> 2`
- `gamma -> 1`

이므로 `buckets[2] = ["beta", "alpha"]`가 될 수 있습니다.
이 버킷을 그대로 쓰면 순서가 불안정하니, 사전순 정렬 후 `alpha`, `beta` 순으로 넣어야 합니다.

### 4. K개를 채우면 바로 종료
큰 빈도부터 내려오고 있으므로,
정답 배열 길이가 `k`가 되는 순간 더 볼 필요가 없습니다.
이 조기 종료를 넣으면 불필요한 순회를 줄일 수 있습니다.

### 5. 왜 이 방식이 학습용으로 좋은가?
이 문제는 다음 감각을 익히기에 좋습니다.

- **해시 맵으로 빈도 세기**
- **값의 범위가 제한될 때 bucket으로 그룹화하기**
- **전체 정렬 대신 필요한 구조만 만들어 상위 후보부터 꺼내기**
- **동률 정렬 기준을 별도로 관리하기**

### 6. 시간 복잡도
- 빈도 세기: `O(n)`
- 버킷 채우기: `O(u)` (`u`는 고유 태그 수)
- 버킷 순회: `O(n)`
- 같은 빈도 버킷 내부 정렬: 전체적으로 최악에는 `O(u log u)`까지 가능

따라서 전체는 보통 `O(n + u log u)` 수준으로 볼 수 있습니다.

이 문제의 핵심은 **모든 항목을 한 번에 정렬하는 대신, 빈도라는 구조를 이용해 상위 그룹부터 내려오는 방식**을 익히는 데 있습니다.
