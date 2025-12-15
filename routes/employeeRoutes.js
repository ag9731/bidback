const express = require("express");
const { getAllEmployeesIdCardList, createNewEmployee, employeeLogin, uploadIdCardZip } = require("../controller/employeeController");
const router = express.Router();
const upload = require("../middlware/multer");

// Get All Employees
router.route("/employees").get(getAllEmployeesIdCardList);

// Create New Employees
router.route("/employee/create-employee").post(createNewEmployee);

// Employee Login
router.route("/employee/login").post(employeeLogin);

// Employee id card upload
router.route("/admin/upload-id-zip/:id").post(upload.array("idCardZip"),uploadIdCardZip);



module.exports = router;