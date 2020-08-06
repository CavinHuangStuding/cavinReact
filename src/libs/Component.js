import { mergeData } from './utils'
// import { replace } from './vnode'
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
        this.children.push(vChild)
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
        const vdom = this.vdom;
        if (this.oldVdom) {
            const isSameNode = (node1, node2) => {
                if (node1.type !== node2.type) return false
                
                for (const name in node1.props) {
                    if (typeof node1.props[name] === 'object' && 
                        typeof node2.props[name] === 'object' && 
                        JSON.stringify(node1.props[name]) === JSON.stringify(node2.props[name])) {
                            continue
                        }
                    if (node1.props[name] !== node2.props[name]) {
                        return false
                    }
                }
                if (Object.keys(node1.props).length !== Object.keys(node2.props).length) {
                    return false
                }
                return true
            }
            
            // 对比子节点树
            const isSameTree = (node1, node2) => {
                if (!isSameNode(node1, node2)) return false
                const len = node1.children.length
                if (len !== node2.children.length) return false
                for (let i = 0; i < len; i++) {
                    if (!isSameTree(node1.children[i], node2.children[i])) {
                        return false
                    }
                }
                return true
            }
            
            // 替换
            const replace = (newTree, oldTree, indent = '') => {
                console.log(indent + 'new:', newTree)
                console.log(indent + 'old:', oldTree)
                if (isSameTree(newTree, oldTree)) {
                    console.log('all same')
                    return true
                }
                if (!isSameNode(newTree, oldTree)) {
                    console.log('all different')
                    newTree.mount(oldTree.range)
                } else {
                    for (let i = 0; i < newTree.children.length; i++) {
                        replace(newTree.children[i], oldTree.children[i], '  ' + index)
                    }
                }
            }
            replace(vdom, this.oldVdom)
        } else {
            // 最后 mount
            vdom.mount(this.range);
        }
        this.oldVdom = vdom
    }
    setState (state) {
        if (!this.state && state) {
            this.state = {}
        }
        mergeData(this.state, state)
        this.update()
    }
    get vdom () {
        return this.render().vdom
    }
}