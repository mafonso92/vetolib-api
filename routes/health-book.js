const express = require('express');
const router = express.Router();
const models = require('../models');
const HealthBook = models.HealthBook;

// Create an HealthBook
router.put('/', function(req, res) {
    HealthBook.create(req.body)
        .then(healthBook => {
            return res.status(200).json({success: true, healthBook: healthBook});
        }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Find All HealthBook
router.get('/', function(req, res) {
    HealthBook.findAll().then(healthBooks => {
        return res.status(200).json({success: true, healthBooks: healthBooks})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});


// Find an HealthBook by Id
router.get('/:id', function(req, res) {
    HealthBook.findOne({
        where: {
            id: req.params.id
        }
    }).then(healthBook => {
        return res.status(200).json({success: true, healthBook: healthBook})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Update an HealthBook
router.post('/', function(req, res) {
    const id = req.body.id;

    HealthBook.update(req.body, {
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Updated Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Delete a HealthBook by Id
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    HealthBook.destroy({
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Deleted Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

module.exports = router;
