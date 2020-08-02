export const isSameNode = (node1, node2) => {
    if (node1.type !== node2.type) return false
    
    for (const name in node1.props) {
        if (typeof node1.props[name] === 'object' && 
            typeof node2.props[name] && 
            JSON.stringify(node1.props[name]) === JSON.stringify(node2.props[name])) {
                continue
            }
        if (node1.props[name] !== node2.props[name]) {
            return false
        }
    }
    console.log(node1, node2)
    if (Object.keys(node1.props).length !== Object.keys(node2.props).length) {
        return false
    }
    return true
}

// 对比子节点树
export const isSameTree = (node1, node2) => {
    if (!isSameNode(node1, node2)) return false
    const len = node1.children.length
    if (len !== node2.children.length) return false
    for (let i = 0; i < len; i++) {
        if (!isSameTree(node1.children[i], node2.children[i])) return false
    }
    return true
}

// 替换
export const replace = (newTree, oldTree, indent = '') => {
    if (isSameTree(newTree, oldTree)) return true
    if (!isSameNode(newTree, oldTree)) return true
    if (!isSameNode(newTree, oldTree)) {
        newTree.mount(oldTree.range)
    } else {
        for (let i = 0; i < newTree.children.length; i++) {
            replace(newTree.children[i], oldTree.children[i], '  ' + index)
        }
    }
}