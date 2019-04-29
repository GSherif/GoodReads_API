const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const category = require('../models/category');
const adminMiddleware = require('./../middlewares/adminAuthorization');

router.use(adminMiddleware);

// Get Categories
router.get('/', (req, res, next) => {
    category.find()
        .exec()
        .then((catg) => {
            const response={
                NumOfCategories:catg.length,
                categories: catg.map((c)=>{
                   return{
                       Name:c.name,
                       Books:c.Books,
                        url:'http://localhost:3000/api/categories/'+c.id
                } 
                       
                })
            }
            console.log(response);
             res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json
                ({
                    error: err
                });
        });

});
// Add Categories
router.post('/', (req, res, next) => {
    const Category = new category({
        name: req.body.name,
    })
    Category.save().then(add=>{
        console.log(add)
        res.status(200).json({
            message: "Category Added Sucessfully",
            CreateCategory:{
                Name:add.name,
                CategoryId:add.id,
                url:'http://localhost:3000/api/categories/'+add.id
            }
        })

        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
    });

//Get Specific Category
router.get('/:categoryId', (req, res, next) => {
    const Cid = req.params.categoryId;

    category.findById(Cid).exec().then(c => {

        if (c) {
            res.status(200).json(c);
        }
        else {
            res.status(404).json({ Message: 'This Category Not Found' });
        }

    }).catch(err => {
        res.status(500).json({ error: err });
    })

});

//Edit Specific Category
router.patch('/:categoryId', (req, res, next) => {
    const Cid = req.params.categoryId;
    category.findById(Cid).exec().then(catg=>{
    
        category.update({_id:Cid},{ $set:{name:req.body.name}}).exec().then(c => {
            console.log(c);
            res.status(200).json(c);
        })
    })
 .catch(err => {
        res.status(500).json({ error: err });
    })

});

//Delete Specific Category
router.delete('/:categoryId', (req, res, next) => {
    const Cid = req.params.categoryId;

    category.remove({ id: Cid }).exec().then(c => {
        res.status(200).json(c);
    }).catch(err => {
        res.status(500).json({ error: err });
    })

});

module.exports = router;
