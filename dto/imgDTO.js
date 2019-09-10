class ImgDTO {

    constructor({id, name, img, hiden, blocked}) {
        this.id = id
        this.name = name
        this.img = img
        this.hiden = hiden
        this.blocked = blocked
    }
}

module.exports = ImgDTO