const svgIcon = require("../img/toolboxIcon.svg")
const { View } = require("./view")
const { default: classNames } = require("./classNames")

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

    this.view.cartWidgetContainer.addEventListener("click", this._handleExit.bind(this))
  }

  /**
   * 브라우저에 렌더링 되는 요소를 반환합니다.
   *
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    if (this.readOnly) {
      if (!this.data.productId || !this.data.imageUrl) {
        this.view.displayInvalidMessage()
      }

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
      productId: this.view.productId,
      imageUrl: this.view.imageUrl,
      optionSKU: this.view.optionSKU,
    }
  }

  /**
   * 읽기 모드에서 유저가 입력한 값들을 보여주기 위해서 상응하는 요소들에 값을 할당합니다.
   */
  _setTextContentsOfReadonlyContainer() {
    this.view.setReadonlyProductId = this.view.productId
    this.view.setReadonlyImageUrl = this.view.imageUrl
    this.view.setReadonlyOptionSKU = this.view.optionSKU
  }

  _handleExit(event) {
    if (event.target.classList.value === classNames.BUTTONS.EXIT) {
      const currentBlockIndex = this.api.blocks.getCurrentBlockIndex()

      this.api.blocks.delete(currentBlockIndex)
    }
  }
}

module.exports = CartWidget
