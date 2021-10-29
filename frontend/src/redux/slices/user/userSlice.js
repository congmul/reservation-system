import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstName: "",
        points:0,
        totalNights: 0
    },
    reducers: {
        setFirstName: (state, {payload}) => { state.firstName = payload },
        setPoints: (state, {payload}) => { state.points = payload },
        setTotalNights: (state, {payload}) => { state.totalNights = payload }
    }
})

export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;