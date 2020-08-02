import { ElementWrapper, TextWrapper } from './wrapper'
import { Component } from './Component'

const CavinReact = {
  createElement(type, attrs, ...children) {
    let element = null
    if (typeof type === "string") {
      // 内置 ElementWrapper 对象
      element = new ElementWrapper(type, attrs)
    } else {
      // 外部继承对象，这里的 type 对象默认认为它继承了 Component
      element = new type()
    }
    console.log(element)
    for (let name in attrs) {
      element.setAttribute(name, attrs[name])
    }
    // children 递归插入
    const insertChildren = (children) => {
      for (let child of children) {
        if (typeof child === "object" && child instanceof Array) {
          insertChildren(child)
        } else {
          // 当 child 没有继承于内置对象时，做一次安全处理，统一转 String
          if (
            !(child instanceof Component) &&
            !(child instanceof ElementWrapper) &&
            !(child instanceof TextWrapper)
          )
            child = String(child)

          // 文本节点创建
          if (typeof child === "string") child = new TextWrapper(child)

          // appendChild
          // element 可能为 ElementWrapper 或者 继承自 Component 的实例
          // 这里分别调用它们的实现方法 appendChild
          element.appendChild(child)
        }
      }
    }

    insertChildren(children)

    return element
  },
  // render 钩子
  render(vdom, element) {
    // range 记录节点位置
    const range = document.createRange()

    // 有子节点则追加
    if (element.children.length) {
      range.setStartAfter(element.lastChild)
      range.setEndAfter(element.lastChild)
    } else {
      range.setStart(element, 0)
      range.setEnd(element, 0)
    }

    vdom.mount(range)
  },
}

export {
  Component,
  CavinReact
}