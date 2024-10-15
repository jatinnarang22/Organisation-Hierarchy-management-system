import axios from "axios";

const API_URL = "http://localhost:5000/employees"; // Backend endpoint

// Function to fetch details of a specific employee by ID
const getEmployeeDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`); // Make GET request
    console.log("Employee Details:", response.data); // Log details for verification
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for employee ${id}:`, error);
    throw error;
  }
  //   console.log(id);
};

export { getEmployeeDetails };
