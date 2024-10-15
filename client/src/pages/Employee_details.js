import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get URL parameters
import { getEmployeeDetails } from "../services/show_details"; // Import API service
import "./Details.css"; // Import the CSS file for styling

function Details() {
  const { id } = useParams(); // Extract employee ID from URL
  const [employee, setEmployee] = useState(null); // State to store employee details
  const [error, setError] = useState(null); // State to store errors (if any)
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const data = await getEmployeeDetails(id); // Fetch data using employeeId
        setEmployee(data); // Store employee details in state
      } catch (error) {
        setError("Failed to load employee details.");
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchEmployeeDetails(); // Call the function to fetch details
  }, [id]); // Re-run if employeeId changes

  if (isLoading) return <div className="loading">Loading...</div>; // Display loading state
  if (error) return <div className="error">{error}</div>; // Display error message

  return (
    <div className="details-container">
      <h1 className="details-title">Employee Details</h1>
      {employee ? (
        <div className="details-employee-card">
          <div className="details-employee-info">
            <p>
              <strong>Name:</strong> {employee.employee.name}
            </p>
            <p>
              <strong>Email:</strong> {employee.employee.email}
            </p>
            <p>
              <strong>Phone:</strong> {employee.employee.phone}
            </p>
            <p>
              <strong>Manager:</strong>
              {employee.manager != "CEO" ? employee.manager.name : "CEO"}
            </p>
          </div>
        </div>
      ) : (
        <p>No employee found.</p>
      )}
    </div>
  );
}

export default Details;
