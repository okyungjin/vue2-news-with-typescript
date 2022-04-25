# Table of Contents
- [Table of Contents](#table-of-contents)
- [About Project](#about-project)
- [Build Setup](#build-setup)
- [Dev Notes](#dev-notes)
  - [Vue.js 프로젝트 TypeScript로 마이그레이션 하기](#vuejs-프로젝트-typescript로-마이그레이션-하기)
    - [1) Vue CLI 사용](#1-vue-cli-사용)
    - [2) TypeScript 프로젝트 생성 후 JavaScript 소스 이관](#2-typescript-프로젝트-생성-후-javascript-소스-이관)
  - [tsconfig strict 옵션](#tsconfig-strict-옵션)
  - [store는 꼭 필요할 때만 사용하기](#store는-꼭-필요할-때만-사용하기)

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

## tsconfig strict 옵션
`App.vue` 의 `loadingStatus` 가 boolean으로 초기화 되었지만, 타입을 any로 인식하고 있는 걸 볼 수 있다.

<img width="366" alt="tsconfig-strict" src="https://user-images.githubusercontent.com/31913666/164909956-fdaa53ee-33c1-4819-ac2c-9a7aa3c958c2.png">

이는 `tsconfig.json` 의 strict 옵션이 false로 되어있기 때문이다. any 타입이면 boolean 외의 타입도 할당이 가능하므로 TypeScript의 이점을 사용할 수 없다.

strict 옵션을 true로 변경하면 타입 추론이 잘 되는 것을 확인할 수 있으나, 점진적 적용을 위해 우선은 false로 설정하자.

## store는 꼭 필요할 때만 사용하기
`ListView.vue` 에서 ListItem 컴포넌트를 불러오는 구조이다.
ListItem 컴포넌트에서는 store에서 list 데이터를 불러오는데, 사실 이러한 구조는 피하는 것이 좋다.

```html
<template>
  <ListItem></ListItem>
</template>
```

ListView에서 데이터를 ListItem으로 내려주면 된다. 이러한 데이터까지 store에 넣게 되면 Mixin을 같이 사용했을 때, 데이터 흐름을 파악하기가 매우 어려워진다.

> store에 넣기에 적절한 데이터인지 고민 후에 store를 통해 처리하도록 하자.


## error나 warning 발생해도 overlay 뜨지 않도록 설정하기

root 디렉토리에 `vue.config.js` 를 생성한 후 다음 소스를 넣어준다.
error나 warning이 발생해도 overlay가 발생하지 않는다.
 
```js
module.exports = {
  devServer: {
    overlay: false,
  },
};
```

