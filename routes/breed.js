const express = require('express');
const router = express.Router();
const models = require('../models');
const Breed = models.Breed;

// Create a Breed
router.put('/', function(req, res) {
    Breed.create(req.body)
        .then(breed => {
            return res.status(200).json({success: true, breed: breed});
        }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Find All Breed
router.get('/', function(req, res) {
    Breed.findAll().then(breeds => {
        return res.status(200).json({success: true, breeds: breeds})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});


// Find a Breed by Id
router.get('/:id', function(req, res) {
    Breed.findOne({
        where: {
            id: req.params.id
        }
    }).then(breed => {
        return res.status(200).json({success: true, breed: breed})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Update a Breed
router.post('/', function(req, res) {
    const id = req.body.id;

    Breed.update(req.body, {
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Updated Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Delete a Breed by Id
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    Breed.destroy({
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Deleted Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

module.exports = router;
