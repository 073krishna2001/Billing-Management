import { createStore } from "redux";
import billReducer from "./reducers";

const store = createStore(billReducer);

export default store;
