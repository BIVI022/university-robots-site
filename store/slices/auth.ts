import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../endpoints/auth';
import { User } from '@/types/api/auth';

const initialState: {
    user: User | null;
} = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null; // TODO delete from db
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.getCurrentUser.matchFulfilled,
            (state, { payload }) => {
                state.user = payload;
            }
        );
    },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
