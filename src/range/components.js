
export class Component {
    constructor(){
        this.children = []
        this.props = Object.create(null)
    }
    get type() {
        return this.constructor.name
    }
    get vdom() {
        return this.render().vdom
    }
    setAttribute(name, value){
        this.props[name] = value
        this[name] = value
    }
    appendChild(vChild) {
        this.children.push(vChild)
    }
    mountTo(range){
        this.range = range
        this.update()
    }
    update(){
        let vdom = this.vdom
        if (this.oldVdom) {
            const isSameNode = (node1, node2) => {
                if (node1.type !== node2.type) return false

                for (let name in node1.props) {
                    const _n1prop = node1.props[name]
                    const _n2prop = node2.props[name]
                    if (typeof _n1prop === 'object' && typeof _n2prop === 'object'
                        && JSON.stringify(_n1prop) === JSON.stringify(_n2prop)) {
                        continue
                    }
                    if (_n1prop !== _n2prop) return false
                }
                if (Object.keys(node1.props).length !== Object.keys(node2.props).length) return false
                return true
            }
            const isSameTree = (node1, node2) => {
                if (!isSameNode(node1, node2)) return false
                if (node1.children.length !== node2.children.length) {
                    return false
                }
                for(let i = 0; i < node1.children.length; i++) {
                    if (!isSameTree(node1.children[i], node2.children[i])) {
                        return false
                    }
                }
                return true
            }

            const replace = (newTree, oldTree) => {
                if (isSameTree(newTree, oldTree)) return
                if (!isSameTree(newTree, oldTree)) {
                    newTree.mountTo(oldTree.range)
                } else {
                    for (let i = 0; i < newTree.children.length; i ++) {
                        replace(newTree.children[i], oldTree.children[i])
                    }
                }
            }
            replace(vdom, this.oldVdom)
        } else {
            vdom.mountTo(this.range)
        }

        this.oldVdom = vdom
    }
    setState(state){
        const merge = (oldState, newState) => {
            for(let p in newState) {
                if(typeof newState[p] === 'object' && newState[p] !== null) {
                    if (typeof oldState[p] !== 'object') {
                        if (newState[p] instanceof Array) {
                            oldState[p] = []
                        } else {
                            oldState[p] = {}
                        }
                    }
                    merge(oldState[p], newState[p])
                } else {
                    oldState[p] = newState[p]
                }
            }
        }
        if (!this.state && state) {
            this.state = {}
        }
        merge(this.state, state)
        this.update()
    }
}