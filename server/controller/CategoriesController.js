const CategoryModel = require('../models/CategoriesModel')

const Category ={
    add : async (req,res)=>{
        try {
            const {name} = req.body;
            const category = await CategoryModel.findOne({name})
            if(category) return res.status(400).json({msg: "This category already exists."})

            const newCategory = new CategoryModel({name})

            await newCategory.save()
            res.json({msg: "Created a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
       
    },
    update :async(req,res)=>{
            try {
                const {name} = req.body;
                await CategoryModel.findOneAndUpdate({_id: req.params.id}, {name})
    
                res.json({msg: "Updated a category"})
            } catch (error) {
                return res.status(500).json({msg: err.message})
            }
    },
    delete : async(req,res)=>{
        try {
           
            await CategoryModel.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    get : async(req,res)=>{
       try {
           const category = await CategoryModel.find()
        
            res.json({category})
       } catch (error) {
           return res.status(500).json({msg : error.message})
       }
    }
}

    module.exports=Category