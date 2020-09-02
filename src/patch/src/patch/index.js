import {
    init
} from 'snabbdom'
// 1. 导入模块
import StyleModule from 'snabbdom/modules/style'
import ClassModule from 'snabbdom/modules/class'
import PropsModule from 'snabbdom/modules/props'
import eventlisteners from 'snabbdom/modules/eventlisteners'

// 2. 注册模块
// snabbdom有两个核心的函数，h 和 patch
//定义patch 函数 (补丁函数)
export const patch = init([  //用所选模块初始化补丁函数
    ClassModule,   // 轻松切换类
    PropsModule,   // 用于设置DOM元素的属性
    StyleModule,   // 处理元素的样式，并支持动画
    eventlisteners
    // snabbdom_eventListeners  // 附加事件侦听器
])