
const childrenSymbol = Symbol("children")
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

        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i]
            element.appendChild(this.children[i].mount())
        }
        console.log(element, this.children)
        return element
    }
}
export class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
        this.type = '#text'
        this.children = []
        this.props = Object.create(null)
    }
    mount() {
        return this.root
    }
    get vdom() {
        return this
    }
}