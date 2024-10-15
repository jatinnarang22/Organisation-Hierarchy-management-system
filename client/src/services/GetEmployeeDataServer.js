import axios from "axios";

const API_URL = "http://localhost:5000/employees"; // Backend endpoint

// Function to fetch all employees from the backend
const getEmployeesData = async () => {
  try {
    const response = await axios.get(API_URL); // Make GET request
    console.log("Employees Data:", response.data); // Log data for verification
    return response.data; // Return employee data
  } catch (error) {
    console.error("Error fetching employees:", error); // Handle error
    throw error;
  }
};

export { getEmployeesData };
