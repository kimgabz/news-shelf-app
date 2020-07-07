const express = require('express');
const router = express.Router();

// MODELS 
const { News } = require('../models/news.model');
const { auth } = require('../middleware/auth');

router.route('/news')
.post(auth, (req, res) => {
    const news = new News({
        ...req.body,
        ownerId: req.user._id
    });

    news.save((error,doc)=>{
        if(error) {
            return res.status(400).send(err);
        }
        res.status(200).json({
            post:true,
            bookId: doc._id
        });
    });
})
.get((req, res)=>{

    let id = req.query.id;

    News
    .find({_id: id})
    .populate('ownerId','name surname')
    .exec((error,doc)=>{
        if(error) {
            return res.status(400).send(error);
        }
        res.send(...doc);
    });
})
.put(auth, (req, res)=>{
    News.findByIdAndUpdate(req.body._id, req.body, { new: true }, (error, doc)=>{
        if(error) {
            return res.status(400).send(error);
        }
        res.json({
            success:true,
            doc
        })
    })
})
.delete(auth, (req, res) => {
    let id = req.query.id;

    News.findByIdAndRemove(id,(error, doc)=>{
        if(error) {
            return res.status(400).send(error);
        }
        res.json(true)
    })

});

router.route('/all')
.get((req, res) => {

    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 50;
    let order = req.query.order ? req.query.order : 'asc';
    let byOwner = req.query.owner ? {ownerId: req.query.owner } : {}
    
    News.find(byOwner).skip(skip).sort({_id:order}).limit(limit).exec( (error, doc) => {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(doc);
    });

})

module.exports = router;