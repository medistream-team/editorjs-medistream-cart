import classNames from "./classNames"
import { createElement } from "../utils/domUtils"
import "../styles/cartWidget.scss"

export class View {
  constructor(data, config, api, block, readOnly) {
    const productId = data.productId
    const imageUrl = data.imageUrl
    const optionSKU = data.optionSKU
    const blockIndex = api.blocks.getCurrentBlockIndex()

    /**
     * @private
     */
    this.readOnly = readOnly

    /**
     * 장바구니 위젯을 감싸는 컨테이너 입니다.
     * 편집 모드에서는 내부에 this._form 을 띄워줍니다.
     * 읽기 모드에서는 내부에 this._readonlyContents 를 띄워줍니다.
     *
     * @private
     */
    this._container = createElement({
      tag: "div",
      class: classNames.CONTAINER,
    })

    /**
     * @private
     */
    this._pluginTitle = createElement({
      tag: "span",
      class: classNames.MESSAGE.PLUGIN_TITLE,
    })

    /**
     * @private
     */
    this._successMessage = createElement({
      tag: "span",
      class: classNames.MESSAGE.SUCCESS_MESSAGE,
    })

    /**
     * @private
     */
    this._invalidMessage = createElement({
      tag: "span",
      class: classNames.MESSAGE.INVALID_MESSAGE,
    })

    /**
     * 아래는 입력창에 속하는 요소들의 모음입니다.
     */

    /**
     * @private
     */
    this._form = createElement({
      tag: "form",
      class: classNames.INNER_CONTAINER.FORM,
    })

    /**
     * @private
     */
    this._productIdInputField = createElement({
      tag: "input",
      class: classNames.INPUTS.PRODUCT_ID,
      attribute: {
        placeholder: "상품 ID 를 입력해주세요.",
        type: "text",
        minLength: 1,
        spellcheck: false,
        id: "product-id" + blockIndex,
      },
    })

    /**
     * @private
     */
    this._imageUrlInputField = createElement({
      tag: "input",
      class: classNames.INPUTS.IMAGE_URL,
      attribute: {
        placeholder: "이미지 주소를 입력해주세요.",
        type: "text",
        minLength: 1,
        spellcheck: false,
        id: "image-url" + blockIndex,
      },
    })

    /**
     * @private
     */
    this._optionSKUInputField = createElement({
      tag: "input",
      class: classNames.INPUTS.OPTION_SKU,
      attribute: {
        placeholder: "옵션 SKU 값을 입력해주세요. (선택)",
        type: "text",
        spellcheck: false,
        id: "option-sku" + blockIndex,
      },
    })

    /**
     * @private
     */
    this._productIdLabel = createElement({
      tag: "label",
      attribute: {
        for: "product-id" + blockIndex,
      },
    })

    /**
     * @private
     */
    this._optionSKULabel = createElement({
      tag: "label",
      attribute: {
        for: "option-sku" + blockIndex,
      },
    })

    /**
     * @private
     */
    this._imageUrlLabel = createElement({
      tag: "label",
      attribute: {
        for: "image-url" + blockIndex,
      },
    })

    this.exitButton = createElement({
      tag: "button",
      class: classNames.BUTTONS.EXIT,
      attribute: {
        type: "button",
      },
    })

    /**
     * 아래는 완료된 컨테이너 속 요소들입니다.
     */

    /**
     * @private
     */
    this._readonlyContents = createElement({
      tag: "div",
      class: classNames.INNER_CONTAINER.COMPLETED_CONTENTS,
    })

    /**
     * @private
     */
    this._readonlyProductId = createElement({
      tag: "span",
      class: classNames.TEXTS.PRODUCT_ID,
    })

    /**
     * @private
     */
    this._readonlyImageUrl = createElement({
      tag: "span",
      class: classNames.TEXTS.IMAGE_URL,
    })

    /**
     * @private
     */
    this._readonlyOptionSKU = createElement({
      tag: "span",
      class: classNames.TEXTS.OPTION_SKU,
    })

    this._pluginTitle.textContent = "마켓 장바구니 담기 위젯"
    this._invalidMessage.textContent = "데이터가 없습니다"
    this._productIdLabel.textContent = "상품 ID"
    this._optionSKULabel.textContent = "옵션 SKU"
    this._imageUrlLabel.textContent = "이미지 주소"
    this.exitButton.textContent = "닫기"

    this._productIdInputField.value = productId || ""
    this._optionSKUInputField.value = optionSKU || ""
    this._imageUrlInputField.value = imageUrl || ""

    this._form.appendChild(this._productIdLabel)
    this._form.appendChild(this._productIdInputField)
    this._form.appendChild(this._optionSKULabel)
    this._form.appendChild(this._optionSKUInputField)
    this._form.appendChild(this._imageUrlLabel)
    this._form.appendChild(this._imageUrlInputField)
    this._form.appendChild(this.exitButton)

    this._readonlyContents.appendChild(this._readonlyProductId)
    this._readonlyContents.appendChild(this._readonlyOptionSKU)
    this._readonlyContents.appendChild(this._readonlyImageUrl)

    this._container.appendChild(this._pluginTitle)
    this._container.appendChild(this._successMessage)
    this._container.appendChild(this._invalidMessage)
    this._container.appendChild(this._form)
  }

  get cartWidgetContainer() {
    return this._container
  }

  get cartWidgetForm() {
    return this._form
  }

  get cartWidgetReadonly() {
    return this._readonlyContents
  }

  get productId() {
    return this._productIdInputField.value
  }

  get imageUrl() {
    return this._imageUrlInputField.value
  }

  get optionSKU() {
    return this._optionSKUInputField.value
  }

  /**
   * @param {String} productId
   */
  set setReadonlyProductId(productId) {
    this._readonlyProductId.textContent = productId
  }

  /**
   * @param {String} imageUrl
   */
  set setReadonlyImageUrl(imageUrl) {
    this._readonlyImageUrl.textContent = imageUrl
  }

  /**
   * @param {String} optionSKU
   */
  set setReadonlyOptionSKU(optionSKU) {
    this._readonlyOptionSKU.textContent = optionSKU
  }

  displayInvalidMessage() {
    this._invalidMessage.style.opacity = 1
  }
}
