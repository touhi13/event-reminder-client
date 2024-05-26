import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { VITE_REACT_APP_API_URL } = import.meta.env;

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${VITE_REACT_APP_API_URL}`,
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const token = getState()?.auth?.accessToken;
            // console.log(token)
            if (token) {
                headers.set("Authorization", `bearer ${token}`)

            }
            headers.set("Accept", 'application/json')
            return headers;
        }
    }),
    tagTypes: [],
    endpoints: (builder) => ({}),
})
