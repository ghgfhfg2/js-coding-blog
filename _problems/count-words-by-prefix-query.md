---
title: 접두사별 단어 개수 빠르게 세기
slug: count-words-by-prefix-query
track: algorithm
difficulty: medium
topic: trie
tags:
  - algorithm
  - trie
  - string
  - prefix
  - counting
  - query
order: 40
function_name: solution
time_limit_ms: 300
primaryMethod: trie-prefix-count
coreIdea: 단어들을 트라이에 넣으면서 각 노드를 지나는 단어 수를 누적해 두면 접두사 쿼리마다 해당 경로만 따라가 O(접두사 길이)로 개수를 구할 수 있다
gimmick: 없는 경로를 만나는 순간 바로 0을 반환할 수 있고 같은 단어가 여러 번 나오면 중복도 개수에 그대로 반영해야 한다
starter_code: |
  function solution(words, queries) {
    return [];
  }
test_cases:
  - input: [["apple", "app", "apply", "apt", "banana"], ["app", "ap", "ban", "cat"]]
    output: [3, 4, 1, 0]
  - input: [["go", "gone", "guild", "go"], ["g", "go", "gon", "guild", "z"]]
    output: [4, 3, 1, 1, 0]
  - input: [["a", "ab", "abc"], ["abc", "abcd", "a"]]
    output: [1, 0, 3]
  - input: [["solo"], ["s", "solo", "soloo"]]
    output: [1, 1, 0]
---
단어 목록이 주어질 때, 여러 접두사(prefix) 쿼리에 대해 해당 접두사로 시작하는 단어가 몇 개인지 빠르게 구하는 문제입니다.

## 문제 설명
문자열 배열 `words`와 문자열 배열 `queries`가 주어집니다.

각 `queries[i]`에 대해 `words` 안에서 **그 문자열로 시작하는 단어의 개수**를 구해 순서대로 반환하는 `solution` 함수를 작성하세요.

예를 들어 `words = ["apple", "app", "apply", "apt", "banana"]`, `queries = ["app", "ap", "ban", "cat"]`라면:
- `"app"`로 시작하는 단어는 `"apple"`, `"app"`, `"apply"`로 3개
- `"ap"`로 시작하는 단어는 4개
- `"ban"`으로 시작하는 단어는 1개
- `"cat"`으로 시작하는 단어는 0개

따라서 `[3, 4, 1, 0]`을 반환해야 합니다.

## 제한사항
- `1 <= words.length <= 100,000`
- `1 <= queries.length <= 100,000`
- `1 <= words[i].length <= 30`
- `1 <= queries[i].length <= 30`
- `words[i]`, `queries[i]`는 영어 소문자로만 이루어집니다.
- 같은 단어가 여러 번 등장할 수 있으며, 그만큼 개수에 모두 포함합니다.
- 반환값은 각 쿼리에 대한 접두사 일치 개수를 담은 배열입니다.

## 예시
- 입력: `words = ["apple", "app", "apply", "apt", "banana"]`, `queries = ["app", "ap", "ban", "cat"]` → 출력: `[3, 4, 1, 0]`
- 입력: `words = ["go", "gone", "guild", "go"]`, `queries = ["g", "go", "gon", "guild", "z"]` → 출력: `[4, 3, 1, 1, 0]`
- 입력: `words = ["a", "ab", "abc"]`, `queries = ["abc", "abcd", "a"]` → 출력: `[1, 0, 3]`

## 힌트
- 쿼리마다 모든 단어를 처음부터 끝까지 비교하면 너무 느릴 수 있습니다.
- 접두사가 같은 단어들은 앞부분 경로를 공유합니다.
- 문자열을 문자 단위 경로로 저장하는 자료구조를 떠올려 보세요.
- 어떤 노드를 지나가는 단어 수를 미리 세어 두면 쿼리 답을 바로 얻을 수 있습니다.

## 해설
이 문제는 **트라이(trie)** 자료구조의 기본 감각을 익히기 좋은 문제입니다.

단순하게 풀면 각 쿼리마다 모든 단어를 확인하면서 `startsWith` 같은 방식으로 비교할 수 있습니다. 하지만 `words`와 `queries`가 모두 100,000개까지 커질 수 있으므로, 이런 방식은 최악의 경우 너무 느립니다.

### 1. 왜 트라이가 잘 맞을까?
접두사 문제에서는 같은 앞부분을 공유하는 단어가 많습니다.

예를 들어:
- `app`
- `apple`
- `apply`
- `apt`

이 단어들은 모두 `a -> p` 경로를 공유합니다.
트라이는 이런 공통 접두사를 한 번만 저장할 수 있어서, 접두사 탐색에 매우 잘 맞습니다.

### 2. 노드마다 무엇을 저장할까?
각 노드에 다음 정보를 둡니다.
- `children`: 다음 문자로 가는 자식 노드
- `count`: 이 노드를 지나가는 단어 수

단어를 삽입할 때 문자를 하나씩 따라 내려가며 해당 노드의 `count`를 1씩 증가시키면,
나중에 어떤 접두사 쿼리가 들어왔을 때 그 접두사 마지막 노드의 `count`가 곧 정답이 됩니다.

예를 들어 `"app"`를 찾고 싶다면:
- 루트에서 `a`
- `a`에서 `p`
- `p`에서 `p`

까지 내려갑니다. 이 경로가 존재하면 마지막 `p` 노드의 `count`가 `"app"`로 시작하는 단어 개수입니다.

### 3. 없는 경로를 만나면?
탐색 중 어떤 문자의 자식 노드가 없다면, 그 접두사로 시작하는 단어는 하나도 없다는 뜻입니다.
이 경우 바로 `0`을 반환하면 됩니다.

### 4. 같은 단어가 여러 번 나오면?
이 문제에서는 중복 단어도 각각 따로 셉니다.
따라서 `words = ["go", "gone", "go"]`라면 `"go"` 접두사 개수는 3이 아니라 정확히 `3`이 맞습니다.
트라이에 삽입할 때마다 `count`를 증가시키면 이 중복도 자연스럽게 반영됩니다.

### 5. 구현 예시
```js
function solution(words, queries) {
  const root = { children: new Map(), count: 0 };

  for (const word of words) {
    let node = root;

    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, { children: new Map(), count: 0 });
      }

      node = node.children.get(ch);
      node.count += 1;
    }
  }

  const answer = [];

  for (const query of queries) {
    let node = root;
    let ok = true;

    for (const ch of query) {
      if (!node.children.has(ch)) {
        ok = false;
        break;
      }
      node = node.children.get(ch);
    }

    answer.push(ok ? node.count : 0);
  }

  return answer;
}
```

### 6. 시간 복잡도
- 단어 삽입: 모든 단어 길이 합을 `W`라고 하면 `O(W)`
- 쿼리 처리: 모든 쿼리 길이 합을 `Q`라고 하면 `O(Q)`

즉 전체 시간 복잡도는 `O(W + Q)`입니다.

이 문제의 핵심은 **접두사 쿼리를 매번 처음부터 비교하지 않고, 공통 접두사를 재사용하는 구조를 만드는 것**입니다. 트라이를 한 번 익혀 두면 자동완성, 사전 검색, prefix counting 같은 문제에 넓게 응용할 수 있습니다.
