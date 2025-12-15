const Employee = require("../models/employeeSchema");
const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary");

// Create New Employees
exports.createNewEmployee = async (req,res,next) => {
    try{
        const {  employeeName, employeeAadharNumber, employeeEmail, employeePassword,role } = req.body;
    
        const existingEmployee = await Employee.findOne({ employeeEmail });
        if (existingEmployee) {
        return res.status(400).json({ message: "Email already registered" });
       }
    
        const newEmployee = new Employee({
            employeeName,
            employeeAadharNumber,
            employeeEmail,
            employeePassword,
            role: "employee",
            idCard: null
        })
    
         await newEmployee.save();
    
        res.status(201).json({
            message:"New Employee Created Successfully",
            newEmployee,
        })
    }catch(err){
        console.log(err);
    }
}


// Update Employee
exports.updateEmployee = async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json({
        message: "Employee updated",
        employee
    });
};

exports.uploadIdCardZip = async (req, res) => {
    try {
        // Check file
        if (!req.file) {
            return res.status(400).json({
                message: "No ZIP file uploaded"
            });
        }

        // Find employee
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        // If old ID card exists → delete from Cloudinary
        if (employee.idCardZip?.public_id) {
            await cloudinary.uploader.destroy(
                employee.idCardZip.public_id,
                { resource_type: "raw" }
            );
        }

        // Upload ZIP to Cloudinary
        cloudinary.uploader.upload_stream(
            {
                folder: "BolsteridCardZips",
                resource_type: "raw", // 🔑 ZIP
                public_id: `employee_${employee._id}_idcard`,
                overwrite: true
            },
            async (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({
                        message: "Cloudinary upload failed"
                    });
                }

                // 5️⃣ Save ZIP info in DB
                employee.idCardZip = {
                    public_id: result.public_id,
                    url: result.secure_url
                };

                await employee.save();

                res.status(200).json({
                    message: "Employee ID Card ZIP uploaded successfully",
                    idCard: employee.idCardZip
                });
            }
        ).end(req.file.buffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};



// Create a test account or replace with real credentials.

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "akashbolster01@gmail.com",
    pass: "hfdm vght jmtq ztzg",
  },
});

// Employee Login
exports.employeeLogin = async (req,res,next) => {
    const { employeeEmail, employeePassword } = req.body;

    try{
        const employee = await Employee.findOne({ employeeEmail }).select('+employeePassword');

        // Check Email
        if(!employee){
            return res.status(404).json({ message: 'Employee Not Found' });
        }

        // Check Password
       if (employee.employeePassword !== employeePassword) {
           return res.status(401).json({ message: 'Invalid Password' });
       }     
    
     


       // Employee Verification
       const info = await transporter.sendMail({
             from: '"Akash" <akashbolster01@gmail.com>',
             to: employee.employeeEmail,
             subject: "Hello ✔",
             text: "Hello world?", // plain‑text body
             html: "<b>Hello world?</b>", // HTML body
        }); 
 
      console.log("Message sent:", info.messageId);                          

        res.status(200).json({
            message:"Employee Login SUCCESSFULL",
            employee
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Get All Employees
exports.getAllEmployeesIdCardList = (req,res,next) => {
    res.status(200).json({
        message:"routes are working"
    })
}