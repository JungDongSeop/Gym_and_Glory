import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  on: true
};

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    toggleCamera: state => {
      state.on = !state.on;
    }
  }
});

export const { toggleCamera } = cameraSlice.actions;

export default cameraSlice.reducer;
