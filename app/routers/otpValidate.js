const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const bcrypt = require("bcrypt")
const { await } = require('await')


function otpValidate(req, res) {
    console.log("here");
}

module.exports = otpValidate;