# Autopublish Guard

이 저장소의 일일 문제 퍼블리시는 **문제 데이터만** 갱신해야 합니다.

## 자동 퍼블리시가 변경해도 되는 파일

- `_problems/**`
- `problem-catalog.json`

## 자동 퍼블리시가 변경하면 안 되는 파일

- `index.md`
- `problems/index.md`
- `today/**`
- `algorithm/**`
- `js-basic/**`
- `_layouts/**`
- `assets/**`
- `_config.yml`
- `.github/workflows/**`
- `CNAME`

## 이유

이 파일들은 사이트 정보구조, 대시보드, 메뉴, 댓글(Disqus), 스타일, 배포 설정을 담당합니다.
자동 생성기가 이 파일들을 덮어쓰면 UI와 기능이 초기 버전으로 되돌아갑니다.

## 원칙

일일 퍼블리시 자동화는 **새 문제 추가/문제 카탈로그 갱신만** 수행해야 합니다.
UI/레이아웃/설정 변경은 수동 PR 또는 명시적 기능 커밋으로만 반영합니다.
