const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        required:[true, 'Please provide a title for the product.'],
        minLength: [2, 'A product title should be longer than 2 characters.']
    },

    purchaseLink: {
        type: String,
        required:[true,'purchaseLink is required.'],
        minLength: [6,'Please provide the link for where you plan to purchase this item.']
    },

    sellLink: {
        type: String,
        required:[true, 'sellLink is required.'],
        minLength: [6, 'Please provide the URL to where you will sell this item.']
    },

    cost: {
        type: Number,
        required:[true, 'Please provide the cost of the item.']
    },

    retailPrice: {
        type: Number,
        required:[true, 'How much are you going to sell the item for?']
    },

    status: {
        type: String
    },

    // sku: {
    //     type: String,
    //     required:[true, 'Please provide the sku # for this item.']
    // },

    mainImage:{
        type: String,
    },

    creatorName:{
        type: String,
    },

    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

},
{timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)