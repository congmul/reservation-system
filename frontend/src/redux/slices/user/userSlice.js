import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstName: "init",
        points:0,
        totalNights: 0
    },
    reducers: {
        setFirstName: (state, {payload}) => { state.firstName = payload },
        setPoints: (state, {payload}) => { state.points = payload },
        setTotalNights: (state, {payload}) => { state.totalNights = payload }
    }
})

export const { setFirstName, setPoints, setTotalNights } = userSlice.actions;

export default userSlice.reducer;