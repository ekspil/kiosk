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
            {id: 9, img: 'img/prod/nag.jpg', name: 'СЭТЫ'},
        ],
        cart: [],
        thisSet: null,
        selection: [],
        list: [
            {groupId: 1, price: 112, id: 1, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, price: 112, id: 2, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, price: 112, id: 3, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, price: 112, id: 4, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, price: 112, id: 5, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, price: 112, id: 6, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, price: 112, id: 7, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 2, price: 89, id: 8, img: 'img/prod/koffe.jpg', name: 'Капучино', type: 1},
            {groupId: 2, price: 89, id: 9, img: 'img/prod/koffe.jpg', name: 'Капучино', type: 1},
            {groupId: 2, price: 89, id: 10, img: 'img/prod/koffe.jpg', name: 'Капучино', type: 1},
            {groupId: 2, price: 89, id: 11, img: 'img/prod/koffe.jpg', name: 'Капучино', type: 1},
            {groupId: 2, price: 89, id: 12, img: 'img/prod/koffe.jpg', name: 'Капучино', type: 1},
            {groupId: 2, price: 89, id: 13, img: 'img/prod/koffe.jpg', name: 'Капучино', type: 1},
            {groupId: 3, price: 259, id: 14, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, price: 259, id: 15, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, price: 259, id: 16, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, price: 259, id: 17, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, price: 259, id: 18, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, price: 259, id: 19, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, price: 259, id: 20, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, price: 259, id: 21, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, price: 259, id: 22, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 4, price: 59, id: 23, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 4, price: 59, id: 24, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 4, price: 59, id: 25, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 4, price: 59, id: 26, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 4, price: 59, id: 27, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 9, price: 259, id: 28, img: 'img/prod/set.jpg', name: 'Детский сэт', type: 2, set:[
                    {
                        n: "Ваш напиток",
                        set: [1, 3, 5]
                    },
                    {
                        n: "Ваш бургер",
                        set: [14, 15, 16]
                    },
                    {
                        n: "Ваш соус",
                        set: [8, 9, 10]
                    },
                    {
                        n: "Ваша закуска",
                        set: [23]
                    },

                ]},

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

            let tempItem = newItem
            if(newItem.set){
                this.thisSet = tempItem;
                UIkit.modal('#modal-set').show();
            }


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
        getNameById: function(id){
            const [selection] = this.list.filter(item => item.id == id);
            return selection.name
        },

        getImgById: function(id){

            const [selection] = this.list.filter(item => item.id == id);
            return selection.img
        },
        setSelect: function (it, sets) {
            console.log(sets)
            const [selection_list] = this.list.filter(item => item.id == it);
            let selection = {
                groupId: selection_list.groupId,
                price: selection_list.price,
                id: selection_list.id,
                img: selection_list.img,
                name: selection_list.name,
                type: selection_list.type,
                set: selection_list.set,
                n: sets.n
            }
            this.selection = this.selection.filter(item => item.n != sets.n);
            this.selection.push(selection)
            console.log(this.selection)
            console.log(sets.n)

        }
    }
})