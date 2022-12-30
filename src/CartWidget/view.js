import classNames from "./classNames"
import { createElement } from "../utils/domUtils"
import "../styles/cartWidget.scss"

export class View {
  constructor(data, config, api, readOnly) {
    const productId = data.productId
    const imageUrl = data.imageUrl
    const optionSKU = data.optionSKU

    /**
     * @private
     */
    this.readOnly = readOnly

    /**
     * 장바구니 위젯을 감싸는 컨테이너 입니다.
     * 수정 단계에서는 내부에 this._form 을 띄워줍니다.
     * 완료 단계에서는 내부에 this._completedContents 를 띄워줍니다.
     *
     * @private
     */
    this._container = createElement({
      tag: "div",
      class: classNames.CONTAINER,
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
      },
    })

    this.completeButton = createElement({
      tag: "button",
      class: classNames.BUTTONS.COMPLETE,
      attribute: {
        type: "submit",
      },
    })

    this.editButton = createElement({
      tag: "button",
      class: classNames.BUTTONS.EDIT,
      attribute: {
        type: "button",
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
    this._completedContents = createElement({
      tag: "div",
      class: classNames.INNER_CONTAINER.COMPLETED_CONTENTS,
    })

    /**
     * @private
     */
    this._completedProductId = createElement({
      tag: "span",
      class: classNames.TEXTS.PRODUCT_ID,
    })

    /**
     * @private
     */
    this._completedImageUrl = createElement({
      tag: "span",
      class: classNames.TEXTS.IMAGE_URL,
    })

    /**
     * @private
     */
    this._completedOptionSKU = createElement({
      tag: "span",
      class: classNames.TEXTS.OPTION_SKU,
    })

    this.completeButton.textContent = "완료"
    this.editButton.textContent = "수정하기"
    this.exitButton.textContent = "닫기"

    this._productIdInputField.value = productId || ""
    this._optionSKUInputField.value = optionSKU || ""
    this._imageUrlInputField.value = imageUrl || ""

    this._form.appendChild(this._productIdInputField)
    this._form.appendChild(this._optionSKUInputField)
    this._form.appendChild(this._imageUrlInputField)
    this._form.appendChild(this.completeButton)
    this._form.appendChild(this.exitButton)

    this._completedContents.appendChild(this._completedProductId)
    this._completedContents.appendChild(this._completedOptionSKU)
    this._completedContents.appendChild(this._completedImageUrl)
    if (!this.readOnly) {
      this._completedContents.appendChild(this.editButton.cloneNode(true))
      this._completedContents.appendChild(this.exitButton.cloneNode(true))
    }

    this._container.appendChild(this._form)
  }

  get cartWidgetContainer() {
    return this._container
  }

  get cartWidgetForm() {
    return this._form
  }

  get cartWidgetCompleted() {
    return this._completedContents
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
  set setCompletedProductId(productId) {
    this._completedProductId.textContent = productId
  }

  /**
   * @param {String} imageUrl
   */
  set setCompletedImageUrl(imageUrl) {
    this._completedImageUrl.textContent = imageUrl
  }

  /**
   * @param {String} optionSKU
   */
  set setCompletedOptionSKU(optionSKU) {
    this._completedOptionSKU.textContent = optionSKU
  }
}
