const svgIcon = require("../img/toolboxIcon.svg")
const { View } = require("./view")
const { default: classNames } = require("./classNames")
const { Search } = require("./search")

/**
 *  장바구니 위젯 플러그인 클래스입니다.
 */
class CartWidget {
  /**
   * 읽기 모드를 지원 여부를 결정합니다.
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true
  }

  /**
   * 블록 내부에서 엔터키를 눌렀을 때 다음 블록으로 넘어갈지 여부를 결정합니다.
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true
  }

  /**
   * Sanitizer rules
   */
  static get sanitize() {
    return {
      br: true,
      mark: true,
    }
  }

  /**
   * 이 플러그인의 아이콘과 이름을 정할 수 있습니다.
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: svgIcon,
      title: "Cart Widget",
    }
  }

  constructor({ data, config, api, block, readOnly }) {
    this.api = api
    this.block = block
    this.readOnly = readOnly
    this.data = data

    this.view = new View(data, config, api, block, readOnly)
    this.search = new Search(this.view, config)
  }

  /**
   * 브라우저에 렌더링 되는 요소를 반환합니다.
   *
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    if (this.readOnly) {
      this._setTextContentsOfReadonlyContainer()
      this.view.cartWidgetForm.replaceWith(this.view.cartWidgetReadonly)

      return this.view.cartWidgetContainer
    }

    return this.view.cartWidgetContainer
  }

  /**
   * Editor.js 의 저장소에 저장할 데이터를 반환합니다.
   *
   * @param {HTMLElement} toolsContent - Tool HTML element
   */
  save(toolsContent) {
    return {
      productId: this.search.productId,
    }
  }

  /**
   * 읽기 모드에서 유저가 입력한 값들을 보여주기 위해서 상응하는 요소들에 값을 할당합니다.
   */
  _setTextContentsOfReadonlyContainer() {
    this.view.setReadonlyProductId = this.view.productId
  }
}

module.exports = CartWidget
