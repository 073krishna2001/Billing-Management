import React, { useState } from "react";
import BillDashboard from "./components/BillDashboard";
import AddBillForm from "./components/AddBillForm";
import FilterDropdown from "./components/FilterDropdown";
import TimeSeriesChart from "./components/TimeSeriesChart";
import { useSelector } from "react-redux";

const App = () => {
  const { bills } = useSelector((state) => state); // Access bills from Redux state
  const [selectedMonth, setSelectedMonth] = useState("2020-01"); // Default month

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Bill Manager Application</h1>

      {/* Month Selector */}
      <div style={styles.section}>
        <label htmlFor="month">Select Month:</label>
        <input
          type="month"
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Filter Dropdown */}
      <div style={styles.section}>
        <h2 style={styles.subHeader}>Filter Bills</h2>
        <FilterDropdown />
      </div>

      {/* Add Bill Form */}
      <div style={styles.section}>
        <h2 style={styles.subHeader}>Add a New Bill</h2>
        <AddBillForm />
      </div>

      {/* Bill Dashboard */}
      <div style={styles.section}>
        <BillDashboard budget={50000} />
      </div>

      {/* Time-Series Chart */}
      <div style={styles.section}>
        <TimeSeriesChart bills={bills} selectedMonth={selectedMonth} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px auto",
    maxWidth: "800px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "30px",
    marginRight:"20px",
  },
  subHeader: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "1rem",
    marginTop: "10px",
    marginBottom: "20px",
    display: "block",
  },
};

export default App;
