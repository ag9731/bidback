const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        employeeName:{
             type:String,
             required:[true, "Please Enter Employee Name"],
        },
        employeeAadharNumber:{
            type:String,
            required:[true,"Please Enter Employee Aadhar Number"],
        },
        employeeEmail:{
            type:String,
            required:[true,"Please Enter Your Official Company Email ID"],
            unique: true,
        },
        employeePassword:{
            type:String,
            required:[true,"Please Enter Your Password"],
            select: false,
        },
        role: {
        type: String,
        enum: ["employee", "admin"],
        default: "employee",
        },
        idCardZip: {
              public_id: { type: String, default: null },
              url: { type: String, default: null }
        }
    }
)

module.exports = mongoose.model("employeeSchema", employeeSchema);