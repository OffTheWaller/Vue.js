Vue.component('tabs', {
    template: ' \
        <div class="tabs"> \
            <div class="tabs-bar"> \
                <div :class="tabCls(item)" v-for="(item,index) in navList" @click="handleChange(index)"> \
                    {{ item.label }} \
                </div> \
            </div> \
            <div class="tabs-content"> \
                <slot></slot> \
            </div> \
        </div>',
    props: {
        value: {
            type: [String, Number]
        }
    },
    data: function () {
        return {
            currentValue: this.value,
            navList: []
        }
    },
    methods: {
        tabCls: function (item) {
            return [
                'tabs-tab',
                {
                    //给当前选中的tab加一个class
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        //获取所有pane组件实例
        getTabs () {
            return this.$children.filter(function (item) {
                return item.$options.name === 'pane';
            })
        },
        updateNav () {
            this.navList = [];
            var _this = this;
            //拿navList
            this.getTabs().forEach(function (pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
                //如果没有给pane设置name，默认设置为index
                if (!pane.name) {
                    pane.name = index;
                }
                //设置当前选中的tab的索引
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus () {
            var tabs = this.getTabs();
            var _this = this;
            //将当前选中的tab对应的pane显示
            tabs.forEach(function (tab) {
                return tab.show = tab.name === _this.currentValue;
            }) 
        },
        //点击tab标题时触发
        handleChange: function (index) {
            var nav = this.navList[index];
            var name = nav.name;
            //改变当前选中的tab,并触发下面的watch
            this.currentValue = name;
            //更新value
            this.$emit('input', name);
            this.$emit('on-click', name);
        }

    },
    watch: {
        value: function (val) {
            this.currentValue = val;
        },
        currentValue: function () {
            this.updateStatus();
        }
    }

})