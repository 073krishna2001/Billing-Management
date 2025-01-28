export const ADD_BILL = "ADD_BILL";
export const EDIT_BILL = "EDIT_BILL";
export const REMOVE_BILL = "REMOVE_BILL";
export const SET_FILTER = "SET_FILTER";

export const addBill = (bill) => ({ type: ADD_BILL, payload: bill });
export const editBill = (bill) => ({ type: EDIT_BILL, payload: bill });
export const removeBill = (id) => ({ type: REMOVE_BILL, payload: id });
export const setFilter = (category) => ({ type: SET_FILTER, payload: category });
