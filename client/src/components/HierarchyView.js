import React, { useEffect, useState } from "react";
import { getEmployeesData } from "../services/GetEmployeeDataServer";
import AddEmployeeForm from "./AddEmployeeForm";
import "./HierarchyView.css";
import { getEmployeeDetails } from "../services/show_details";
import { useNavigate } from "react-router-dom";

// Helper function to convert flat employee data into a hierarchical structure
const buildHierarchy = (employees) => {
  const employeeMap = new Map();

  // Initialize the map with employee IDs
  employees.forEach((employee) => {
    employeeMap.set(employee._id, { ...employee, children: [] });
  });

  const hierarchy = [];

  // Populate the hierarchy by placing employees under their managers
  employees.forEach((employee) => {
    if (employee.managerId === "CEO") {
      hierarchy.push(employeeMap.get(employee._id));
    } else if (employeeMap.has(employee.managerId)) {
      employeeMap
        .get(employee.managerId)
        .children.push(employeeMap.get(employee._id));
    }
  });

  return hierarchy;
};

// Recursive component to display the hierarchical structure
const EmployeeNode = ({ employee, onAddEmployee }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const toggleChildren = () => setIsOpen((prev) => !prev);
  const toggleForm = () => setShowForm((prev) => !prev);

  const handleAddEmployeeSuccess = (newEmployee) => {
    onAddEmployee(employee._id, newEmployee);
    setShowForm(false);
  };
  const Show_Details = (id) => {
    console.log(id);
    console.log(getEmployeeDetails(id));
    navigate(`/details/${id}`);
  };

  return (
    <div className="employee-node">
      <div className="employee-info">
        <div
          onClick={() => {
            Show_Details(employee._id);
          }}
        >
          <strong>{employee.name}</strong> ({employee.email})
        </div>
        <button onClick={toggleChildren} className="toggle-button">
          {isOpen ? "−" : "+"}
        </button>
        <button onClick={toggleForm} className="add-button">
          Add Employee
        </button>
      </div>
      {showForm && (
        <AddEmployeeForm
          managerId={employee._id}
          onAddSuccess={handleAddEmployeeSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}
      {isOpen && employee.children.length > 0 && (
        <div className="nested-list">
          {employee.children.map((child) => (
            <EmployeeNode
              key={child._id}
              employee={child}
              onAddEmployee={onAddEmployee}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function HierarchyView() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployeesData();
        const hierarchicalData = buildHierarchy(data);
        setEmployees(hierarchicalData);
      } catch (error) {
        console.error("Failed to load employees:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const addEmployee = (parentId, newEmployee) => {
    const updatedEmployees = [...employees];

    // Recursively find the parent node and add the new employee to its children
    const addEmployeeToHierarchy = (nodes) => {
      nodes.forEach((node) => {
        if (node._id === parentId) {
          node.children.push(newEmployee);
        } else if (node.children.length > 0) {
          addEmployeeToHierarchy(node.children);
        }
      });
    };

    addEmployeeToHierarchy(updatedEmployees);
    setEmployees(updatedEmployees); // Update the state to reflect changes
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Hierarchy View</h1>
      <div className="hierarchy-tree">
        {employees.map((employee) => (
          <EmployeeNode
            key={employee._id}
            employee={employee}
            onAddEmployee={addEmployee}
          />
        ))}
      </div>
    </div>
  );
}

export default HierarchyView;
