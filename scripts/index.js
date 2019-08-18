var app = new Vue({
    el: '#app',
    data: {
        message: 'Привет!',
        cart: [
            {count: 1, id: 1254, img: 'img/prod/nag.jpg'},

        ],
        list: [
            {price: 112, id: 1, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)'},
            {price: 112, id: 1, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)'},
            {price: 259, id: 2, img: 'img/prod/graf.jpg', name: 'Граф де Чиз'},
            {price: 259, id: 2, img: 'img/prod/graf.jpg', name: 'Граф де Чиз'},
            {price: 59, id: 3, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней'},
            {price: 59, id: 3, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней'},
            {price: 59, id: 3, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней'}
        ]
    },
    computed:  {
        cart_sum: function(){
           return 128+128+128;

    }
},
    methods: {
        addToCart: function(newItem){



            const [checkItem] = this.cart.filter(cartItem => cartItem.id === newItem.id)
            if(!checkItem){
                newItem.count = 1
                this.cart.push(newItem)
            }else{
                const arr = this.cart.map(itemCart => {
                    if (item.id === itemCart){
                        itemCart.count++

                    }
                    return itemCart
                })
                console.log(arr)
            }

            return true
        }
    }
})