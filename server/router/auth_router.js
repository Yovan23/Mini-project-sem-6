const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/auth_controller");
const inventoryControllers = require("../controllers/inventory");
const singupSchema = require("../validators/auth_validator");
const singinSchema = require("../validators/login_validator");
const validate = require("../middlleware/validate_middleware");
const { authenticateUser } = require('../middlleware/authMiddleware');
const verifyToken = require('../middlleware/token');

router.route("/home").get(Controllers.home);
router.route('/register').post(validate(singupSchema), Controllers.register);
router.route('/login').post(validate(singinSchema), Controllers.login);
router.route('/change_Password').post(Controllers.change_Password);

// router.use( authenticateUser);

router.route('/medicine').post(Controllers.medicine);
router.route('/medicineFind').get(Controllers.medicineFind);
router.route('/medicineUpdate/:id').put(Controllers.medicineUpdate);
router.route('/medicineDelete/:id').delete(Controllers.medicineDelete);

router.route('/adminAdd').post(Controllers.adminAdd);
router.route('/adminFind').get((authenticateUser),Controllers.adminFind);
router.route('/adminsFind').get(Controllers.adminsFind);
router.route('/adminUpdate/:id').put(Controllers.adminUpdate);
router.route('/adminDelete/:id').delete(Controllers.adminDelete);

router.route('/ownerAdd').post(Controllers.ownerAdd);
router.route('/ownerFind').get(Controllers.ownerFind);
router.route('/ownerUpdate/:id').put(Controllers.ownerUpdate);
router.route('/ownerDelete/:id').delete(Controllers.ownerDelete);

router.route('/billCreate').post((authenticateUser),Controllers.billCreate);
router.route('/billFind').get((authenticateUser),Controllers.billFind);
router.route('/billFindOne/:billId').get(Controllers.billFindOne);
router.route('/billUpdate/:id').put(Controllers.addMedicineToBillController);

router.route('/createOrder').post((authenticateUser),Controllers.createOrder);
router.route('/findOrder').get((authenticateUser),Controllers.findOrder);
router.route('/findAllOrders').get(Controllers.findAllOrders);
router.route('/updateOrder/:orderId').put(Controllers.updateOrder);
router.route('/deleteOrder/:orderId').delete(Controllers.deleteOrder);

router.route('/inventoryFind').get((authenticateUser),Controllers.inventoryFind);
// router.route('/inventoryUpdate/:medicineID').put(Controllers.inventoryUpdate);
router.route('/inventories/:inventoryId/medicines/:medicineId/place').put(Controllers.inventoryUpdate);


// const authMiddleware = require('../middlleware/authMiddleware');
// router.route('/createInventory').post(inventoryControllers.createInventory);
// router.route('/updateInventory').put(inventoryControllers.addMedicineToInventory);
// router.route('/getUserInventory').get( inventoryControllers.getUserInventory);

// const logiController = require('../controllers/login');

module.exports = router;