
export class Component {
    constructor() {
        this.children = []
        this.props = Object.create(null)
    }
    get type() {
        return this.constructor.name
    }
    get vdom() {
        return this.render()
    }
    setAttribute(name, value) {
        this.props[name] = value
        this[name] = value
    }
    appendChild(child) {
        this.children.push(child)
    }
    mount(parent) {
        console.log(this.vdom.mount())
        parent.appendChild(this.vdom.mount())
    }
}