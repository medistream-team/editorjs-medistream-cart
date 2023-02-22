import classNames from "./classNames"
import { createElement } from "../utils/domUtils"
import "../styles/cartWidget.scss"

export class View {
  constructor(data, config, api, block, readOnly) {
    const productId = data.productId
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
    this._searchResultsContainer = createElement({
      tag: "div",
      class: classNames.INNER_CONTAINER.SEARCH_RESULTS,
    })

    /**
     * @private
     */
    this._pluginTitle = createElement({
      tag: "span",
      class: classNames.MESSAGE.PLUGIN_TITLE,
    })

    /**
     * 아래는 입력창에 속하는 요소들입니다.
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
        autocomplete: "off",
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

    this._pluginTitle.textContent = "마켓 장바구니 담기 위젯"
    this._productIdLabel.textContent = "상품 검색"
    this._productIdInputField.value = productId || ""

    this._form.appendChild(this._productIdLabel)
    this._form.appendChild(this._productIdInputField)

    this._readonlyContents.appendChild(this._readonlyProductId)

    this._container.appendChild(this._pluginTitle)
    this._container.appendChild(this._form)
    this._container.appendChild(this._searchResultsContainer)
  }

  get cartWidgetContainer() {
    return this._container
  }

  get searchResultContainer() {
    return this._searchResultsContainer
  }

  get cartWidgetForm() {
    return this._form
  }

  get cartWidgetReadonly() {
    return this._readonlyContents
  }

  get productIdInput() {
    return this._productIdInputField
  }

  get productId() {
    return this._productIdInputField.value
  }

  /**
   * @param {String} text
   */
  set setInputValue(text) {
    this._productIdInputField.value = text
  }

  /**
   * @param {String} productId
   */
  set setReadonlyProductId(productId) {
    this._readonlyProductId.textContent = productId
  }

  showSearchResultsContainer() {
    this._searchResultsContainer.classList.add(classNames.INNER_CONTAINER.SEARCH_RESULTS_VISIBLE)
  }

  hideSearchResultsContainer() {
    this._searchResultsContainer.replaceChildren()
    this._searchResultsContainer.classList.remove(classNames.INNER_CONTAINER.SEARCH_RESULTS_VISIBLE)
  }
}
