import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: false,
  loading: true,
  locations: [],
  modalOpen: false,
};

const employeesSlice = createSlice({
  name: "cafes",
  initialState,
  reducers: {
    employeesError(state, action) {
      state.error = true;
    },
    employeesLoad(state, action) {
      const data = action.payload;
      state.data = [...data];

      let tempLocs = data.map((cafe) => {
        return cafe.location;
      });
      state.locations = [...tempLocs];
    },
    employeesLoaded(state, action) {
      state.loading = false;
    },
    employeesLoading(state, action) {
      state.loading = true;
    },
  },
});

export const {
  employeesError,
  employeesLoad,
  employeesLoaded,
  employeesLoading,
} = employeesSlice.actions;

export default employeesSlice.reducer;

export const fetchEmployees =
  (cafe = "") =>
  async (dispatch) => {
    let url = `${process.env.REACT_APP_API_URL_DEV}/employees`;
    if (cafe !== "") {
      url += `?cafe=${cafe}`;
    }
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch(employeesLoad(res.data));
        dispatch(employeesLoaded());
      })
      .catch((err) => {
        console.log(err);
        dispatch(employeesError());
        dispatch(employeesLoaded());
      });
  };
