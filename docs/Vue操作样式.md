## Vue操作样式
### 利用class操作样式
- 利用class操作样式
    - 利用class数组。v-bind:class="['red','thin','italic']"
    - v-bind指令的简写就是一个冒号 :
- class中可以写三元表达式
    - flag?'active':''
    - 在data中定义flag为true,则为true时添加active类，为false时不添加
- 避免写三元麻烦，可以直接在类的数组中用一个对象的形式
    - v-bind:class="['red','thin',{'active':flag}]"
    - 其中的flag也是在data中定义的
    - 为true时添加active类，为false时不添加
- 直接使用对象
    - :class="{ red:true , thin:true }"
    - **对象的属性可以加单引号，也可以不加，最好统一。如果属性里面包含短横线，则对象该属性必须用单引号包裹。例如'font-weight'、'font-style'就必须用单引号将属性包裹起来**
### 使用内联样式
- :style='对象名'
- 将样式对象写入data
- 多个样式对象用数组形式绑定
    - :style='[对象1，对象2]'