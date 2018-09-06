var app = new Vue({
    el: '#app',
    data: {
        list: [
            {
                id: 1,
                name: 'iphone 7',
                price: 5888,
                count: 1
            },
            {
                id: 2,
                name: 'ipad 7',
                price: 2888,
                count: 1
            },
            {
                id: 3,
                name: 'macbook 7',
                price: 18888,
                count: 1
            }
        ]
    },
    computed: {
        totalPrice: function () {
            var total = 0;
            for (var i=0; i<this.list.length; i++) {
                var item = this.list[i];
                total += item.price * item.count;
            }
            //对总价进行千位分割表示
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
        }
    },
    methods: {
        add(index) {
            this.list[index].count++;
        },
        min(index) {
            if (this.list[index].count === 1) return;
            this.list[index].count--;
        },
        remove(index) {
            this.list.splice(index,1);
        }
    }
});