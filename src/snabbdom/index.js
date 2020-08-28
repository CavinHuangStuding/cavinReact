import {
    init, 
    h
 } from 'snabbdom'
// 1. 导入模块
import StyleModule from 'snabbdom/modules/style'
import ClassModule from 'snabbdom/modules/class'
import PropsModule from 'snabbdom/modules/props'
import eventlisteners from 'snabbdom/modules/eventlisteners'

// 2. 注册模块
// snabbdom有两个核心的函数，h 和 patch
//定义patch 函数 (补丁函数)
var patch = init([  //用所选模块初始化补丁函数
    ClassModule,   // 轻松切换类
    PropsModule,   // 用于设置DOM元素的属性
    StyleModule,   // 处理元素的样式，并支持动画
    eventlisteners
    // snabbdom_eventListeners  // 附加事件侦听器
])
var data = [
    {
        name: '张三',
        age: 20,
        address: '北京'
    },
    {
        name: '李四',
        age: 25,
        address: '上海'
    },
    {
        name: '王五',
        age: 30,
        address: '广州'
    }
]

data.unshift({
    name: '姓名',
    age: '年龄',
    address: '地址'
})

var container = document.getElementById('app')
var vnode;
function render(data) {
    var newVnode = h('table', {}, data.map(function (item) {
        var tds = []
        var i
        for (i in item) {
            if (item.hasOwnProperty(i)) {
                tds.push(
                    h('td', {}, item[i] + '')
                )
            }
        }
        return h('tr', {}, tds)
    }))

    // 如果vnode存在，说明以及渲染过了，那就把新老vnode进行比对，然后重新渲染变化的部分
    if (vnode) {
        patch(vnode, newVnode)
    } else {  // vnode不存在，就是初次渲染，那就把生成的vnode替换掉container节点就好了
        patch(container, newVnode)
    }

    // 存储当前vnode结果
    vnode = newVnode
}

// 初次渲染
render(data)


var btn = document.getElementById('btn-change')
btn.addEventListener('click', function () {
    data[1].age = 50
    data[3].address = '杭州'
    render(data)
})