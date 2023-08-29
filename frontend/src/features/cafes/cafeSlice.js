import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cafeList: [],
  data: [],
  error: false,
  loading: true,
  locations: [],
  modalOpen: false,
};

const cafesSlice = createSlice({
  name: "cafes",
  initialState,
  reducers: {
    cafesDelete(state, action) {
      const deletedCafe = action.payload;
      let tempCafes = [...state.locations];
      tempCafes.filter((item) => item !== deletedCafe);
      state.locations = [...tempCafes];
    },
    cafesError(state, action) {
      state.error = true;
    },
    cafesLoad(state, action) {
      const data = action.payload;
      let cafeList = [];
      let tempLocs = [];
      data.forEach((cafe) => {
        cafeList.push({
          value: cafe.id,
          label: cafe.Name,
        });
        if (!state.locations.includes(cafe.Location) && cafe.Location !== "") {
          tempLocs.push(cafe.Location);
        }
      });

      state.cafeList = [
        ...cafeList.sort((a, b) => a.label.localeCompare(b.label)),
      ];
      state.data = [...data];
      state.locations = [...state.locations, ...tempLocs];
    },
    cafesLoaded(state, action) {
      state.loading = false;
    },
    cafesLoading(state, action) {
      state.loading = true;
    },
  },
});

export const { cafesDelete, cafesError, cafesLoad, cafesLoaded, cafesLoading } =
  cafesSlice.actions;

export default cafesSlice.reducer;

export const fetchCafes =
  (location = "") =>
  async (dispatch) => {
    let url = `${process.env.REACT_APP_API_URL_DEV}/cafes`;
    if (location !== "") {
      url += `?location=${location}`;
    }
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch(cafesLoad(res.data));
        dispatch(cafesLoaded());
      })
      .catch((err) => {
        console.log(err);
        dispatch(cafesError());
        dispatch(cafesLoaded());
      });
  };
