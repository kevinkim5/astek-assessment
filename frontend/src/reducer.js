import { combineReducers } from "redux";

import cafesReducer from "./features/cafes/cafeSlice";
import employeesReducer from "./features/employees/employeesSlice";

// export default function rootReducer(state = {}, action) {
//   return {
//     cafes: cafesReducer(state.cafes, action),
//     employees: employeesReducer(state.employees, action),
//   };
// }

const rootReducer = combineReducers({
  cafes: cafesReducer,
  employees: employeesReducer,
});

export default rootReducer;
