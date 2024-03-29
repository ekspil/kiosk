

var app = new Vue({
    el: '#app',
    mounted: function () {
        const timer = setInterval(this.checkTimer, 1000)

        if(this.getAllUrlParams().terminal){
            this.startTerminal()
        }else {

            this.start()
        }
        this.lockKiosk()
        setInterval(function(){
            let element = document.querySelector('#scrollId')
            if(!element) return
            if(element.scrollTop > 150){
                app.topSlider = true
            }
            else {
                app.topSlider = false
            }
            if((element.scrollHeight - element.scrollTop - element.offsetHeight) > 150){
                app.bottomSlider = true
            }else {
                app.bottomSlider = false
            }

            //     .addEventListener('scroll', function(){
            //     console.log('Позиция скрола у элемента: '+ this.scrollTop + " " + this.scrollHeight + " offsetTop:" + this.offsetTop + " " + " offsetHeight:" + this.offsetHeight + " "+ " " + " clientHeight:" + this.clientHeight + " " )
            //     console.log(this.__proto__)
            // });

        }, 1000)
        setInterval(function(){
            let element = document.querySelector('#list')
            if(!element) return
            if(element.scrollTop > 150){
                app.topSlider = true
            }
            else {
                app.topSlider = false
            }
            if((element.scrollHeight - element.scrollTop - element.offsetHeight) > 150){
                app.bottomSlider = true
            }else {
                app.bottomSlider = false
            }

            //     .addEventListener('scroll', function(){
            //     console.log('Позиция скрола у элемента: '+ this.scrollTop + " " + this.scrollHeight + " offsetTop:" + this.offsetTop + " " + " offsetHeight:" + this.offsetHeight + " "+ " " + " clientHeight:" + this.clientHeight + " " )
            //     console.log(this.__proto__)
            // });

        }, 1000)

    },
    data: {
        bonusPayFlag: false,
        lang: 'ru',
        helperNum: '1',
        phone: {
            enter: false,
            number: "",
            sum: "",
            pin: "",
            pinUser: "",
            ok: false,
            pinErrors: 0
        },
        langs: false,
        bottomSlider: false,
        topSlider: false,
        operation: 0,
        mainScreens: false,
        deletedCheck: null,
        delFiscalNum: [],
        lastPayData: {},
        delFiscalNumHolder: "Фискальный номер чека",
        keyLock: false,
        message: 'Привет!',
        deleteOrderNum: null,
        orderId: 0,
        lastId: null,
        kkmServer: 'http://'+ioserver+':5893//Execute',
        serverET: serverEO,
        groupId: 1,
        lastModal: "",
        orderType: 1,
        litera: litera_kiosk,
        pincode: [],
        pincodeReal: managerPass,
        orderNumber: 254,
        payed: 0,
        timer: 60,
        defaultTimer: 90,
        payHelper: "Следуйте указаниям на пинпаде...",
        menuClasses: {
            normal: "uk-button uk-button-menu uk-width-1-1 uk-inline",
            active: "uk-button uk-button-active uk-button-menu uk-width-1-1 uk-inline",
        },
        menuClassesTerminal: {
            normal: " uk-button-menu-terminal uk-width-1-4 uk-inline",
            active: " uk-button-menu-terminal uk-width-1-4 uk-inline",
        },
        groups: [],
        helpers: null,
        cart: [],
        thisSet: null,
        thisCoupon: [],
        selection: [],
        thisCouponHolder: "0000",
        list: [],
        extGroupId: ""
    },
    computed:  {

        extGroups: function(){
            return this.list.reduce((sum, item) => {
                if(!item.extGroup) return sum
                let finded = sum.find(it => it.toUpperCase() === item.extGroup.toUpperCase())
                if (finded) return sum
                sum.push(item.extGroup.toUpperCase())
                return sum
            }, [])
        },
        cart_sum: function(){

           return this.cart.reduce((sum, current) => {
             return sum + current.count * current.price
           }, 0);

    },
        thisCouponString: function () {

            this.timer=this.defaultTimer;
            return this.thisCoupon.reduce((sum, arr) => {
                return sum + arr

            }, "")
        },
        getHelpersById: function () {
            this.timer=this.defaultTimer;
            const [helper] = this.helpers.filter(item => item.id == this.helperNum)
            if(!helper) return

            const helpersArray =  helper.set.map(help => {
                const [pos] = this.list.filter(p => p.id == help)
                return pos
            })

            return helpersArray
        },
        pincodeString: function () {

            this.timer=this.defaultTimer;
            return this.pincode.reduce((sum, arr) => {
                return sum + arr

            }, "")
        },
        delFiscalNumString: function () {

            this.timer=this.defaultTimer;
            return this.delFiscalNum.reduce((sum, arr) => {
                return sum + arr

            }, "")
        },
        msgId: function (){
            let msg = this.litera +"-"+ (Number(this.lastId)+1)
            return msg
        },
        msgIdBig: function (){
            let newId = this.lastId
            let strId = ""
            if (String(newId).length == 1){
                strId = "00" + newId
            }
            if (String(newId).length == 2){
                strId = "0" + newId
            }
            if (String(newId).length >= 3){
                strId = String(newId).slice(-3)
            }
            strId = this.litera+"-"+strId
            return strId
        }
},
    watch: {

        thisCoupon: function (newC, oldC) {
            if (newC.length > 4){
                this.thisCoupon.pop()
            }

        },
        cart: function (newC, oldC) {
            if(newC.length == 0){
                UIkit.modal('#modal-cart').hide();
            }
        }
    },
    methods: {
            selectExtGroup(item){
                this.extGroupId = item
                this.groupId = 0
            },
        positionSort: function(pos){
            if(this.extGroupId){
                if(!pos.extGroup) return false
                if(pos.extGroup.toUpperCase() === this.extGroupId.toUpperCase() && !pos.coupon && !pos.hiden && !pos.blocked) return true
                return false
            }
            else {
                if(pos.groupId === this.groupId && !pos.coupon && !pos.hiden && !pos.blocked) return true
                return false
            }


        },
        getShotName: function(id){
            if (this.getPosLangName(this.getItemById(id))){
                return (this.getPosLangName(this.getItemById(id))).slice(0, 12)+this.checkLength(this.getPosLangName(this.getItemById(id)))
            }else {
                return "..."
            }

        },
        
        checkAbillity: function (inputSet){
          for(let set of inputSet){
            let count = 0
            for(let item of set.set){
              if(!this.getItemById(item).hiden){
                count = count + 1
              }

            }
            if (count === 0){
              return false
            }
          }
          return true
        },
        getPosLangName: function(pos){
            if(this.lang == "ru") {
                return pos.name
            }
            else{
                return pos[this.lang]
            }
        },
        getGrLangName: function(gr){
            if(this.lang == "ru") {
                return gr.name
            }
            else{
                return gr[this.lang]
            }
        },
        getMenuString: function(string){
            const button = this.langs[string]

            return button[this.lang]
        },
        mainGroup: function(){
            for(let i in this.groups){
                if(!this.groups[i].blocked && this.groupEmpty(this.groups[i])){
                this.groupId = this.groups[i].id
                mainGroup = this.groups[i].id
                break
            }

        }
        },
        groupEmpty: function(groupItem){
            if(groupItem.blocked){
                return false
            }
            let [anyItem] = this.list.filter(item => item.groupId == groupItem.id && !item.blocked && !item.hiden)
            if(anyItem){
                return true
            }
            else{
                return false
            }
        },
        addToCart: function(newItem, block){

            this.timer=this.defaultTimer;
            if(!block){
                this.helperNum = newItem.helper
            }

            let tempItem = {};
            for (var key in newItem) {
                tempItem[key] = newItem[key];
            }

            if(newItem.set && newItem.set.length > 0){

                if(this.checkAbillity(newItem.set)){
                  this.thisSet = tempItem;
                  UIkit.modal('#modal-set').show();
                }else{
                  UIkit.notification( {message: "<h3 class='uk-card-title uk-text-center'>Извините, сет временно недоступен...</h3>", pos: 'top-center', status:'warning', timeout: 2000})
                }
            }else if(newItem.help){

            }else{


                const [checkItem] = this.cart.filter(cartItem => cartItem.id === tempItem.id)
                if(!checkItem){
                    tempItem.count = 1
                    this.cart.push(tempItem)
                    if(tempItem.helper){
                        this.modalShow("#modal-helper")
                    }

                }else{
                    const arr = this.cart.map(itemCart => {
                        if (tempItem.id === itemCart.id){
                            itemCart.count++

                        }
                        return itemCart
                    })
                    this.cart = arr
                }
            }



            return true
        },
        menuClick: function(menuItem){

            this.timer=this.defaultTimer;
            if(this.getAllUrlParams().terminal && (this.groupId == menuItem.id)){
                this.groupId = 0
                this.extGroupId = ""
            }
            else{
                this.groupId = menuItem.id
                this.extGroupId = ""
            }

        },
        extGroupClick: function(menuItem){
            this.timer=this.defaultTimer;
            this.extGroupId = menuItem.extGroup
        },
        menuClass: function(group){
            if(group.id === this.groupId){
                return this.menuClasses.active
            }
            return this.menuClasses.normal
        },
        menuClassTerminal: function(group){
            if(group.id === this.groupId){
                return this.menuClassesTerminal.active
            }
            return this.menuClassesTerminal.normal
        },
        menuTerminalClicked: function(group){
            if(group.id === this.groupId){
                return true
            }
            return false
        },
        plusCart: function(item){
            this.timer=this.defaultTimer;
            const arr = this.cart.map(itemCart => {
                if (item.id === itemCart.id){
                    itemCart.count++

                }
                return itemCart
            })
            this.cart = arr
        },
        minusCart: function(item){
            this.timer=this.defaultTimer;
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

        getItemById: function(id){

            const [selection] = this.list.filter(item => item.id == id);
            return selection
        },
        setSelect: function (it, sets, index) {
            this.timer=this.defaultTimer;

            const [selection_list] = this.list.filter(item => item.id == it);
            let selection = {
                groupId: selection_list.groupId,
                price: selection_list.price,
                id: selection_list.id,
                img: selection_list.img,
                name: selection_list.name,
                station: selection_list.station,
                position: selection_list.position,
                codeOneC: selection_list.codeOneC,
                extGroup: selection_list.extGroup,
                hiden: selection_list.hiden,
                blocked: selection_list.blocked,
                helper: selection_list.helper,
                type: selection_list.type,
                set: selection_list.set,
                n: sets.n
            }
            function compare(a, b) {
                if (a.n > b.n) return 1; // если первое значение больше второго
                if (a.n == b.n) return 0; // если равны
                if (a.n < b.n) return -1; // если первое значение меньше второго
            }
            this.selection = this.selection.filter(item => item.n != sets.n);
            this.selection.push(selection)
            this.selection.sort(compare)
            $('#'+index).html('<span uk-icon="icon: check; ratio: 2" class="right-arrow-ok"></span>');

        },
        clearTemp: function () {
            this.thisSet = null
            this.selection = []
        },
        addSetToCart: function (selectedProducts) {
            this.timer=this.defaultTimer;
            if(selectedProducts.length != this.thisSet.set.length){
                //UIkit.modal('#modal-error-count').show();
                $('.right-arrow').html('<span uk-icon="icon: arrow-right; ratio: 2" class="right-arrow uk-animation-shake"></span>');
                return false
            }
            this.thisSet.selected = selectedProducts
            let date = new Date()
            this.thisSet.id = String(this.thisSet.id)+"-"+date.getDate()+date.getUTCHours()+date.getUTCMinutes()+date.getSeconds()

            const [checkItem] = this.cart.filter(cartItem => cartItem.id === this.thisSet.id)
            if(!checkItem){
                this.thisSet.count = 1
                this.cart.push(this.thisSet)
            }else{
                const arr = this.cart.map(itemCart => {
                    if (this.thisSet.id === itemCart.id){
                        itemCart.count++

                    }
                    return itemCart
                })
                this.cart = arr
            }
            this.clearTemp()
            UIkit.modal('#modal-set').hide();
        },
        showModalSet: function () {
            this.timer=this.defaultTimer;
            UIkit.modal('#modal-set').show();
        },
        coupon: function () {
            this.timer=this.defaultTimer;
            UIkit.modal('#modal-coupon').show();
        },
        selectCoupon: function (couponNum) {
            this.timer=this.defaultTimer;

            [coupon] = this.list.filter(li => li.coupon == couponNum)
            if(!coupon || coupon.blocked || coupon.hiden){
                this.thisCoupon = [];
                this.thisCouponHolder = "Купон не найден";
                return false
            }
            UIkit.modal('#modal-coupon').hide();
            this.addToCart(coupon);
        },
        start: function (atr) {
            if(atr){
                return true
            }
            this.phone = {
                    enter: false,
                    number: "",
                    sum: "",
                    pin: "",
                    ok: false,
                    pinUser: "",
                    pinErrors: 0
            }
            this.bonusPayFlag = false
            this.lastPayData = {}
            this.mainGroup()
            this.clearTemp();
            this.operation = 0
            this.lang = "ru"
            this.payed = 0;
            this.groupId = mainGroup
            this.keyLock = false;
            this.thisCoupon = [];
            this.thisCouponHolder="0000";
            this.cart=[];
            this.payHelper = "Следуйте указаниям на пинпаде...";
            this.pincode=[];
            if(this.lastModal){
                UIkit.modal(this.lastModal).show();
            }
            else{
                UIkit.modal('#modal-start').show();
            }


        },
        startTerminal: function (atr) {
            if(atr){
                return true
            }
            this.phone = {
                    enter: false,
                    number: "",
                    sum: "",
                    pin: "",
                    ok: false,
                    pinUser: "",
                    pinErrors: 0
            }
            this.lastPayData = {}
            this.mainGroup()
            this.clearTemp();
            this.operation = 0
            this.lang = "ru"
            this.payed = 0;
            this.groupId = 0
            this.extGroupId = ""
            this.keyLock = false;
            this.thisCoupon = [];
            this.thisCouponHolder="0000";
            this.cart=[];
            this.payHelper = "Следуйте указаниям на пинпаде...";
            this.pincode=[];
            if(this.lastModal){
                UIkit.modal(this.lastModal).show();
            }
            else{
                UIkit.modal('#modal-start').show();
            }


        },
        outOrder: function () {
            this.timer=this.defaultTimer;
            UIkit.modal('#modal-start').hide();
            this.orderType = 2;
        },
        hereOrder: function () {
            this.timer=this.defaultTimer;
            UIkit.modal('#modal-start').hide();
            this.orderType = 1;
        },
        checkTimer: function () {
            if(this.timer == 0){
                if(app.getAllUrlParams().terminal){

                    this.startTerminal()
                }else {

                    this.start()
                }
            }else{
                this.timer--
            }
        },
        toCart: function () {
            if(this.cart.length < 1){
                return false
            }
            this.timer=this.defaultTimer*3;
            UIkit.modal('#modal-cart').show();
        },
        closeCart: function () {
            if(this.keyLock){
                return false
            }
            this.timer=this.defaultTimer;
            UIkit.modal('#modal-cart').hide();
        },
        pay: function (type) {
            if(this.keyLock){
                return false
            }
            if(type == "bonus"){
                getPin(this.phone.number, this.cart_sum)
                return
            }

            if(type == "enterPin"){
                UIkit.modal('#modal-pin-royalty').show();
                return
            }


            this.timer=this.defaultTimer*5;


            //PaymentByPaymentCard(pinpadDevice, this.cart_sum)
            this.startPayOneAction()
            UIkit.modal('#modal-pay').show();


        },
        adminPanel: function () {
            this.timer=this.timer + this.defaultTimer;
            UIkit.modal('#modal-pin').show();
        },
        checkAdminPin: function () {
            if(this.pincodeString != this.pincodeReal){
                this.pincode = []
                return false
            }
            this.timer=this.defaultTimer*10;
            UIkit.modal('#modal-admin').show();
        },
        thisGroup: function (pos) {
            [group] = this.groups.filter(gr => gr.id == pos.groupId)
            return group.name


        },

        lockKiosk: function () {
            this.timer=0;
            UIkit.modal('#modal-lock').show();
            this.lastModal = "#modal-lock"
        },

        unlockKiosk: function () {
            this.timer=0;
            this.lastModal = ""

            if(this.getAllUrlParams().terminal){
                this.startTerminal()
            }else {

                this.start()
            }
        },
        printCheck: function (slip, strId, isFiscal){
            let my_aray_letters = returnArrayLetters(strId)
            RegisterCheck(fiscalDevice, 0, false, my_aray_letters, this.cart, slip, isFiscal)
        },
        printSlip: function (slip, strId){
            let my_aray_letters = returnArrayLetters(strId)
            this.bonusPayFlag = true
            PrintSlip(fiscalDevice, my_aray_letters, this.cart)
        },
        closeSh: function () {
            CloseShift(0)
        },
        closeSber: function () {
            Settlement(0)
        },
        xRep: function () {
            XReport(0)
        },
        hidePayModal: function () {

            UIkit.modal('#modal-pay').hide();
            this.payHelper = "Следуйте указаниям на пинпаде..."
        },
        startPayOneAction(){
            setTimeout(()=>{this.payHelper = "Выполняем процедуру оплаты и печати..."}, 100)
            let newId = this.lastId + 1
            let strId = ""
            if (String(newId).length == 1){
                strId = "00" + newId
            }
            if (String(newId).length == 2){
                strId = "0" + newId
            }
            if (String(newId).length >= 3){
                strId = String(newId).slice(-3)
            }
            strId = this.litera+"-"+strId
            // if(this.phone.number && this.phone.sum !== "" ){
            //     const sumBP = String(this.cart_sum).slice(0, -2) * 10
            //     if(sumBP > 0){
            //         this.payHelper = "Начисляем бонусы..."
            //         plusBonus(this.phone.number, sumBP)
            //     }
            //
            // }
            this.printCheck([], strId, true)
        },
        deviceOk: async function (Rezult, textStatus, jqXHR) {


            if(Rezult.Command == "PayByPaymentCard" && Rezult.Status == 0 && this.operation == 0){
                this.lastPayData = Rezult
                let slip = Rezult.Slip.split("\n")
                setTimeout(()=>{this.payHelper = "Печатаем чек..."}, 700)
                let newId = this.lastId + 1
                let strId = ""
                if (String(newId).length == 1){
                    strId = "00" + newId
                }
                if (String(newId).length == 2){
                    strId = "0" + newId
                }
                if (String(newId).length >= 3){
                    strId = String(newId).slice(-3)
                }
                strId = this.litera+"-"+strId

                this.printCheck(slip, strId, true)

            }
            if(Rezult.Command == "RegisterCheck" && (Rezult.Status == 0 || Rezult.Status == 1) && this.operation == 0){
                console.log(Rezult)
                if(!Rezult.RezultProcessing && !this.bonusPayFlag){
                    this.payHelper = "Ошибка оплаты! Нет данных о пинпаде в ККМ Сервере. Ваш чек не действителен! Обратитесь к Администратору."
                    return
                }
                if(Rezult.Error){
                    this.payHelper = "Ошибка! Если деньги были списаны, то они вернутся на карту!"
                    return
                }
                if(this.phone.number && this.phone.sum !== "" && !this.bonusPayFlag){
                    const sumBP = String(this.cart_sum).slice(0, -2) * 10
                    if(sumBP > 0){
                        this.payHelper = "Начисляем бонусы..."
                        plusBonus(this.phone.number, sumBP)
                    }

                }

                this.registerOrder(Rezult)
                this.bonusPayFlag = false

            }

            if(Rezult.Command == "RegisterCheck" && Rezult.Status != 0 && Rezult.Status != 1 && this.operation == 0){
                if(Rezult.RezultProcessing && Rezult.RezultProcessing.Error){
                    this.payHelper = "Ошибка оплаты " + Rezult.RezultProcessing.Error
                    setTimeout(this.hidePayModal, 5000)
                }
                else if(Rezult.Error){
                    this.payHelper = "Ошибка! Если деньги были списаны, то они вернутся на карту!"
                }
                else{
                    this.payHelper = "Ошибка оплаты или принтера, обратитесь к администратору заведения!"
                }

                console.log(Rezult)

            }
            if(Rezult.Command == "PayByPaymentCard" && Rezult.Status != 0  && this.operation == 0){

                this.payHelper = "Ошибка оплаты, попробуйте снова!"

                setTimeout(this.hidePayModal, 3000)
            }
            if(Rezult.Command == "ReturnPaymentByPaymentCard" && Rezult.Status == 0){
                let slip = Rezult.Slip.split("\n")
                this.operation = 2
                if(Rezult.Status == 0){
                    this.deletedCheck.order.returnPay = true
                }

                this.deleteOrder(slip)
            }
            if(Rezult.Command == "RegisterCheck" && this.operation == 2){
                this.operation = 3
                if(Rezult.Status == 0){
                    this.deletedCheck.order.returnPay = true
                    this.deletedCheck.order.returnCheck = true
                }
                this.deleteOrder(Rezult)
            }

        },
        deviceNotOk: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
        },
        registerOrder: async function (Rezult) {
            let dataCart = {
                cart: this.cart,
                orderType: this.orderType,
                fiscalNum: Rezult.CheckNumber,
                error: Rezult.Error,
                RRNCode: Rezult.RezultProcessing ? Rezult.RezultProcessing.RRNCode : "",
                AuthorizationCode: Rezult.RezultProcessing ? Rezult.RezultProcessing.AuthorizationCode : "",
                bonus: this.phone.ok
            }
            makeOrder(dataCart)


        },
        lockKeys: function () {
            this.keyLock = true
        },
        unlockKeys: function () {
            this.keyLock = false
        },
        deleteOrder: function (data) {
            this.timer=this.defaultTimer;

            if(this.operation == 3){
                const sendData = {
                    fiscalNum: this.deletedCheck.order.fiscalNum,
                    returnPay: this.deletedCheck.order.returnPay,
                    returnCheck: this.deletedCheck.order.returnCheck

                }
                console.log(sendData)
                socketL.emit('deleteOrder', sendData, (answer) => {
                    this.delFiscalNum = []
                    if(!answer){
                        this.delFiscalNumHolder = "Ошибка при записи"
                        this.operation == 0
                    }else{

                        this.delFiscalNumHolder = "Аннулирование успешно"

                        this.operation == 0

                    }


                });
            }
            else {
                this.operation = 2
                this.delFiscalNumHolder = "Внимание на пинпад!"
                ReturnCheck(fiscalDevice, this.deletedCheck.positions)
            }


            // if(this.operation == 1){
            //     if(this.deletedCheck.order.returnPay == true){
            //         this.operation = 2
            //     }
            //     else{
            //         this.delFiscalNumHolder = "Приложите карту"
            //         ReturnPaymentByPaymentCard(pinpadDevice, this.deletedCheck)
            //     }
            //
            // }
            // if(this.operation == 2){
            //     if(this.deletedCheck.order.returnCheck == true){
            //         this.operation = 3
            //     }else{
            //         this.delFiscalNumHolder = "Внимание на пинпад!"
            //         ReturnCheck(fiscalDevice, this.deletedCheck.positions, data)
                // }

            // }

        },
        findOrder: function (id, fiscalNum) {
            const sendData = {
                id,
                fiscalNum
            }
            socketL.emit('findOrder', sendData, (data) => {
                this.delFiscalNum = []
                if(!data){
                    this.delFiscalNumHolder = "Чек не найден"
                }else{
                    this.delFiscalNumHolder = "Чек найден успешно"
                    this.deletedCheck = data
                    this.operation = 1


                }


            });
        },
        keyBoardFiscal: function () {
            this.timer=this.defaultTimer;
            UIkit.modal('#modal-check-del').show();
        },
        modalShow: function (modal) {
            this.timer=this.defaultTimer;
            UIkit.modal(modal).show();
        },
        modalHide: function (modal) {
            this.timer=this.defaultTimer;
            UIkit.modal(modal).hide();
        },
        checkBonus: async function (number) {
            checkBonus(number)
        },
        minusBonus: async function (number, sum, pin) {
            minusBonus(number, sum, pin)
        },
        getPin: async function (number, sum) {
            getPin(number, sum)
        },
        plusBonus: async function (number, sum) {
            plusBonus(number, sum)
        },
        checkBonusPin: async function () {
            if(this.phone.pin == this.phone.pinUser){
                minusBonus(this.phone.number, this.cart_sum, this.phone.pinUser)
                this.payHelper = "Ожидание транзакции на сервере бонусов..."
                UIkit.modal('#modal-pay').show();

            }else if(this.phone.pinErrors > 2){
                this.start()
            }
            else{
                UIkit.notification( {message: "<h3 class='uk-card-title uk-text-center'>Неверный PIN!</h3>", pos: 'top-center', status:'warning', timeout: 2000})
                this.phone.pinErrors++

            }
        },
        checkLength: function (item) {
            if(item.length > 12){
                return "..."
            }
            else{
                return ""
            }
        }
    }
})
