---
title: 보고서 파일 확장자 확인하기
slug: check-report-extension
track: js-basic
difficulty: easy
topic: string-methods
tags:
  - beginner
  - string
  - js-method
  - endsWith
  - suffix
order: 18
function_name: solution
time_limit_ms: 200
starter_code: |
  function solution(filename) {
    return false;
  }
test_cases:
  - input: ["summary.pdf"]
    output: true
  - input: ["notes.txt"]
    output: false
  - input: ["report.final.pdf"]
    output: true
  - input: ["archive.pdf.backup"]
    output: false
---

문자열 `filename`이 주어질 때, 이 파일명이 `.pdf`로 끝나면 `true`, 아니면 `false`를 반환하는 `solution` 함수를 작성하세요.

## 오늘의 메서드
`endsWith()`는 문자열이 특정 접미사(suffix)로 끝나는지 확인할 때 사용하는 메서드입니다.

## 메서드 설명
이 문제에서는 파일명이 `.pdf`로 끝나는지 검사해야 합니다.
`endsWith()`를 사용하면 문자열의 마지막 부분을 직접 잘라 비교하지 않아도, 원하는 확장자로 끝나는지 바로 확인할 수 있습니다.

예를 들어 `summary.pdf`는 `.pdf`로 끝나므로 `true`이고, `archive.pdf.backup`은 마지막이 `.backup`이므로 `false`입니다.

## 기본 문법
```js
str.endsWith(searchString)
```

## 사용 예시
```js
'summary.pdf'.endsWith('.pdf') // true
'notes.txt'.endsWith('.pdf') // false
'report.final.pdf'.endsWith('.pdf') // true
```

## 주의할 점
- `endsWith()`는 대소문자를 구분합니다.
- 문자열 중간에 `.pdf`가 들어 있어도 **마지막이 아니면** `false`입니다.
- 원본 문자열을 바꾸지 않고, 검사 결과로 불리언 값을 반환합니다.

## 제한사항
- `filename`은 길이 1 이상 100 이하의 문자열입니다.
- `filename`은 영문자, 숫자, 마침표(`.`), 하이픈(`-`), 밑줄(`_`)로만 이루어져 있다고 가정합니다.
- 반환값은 불리언 값 `true` 또는 `false`입니다.

## 예시
- 입력: `"summary.pdf"` → 출력: `true`
- 입력: `"notes.txt"` → 출력: `false`
- 입력: `"archive.pdf.backup"` → 출력: `false`

## 힌트
- 파일명의 마지막 부분이 `.pdf`인지 확인하면 됩니다.
- 뒤에서 몇 글자를 직접 비교하기보다, 문자열의 끝을 검사하는 메서드를 떠올려 보세요.

## 해설
이 문제는 문자열의 **접미사 검사**를 연습하는 문제입니다.

풀이 방법은 간단합니다.
1. 문자열 `filename`에 대해 `endsWith('.pdf')`를 호출합니다.
2. 결과로 나온 `true` 또는 `false`를 그대로 반환합니다.

예를 들어 `report.final.pdf`는 마지막 부분이 `.pdf`이므로 `true`입니다.
반면 `archive.pdf.backup`은 문자열 안에 `.pdf`가 들어 있더라도 끝부분이 아니므로 `false`입니다.

이 문제의 학습 포인트는 파일 확장자처럼 **문자열 끝 패턴을 검사할 때** `endsWith()`를 쓰면 코드가 짧고 의도가 분명해진다는 점입니다.
직접 마지막 글자들을 잘라 비교하는 방식보다 읽기도 쉽고 실수도 줄일 수 있습니다.
