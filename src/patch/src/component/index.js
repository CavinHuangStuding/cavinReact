import { patch } from '../patch'
export class Component {
    constructor() {
        this.children = []
        this.props = Object.create(null)
        this.key = new Date() * 1
    }
    get type() {
        return this.constructor.name
    }
    get vdom() {
        return this.render().vdom
    }

    setAttribute(name, value) {
        this.props[name] = value
        this[name] = value
    }

    appendChild(...children) {
        this.children.push(...children)
    }

    mount() {
        return this.update()
    }
    update() {
        const vdom = this.vdom
        let newVnode = vdom.mount()
        if (this.oldVdom) {
            patch(this.oldVdom, newVnode)
        }
        this.oldVdom = newVnode
        return newVnode
    }
    setState(state) {
        const merge = (oldState, newState) => {
            for (let p in newState) {
                if (typeof newState[p] === 'object' && newState[p] !== null) {
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
        console.log(this.state)
        this.update()
    }
}