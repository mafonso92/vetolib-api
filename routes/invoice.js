const express = require('express');
const router = express.Router();
const models = require('../models');
const Invoice = models.Invoice;

// Create an Invoice
router.put('/', function(req, res) {
    Invoice.create(req.body)
        .then(invoice => {
            return res.status(200).json({success: true, invoice: invoice});
        }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Find All Invoice
router.get('/', function(req, res) {
    Invoice.findAll().then(invoices => {
        return res.status(200).json({success: true, invoices: invoices})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});


// Find an Invoice by Id
router.get('/:id', function(req, res) {
    Invoice.findOne({
        where: {
            id: req.params.id
        }
    }).then(invoice => {
        return res.status(200).json({success: true, invoice: invoice})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Update an Invoice
router.post('/', function(req, res) {
    const id = req.body.id;

    Invoice.update(req.body, {
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Updated Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Delete an Invoice by Id
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    Invoice.destroy({
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Deleted Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

module.exports = router;
