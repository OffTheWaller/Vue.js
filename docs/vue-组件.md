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
- 全局组件的注册要在Vue实例之前注册，这样才能使用

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
### props的用途

1. 获取父组件的值，然后在子组件的局部作用域下操作，这样不会干扰父组件中的值

```
<div id="app">
        <my-component :init-count="4"></my-component>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>

        Vue.component('my-component', {
            template: '<div>{{count}}</div>',
            props: ['initCount'],
            data: function () {
                return {
                    count: this.initCount
                }
            }
        })
        var app = new Vue({
            el: '#app'
        });
    </script>
```

2. prop作为需要被转变的原始值传入

```
    <div id="app">
        <my-component :width="100"></my-component>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>

        Vue.component('my-component', {
            template: '<div :style="style">组件内容</div>',
            props: ['width'],
            computed: {
                style: function () {
                    return {
                        width: this.width + 'px'
                    }
                }
            }
        })
        var app = new Vue({
            el: '#app'
        });
    </script>
```

- 注意：js中对象和数组是引用类型，如果props是对象和数组时，在子组件里改变是会影响父组件的，这点特别注意
- 以上props都是数组的写法，这样的props是不需要数据验证的，当需要数据验证时，props就得用对象写法了。（当组件提供给他人使用时，推荐进行数据验证）

### 父组件向子组件传递方法
- 在要使用的子组件中通过事件绑定，`<com2 @func="show"></com2>`，用变量名func接收父组件的方法show
- 在定义子组件的方法的时候通过`this.$emit('func', this.sonmsg)`来触发父组件的方法，其中第二个参数是传递到父组件方法中的参数
### 子组件向父组件传值
- 要使用父组件向子组件传递方法的方式，把传的值当成参数传过去
- 子组件方法中使用this.$emit方法的时候，第一个参数为绑定在组件标签上的要监听的自定义方法名，第二个参数就是要传递到父组件中的值
- **注意**子组件在使用对象字面量定义模板的时候，必须要写在父组件的上面，这样在往父组件上挂载的时候才不会出错，不然会出现找不到子组件的报错
#### v-model的语法糖

子组件在向父组件传值的时候，使用v-model可以监听input，是一个语法糖

```html
<body>
    <div id="app">
        <p>总数：{{ total }}</p>
        <my-component v-model="total"></my-component>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>

        Vue.component('my-component', {
            template: '<button @click="handleClick">+1</button>',
            data() {
                return {
                    counter: 0;
                }
            },
            methods: {
                handleClick() {
                    this.counter++;
                    this.$emit('input',this.counter);
                }
            }
            
        });
        var app = new Vue({
            el: '#app',
            data: {
                total: 0
            }
        });
    </script>
</body>
```

这个语法糖是在子组件标签上使用v-model双向绑定数据，子组件通过$emit方法触发input事件，把值自动传入了父组件的total中，省去了自定义事件的部分

### 非父子组件通信

利用bus作为中介，在app实例mounted的时候监听bus的事件接受值，子组件通过bus发送事件，这样就实现了利用bus进行状态管理，也可以用vuex

```html
<body>
    <div id="app">
        <p>{{ message }}</p>
        <my-component></my-component>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        //new一个bus作为中间仓库
        var bus = new Vue();
        //注册子组件
        Vue.component('my-component', {
            template: '<button @click="handleClick">传递事件</button>',
            
            methods: {
                handleClick() {
                    bus.$emit('on-message', '来自子组件的内容')
                }
            }
            
        });
        var app = new Vue({
            el: '#app',
            data: {
                message: ''
            },
            mounted() {
                //把Vue实例存在_this中
                var _this = this; 
                bus.$on('on-message', function (msg) {
                    _this.message = msg;
                })
            }
        });
    </script>
</body>
```

- 在子组件中可以通过`this.$parent`直接访问该组件的父实例或组件
- 父组件也可以通过`this.$children`访问它的所有子组件

### slot用法

- 单个Slot
  - 子组件中定义slot插槽，在子组件的使用标签里的所有内容将替代子组件的slot中的所有内容
- 具名Slot，在子组件的slot插槽中定义一个name属性，在子组件标签中需要替换的元素上使用slot="刚才的name名字"。例如在子组件中定义`<slot name="footer"></slot>`，然后在引用子组件的标签中使用`<div slot="footer"></div>`就可以把这个div插入到对应的子组件slot插槽中

### 通过$refs获取DOM元素(组件)
- 给元素(组件标签)绑定`ref`属性
- 通过`this.$refs.ref属性值`获取到DOM对象(组件实例)

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