import axios from "axios";

const API_URL = "http://localhost:5000/addemployees"; // API endpoint

// Function to add a new employee
const addEmployeeData = async (managerId, newEmployee) => {
  console.log("Sending Employee Data:", newEmployee);
  console.log(managerId);

  try {
    const response = await axios.post(API_URL, {
      name: newEmployee.name,
      email: newEmployee.email,
      phone: newEmployee.phone,
      managerId: managerId,
    });

    console.log("API Response:", response.data); // Log success response
    return response.data.message; // Return the success message from backend
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error; // Handle or propagate the error
  }
};

export { addEmployeeData };
