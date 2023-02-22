import { createElement } from "../utils/domUtils"
import classNames from "./classNames"
import { View } from "./view"

export class Search {
  /**
   * @param {View} view
   * @param {Object} config
   * @param {String} config.endpoint
   * @param {String} config.imgTidy
   */
  constructor(view, config) {
    this.view = view
    this.form = view.cartWidgetForm
    this.input = view.productIdInput
    this.timerId = null
    this.endpoint = config.endpoint || ""
    this.imgTidy = config.imgTidy || ""
    this.productId = ""

    this._hangEvents()
  }

  /**
   * 제품을 검색합니다.
   *
   * @param {String} query
   * @returns {Promise<any[]>}
   */
  async fetchProducts(query) {
    const url = new URL(this.endpoint)
    url.searchParams.append("offset", 0)
    url.searchParams.append("limit", 50)
    url.searchParams.append("sort", "-three_months")
    url.searchParams.append("search", query)

    try {
      const result = await (await fetch(url.href)).json()
      return result.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  /**
   * 제품 카드를 검색 결과 컨테이너에 추가합니다.
   *
   * @private
   * @param {Object} product
   */
  _fillSearchResultsContainer(product) {
    const productCard = this._createProductCard(product)
    this.view.searchResultContainer.appendChild(productCard)
  }

  /**
   * 제품 카드를 생성합니다.
   *
   * @private
   */
  _createProductCard(product) {
    return createElement({
      tag: "div",
      class: classNames.SEARCH.CARD,
      attribute: {
        "data-productId": product.id,
      },
      children: [
        createElement({
          tag: "img",
          class: classNames.SEARCH.IMAGE,
          attribute: {
            src: this.imgTidy + product.images[0]?.url,
            loading: "lazy",
            width: 70,
            height: 70,
          },
        }),
        createElement({
          tag: "span",
          class: classNames.SEARCH.NAME,
          textContent: product.name,
        }),
        createElement({
          tag: "span",
          class: classNames.SEARCH.META_DESCRIPTION,
          textContent: product.meta_description,
        }),
        createElement({
          tag: "span",
          class: classNames.SEARCH.SALE_PRICE,
          textContent: `${(product.sale_price || product.regular_price).toLocaleString()} 원`,
        }),
        createElement({
          tag: "span",
          class: classNames.SEARCH.STOCK_QUANTITY,
          textContent: `${product.stock_quantity.toLocaleString()} 개`,
        }),
      ],
    })
  }

  /**
   * @private
   * @param {HTMLElement} productCard
   */
  _displaySelectedProductCard(productCard) {
    const previousSelectedCard = this.view.cartWidgetContainer.querySelector(
      "[data-selectedCard=true]"
    )

    if (previousSelectedCard) {
      previousSelectedCard.remove()
    }

    this.view.cartWidgetContainer.appendChild(productCard)
    productCard.addEventListener("click", this._handleSelectedCardClick.bind(this))
  }

  /**
   * 검색 결과에서 제품 카드를 클릭하면 Cart Widget 컨테이너에
   * 해당 카드를 복사해서 추가합니다.
   * 이미 선택한 카드가 있었다면 삭제하고 진행합니다.
   *
   * @private
   * @param {MouseEvent} event
   */
  _handleProductCardClick(event) {
    if (!event.target.closest("." + classNames.SEARCH.CARD)) return
    const productCard = event.target.closest("." + classNames.SEARCH.CARD)

    const productId = productCard.getAttribute("data-productId")
    this.productId = productId

    const productCardClone = productCard.cloneNode(true)
    productCardClone.setAttribute("data-selectedCard", true)

    this._displaySelectedProductCard(productCardClone)
    this.view.hideSearchResultsContainer()
  }

  /**
   * 선택된 카드를 클릭하면 해당 카드를 삭제하고 검색창을 비웁니다.
   *
   * @private
   * @param {MouseEvent} event
   */
  _handleSelectedCardClick(event) {
    const card = event.target.closest("." + classNames.SEARCH.CARD)
    card.remove()
    this.productId = ""
    this.view.setInputValue = ""
  }

  /**
   * @private
   * @param {SubmitEvent} event
   */
  _handleSubmit(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  /**
   * @private
   * @param {InputEvent} event
   */
  _handleInput(event) {
    // clean up
    if (this.timerId) {
      clearTimeout(this.timerId)
      this.view.hideSearchResultsContainer()
    }

    this.timerId = setTimeout(async () => {
      if (event.target.value) {
        const products = await this.fetchProducts(event.target.value)

        products.forEach(this._fillSearchResultsContainer.bind(this))
        this.view.showSearchResultsContainer()
      }
    }, 500)
  }

  /**
   * @private
   */
  _hangEvents() {
    this.form.addEventListener("submit", this._handleSubmit.bind(this))
    this.input.addEventListener("input", this._handleInput.bind(this))
    this.view.searchResultContainer.addEventListener(
      "click",
      this._handleProductCardClick.bind(this)
    )
  }
}
