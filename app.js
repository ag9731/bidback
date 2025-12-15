const express = require("express");
const app = express();

app.use(express.json());
const employeesRoutes = require("./routes/employeeRoutes");
app.use("/api/v1",employeesRoutes);

module.exports = app;