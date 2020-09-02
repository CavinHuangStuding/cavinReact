import { h } from "snabbdom"

const childrenSymbol = Symbol("children")

/**
 * element 处理类构造vdom
 */
export class ElementWrapper {
    constructor(type) {
        this.type = type
        this.props = Object.create(null)
        this.on = Object.create(null)
        this[childrenSymbol] = []
        this.children = []
    }
    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase())
            this.on = {
                [eventName]: value
            }
            return
        }
        this.props[name] = value
    }
    appendChild(vChild) {
        this[childrenSymbol].push(vChild)
        this.children.push(vChild)
    }
    get vdom() {
        return this
    }
    mount() {
        var childs = []
        this.children.forEach(child => {
            childs.push(child.mount())
        })
        return h(this.type, { props: this.props, on: this.on }, childs)
    }
}

/**
 * 文字节点处理类 
 */
export class TextWrapper {
    constructor(content) {
        this.type = '#text'
        this.content = content
    }
    get vdom() {
        return this
    }
    mount() {
        return this.content
    }
}