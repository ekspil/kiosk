class OrderDTO {

    constructor({id, orderType, payType, sum, discountCard, status, fiscalNum, returnPay, returnCheck}) {
        this.id = id
        this.payType = payType
        this.orderType = orderType
        this.sum = sum
        this.discountCard = discountCard
        this.status = status
        this.fiscalNum = fiscalNum
        this.returnPay = returnPay
        this.returnCheck = returnCheck
    }
}

module.exports = OrderDTO