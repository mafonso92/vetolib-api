const express = require('express');
const router = express.Router();
const models = require('../models');
const Appointment = models.Appointment;

// Create an Appointment
router.put('/', function(req, res) {
    Appointment.create(req.body)
        .then(appointment => {
            return res.status(200).json({success: true, appointment: appointment});
        }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Find All Appointment
router.get('/', function(req, res) {
    Appointment.findAll().then(appointments => {
        return res.status(200).json({success: true, appointments: appointments})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});


// Find an Appointment by Id
router.get('/:id', function(req, res) {
    Appointment.findOne({
        where: {
            id: req.params.id
        }
    }).then(appointment => {
        return res.status(200).json({success: true, appointment: appointment})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Update an Appointment
router.post('/', function(req, res) {
    const id = req.body.id;

    Appointment.update(req.body, {
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Updated Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Delete an Appointment by Id
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    Appointment.destroy({
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Deleted Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

module.exports = router;
