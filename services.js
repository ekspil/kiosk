const model = require('./models.js')
const ImgDTO = require("./dto/imgDTO")
const SetsDTO = require("./dto/setsDTO")
const ProductDTO = require("./dto/productDTO")
const OrderDTO = require("./dto/orderDTO")

const hello = async function(){
    console.log('Hello!')
}
const getBaseData = async function(inData){

    let list = await model.Product.findAll()
    const groups = await model.Group.findAll()
    const imgs = await model.Img.findAll()
    for(let i in list){
        let sets = await list[i].getSets()
        list[i] = new ProductDTO(list[i])
        sets = sets.map(se => {return new SetsDTO(se)})
        list[i].set = sets
    }
    return {
        list,
        groups,
        imgs
    }


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
            prod.position = data.position
            prod.codeOneC = data.codeOneC
        await prod.save()


        if(data.sets.length > 0){
            data.sets = data.sets.map(se =>{
                delete se.id
                return se
            })
            let thissets = await model.Set.bulkCreate(data.sets)
            thissets = thissets.map(sets => {return new SetsDTO(sets)})
            let thissetsarr = thissets.map(sets => {
                return sets.id
            })
            await prod.setSets(thissetsarr)

        }
        return true


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
           groupId: data.groupId,
           position: data.position,
           codeOneC: data.codeOneC
          }


        const product = await model.Product.create(prod)
        if(data.sets.length > 0){
                let thissets = await model.Set.bulkCreate(data.sets)
                thissets = thissets.map(sets => {return new SetsDTO(sets)})
                let thissetsarr = thissets.map(sets => {
                    return sets.id
                })
                await product.setSets(thissetsarr)


        }
        return true

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

const addImg = async function(data){

        const img = {
           name: data.name,
           img: data.img,
           hiden: data.hiden,
           blocked: data.blocked
          }

        const answer = await model.Img.create(img)
        return new ImgDTO(answer)

}

const makeOrder = async function(data){

    let {cart, fiscalNum, orderType} = data
    let order = {}
    order.orderType = orderType
    order.payType = 2
    order.sum = cart.reduce((sum, current) => {
        return sum + current.count * current.price
    }, 0);
    order.status = "payed"
    order.fiscalNum = fiscalNum
    order.returnPay = false
    order.returnCheck = false
    cart = cart.map(item => {
        item.positionId = item.id
        delete item.id
        return item
    })
    const createdOrder = await model.Order.create(order)
    let positions = await model.OrderPosition.bulkCreate(cart)
    positions = positions.map(sets => {
        return sets.id
    })

    await createdOrder.setOrder_positions(positions)
    return new OrderDTO(createdOrder)

}



module.exports={
    hello,
    changePosition,
    changeGroup,
    getBaseData,
    addImg,
    makeOrder
}