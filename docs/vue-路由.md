### vue-路由的基本使用
- 引入`vue-router.js`
- 先写组件的模板对象，必须用对象字面量形式
```
//组件的模板对象
var login = {
    template: '<h2>登录组件</h2>'
}
var register = {
    template: '<h2>注册组件</h2>'
}
```
- 使用路由的构造函数`VueRouter`
```
var routerObj = new VueRouter({
            routes: [
                {path: '/login', component: login},
                {path: '/register', component: register}
            ]
        })
```
- 将路由挂载到vm实例中
```
var vm = new Vue({
            el: '#app',
            router: routerObj
        });
```
- 在页面中使用`<router-link to='/login'>登录</router-link>`作为控制路由的链接
    - router-link默认渲染为一个a标签，如果要渲染为其他的，可以使用tag属性将其渲染
- 页面中使用`<router-view></router-view>`作为占位符，用来展示匹配到的路由的组件
- 在VueRouter构造函数中有个属性`linkActiveClass`用来设置链接点击的样式
    - linkActiveClass: 'myactive'
    - .myactive {
      color: red;
      font-weight: 800;
      font-style: italic;
      font-size: 80px;
      text-decoration: underline;
      background-color: green;
    }
### 给路由传参
1. 使用查询字符串给路由传参`<router-link to="/login?id=10&name=zs">登录</router-link>`
- 这时候使用`$route.query.id`直接可以拿出id，注意这里是`route`不是`router`
- 这种方式不用改路由里的path属性
2. 使用占位符需要改变路由的path属性
- `{ path: '/login/:id/:name', component: login },`，这里:id和:name只是一个占位符
- 在路径链接中写入真实的参数`<router-link to="/login/12/ls">登录</router-link>`
- 这样可以使用`$route.params.id`获取到参数
### 子路由
- 在父组件的路由上，通过children属性设置子路由，子路由的path前面不要带/，否则永远以根路径开始
- 我们希望的url地址是：#/父路由地址/子路由地址，这样易读
```
var router = new VueRouter({
      routes: [
        {
          path: '/user',
          component: user,
          children: [
            { path: 'login', component: login },
            { path: 'register', component: register }
          ]
        }
      ]
    })
```
### 在同一个路由的页面中使用多个组件
- 通过给router-view赋值name属性`<router-view name="left"></router-view>`
- 然后在routes数组中可以设置`components`
```
var router = new VueRouter({
      routes: [
        {
          path: '/', 
          components: {
            'default': header,
            'left': leftBox,
            'main': mainBox
          }
        }
      ]
    })
```


