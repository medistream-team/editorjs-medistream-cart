![](https://badgen.net/badge/Editor.js/v2.0/blue)

# 메디스트림 상품 관련 플러그인

Editorjs 에서 메디스트림의 상품 관련 플러그인들을 사용할 수 있습니다.

### 설치

```shell
npm i @medistream/editorjs-product-plugins
```

or

```shell
yarn add @medistream/editorjs-product-plugins
```

## 사용 방법

Editor.js 의 설정 객체의 tools 속성에 사용하고 싶은 플러그인을 삽입합니다.

```javascript
import { CartWidget } from '@medistream/editorjs-product-plugins'

var editor = EditorJS({
  ...

  tools: {
    ...
    cartWidget: {
      class: CartWidget,
    },
  }

  ...
});
```

## 지원하는 플러그인

1. `cartWidget`: 장바구니 담기 위젯
