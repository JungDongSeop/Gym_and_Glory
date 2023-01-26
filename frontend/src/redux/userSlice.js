import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pk: 2,
  nickname: '동섬'
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
    }
  }
});

export const { setUserPK, setUserNickname } = userSlice.actions;

export default userSlice.reducer;
