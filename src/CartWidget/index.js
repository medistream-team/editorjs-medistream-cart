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
    this.data = data
    this.api = api
    this.block = block
    this.readOnly = readOnly

    this.view = new View(data, config, api, readOnly)
    this.isEditing = true

    this.view.cartWidgetForm.addEventListener("submit", this._handleComplete.bind(this))
    this.view.cartWidgetContainer.addEventListener("click", this._handleExit.bind(this))
    this.view.cartWidgetContainer.addEventListener("click", this._handleEdit.bind(this))
  }

  /**
   * 브라우저에 렌더링 되는 요소를 반환합니다.
   *
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    if (this.readOnly && this.isEditing) {
      // MARK: 작성 중에 읽기 모드로 전환하면 완료 상태의 컨테이너를 보여줍니다.
      this._setTextContentsOfCompletedContainer()
      this.view.cartWidgetForm.replaceWith(this.view.cartWidgetCompleted)

      return this.view.cartWidgetContainer
    }

    if (this.readOnly && !this.isEditing) {
      // MARK: 완료 상태에서 읽기 모드로 전환하면 그대로 유지합니다.
      return this.view.cartWidgetContainer
    }

    if (this.view.productId && this.view.imageUrl) {
      // MARK: 렌더링 되는 시점에 제품 아이디와 이미지 주소가 채워졌다면 완료 상태의 컨테이너를 보여줍니다.
      this._setTextContentsOfCompletedContainer()
      this.view.cartWidgetForm.replaceWith(this.view.cartWidgetCompleted)
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
   * 완료 상태의 컨테이너에서 유저가 입력한 값들을 보여주기 위해서 상응하는 요소들에 값을 할당합니다.
   */
  _setTextContentsOfCompletedContainer() {
    this.view.setCompletedProductId = this.view.productId
    this.view.setCompletedImageUrl = this.view.imageUrl
    this.view.setCompletedOptionSKU = this.view.optionSKU
  }

  _handleComplete(event) {
    event.preventDefault()

    if (this.view.productId && this.view.imageUrl) {
      this._setTextContentsOfCompletedContainer()
      this.view.cartWidgetForm.replaceWith(this.view.cartWidgetCompleted)

      this.isEditing = false
    }
  }

  _handleExit(event) {
    if (event.target.classList.value === classNames.BUTTONS.EXIT) {
      const currentBlockIndex = this.api.blocks.getCurrentBlockIndex()
      this.api.blocks.delete(currentBlockIndex)
    }
  }

  _handleEdit(event) {
    if (event.target.classList.value === classNames.BUTTONS.EDIT) {
      this.view.cartWidgetCompleted.replaceWith(this.view.cartWidgetForm)

      this.isEditing = true
    }
  }
}

module.exports = CartWidget
