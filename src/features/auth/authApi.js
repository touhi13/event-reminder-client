import { apiSlice } from '../api/apiSlice';
import { userLoggedIn, userLoggedOut } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/api/v1/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/api/v1/login',
        method: 'POST',
        body: data,

      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          if (response.data.status === 'success' && response.data.data) {

            console.log(response.data.data.token, 2);

            localStorage.setItem(
              'auth',
              JSON.stringify({
                accessToken: response.data.data.token,
                user: response.data.data.user,
              })
            );
            dispatch(
              userLoggedIn({
                accessToken: response.data.data.token,
                user: response.data.data.user,
              })
            );
          } else {
            // Handle API error or unexpected response
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/api/v1/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          if (result.data.status === 'success') {
            console.log(result);
            localStorage.removeItem('auth');
            dispatch(userLoggedOut());
          } else {
            // Handle API error or unexpected response
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),

  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;