'use strict'

const { BadRequestError } = require("../core/error.response")
const {inventory} = require("../models/inventory.model")
const { getInventoryByShopAndProductId } = require("../models/repositories/inventory.repo")
const { getProductById } = require("../models/repositories/product.repo")

class InventoryService{
    static async addStockToInventory({stock, productId, shopId, location}){
        const product = await getProductById(productId)

        if(!product) throw new BadRequestError('Not Found Product')

        let foundInventory = await getInventoryByShopAndProductId({productId, shopId})
        if(!inventory) throw new BadRequestError('Not Found Inventory')

        foundInventory.inven_stock += +stock

        foundInventory.inven_location = location ? location : foundInventory.inven_location

        foundInventory = await inventory.findOneAndUpdate({ _id: foundInventory._id }, foundInventory, { new: true })

        return await foundInventory
    }
}

module.exports = InventoryService