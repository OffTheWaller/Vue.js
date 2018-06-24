## vue-resource发送请求
- 还有`axios`第三方包，类似
发送请求的用法：
```javascript
var vm = new Vue({
  el: '#app',
  data: {},
  methods: {
    getInfo() { // 发起get请求
      //  当发起get请求之后， 通过 .then 来设置成功的回调函数
      this.$http.get('url').then(function (result) {
        // 通过 result.body 拿到服务器返回的成功的数据
        // console.log(result.body)
      })
    },
    postInfo() { // 发起 post 请求   application/x-wwww-form-urlencoded
      //  手动发起的 Post 请求，默认没有表单格式，所以，有的服务器处理不了
      //  通过 post 方法的第三个参数， { emulateJSON: true } 设置 提交的内容类型 为 普通表单数据格式
      this.$http.post('url', {}, { emulateJSON: true }).then(result => {
        console.log(result.body)
      })
    },
    jsonpInfo() { // 发起JSONP 请求
      this.$http.jsonp('url').then(result => {
        console.log(result.body)
      })
    }
  }
});
```
- jsonp格式原理
+ 由于浏览器的安全性限制，不允许AJAX访问 协议不同、域名不同、端口号不同的 数据接口，浏览器认为这种访问不安全；
+ 可以通过动态创建script标签的形式，把script标签的src属性，指向数据接口的地址，因为script标签不存在跨域限制，这种数据获取方式，称作JSONP（注意：根据JSONP的实现原理，知晓，JSONP只支持Get请求）；
+ 具体实现过程：
    - 先在客户端定义一个回调方法，预定义对数据的操作；
    - 再把这个回调方法的名称，通过URL传参的形式(也就是?callback=方法名)，提交到服务器的数据接口；
    - 服务器数据接口组织好要发送给客户端的数据，再拿着客户端传递过来的回调方法名称，拼接出一个调用这个方法的字符串，发送给客户端去解析执行；
    - 客户端拿到服务器返回的字符串之后，当作Script脚本去解析执行，这样就能够拿到JSONP的数据了；
