---
title: 대기열에서 앞의 두 사람 제외하기
slug: remove-first-two-queue-items
track: js-basic
difficulty: easy
topic: array-slicing
tags:
  - beginner
  - array
  - js-method
  - slice
  - queue
order: 25
function_name: solution
time_limit_ms: 200
primaryMethod: slice-skip-first-two
coreIdea: 원본 배열을 건드리지 않고 slice(2)로 세 번째 요소부터 끝까지를 잘라 앞의 두 사람을 제외한 새 배열을 만든다
gimmick: 길이가 2보다 짧아도 예외 없이 빈 배열이 나와 별도 분기 없이 처리된다
starter_code: |
  function solution(names) {
    return [];
  }
test_cases:
  - input: [["mina", "juno", "sora", "dami"]]
    output: ["sora", "dami"]
  - input: [["neo", "luna"]]
    output: []
  - input: [["haru"]]
    output: []
  - input: [["a", "b", "c"]]
    output: ["c"]
---

문자열 배열 `names`가 주어질 때, 앞에서 두 사람을 제외한 나머지 이름들만 담은 새 배열을 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`slice()`는 배열의 일부를 잘라서 새 배열로 반환하는 메서드입니다.

## 메서드 설명
이 문제에서는 앞의 두 요소를 제외하고 뒤쪽 요소들만 가져와야 합니다.
이럴 때 `slice(2)`를 사용하면 인덱스 2부터 끝까지를 새 배열로 쉽게 만들 수 있습니다.

원본 배열을 직접 수정하지 않고 필요한 부분만 복사해 가져올 수 있다는 점이 핵심입니다.

## 기본 문법
```js
arr.slice(start)
arr.slice(start, end)
```

## 사용 예시
```js
['mina', 'juno', 'sora', 'dami'].slice(2) // ['sora', 'dami']
[1, 2, 3, 4].slice(1) // [2, 3, 4]
[1, 2].slice(2) // []
```

## 주의할 점
- `slice()`는 원본 배열을 바꾸지 않습니다.
- 시작 인덱스는 포함되고, 끝 인덱스는 포함되지 않습니다.
- `slice(2)`처럼 시작 인덱스만 쓰면 그 위치부터 끝까지 잘라 냅니다.
- 배열 길이가 2보다 작아도 에러가 나지 않고 빈 배열을 반환합니다.

## 제한사항
- `names`는 문자열로 이루어진 배열입니다.
- `names`의 길이는 1 이상 20 이하입니다.
- 반환값은 앞의 두 요소를 제외한 새 배열입니다.
- 남는 요소가 없으면 빈 배열을 반환합니다.

## 예시
- 입력: `["mina", "juno", "sora", "dami"]` → 출력: `["sora", "dami"]`
- 입력: `["neo", "luna"]` → 출력: `[]`
- 입력: `["haru"]` → 출력: `[]`

## 힌트
- 앞의 두 요소를 건너뛰고 싶다면, 세 번째 요소의 인덱스가 무엇인지 떠올려 보세요.
- 배열을 직접 `shift()`로 바꾸기보다 새 배열을 만드는 쪽이 더 간단합니다.

## 해설
이 문제는 배열에서 필요한 구간만 잘라 새 배열로 반환하면 끝입니다.

풀이 흐름은 다음과 같습니다.
1. 앞의 두 요소는 제외해야 하므로 시작 위치를 `2`로 잡습니다.
2. `names.slice(2)`를 호출합니다.
3. 잘라낸 새 배열을 그대로 반환합니다.

예를 들어 `['mina', 'juno', 'sora', 'dami']`에 `slice(2)`를 적용하면 인덱스 2부터 끝까지인 `['sora', 'dami']`가 반환됩니다.

이 문제의 학습 포인트는 `slice()`가 **원본을 바꾸지 않고 원하는 구간만 복사해 온다**는 점입니다. 초급자가 `splice()`와 헷갈리기 쉬운데, 이 문제에서는 원본 변경이 없는 `slice()`가 더 적합합니다.
