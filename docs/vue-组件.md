### vue-组件的定义
- 定义一个全局组件
    - 这种方式没有智能提示
```javascript
<div id="app">
    <!-- 要使用组件的时候，直接当成html标签引用就行 -->
    <jscom></jscom>
</div>
<script>
    //定义全局组件
    Vue.component('jscom',Vue.extend({
        template: '<h3>这是定义的一个组件</h3>'
    }));
    var vm = new Vue({
        el: '#app',
        data: {},
        methods: {}
    });
</script>
```
- 使用template标签定义组件，这样会有代码提示
```javascript
<template id="jstem1">
    <h2>这是使用template标签定义的组件</h2>
</template>
Vue.component('jscom3',{
    template: '#jstem1'
});
```
- 定义私有组件
```javascript
<div id="app2">
    <private></private>
</div>
<template id="jstem2">
    <h2>这是使用template标签定义的私有组件</h2>
</template>
//定义私有组件
var vm2 = new Vue({
    el: '#app2',
    components: {
        private: {
            template: '#jstem2'
        }
    }
});
```
- 常用的组件定义方式
    - 先定义一个对象字面量，里面写组件模板
    - 然后把这个模板放到componet里
```javascript
var login = {
      template: '<h1>1234</h1>'
    }
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      components: {
        // '组件的名称': 组件的模板对象
        // 'mylogin': login
        login
      }
    });
```
### 组件中的data
- 组件中的data必须是一个方法，数据可以是对象，使用return返回就行，使用方法正常
```javascript
<template id="jstem3">
    <h3>使用组件中的data:{{ msg }}</h3>
</template>
//组件中的data
Vue.component('jscom4',{
    template: '#jstem3',
    data: function () {
        return {
            msg: '我爱北京'
        }
    }
})
```
### 组件的切换
- 通过一个flag变量切换
- 使用vue提供的<component>标签，这是一个占位符
    - :is="componentId"绑定要展示的组件的名称
```javascript
<div id="app">
    <input type="button" value="登录组件" @click='componentId="login"'>
    <input type="button" value="注册组件" @click='componentId="register"'>
    <!-- Vue提供的标签，占位符 -->
    <component :is="componentId"></component>
</div>
<template id="login">
    <div>
        <h2>登录组件</h2>
    </div>
</template>
<template id="register">
    <div>
        <h2>注册组件</h2>
    </div>
</template>
<script>
    Vue.component('login',{
        template: '#login'
    })
    Vue.component('register',{
        template: '#register'
    })
    var vm = new Vue({
        el: '#app',
        data: {
            componentId: 'login'
        }
    });
</script>
```
- 组件切换动画
    - 把<component>占位符用<transition>标签包裹起来
    - 通过 mode 属性,设置组件切换时候的 模式
```html
<style>
    .v-enter,
    .v-leave-to {
        opacity: 0;
        transform: translateY(50px);
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 1s ease;
    }
</style>

<!-- 通过 mode 属性,设置组件切换时候的 模式 -->
<transition mode='out-in'>
    <!-- Vue提供的标签，占位符 -->
    <component :is="componentId"></component>
</transition>
```
- localStorage本地化存储
    - clear
    - getItem
    - hasOwnProperty
    - key
    - length
    - removeItem
    - setItem
    - toLocaleString
- localStorage只能存储字符串，所以要将json使用一下`JSON.stringify()`后存储
- 存储时使用localStorage.setItem('name','zs')
- 读取时使用lacalStorage.getItem('name')
### 父组件向子组件传值
- 在vm实例中的components对象中定义的就是子组件
- 在子组件的使用标签上通过v-bind绑定一个属性，值就是父组件中的数据`<jscom1 v-bind:parentmsg='msg'></jscom1>`
- 在子组件中通过props数组定义，`props: ['parentmsg']`
- 这样在子组件中直接使用这个值就行`template: '<h1>这是子组件---{{ parentmsg }}---{{ sonmsg }}</h1>'`
### 父组件向子组件传递方法
- 在要使用的子组件中通过事件绑定，`<com2 @func="show"></com2>`，用变量名func接收父组件的方法show
- 在定义子组件的方法的时候通过`this.$emit('func', this.sonmsg)`来触发父组件的方法，其中第二个参数是传递到父组件方法中的参数
### 子组件向父组件传值
- 要使用父组件向子组件传递方法的方式，把传的值当成参数传过去
- 子组件方法中使用this.$emit方法的时候，第二个参数就是要传递到父组件中的值
- **注意**子组件在使用对象字面量定义模板的时候，必须要写在父组件的上面，这样在往父组件上挂载的时候才不会出错，不然会出现找不到子组件的报错
### 通过$refs获取DOM元素
- 给元素绑定`ref`属性
- 通过`this.$refs.ref属性值`获取到DOM对象

### watch,computed和methods之间的对比
1. `computed`属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
2. `methods`方法表示一个具体的操作，主要书写业务逻辑；
3. `watch`一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作；可以看作是`computed`和`methods`的结合体；当需要监听路由时，键的名称是`$route`

### 使用render函数渲染组件
- 在vm实例上有一个`render`属性，用来渲染组件
```
render: function (createElements) { // createElements 是一个 方法，调用它，能够把 指定的 组件模板，渲染为 html 结构
        return createElements(login)
        // 注意：这里 return 的结果，会 替换页面中 el 指定的那个 容器
      }
```
- `render`渲染和`components`定义组件使用标签渲染的不同是，使用`render`渲染的组件会替换整个`el`控制的区域，但`componets`里定义的组件，只会替换标签里的内容