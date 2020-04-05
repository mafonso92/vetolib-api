const express = require('express');
const router = express.Router();
const models = require('../models');
const Clinical = models.Clinical;

// Create a Clinical
router.put('/', function(req, res) {
    Clinical.create(req.body)
        .then(clinical => {
            return res.status(200).json({success: true, clinical: clinical});
        }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Find All Clinical
router.get('/', function(req, res) {
    Clinical.findAll().then(clinicals => {
        return res.status(200).json({success: true, clinicals: clinicals})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});


// Find a Clinical by Id
router.get('/:id', function(req, res) {
    Clinical.findOne({
        where: {
            id: req.params.id
        }
    }).then(clinical => {
        return res.status(200).json({success: true, clinical: clinical})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Update a Clinical
router.post('/', function(req, res) {
    const id = req.body.id;

    Clinical.update(req.body, {
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Updated Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Delete a Clinical by Id
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    Clinical.destroy({
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Deleted Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

module.exports = router;
