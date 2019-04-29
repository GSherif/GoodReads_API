const express= require('express');
const router= express.Router();
const mongoose=require('mongoose');
const category=require('../models/category');
// Get Categories
router.get('/',(req,res,next)=>{
category.find()
.exec()
.then((catg) => {
    console.log(catg);
    res.status(200).json(catg);
})
.catch((err) => {
    console.log(err);
    res.status(500).json
    ({
        error:err
    });
});

});
// Add Categories
router.post('/',(req,res,next)=>{
  const Category=new category({
    //   id:new mongoose.Types.ObjectId,
      name:req.body.name,
  })
  Category.save();
  res.status(200).json({
      message:"Category Added Sucessfully",
      CreateCategory:Category,
  })
});

//Get Specific Category
router.get('/:categoryId',(req,res,next)=>{
    const Cid=req.params.categoryId;

    category.findById(Cid).exec().then(c=>{

        if(c) {
            res.status(200).json(c);
        }
        else{
            res.status(404).json({Message:'This Category Not Found'});
        }
        
    }).catch(err=>{
        res.status(500).json({error:err});
    })
    
    });

    //Edit Specific Category
router.patch('/:categoryId',(req,res,next)=>{
    const Cid=req.params.categoryId;
    const name=req.body.name;
    category.update({id:Cid},{$set:name}).exec().then(c=>{
        res.status(200).json(c);
    }).catch(err=>{
        res.status(500).json({error:err});
    })
    
    });

//Delete Specific Category
router.delete('/:categoryId',(req,res,next)=>{
    const Cid=req.params.categoryId;

    category.remove({id:Cid}).exec().then(c=>{
      res.status(200).json(c);
    }).catch(err=>{
        res.status(500).json({error:err});
    })
    
    });

module.exports=router;
