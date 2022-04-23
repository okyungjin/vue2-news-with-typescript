# Table of Contents
- [Table of Contents](#table-of-contents)
- [About Project](#about-project)
- [Build Setup](#build-setup)
- [Dev Notes](#dev-notes)
  - [Vue.js 프로젝트 TypeScript로 마이그레이션 하기](#vuejs-프로젝트-typescript로-마이그레이션-하기)
    - [1) Vue CLI 사용](#1-vue-cli-사용)
    - [2) TypeScript 프로젝트 생성 후 JavaScript 소스 이관](#2-typescript-프로젝트-생성-후-javascript-소스-이관)

# About Project
[News App with Vue 2](https://github.com/okyungjin/vue2-news) 프로젝트에 TypeScript를 점진적으로 적용해보는 프로젝트입니다.

# Build Setup
```bash
# Project setup
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

# Lints and fixes files
npm run lint
```

# Dev Notes
## Vue.js 프로젝트 TypeScript로 마이그레이션 하기
Vue.js 프로젝트에 TypeScript를 적용시켜 마이그레이션하는 방법에는 두 가지가 있다.

1. Vue CLI 사용
2. TypeScript 프로젝트 생성 후 JavaScript 소스 이관 (점진적 적용)

### 1) Vue CLI 사용
Vue CLI에서 제공하는 `vue add typescript` 명령어를 사용하면, 프로젝트에 TypeScript를 적용해준다.

다만, 이 방법은 그다지 추천하지 않는데 이유는 다음과 같다.
- 기존 라이브러리와 Vue CLI에서 일괄로 적용하는 TypeScript 버전이 호환되지 않을 수 있음
- Preset 설정에서 js 파일을 ts로 일괄 변경 시 TypeScript 점진적 적용이 어려움
- `App.vue` 등의 소스를 초기화함

실무 프로젝트는 프로젝트의 규모가 커서 한 번에 TypeScript를 적용하는 것은 어렵다. 2번 방법을 통해 점진적으로 적용하는 것을 권장한다.

### 2) TypeScript 프로젝트 생성 후 JavaScript 소스 이관
Vue CLI를 통해 TypeScript 프로젝트를 생성하고 JavaScript 소스를 그대로 옮기는 방법이며, 다음과 같은 순서로 진행한다.

1. Vue + TypeScript 프로젝트 생성 
2. 기존 서비스 코드와 라이브러리를 새 프로젝트에 이동
    > `src/` 이하의 디렉토리와 `App.vue` 파일을 생성된 TypeScript 프로젝트로 옮기면 된다.

3. 기본적인 빌드 에러 해결
    > TypeScript warning이나 error가 발생하지만 `npm run serve` 를 실행하면 프로젝트가 정상적으로 동작한다. 이를 통해 **TypeScript의 오류가 무조건 JavaScript의 오류는 아님**을 알 수 있다.

4. 타입 스크립트의 혜택을 볼 수 있는 파일 위주로 `.js` -> `.ts` 로 변환하며 적용

**팁**

타입 체킹은 덜 엄격한 방식에서 점점 엄격한 방식으로 적용하는 것을 추천한다.