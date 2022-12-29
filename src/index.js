const { CartWidget } = require("./CartWidget")

// 장바구니 담기 위젯 플러그인 이름
const CART_WIDGET = "cartWidget"

/**
 *
 * @param {{
 *  cartWidget: true | Object,
 * }} plugins
 * @returns object
 */
function attachMedistreamProductPlugins(plugins) {
  const attachedPlugins = {}

  for (const plugin in plugins) {
    if (plugin === CART_WIDGET) {
      if (plugins[plugin] === true) {
        attachedPlugins[plugin] = {
          class: CartWidget,
        }

        continue
      }

      attachedPlugins[plugin] = {
        class: CartWidget,
        ...plugins[plugin],
      }
    }
  }

  return attachedPlugins
}

module.exports = attachMedistreamProductPlugins
