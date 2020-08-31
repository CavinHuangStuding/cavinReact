const childrenSymbol = Symbol("children")

export class ElementWrapper {
    constructor (type) {
        this.type = type
        this.props = Object.create(null)
        this[childrenSymbol] = []
        this.children = []
    }
    setAttribute (name, value) {
        this.props[name] = value
    }
    appendChild (vChild) {
        this[childrenSymbol].push(vChild)
        this.children.push(vChild)
    }
    get vdom() {
        return this
    }
    mountTo (range) {
        this.range = range
        range.deleteContents()
        let element = document.createElement(this.type)
        for (let name in this.props) {
            let value = this.props[name]
            if (name.match(/^on([\s\S]+)$/)) {
                let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase())
                element.addEventListener(eventName, value)
                continue
            }
            if (name === 'className') {
                element.setAttribute('class', value)
            }
            element.setAttribute(name, value)
        }

        for (let child of this.children) {
            let range = document.createRange()
            if (element.children.length) {
                range.setStartAfter(element.lastChild)
                range.setEndAfter(element.lastChild)
            } else {
                range.setStart(element, 0)
                range.setEnd(element, 0)
            }
            child.mountTo(range)
        }
        range.insertNode(element)
    }
}

export class TextWrapper {
    constructor(content){
        this.root = document.createTextNode(content)
        this.type = '#text'
        this.children = []
        this.props = Object.create(null)
    }
    mountTo(range) {
        this.range = range
        range.deleteContents()
        range.insertNode(this.root)
    }
    get vdom() {
        return this
    }
}