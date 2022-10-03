import { createSlice } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    cameraImage: 0,
    image: 0,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload;
    },
    resetCameraImage: (state) => {
      state.cameraImage = null;
    },
  },
});

export const { setCameraImage, resetCameraImage, setImage } =
  cameraSlice.actions;

export const selectCameraImage = (state) => state.camera.cameraImage;

export default cameraSlice.reducer;
