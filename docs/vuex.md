## Vuex
### 概念
- vuex是Vue配套的公共数据管理工具，把一些共享的数据，保存到vuex中，方便整个项目中的任何组件使用该数据
- 只有共享的数据，才有权利放到vuex中
- 组件内部私有数据，放到组件的data中即可
### 装包
- `npm i vuex -S`
- `import Vue from 'vue'`
- `import Vuex from 'vuex'`
- `Vue.use(Vuex)`
### 创建store
```javascript
const store = new Vuex.Store({
    state: {
        count: 0  //想象成组件中的data
    },
    mutations: {  //想象成组件中的methods
        increment (state) {
            state.count++
        }
    }
})
```
### 将new 出来的Store挂载到Vm实例上
### 在组件中访问Store中的数据
- `this.$store.state.名称`
- 前提是必须把Store挂载到Vm实例上，这样才能全局存取数据
### 改变Store中的值
- 不推荐的使用方法:每个组件单独操作`this.$store.state.count++`
- 如果要操作Store中的数据，只能通过调用`mutations`提供的方法，防止数据紊乱
- 组件中调用方法：`this.$store.commit('mutations中的方法名')`
- 注意：mutations函数参数最多支持两个参数
    - 第一个参数：必须为state
    - 第二个参数，在commit参数中，方法名后面的参数
    - 如果要传多个参数，可以将第二个参数传入设置为对象
### getters
- 和mutations平级，getters:{}
- getters只负责对外提供数据，不负责修改数据。mutations负责修改数据
```
getters: {
    optCount: function (state) {
        return '当前最新的count值是：' + state.count
    }
}
```
- getters类似于过滤器，没有修改原数据，只是对原数据进行了包装，返回给调用者
- 调用getters时使用`this.$store.getters.'名称'`