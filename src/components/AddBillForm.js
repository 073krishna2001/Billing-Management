import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBill } from "../redux/actions";

const AddBillForm = () => {
  const [bill, setBill] = useState({
    id: Date.now(),
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBill({ ...bill, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBill(bill));
    setBill({ id: Date.now(), description: "", category: "", amount: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={bill.description}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={bill.category}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={bill.amount}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={bill.date}
        onChange={handleChange}
        required
      />
      <button type="submit" style={{ width: "102%" }}>Add Bill</button>
    </form>
  );
};



export default AddBillForm;
