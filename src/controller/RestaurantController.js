const mongoose  = require('mongoose')
const Restaurant = require('../model/Restaurant')

module.exports = {
    getAllRestaurant: (req, res) => {
        let result = Restaurant.find({}).then(response => {
            res.status(200).json(response)
        }).catch(e => {
            console.error(e)
            res.status(500).json({error : e, msg: 'Something error !!!'})
        })
    },
    createRestaurant: (req, res) => {
        new Restaurant(req.body).save()
            .then(response => res.status(200).json(response))
            .catch(e => {
                console.error(e)
                res.status(500).json({error : e, msg: 'Something error !!!'})
            })
    },
    deleteRestaurant: (req, res) => {
        Restaurant.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err) {
                res.status(500).json({error : err})
            } else {
                res.status(200).json({doc: doc})
            }
        })
    },
    updateRestaurant: (req, res) => {
        const body = req.body

        Restaurant.findByIdAndUpdate(
            {_id: req.params.id},
            { $set: {
                store_name: body.store_name, 
                address: body.address,
                star: body.star, 
                avr_price: body.avr_price,
                open_time: body.open_time,
                image_url: body.image_url,
                type: body.type }},
            { useFindAndModify: false })
                .then(doc => res.status(200).json({doc: doc}))
                .catch(e =>  res.status(500).json({error : e}))
    }
}