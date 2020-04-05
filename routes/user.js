const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.User;

// Create an User
router.put('/', function(req, res) {
    User.create(req.body)
        .then(user => {
            return res.status(200).json({success: true, user: user});
        }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Find All User
router.get('/', function(req, res) {
    User.findAll().then(users => {
        return res.status(200).json({success: true, pets: users})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});


// Find an User by Id
router.get('/:id', function(req, res) {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        return res.status(200).json({success: true, user: user})
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Update an User
router.post('/', function(req, res) {
    const id = req.body.id;

    User.update(req.body, {
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Updated Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

// Delete an User by Id
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    User.destroy({
        where: {id: id}
    }).then(() => {
        return res.status(200).json({success: true, details: 'Deleted Successfully'});
    }).catch(err => {
        return res.status(500).json({success: false, error: err});
    });
});

module.exports = router;
