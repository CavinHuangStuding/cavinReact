
class Wrapper {
    constructor(type, attrs) {
        this.type = type
        this.root = document.createElement(type)
        this.children = []
        this.props = Object.create(null)
    }
    mount(range) {
        // 先清除
        range.deleteContents()
        // 再插入
        range.insertNode(this.root)
    }
}

export class ElementWrapper extends Wrapper {
    constructor(type) {
        super(type)
    }
    setAttribute(name, value = null) {
        if (name.match(/^on([\s\S]+)$/)) {
            const eventName = RegExp.$1.toLowerCase()
            this.root.addEventListener(eventName, value)
        } else {
            if (name === "className") name = "class";
            this.root.setAttribute(name, value)
        }
    }
    appendChild(vChild) {
        const range = document.createRange();

        if (this.root.children.length) {
            // 如果有子元素，则添加在最后
            range.setStartAfter(this.root.lastChild);
            range.setEndAfter(this.root.lastChild);
        } else {
            range.setStart(this.root, 0);
            range.setEnd(this.root, 0);
        }

        vChild.mount(range);
    }
}

export class TextWrapper extends Wrapper {
    constructor(text) {
        super()
        this.root = document.createTextNode(text)
        this.type = '#text'
    }
}
