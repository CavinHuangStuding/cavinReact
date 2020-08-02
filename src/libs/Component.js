import { mergeData } from './utils'
import { replace } from './vnode'
export class Component {
    constructor() {
        this.children = []
        this.props = Object.create(null)
        this.state = Object.create(null)
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
    }
    update() {
        // 更新之前当前位置先插入一个注释占位
        // const range = document.createRange();
        // range.setStart(this.range.endContainer, this.range.endOffset);
        // range.setEnd(this.range.endContainer, this.range.endOffset);
        // range.insertNode(document.createComment("placeholder"));

        // 再清除当前节点
        // this.range.deleteContents();
        // 对比节点更新局部更新,dispatch
        const vdom = this.render();
        if (this.oldVdom) {
            replace(vdom, this.oldVdom)
        } else {
            // 最后 mount
            vdom.mount(this.range);
        }
        this.oldVdom = vdom
    }
    setState (state) {
        if (!this.state && state) {
            this.state = Object.create(null)
        }
        mergeData(this.state, state)
        this.update()
    }
    get vdom () {
        return this.render()
    }
}