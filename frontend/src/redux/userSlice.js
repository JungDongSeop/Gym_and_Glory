import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pk: 3,
  nickname: '동섬',
  isAdmin: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPK: (state, action) => {
      state.pk = action.payload;
    },
    setUserNickname: (state, action) => {
      state.nickname = action.payload.nickname;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload.isAdmin;
    }
  }
});

export const { setUserPK, setUserNickname, setIsAdmin } = userSlice.actions;

export default userSlice.reducer;
