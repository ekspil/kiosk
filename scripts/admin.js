let app = new Vue({
    el: '#app',
    mounted: function () {
    },
    data: {
        message: 'Привет!',
        mainScreens: false,
        helpers: [],
        menu: 'menu',
        temp: {
            select: ""
        },
        langs: {
            pay: {
                ru: "",
                en: "",
                jp: "",
                cn: "",
                ko: "",
            }
        },

        newSetCount: null,
        newHelper: {name: "", set: []},
        newPosition: {
            id: null,
            groupId: 1,
            station: 1,
            setBool: false,
            hiden: false,
            blocked: false,
            price: null,
            price2: null,
            price3: null,
            price4: null,
            price5: null,
            coupon: null,
            corner: 'ALL',
            codeOneC: '',
            extGroup: '',
            helper: "",
            position: 99,
            img: "",
            en: "",
            jp: "",
            cn: "",
            ko: "",
            name: "",
            type: 1,
            sets: []

        },
        newGroup: {
            id: null,
            img: "",
            name: "",
            en: "",
            jp: "",
            cn: "",
            ko: "",
            blocked: false,
            position: "99",
            corner: ""
        },
        newMainScreen: {
            id: null,
            img: "",
            name: "",
            blocked: false,
            restorans: ""
        },
        imgs:[],
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

        ],

        groups: [{name: "1", img: "", id: 0}],
    },
    watch: {

        newSetCount: function (newC, oldC) {
            if (newC === oldC){
                return true
            }
            const change = Number(newC) - Number(oldC)
            function getRandomInt(min, max){
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
                //console.log(change)

                if(change > 0){
                    for(let i = 0; i < change; i++) {


                        let newItem = {
                            n: i+" Модификация сэта"+getRandomInt(1, 999999)+getRandomInt(1, 999999),
                            products: []
                        }
                        if(this.newPosition.sets.length < this.newSetCount){
                            this.newPosition.sets.push(newItem)
                        }

                    }
                }
                else if(change < 0){
                    for(let i = 0; i > change; i--) {
                        this.newPosition.sets.pop()
                    }
                }




        }
    },
    methods:{

        getAllUrlParams(url) {

            // извлекаем строку из URL или объекта window
            var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

            // объект для хранения параметров
            var obj = {};

            // если есть строка запроса
            if (queryString) {

                // данные после знака # будут опущены
                queryString = queryString.split('#')[0];

                // разделяем параметры
                var arr = queryString.split('&');

                for (var i=0; i<arr.length; i++) {
                    // разделяем параметр на ключ => значение
                    var a = arr[i].split('=');

                    // обработка данных вида: list[]=thing1&list[]=thing2
                    var paramNum = undefined;
                    var paramName = a[0].replace(/\[\d*\]/, function(v) {
                        paramNum = v.slice(1,-1);
                        return '';
                    });

                    // передача значения параметра ('true' если значение не задано)
                    var paramValue = typeof(a[1])==='undefined' ? true : a[1];

                    // преобразование регистра
                    paramName = paramName.toLowerCase();
                    paramValue = paramValue.toLowerCase();

                    // если ключ параметра уже задан
                    if (obj[paramName]) {
                        // преобразуем текущее значение в массив
                        if (typeof obj[paramName] === 'string') {
                            obj[paramName] = [obj[paramName]];
                        }
                        // если не задан индекс...
                        if (typeof paramNum === 'undefined') {
                            // помещаем значение в конец массива
                            obj[paramName].push(paramValue);
                        }
                        // если индекс задан...
                        else {
                            // размещаем элемент по заданному индексу
                            obj[paramName][paramNum] = paramValue;
                        }
                    }
                    // если параметр не задан, делаем это вручную
                    else {
                        obj[paramName] = paramValue;
                    }
                }
            }

            return obj;
        },
        adminSortPos: function (pos) {
            let groups = this.groups.filter(gr => gr.selected === true)
            if (groups.length < 1) {
                return true
            }
            let [group] = this.groups.filter(gr => gr.id == pos.groupId && gr.selected )
            if(group){
                return true
            }

            return false


        },
        saveLangItem: async function (langItem, property) {

            await saveLangItem(langItem, property)
            return true

        },
        thisGroup: function (pos) {
            [group] = this.groups.filter(gr => gr.id == pos.groupId)
            if(!group){
                return "Не найдено"
            }
            return group.name


        },
        addGroup: function (pos) {
            if(pos){
                this.newGroup = pos
            }else{
                this.newGroup.id = null
            }

            UIkit.modal('#modal-addGroup').show();
        },
        addMainScreen: function (pos) {
            if(pos){
                this.newMainScreen = pos
            }else{
                this.newMainScreen.id = null
            }

            UIkit.modal('#modal-addMainScreen').show();
        },
        addHelper: function (pos) {
            if(pos){
                this.newHelper = pos
            }else{
                this.newHelper = {name: "", set: []}
                this.newGroup.id = null
            }

            UIkit.modal('#modal-addHelper').show();
        },
        addGroupSend: function (newGroup) {
            changeGroup(newGroup)
            this.newGroup = {
                id: null,
                img: "",
                name: "",
                en: "",
                jp: "",
                cn: "",
                ko: "",
                blocked: false,
                position: "99",
                corner: "",
            }

            //UIkit.modal('#modal-addGroup').show();
        },
        addMainScreenSend: function (newMainScreen) {
            changeMainScreen(newMainScreen)
            this.newMainScreen = {
                id: null,
                img: "",
                name: "",
                blocked: false,
                restorans: ""
            }

            //UIkit.modal('#modal-addGroup').show();
        },
        addHelperSend: function (helper) {
            changeHelper(helper)
            this.newHelper = {
                id: null,
                name: "",
                set: []
            }

            UIkit.modal('#modal-addHelper').hide();
        },
        addPosition: function (pos){

            if(pos){
                console.log(pos)
                if(pos.set && pos.set.length > 0){
                    this.newSetCount = pos.set.length
                    pos.setBool = true
                    pos.sets = pos.set.map(se=>{
                        se.products = se.set
                        return se
                    })

                }
                this.newPosition = pos
                if(!this.newPosition.sets){this.newPosition.sets=[]}
            }else{
                this.newPosition = {
                    id: null,
                    groupId: 1,
                    station: 1,
                    position: 99,
                    setBool: false,
                    hiden: false,
                    blocked: false,
                    price: null,
                    price2: null,
                    price3: null,
                    price4: null,
                    price5: null,
                    coupon: null,
                    corner: 'ALL',
                    codeOneC: '',
                    extGroup: '',
                    helper: "",
                    img: "",
                    name: "",
                    en: "",
                    jp: "",
                    cn: "",
                    ko: "",
                    type: 1,
                    sets: []

                }
            }

            UIkit.modal('#modal-addPos').show();
        },
        addPositionSend: function (newPosition) {
            if(newPosition.sets && newPosition.sets.length > 0){
                newPosition.type = 2
            }
            changePosition(newPosition)
            this.newPosition = {
                    id: null,
                    groupId: 1,
                    station: 1,
                    position: 99,
                    setBool: false,
                    hiden: false,
                    blocked: false,
                    price: null,
                    price2: null,
                    price3: null,
                    price4: null,
                    price5: null,
                    coupon: null,
                    corner: 'ALL',
                    codeOneC: '',
                    extGroup: '',
                    helper: "",
                    img: "",
                    name: "",
                    en: "",
                    jp: "",
                    cn: "",
                    ko: "",
                    type: 1,
                    sets: []

            }

        },
        delPositionSend: function (newPosition) {
            if(newPosition.sets && newPosition.sets.length > 0){
                newPosition.type = 2
            }
            delPosition(newPosition)
            this.newPosition = {
                    id: null,
                    groupId: 1,
                    station: 1,
                    position: 99,
                    setBool: false,
                    hiden: false,
                    blocked: false,
                    price: null,
                    price2: null,
                    price3: null,
                    price4: null,
                    price5: null,
                    coupon: null,
                    corner: 'ALL',
                    codeOneC: '',
                    extGroup: '',
                    helper: "",
                    img: "",
                    name: "",
                    en: "",
                    jp: "",
                    cn: "",
                    ko: "",
                    type: 1,
                    sets: []

            }

        },
        addImg: function () {

            UIkit.modal('#modal-addImg').show();
        },
        notif: function (value) {

            console.log(value)
        },
        findPositionById: function (id) {
            const [position] = this.list.filter(item => item.id == id)
            if(!position) return ""
            return position.name
        },
        findFullPositionById: function (id) {
            const [position] = this.list.filter(item => item.id == id)
            return position
        }
    }
})