import { User } from '@/types/api/auth';
import { api } from '../api';

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCurrentUser: build.query<User, void>({
            query: () => '/current-user',
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

export const { useGetCurrentUserQuery, useRegisterMutation, useLoginMutation } =
    authApi;
