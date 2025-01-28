import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBill, editBill } from "../redux/actions";

const BillDashboard = () => {
  const { bills, filter } = useSelector((state) => state);
  const dispatch = useDispatch();

  const filteredBills =
    filter === "All"
      ? bills
      : bills.filter((bill) => bill.category === filter);

  const [budget, setBudget] = useState(0);
  const [highlightedBills, setHighlightedBills] = useState([]);
  const [editableBillId, setEditableBillId] = useState(null);
  const [editedBill, setEditedBill] = useState(null);

  const calculateBillsWithinBudget = () => {
    let total = 0;
    let selectedBills = [];
    const sortedBills = [...filteredBills].sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));

    for (const bill of sortedBills) {
      if (total + parseFloat(bill.amount) <= budget) {
        total += parseFloat(bill.amount);
        selectedBills.push(bill.id);
      } else {
        break;
      }
    }

    setHighlightedBills(selectedBills);
  };

  const handleEditClick = (bill) => {
    setEditableBillId(bill.id);
    setEditedBill({ ...bill });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBill({ ...editedBill, [name]: value });
  };

  const handleSaveEdit = () => {
    dispatch(editBill({ ...editedBill, amount: parseFloat(editedBill.amount) }));
    setEditableBillId(null);
    setEditedBill(null);
  };

  const totalAmount = filteredBills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

  return (
    <div style={styles.container}>
      <h2>Bill Dashboard</h2>
      <p>Total Monthly Amount: ₹{totalAmount}</p>

      {/* Monthly Budget Input */}
      <div style={styles.budgetSection}>
        <label htmlFor="budget">Enter Monthly Budget:</label>
        <input
          type="number"
          id="budget"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
          style={styles.input}
        />
        <button onClick={calculateBillsWithinBudget} style={styles.button}>
          Highlight Bills Within Budget
        </button>
      </div>

      {/* List of Bills */}
      <ul style={styles.list}>
        {filteredBills.map((bill) => (
          <li
            key={bill.id}
            style={{
              ...styles.billItem,
              backgroundColor: highlightedBills.includes(bill.id) ? "#d4edda" : "#fff",
            }}
          >
            {editableBillId === bill.id ? (
              <div style={styles.editContainer}>
                <input type="text" name="description" value={editedBill.description} onChange={handleEditChange} style={styles.input} />
                <input type="number" name="amount" value={editedBill.amount} onChange={handleEditChange} style={styles.input} />
                <input type="text" name="category" value={editedBill.category} onChange={handleEditChange} style={styles.input} />
                <input type="date" name="date" value={editedBill.date} onChange={handleEditChange} style={styles.input} />
                <button onClick={handleSaveEdit} style={styles.saveButton}>Save</button>
                <button onClick={() => setEditableBillId(null)} style={styles.cancelButton}>Cancel</button>
              </div>
            ) : (
              <div style={styles.billContent}>
                <span style={styles.billText}>
                  {bill.description} - ₹{bill.amount} ({bill.category}) on {bill.date}
                </span>
                <div style={styles.buttonContainer}>
                  <button onClick={() => handleEditClick(bill)} style={styles.editButton}>Edit</button>
                  <button onClick={() => dispatch(removeBill(bill.id))} style={styles.removeButton}>Remove</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  budgetSection: {
    marginBottom: "20px",
  },
  input: {
    marginRight: "10px",
    padding: "5px",
    fontSize: "14px",
    maxWidth: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  saveButton: {
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  billItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
  },
  billContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  billText: {
    flex: "1", // Allows the text to take available space
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  editButton: {
    backgroundColor: "#449e48",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
};

export default BillDashboard;
