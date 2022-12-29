/**
 *
 * @param {Object} data
 * @param {String} data.tag
 * @param {String | String[] | null} data.class
 * @param {Object | null} data.attribute
 * @param {HTMLElement[] | HTMLElement | null} data.children
 */
export function createElement(data) {
  const element = document.createElement(data.tag)

  if (typeof data.class === "string") {
    element.classList.add(data.class)
  } else if (Array.isArray(data.class)) {
    data.class.forEach((className) => {
      element.classList.add(className)
    })
  }

  if (typeof data.attribute === "object") {
    for (let key in data.attribute) {
      element.setAttribute(key, data.attribute[key])
    }
  }

  if (data.children === undefined || data.children === null) {
    return element
  } else if (Array.isArray(data.children)) {
    data.children.forEach((child) => {
      element.appendChild(child)
    })
  } else if (data.children !== null) {
    element.appendChild(data.children)
  }

  return element
}
