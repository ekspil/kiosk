class ProductDTO {

    constructor({id, type, station, blocked, hiden, name, img, price, helper, coupon, groupId, position, products, codeOneC}) {
        this.id = id
        this.type = type
        this.station = station
        this.blocked = blocked
        this.hiden = hiden
        this.name = name
        this.img = img
        this.price = price
        this.helper = helper
        this.coupon = coupon
        this.groupId = groupId
        this.position = position
        this.set = products
        this.codeOneC = codeOneC
    }
}

module.exports = ProductDTO