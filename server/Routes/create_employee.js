const express = require("express");
const router = express.Router();
const Employee = require("../Models/employees");

// POST route to add a new employee
router.post("/addemployees", async (req, res) => {
  const { name, email, phone, managerId } = req.body;
  console.log(req.body, "Received employee data");

  // Validate input data
  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ error: "Name, email, and phone are required." });
  }

  console.log(managerId);
  const employee = new Employee({ name, email, phone, managerId });

  try {
    const result = await employee.save(); // Save to DB
    return res.status(201).json({
      message: "Employee added successfully",
      employee: result,
    }); // Success response with message and employee data
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: "Failed to add employee." }); // Error response
  }
});

router.get("/employees", async (req, res) => {
  try {
    // Fetch all employees from the database with a limit of 50
    const employees = await Employee.find().limit(50);
    console.log(employees); // Log the fetched employees

    // Send employees as a JSON response
    return res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err); // Log any error that occurs

    // Send error response if fetching fails
    return res.status(500).json({ error: "Failed to fetch employees." });
  }
});
router.get("/employees/:id", async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    let manager;
    if (employee.managerId != "CEO") {
      manager = await Employee.findById(employee.managerId);
    } else manager = "CEO";
    console.log(manager.name);

    res.json({ employee, manager });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee details" });
  }
});

module.exports = router; // Export the router
