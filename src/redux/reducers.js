import { ADD_BILL, EDIT_BILL, REMOVE_BILL, SET_FILTER } from "./actions";

const initialState = {
  bills: [
    {
      id: 1,
      description: "Dominoes",
      category: "FoodNDining",
      amount: 430,
      date: "01-02-2020",
    },
    {
      id: 2,
      description: "Car wash",
      category: "Utility",
      amount: 500,
      date: "01-06-2020",
    },
    {
      id: 3,
      description: "Amazon",
      category: "Shopping",
      amount: 2030,
      date: "01-07-2020",
    },
    {
      id: 4,
      description: "House rent",
      category: "Food & Dining",
      amount: 35900,
      date: "01-03-2020",
    },
    {
      id: 5,
      description: "Tuition",
      category: "Education",
      amount: 2200,
      date: "01-12-2020",
    },
    {
      id: 6,
      description: "Laundry",
      category: "Personal Care",
      amount: 320,
      date: "01-14-2020",
    },
    {
      id: 7,
      description: "Vacation",
      category: "Travel",
      amount: 3430,
      date: "01-18-2020",
    },
  ],
  filter: "All",
};

const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BILL:
      return { ...state, bills: [...state.bills, action.payload] };
    case EDIT_BILL:
      return {
        ...state,
        bills: state.bills.map((bill) =>
          bill.id === action.payload.id ? action.payload : bill
        ),
      };
    case REMOVE_BILL:
      return {
        ...state,
        bills: state.bills.filter((bill) => bill.id !== action.payload),
      };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export default billReducer;
