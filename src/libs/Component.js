export class Component {
    constructor() {
        this.children = []
        this.props = Object.create(null)
    }
    setAttribute(name, value) {
        this[name] = value
        this.props[name] = value
    }
    appendChild(vChild) {
        this.children = vChild
    }
    mount(range) {
        this.range = range
        this.update()
        console.log('mounted')
    }
    update() {
        // 更新之前当前位置先插入一个注释占位
        // const range = document.createRange();
        // range.setStart(this.range.endContainer, this.range.endOffset);
        // range.setEnd(this.range.endContainer, this.range.endOffset);
        // range.insertNode(document.createComment("placeholder"));

        // 再清除当前节点
        this.range.deleteContents();

        const vdom = this.render();
        // 最后 mount
        vdom.mount(this.range);
        console.log('=====components', this.range, vdom)
    }
}