const model = require('./models.js')

const hello = async function(){
    console.log('Hello!')
}
const getBaseData = async function(inData){

    const list = await model.Product.findAll()
    const groups = await model.Group.findAll()
    const outData = {
        list,
        groups
    }
    return outData

}
const changePosition = async function(data){
    if(data.id){
        const where = {
            id: data.id
        }
        const prod = await model.Product.findOne({where})
            prod.type = data.type
            prod.station = data.station
            prod.blocked = data.blocked
            prod.hiden = data.hiden
            prod.name = data.name
            prod.img = data.img
            prod.price = data.price
            prod.helper = data.helper
            prod.coupon = data.coupon
            prod.groupId = data.groupId
        return await prod.save()


    }else{
        const prod = {
           type: data.type,
           station: data.station,
           blocked: data.blocked,
           hiden: data.hiden,
           name: data.name,
           img: data.img,
           price: data.price,
           helper: data.helper,
           coupon: data.coupon,
           groupId: data.groupId
          }


        return await model.Product.create(prod)


    }

}


const changeGroup = async function(data){
    if(data.id){
        const where = {
            id: data.id
        }
        const group = await model.Group.findOne({where})
        group.name = data.name
        group.img = data.img
        return await group.save()


    }else{
        const group = {
           name: data.name,
           img: data.img
          }


        return await model.Group.create(group)


    }

}


const getData = async function(rest){
    let data = {
        message: 'Привет!',
        groupId: 1,
        lastModal: "",
        orderType: 1,
        litera: "F",
        pincode: [],
        pincodeReal: "1234",
        orderNumber: 254,
        payed: 0,
        timer: 60,
        defaultTimer: 90,
        payHelper: "Следуйте указаниям на пинпаде...",
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
        thisCoupon: [],
        selection: [],
        thisCouponHolder: "0000",
        list: [
            {groupId: 1, hiden: false, price: 112, helper: "Не забудьте соус", id: 1, img: 'img/prod/4767c5bf62426226a304c5fa63406322', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, hiden: false, price: 112, helper: "Попробуйте еще и маффин", id: 2, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, hiden: false, price: 112, helper: "Не забудьте соус", id: 3, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, hiden: false, price: 112, id: 4, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, hiden: false, price: 112, id: 5, img: '', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, hiden: false, price: 112, id: 6, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 1, hiden: false, price: 112, id: 7, img: 'img/prod/nag.jpg', name: 'Негетсы(8шт)', type: 1},
            {groupId: 2, hiden: false, price: 89, helper: "Не забудьте картошку", id: 8, img: 'img/prod/koffe.jpg', name: 'Капучино', type: 1},
            {groupId: 2, hiden: false, price: 89, id: 9, img: 'img/prod/koffe.jpg', name: 'Капучино', type: 1},
            {groupId: 2, hiden: false, price: 89, id: 10, img: 'img/prod/koffe.jpg', name: 'Капучино', type: 1},
            {groupId: 2, hiden: false, price: 89, id: 11, img: '', name: 'Капучино', type: 1},
            {groupId: 2, hiden: false, price: 89, id: 12, img: 'img/prod/koffe.jpg', name: 'Капучино', type: 1},
            {groupId: 2, hiden: false, price: 89, id: 13, img: 'img/prod/koffe.jpg', name: 'Капучино', type: 1},
            {groupId: 3, hiden: false, price: 259, id: 14, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, hiden: false, price: 259, id: 15, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, hiden: false, price: 259, id: 16, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, hiden: false, price: 259, id: 17, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, hiden: false, price: 259, id: 18, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, hiden: false, price: 259, id: 19, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, hiden: false, price: 259, id: 20, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, hiden: false, price: 259, id: 21, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 3, hiden: false, price: 259, id: 22, img: 'img/prod/graf.jpg', name: 'Граф де Чиз', type: 1},
            {groupId: 4, hiden: false, price: 59, id: 23, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 4, hiden: false, price: 59, id: 24, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 4, hiden: false, price: 59, id: 25, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 4, hiden: false, price: 59, id: 26, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 4, hiden: false, price: 59, id: 27, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 5, hiden: false, price: 19, id: 29, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 5, hiden: false, coupon: 1234, price: 19, id: 30, img: 'img/prod/pirozok.jpg', name: 'Пирожок с вишней', type: 1},
            {groupId: 9, hiden: false, price: 259, id: 28, img: 'img/prod/set.jpg', name: 'Детский сэт', type: 2, set:[
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
                        set: [1, 11, 20, 26]
                    },
                    {
                        n: "Ваша закуска",
                        set: [23]
                    },

                ]},
            {groupId: 9, hiden: false, coupon: 1111, price: 111, id: 31, img: 'img/prod/set.jpg', name: 'Детский сэт', type: 2, set:[
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
                        set: [1, 11, 20, 26]
                    },
                    {
                        n: "Ваша закуска",
                        set: [23]
                    },

                ]},

        ]
    }
    return data
}



module.exports={
    hello,
    getData,
    changePosition,
    changeGroup,
    getBaseData
}