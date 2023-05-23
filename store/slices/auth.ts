import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../endpoints/auth';
import { User } from '@/types/api/auth';
import AuthTokenStorage from '@/service/AuthTokenStorage';
import { isRequestFailed } from '@/service/utils';

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
            AuthTokenStorage.clearToken();
            state.user = null;
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

export const login = createAsyncThunk(
    'auth/login',
    async (authPayload: { email: string; password: string }, { dispatch }) => {
        const result = await dispatch(
            authApi.endpoints.authenticationToken.initiate(authPayload)
        );
        if (isRequestFailed(result)) {
            return result;
        }
        AuthTokenStorage.setToken(result.data);
        // const getUserResponse = await dispatch(
        //     authApi.endpoints.getCurrentUser.initiate(undefined, {
        //         forceRefetch: true,
        //     })
        // );
        // return getUserResponse.isSuccess;
        return false;
    }
);
