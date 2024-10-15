import React from "react";
import { Link } from "react-router-dom";
import HierarchyView from "../components/HierarchyView.js";
import "./HomePage.css"; // Optional: Styling for HomePage

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Employee Management Dashboard</h1>
      </header>

      <div className="hierarchy-view-section">
        <h2>Organization Hierarchy</h2>
        <HierarchyView />
      </div>
    </div>
  );
};

export default HomePage;
