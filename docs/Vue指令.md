## 基本
- el：将要控制的元素
- data：数据
    + vm会自动监听数据的改变，只要数据改变，会自动渲染最新的数据。
- methods：这个对象里面存当前Vue实例所有可用的方法。
## v-cloak指令
- 解决网速慢时{{mag}}闪烁问题。要加样式
```
[v-cloak] {
    display:none;
}
```
## v-text指令
- `v-text="msg"`默认能解决网速慢时闪烁问题，和`{{ mag }}`最终效果一样
- 但是v-test会覆盖元素中原本的内容，但是插值表达式只替换自己占位符，不会清空整个内容。
## v-html指令
- 会将标签解析为html输出。
## v-bind指令
- v-bind:提供属性绑定
- 简写形式，省略v-bind，只留一个:即可
## v-on指令
- v-on:click="show"
- method: {shwo: function() {}}
- 缩写是@