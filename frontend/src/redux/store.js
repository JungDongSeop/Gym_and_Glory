import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cameraReducer from './cameraSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    camera: cameraReducer
  },
});

export default store;
