import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AuthTokenStorage from '../service/AuthTokenStorage';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, api) => {
            if (api.endpoint !== 'authenticationToken') {
                if (headers.get('authorization') !== '') {
                    headers.set(
                        'authorization',
                        `Bearer ${AuthTokenStorage.getToken() ?? ''}`
                    );
                }
            }
        },
    }),

    tagTypes: [],
    endpoints: () => ({}),
});
