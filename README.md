![](https://badgen.net/badge/Editor.js/v2.0/blue)

# 메디스트림 상품 관련 플러그인

메디스트림의 상품 관련 플러그인들을 사용할 수 있습니다.

### 설치

```shell
npm i --save-dev @medistream/editorjs-product-plugins
```

or

```shell
yarn add @medistream/editorjs-product-plugins --dev
```

## 사용 방법

Editor.js 의 설정 객체의 tools 속성에 attachMedistreamProductPlugins 의 반환 값을 입력합니다.

```javascript
import attachMedistreamProductPlugins from '@medistream/editorjs-product-plugins'

var editor = EditorJS({
  ...

  tools: {
    ...
    attachMedistreamProductPlugins({
      cartWidget: {
        someToolProperty: true,
      },
    })
  }

  ...
});
```

플러그인에 설정할 요소가 없다면 `true` 를 입력해도 됩니다.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    attachMedistreamProductPlugins({
      cartWidget: true
    })
  },

  ...
});
```

## 지원하는 플러그인

1. `cartWidget`: 장바구니 담기 위젯
