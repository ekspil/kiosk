

var app = new Vue({
    el: '#app',
    mounted: function () {
        const timer = setInterval(this.checkTimer, 1000)
        this.start()

    },
    data: {
        operation: 0,
        deletedCheck: null,
        delFiscalNum: [],
        delFiscalNumHolder: "Фискальный номер чека",
        keyLock: false,
        message: 'Привет!',
        deleteOrderNum: null,
        orderId: 0,
        lastId: null,
        kkmServer: 'http://'+ioserver+':5893//Execute',
        serverET: "http://10.3.0.20:3000",
        groupId: 1,
        lastModal: "",
        orderType: 1,
        litera: "F",
        pincode: [],
        pincodeReal: "1234321",
        orderNumber: 254,
        payed: 0,
        timer: 60,
        defaultTimer: 90,
        payHelper: "Следуйте указаниям на пинпаде...",
        menuClasses: {
            normal: "uk-button uk-button-menu uk-width-1-1 uk-inline",
            active: "uk-button uk-button-active uk-button-menu uk-width-1-1 uk-inline",
        },
        groups: [],
        cart: [],
        thisSet: null,
        thisCoupon: [],
        selection: [],
        thisCouponHolder: "0000",
        list: []
    },
    computed:  {
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
            if (String(newId).length > 3){
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
        addToCart: function(newItem){
            this.timer=this.defaultTimer;
            let tempItem = {};
            for (var key in newItem) {
                tempItem[key] = newItem[key];
            }

            if(newItem.set && newItem.set.length > 0){

                this.thisSet = tempItem;
                UIkit.modal('#modal-set').show();
            }else if(newItem.help){

            }else{


                const [checkItem] = this.cart.filter(cartItem => cartItem.id === tempItem.id)
                if(!checkItem){
                    tempItem.count = 1
                    this.cart.push(tempItem)
                    if(tempItem.helper){
                        UIkit.notification( {message: "<h3 class='uk-card-title uk-text-center'>"+tempItem.helper+"</h3>", pos: 'top-center', status:'warning', timeout: 2000})
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
            this.groupId = menuItem.id
        },
        menuClass: function(group){
            if(group.id === this.groupId){
                return this.menuClasses.active
            }
            return this.menuClasses.normal
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
        setSelect: function (it, sets) {
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


        },
        clearTemp: function () {
            this.thisSet = null
            this.selection = []
        },
        addSetToCart: function (selectedProducts) {
            this.timer=this.defaultTimer;
            if(selectedProducts.length != this.thisSet.set.length){
                UIkit.modal('#modal-error-count').show();
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
            if(!coupon){
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
            this.clearTemp();
            this.operation = 0
            this.payed = 0;
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
                this.start()
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
        pay: function () {
            if(this.keyLock){
                return false
            }

            this.timer=this.defaultTimer*5;
            PaymentByPaymentCard(2, this.cart_sum)
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
            this.start()
        },
        printCheck: function (slip, strId){
            let my_aray_letters = returnArrayLetters(strId)
            RegisterCheck(1, 0, false, my_aray_letters, this.cart, slip)
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
        deviceOk: async function (Rezult, textStatus, jqXHR) {


            if(Rezult.Command == "PayByPaymentCard" && Rezult.Status == 0 && this.operation == 0){
                let slip = Rezult.Slip.split("\n")
                setTimeout(()=>{this.payHelper = "Печатаем чек..."}, 100)
                let newId = this.lastId + 1
                let strId = ""
                if (String(newId).length == 1){
                    strId = "00" + newId
                }
                if (String(newId).length == 2){
                    strId = "0" + newId
                }
                if (String(newId).length > 3){
                    strId = String(newId).slice(-3)
                }
                strId = this.litera+"-"+strId
                this.printCheck(slip, strId)

            }
            if(Rezult.Command == "RegisterCheck" && Rezult.Status == 0 && this.operation == 0){

                this.registerOrder(Rezult)

            }

            if(Rezult.Command == "RegisterCheck" && Rezult.Status != 0 && this.operation == 0){
                this.payHelper = "Ошибка принтера, чек не будет распечатан! Возможно смена превысила 24 часа!"
                Rezult.CheckNumber = 0
                this.registerOrder(Rezult)

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
                fiscalNum: Rezult.CheckNumber
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
            if(this.operation == 1){
                if(this.deletedCheck.order.returnPay == true){
                    this.operation = 2
                }
                else{
                    this.delFiscalNumHolder = "Приложите карту"
                    ReturnPaymentByPaymentCard(0, this.deletedCheck)
                }

            }
            if(this.operation == 2){
                if(this.deletedCheck.order.returnCheck == true){
                    this.operation = 3
                }else{
                    this.delFiscalNumHolder = "Ждите чек"
                    ReturnCheck(0, this.deletedCheck.positions, data)
                }

            }
            if(this.operation == 3){
                const sendData = {
                    fiscalNum: this.deletedCheck.order.fiscalNum,
                    returnPay: this.deletedCheck.order.returnPay,
                    returnCheck: this.deletedCheck.order.returnCheck

                }
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