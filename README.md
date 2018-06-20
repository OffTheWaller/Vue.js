# Vue.js 学习
## MVVM开发
- mvvm是前端视图层的分层开发思想，主要针对的是把每个页面分成'm v vm'三层。
    + vm是核心。
    + M:保存的是每个页面中单独的数据。--data中的数据
    + V：就是每个页面的HTML结构。--Vue实例所控制的区域
    + VM：中间层，调度者。作用：提供数据的双向绑定。--new出来的Vue实例就是VM

## Vue指令
[Vue指令](./docs/Vue指令.md)
## 文字滚动案例
- 注：在vue实例中要是想拿数据，必须使用`this.数据名或方法名`，才能拿到vm实例内部data中的数据。
- substring()方法截取字符串
    + 两个参数：左闭右开
    + 一个参数，从该位置开始到最后
    + 返回，一个新字符串
- slice()方法类似，但是可以接收负数。--start如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推。
- ES6箭头函数：=>
    + 解决this指向问题  

[文字滚动案例](./code/文字滚动.html)
## 事件修饰符  
[事件修饰符](./docs/事件修饰符.md)
## Vue操作样式
[Vue操作样式](./docs/Vue操作样式.md)