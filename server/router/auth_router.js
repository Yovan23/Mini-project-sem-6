const express = require("express");
const Controllers = require("../controllers/auth_controller");
const router = express.Router();
const singupSchema = require("../validators/auth_validator");
const singinSchema = require("../validators/login_validator");
const validate = require("../middlleware/validate_middleware");
// const medicine = require("../Model/medicine_Model");

router.route("/").get(Controllers.home);
router.route('/register').post(validate(singupSchema), Controllers.register);
router.route('/login').post(validate(singinSchema), Controllers.login);

module.exports = router;