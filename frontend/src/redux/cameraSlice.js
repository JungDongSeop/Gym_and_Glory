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


// 새로고침해도 카메라 안켜지게
// 하려면 npm 설치받을 것

// import { createSlice } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const initialState = {
//   on: true
// };

// const cameraSlice = createSlice({
//   name: 'camera',
//   initialState,
//   reducers: {
//     toggleCamera: state => {
//       state.on = !state.on;
//     }
//   }
// });

// export const { toggleCamera } = cameraSlice.actions;

// const persistConfig = {
//   key: 'camera',
//   storage
// };

// export default persistReducer(persistConfig, cameraSlice.reducer);

