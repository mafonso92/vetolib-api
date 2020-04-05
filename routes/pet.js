const express = require('express');
const router = express.Router();
const models = require('../models');
const Pet = models.Pet;

// Create a Pet
router.put('/', function(req, res) {
    Pet.create(req.body)
        .then(pet => {
            return res.status(200).json({success: true, pet: pet});
        }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Find All Pet
router.get('/', function(req, res) {
    Pet.findAll().then(pets => {
        return res.status(200).json({success: true, pets: pets})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});


// Find a Pet by Id
router.get('/:id', function(req, res) {
    Pet.findOne({
        where: {
            id: req.params.id
        }
    }).then(pet => {
        return res.status(200).json({success: true, pet: pet})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Update a Pet
router.post('/', function(req, res) {
    const id = req.body.id;

    Pet.update(req.body, {
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Updated Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Delete a Pet by Id
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    Pet.destroy({
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Deleted Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

module.exports = router;
