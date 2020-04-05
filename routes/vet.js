const express = require('express');
const router = express.Router();
const models = require('../models');
const Vet = models.Vet;

// Create a Vet
router.put('/', function(req, res) {
    Vet.create(req.body)
        .then(vet => {
            return res.status(200).json({success: true, vet: vet});
        }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Find All Vet
router.get('/', function(req, res) {
    Vet.findAll().then(vets => {
        return res.status(200).json({success: true, vets: vets})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});


// Find a Vet by Id
router.get('/:id', function(req, res) {
    Vet.findOne({
        where: {
            id: req.params.id
        }
    }).then(vet => {
        return res.status(200).json({success: true, vet: vet})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Update a Vet
router.post('/', function(req, res) {
    const id = req.body.id;

    Vet.update(req.body, {
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Updated Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Delete a Vet by Id
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    Vet.destroy({
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Deleted Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

module.exports = router;
