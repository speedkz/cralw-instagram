const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    Roles: {
        type: Array,
    },
    userId: {
        type: String,
    },
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    EmployeeId: {
        type: String,
    },
    Photo: {
        type: String,
    },
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    FullName: {
        type: String
    },
    BirthDate: {
        type: Date
    },
    Gender: {
        type: Boolean
    },
    CMND: {
        type: String
    },
    JobTitle: {
        type: String
    },
    JoinedDate: {
        type: Date
    },
    SoBHXH: {
        type: String
    },
    City: {
        type: String
    },
    Country: {
        type: String
    },
    CurrentAddress: {
        type: String
    },
});
module.exports = mongoose.model('Employee', employeeSchema);