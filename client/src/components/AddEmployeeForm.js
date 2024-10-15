import React, { useState } from "react";
import { addEmployeeData } from "../services/EmployeeDataService.js";

const AddEmployeeForm = ({ managerId, onAddSuccess, onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = { name, email, phone };

    try {
      await addEmployeeData(managerId, newEmployee); // Call API to add employee
      onAddSuccess(); // Call success handler
      window.location.reload(); // Trigger hard refresh
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-employee-form">
      <input
        type="text"
        placeholder="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Add Employee</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default AddEmployeeForm;
