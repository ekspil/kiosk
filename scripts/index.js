var app = new Vue({
    el: '#app',
    data: {
        message: 'Привет!',
        groupId: 1,
        menuClasses: {
            normal: "uk-button uk-button-menu uk-width-1-1 uk-inline",
            active: "uk-button uk-button-active uk-button-menu uk-width-1-1 uk-inline",
        },
        groups: [
            {id: 1, img: 'img/prod/nag.jpg', name: 'НАГГЕТСЫ'},
            {id: 2, img: 'img/prod/nag.jpg', name: 'КОФЕ'},
            {id: 3, img: 'img/prod/nag.jpg', name: 'ГРАНД МЕНЮ'},
            {id: 4, img: 'img/prod/nag.jpg', name: 'ДЕСЕРТЫ'},
            {id: 5, img: 'img/prod/nag.jpg', name: 'НАПИТКИ'},
            {id: 6, img: 'img/prod/nag.jpg', name: 'СОУСЫ'},
            {id: 7, img: 'img/prod/nag.jpg', name: 'ПИЦЦА'},
            {id: 8, img: 'img/prod/nag.jpg', name: 'ПИВО'},
        ],
        cart: [],
        list: [
            {groupId: 1, price: 112, id: 1, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)'},
            {groupId: 1, price: 112, id: 2, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)'},
            {groupId: 1, price: 112, id: 3, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)'},
            {groupId: 1, price: 112, id: 4, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)'},
            {groupId: 1, price: 112, id: 5, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)'},
            {groupId: 1, price: 112, id: 6, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)'},
            {groupId: 1, price: 112, id: 7, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)'},
            {groupId: 2, price: 89, id: 8, img: 'img/prod/koffe.jpg', name: 'Капучино'},
            {groupId: 2, price: 89, id: 9, img: 'img/prod/koffe.jpg', name: 'Капучино'},
            {groupId: 2, price: 89, id: 11, img: 'img/prod/koffe.jpg', name: 'Капучино'},
            {groupId: 2, price: 89, id: 12, img: 'img/prod/koffe.jpg', name: 'Капучино'},
            {groupId: 2, price: 89, id: 13, img: 'img/prod/koffe.jpg', name: 'Капучино'},
            {groupId: 3, price: 259, id: 14, img: 'img/prod/graf.jpg', name: 'Граф де Чиз'},
            {groupId: 3, price: 259, id: 15, img: 'img/prod/graf.jpg', name: 'Граф де Чиз'},
            {groupId: 3, price: 259, id: 16, img: 'img/prod/graf.jpg', name: 'Граф де Чиз'},
            {groupId: 3, price: 259, id: 17, img: 'img/prod/graf.jpg', name: 'Граф де Чиз'},
            {groupId: 3, price: 259, id: 18, img: 'img/prod/graf.jpg', name: 'Граф де Чиз'},
            {groupId: 3, price: 259, id: 22, img: 'img/prod/graf.jpg', name: 'Граф де Чиз'},
            {groupId: 4, price: 59, id: 23, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней'},
            {groupId: 4, price: 59, id: 24, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней'},
            {groupId: 4, price: 59, id: 25, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней'},
            {groupId: 4, price: 59, id: 26, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней'},
            {groupId: 4, price: 59, id: 27, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней'},

        ]
    },
    computed:  {
        cart_sum: function(){

           return this.cart.reduce((sum, current) => {
             return sum + current.count * current.price
           }, 0);

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
                    if (newItem.id === itemCart.id){
                        itemCart.count++

                    }
                    return itemCart
                })
                this.cart = arr
            }

            return true
        },
        menuClick: function(menuItem){
            this.groupId = menuItem.id
        },
        menuClass: function(group){
            if(group.id === this.groupId){
                return this.menuClasses.active
            }
            return this.menuClasses.normal
        },
        plusCart: function(item){
            const arr = this.cart.map(itemCart => {
                if (item.id === itemCart.id){
                    itemCart.count++

                }
                return itemCart
            })
            this.cart = arr
        },
        minusCart: function(item){
           let arr = this.cart.map(itemCart => {
                if (item.id === itemCart.id){
                    itemCart.count--

                }

                return itemCart
            })
            this.cart = arr

            arr = arr.filter(itemCart => itemCart.count > 0)
            this.cart = arr
        },
    }
})