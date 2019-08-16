var app = new Vue({
    el: '#app',
    data: {
        message: 'Привет!',
        cart: [
            {count: 1, id: 1254, img: 'img/prod/nag.jpg'},
            {count: 5, id: 1254, img: 'img/prod/graf.jpg'},
            {count: 4, id: 1254, img: 'img/prod/nag.jpg'},
            {count: 3, id: 1254, img: 'img/prod/pirozok.jpg'},
            {count: 2, id: 1254, img: 'img/prod/koffe.jpg'},
            {count: 1, id: 1254, img: 'img/prod/graf.jpg'},
            {count: 1, id: 1254, img: 'img/prod/nag.jpg'},
            {count: 1, id: 1254, img: 'img/prod/graf.jpg'},
            {count: 7, id: 1254, img: 'img/prod/pirozok.jpg'},
            {count: 1, id: 1254, img: 'img/prod/koffe.jpg'}
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
}
})