class ProductDTO {

    constructor({id, type, station, blocked, hiden, name, img, price, price2, price3, price4, price5, helper, coupon, corner, groupId, position, products, codeOneC, extGroup, en, jp, cn, ko}) {
        this.id = id
        this.type = type
        this.station = station
        this.blocked = blocked
        this.hiden = hiden
        this.name = name
        this.img = img
        this.price = price
        this.price2 = price2
        this.price3 = price3
        this.price4 = price4
        this.price5 = price5
        this.helper = helper
        this.coupon = coupon
        this.corner = corner
        this.groupId = groupId
        this.position = position
        this.set = products
        this.codeOneC = codeOneC
        this.extGroup = extGroup
        this.en = en
        this.jp = jp
        this.cn = cn
        this.ko = ko
    }
}

module.exports = ProductDTO