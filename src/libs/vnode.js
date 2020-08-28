export const isSameNode = (node1, node2) => {
    if (!node1 || !node2) return false;
    if (node1.type !== node2.type) return false
    if (Object.keys(node1.props).length !== Object.keys(node2.props).length) {
        return false
    }
    for (const name in node1.props) {
        if (
            typeof node1.props[name] === "function" &&
            typeof node2.props[name] === "function" &&
            node1.props[name].toString() === node2.props[name].toString()
        ) {
            continue;
        }
        if (typeof node1.props[name] === 'object' &&
            typeof node2.props[name] &&
            JSON.stringify(node1.props[name]) === JSON.stringify(node2.props[name])) {
            continue
        }
        if (node1.props[name] !== node2.props[name]) {
            return false
        }
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
let lastRange = null
export const replace = (newTree, oldTree, indent = '') => {
    if (!oldTree && lastRange) {
        lastRange.setStartAfter(lastRange.endContainer.lastChild);
        lastRange.setEndAfter(lastRange.endContainer.lastChild);
        newTree.mount(lastRange);
        return;
    }
    if (isSameTree(newTree, oldTree)) return
    if (!isSameNode(newTree, oldTree)) {
        newTree.mount(oldTree.range)
    } else {
        for (let i = 0; i < newTree.children.length; i++) {
            // 记录当前子节点遍历的最后一次 range
            lastRange = oldTree.children[i] ? oldTree.children[i].range : lastRange;
            replace(newTree.children[i], oldTree.children[i], '  ' + index)
        }
    }
}