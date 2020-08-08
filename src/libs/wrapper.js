const childrenSymbol = Symbol('children')
export class ElementWrapper {
    constructor(type) {
        this.type = type
        this.props = Object.create(null)
        this[childrenSymbol] = []
        this.children = []
    }
    setAttribute(name, value = null) {
        this.props[name] = value
    }
    appendChild(vChild) {
        this.children.push(vChild)
        this[childrenSymbol].push(vChild)
    }
    get vdom() {
        return this
    }
    mount(range) {
        this.range = range
        let placeholder = document.createComment('placeholder')
        let endRange = document.createRange()
        endRange.setStart(range.endContainer, range.endOffset)
        endRange.setEnd(range.endContainer, range.endOffset)
        endRange.insertNode(placeholder)

        // 先清除
        range.deleteContents()
        // 再插入
        let element = document.createElement(this.type)
        console.log(element)

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
                range.setStart(element, 0)
                range.setEnd(element, 0)
            }
            child.mount(range)
        }

        range.insertNode(element)
    }
   
}

export class TextWrapper {
    constructor(text) {
        this.children = []
        this.root = document.createTextNode(text)
        this.type = '#text'
        this.props = Object.create(null)
    }
    mount(range) {
        this.range = range
        range.deleteContents()
        range.insertNode(this.root)
    }
    get vdom() {
        return this
    }
}
