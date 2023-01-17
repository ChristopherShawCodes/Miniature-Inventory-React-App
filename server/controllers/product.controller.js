const Product= require('../models/product.model')
const User = require('../models/user.model')

module.exports = {

    getAll: (req,res)=>{
        Product.find().sort({createdAt:-1})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    getThree: (req,res)=>{
        Product.find().sort({createdAt:-1}).limit(2)
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    getOne: (req,res)=>{
        Product.findById(req.params.id)
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    addOne: async (req,res)=> {
        try{
            console.log(req.body)
            const newProduct = new Product(req.body);
            await newProduct.save();
            const productCreator = await User.findById({_id: newProduct.creator});
            let productArray = productCreator.products
            await productCreator.updateOne({_id: newProduct.creator, products:[...productArray, newProduct]});
            res.status(200).json({success:true, data:newProduct, user:newProduct.creator.username});
        } catch(err){
            console.log(err);
            res.status(400).json(err);
        }
    },

    updateOne:(req,res)=>{
        Product.updateOne({_id:req.params.id}, req.body, {new:true, runValidators:true})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    deleteOne:(req,res)=>{
        Product.deleteOne({_id:req.params.id})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    findUser: (request,response) => {
        Product.find({creator:request.params.id})
        .then(products => {
            response.json(products)
        })
        .catch(error => {
            console.log(error)
            response.status(400).json(error)
        })
    }

}