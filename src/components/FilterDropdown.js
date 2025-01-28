import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/actions";

const FilterDropdown = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <select onChange={handleFilterChange} style={styles.dropdown}>
      <option value="All">All</option>
      <option value="FoodNDining">Food & Dining</option>
      <option value="Utility">Utility</option>
      <option value="Shopping">Shopping</option>
      <option value="Education">Education</option>
      <option value="Personal Care">Personal Care</option>
      <option value="Travel">Travel</option>
    </select>
  );
};

const styles = {
  dropdown: {
    width: "102%", // Set the width of the dropdown
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
};

export default FilterDropdown;
