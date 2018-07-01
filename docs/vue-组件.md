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

