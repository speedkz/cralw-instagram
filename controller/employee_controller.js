const helpers = require('../helpers');
const mongoose = require('mongoose');
const Employee = require('../model/employee_model');
exports.getAll = (req, res, next) => {
    Employee.find()
        .then(result => {
            console.log(result.length)
            res.send(result);
        })
        .catch(err => res.status(400).send(err));
};