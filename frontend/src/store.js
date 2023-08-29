import { configureStore } from "@reduxjs/toolkit";

import cafesReducer from "./features/cafes/cafeSlice";
import employeesReducer from "./features/employees/employeesSlice";

const store = configureStore({
  reducer: {
    cafes: cafesReducer,
    employees: employeesReducer,
  },
});

export default store;
