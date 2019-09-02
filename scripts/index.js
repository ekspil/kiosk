

var app = new Vue({
    el: '#app',
    mounted: function () {
        const timer = setInterval(this.checkTimer, 1000)
        this.start()

    },
    data: {
        message: 'Привет!',
        orderId: 0,
        kkmServer: 'http://192.168.15.101:5893//Execute',
        serverET: "http://192.168.15.166:4000",
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
        msgId: function (){
            let msg = this.litera +"-"+ this.orderId
            return msg
        }
},
    watch: {

        thisCoupon: function (newC, oldC) {
            if (newC.length > 4){
                this.thisCoupon.pop()
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

            if(newItem.set){

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
            this.payed = 0;
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
            this.timer=this.defaultTimer;
            UIkit.modal('#modal-cart').hide();
        },
        pay: function () {
            this.orderId++
            this.timer=this.defaultTimer*3;
            UIkit.modal('#modal-pay').show();
            PaymentByPaymentCard(2, this.cart_sum)

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
        printCheck: function (slip){
            let my_aray_letters = returnArrayLetters('F-147')
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
        deviceOk: function (Rezult, textStatus, jqXHR) {

            if(Rezult && Rezult.Status !== 0 && Rezult != "OK"){

                this.orderId = this.orderId + 1
                SendET(this.serverET, false, Rezult.Error, this.msgId)
            }

            if(Rezult.Command == "PayByPaymentCard" && Rezult.Status == 0){
                let slip = Rezult.Slip.split("\n")
                setTimeout(()=>{this.payHelper = "Печатаем чек..."}, 100)
                this.printCheck(slip)




                SendET(this.serverET, this.cart, false, this.msgId, this.orderType)


                setTimeout(()=>{this.payHelper = "Выводим информацию на кухонные мониторы..."}, 4000)
                setTimeout(()=>{this.payHelper = "Готово! Ваш заказ F-001"}, 6000)
                setTimeout(()=>{this.payed = 1}, 6050)
                setTimeout(this.start, 10000)
            }
            if(Rezult.Command == "RegisterCheck" && Rezult.Status == 0){

            }
            if(Rezult.Command == "PayByPaymentCard" && Rezult.Status == 0){



            }

        },
        deviceNotOk: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
        }
    }
})