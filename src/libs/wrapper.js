
class Wrapper {
    constructor(type, attrs) {
        this.type = type
        this.root = document.createElement(type)
        this.children = []
        this.props = Object.create(null)
    }
    mount(range) {
        this.range = range
        // 先清除
        range.deleteContents()
        // 再插入
        let element = document.createElement(this.type)

        for (let name in this.props) {
            var value = this.props[name]
                
            if (name.match(/^on([\s\S]+)$/)) {
                const eventName = RegExp.$1.toLowerCase()
                element.addEventListener(eventName, value)
            } else {
                if (name === "className") name = "class";
                element.setAttribute(name, value)
            }
        }

        for (let child of this.children) {
            let range = document.createRange()
            if (element.children.length) {
                range.setStartAfter(element.lastChild)
                range.setEndAfter(element.lastChild)
            } else {
                range.setStartAfter(element, 0)
                range.setEndAfter(element, 0)
            }
            child.mount(range)
        }

        range.insertNode(this.root)
    }
    get vdom() {
        return this
    }
}

export class ElementWrapper extends Wrapper {
    constructor(type) {
        super(type)
    }
    setAttribute(name, value = null) {
        
        this.props[name] = value
    }
    appendChild(vChild) {
        this.children.push(vChild)
    }
}

export class TextWrapper extends Wrapper {
    constructor(text) {
        super()
        this.root = document.createTextNode(text)
        this.type = '#text'
    }
}
