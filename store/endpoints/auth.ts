import { User } from '@/types/api/auth';
import { api } from '../api';

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCurrentUser: build.query<User, void>({
            query: () => '/currentUser',
        }),
        login: build.mutation<string, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: {
                    email,
                    password,
                },
            }),
            transformResponse: (response: { token: string }) => response.token,
        }),
        register: build.mutation<
            any,
            { email: string; password: string; name: string }
        >({
            query: ({ email, password, name }) => ({
                url: '/register',
                method: 'POST',
                body: {
                    email,
                    password,
                    name,
                },
            }),
        }),
    }),
});

export const { useGetCurrentUserQuery, useRegisterMutation } = authApi;
