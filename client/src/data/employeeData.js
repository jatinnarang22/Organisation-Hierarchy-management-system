// routes/employees.js
const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee"); // Your Employee model

// Fetch employees by managerId or top-level employees
router.get("/employees", async (req, res) => {
  const { managerId } = req.query;

  try {
    // Fetch employees based on managerId
    const employees = managerId
      ? await Employee.find({ managerId }) // Fetch employees under the specified manager
      : await Employee.find({ managerId: null }); // Fetch employees with no manager

    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

module.exports = router;
