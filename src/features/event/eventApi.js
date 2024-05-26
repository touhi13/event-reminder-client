import { apiSlice } from '../api/apiSlice';

export const eventsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: (params) => ({
                url: '/api/v1/event',
                params
            }),
        }),
        getEvent: builder.query({
            query: (id) => `/api/v1/event/${id}`,
        }),

        addEvent: builder.mutation({
            query: ({ newEvent }) => ({
                url: '/api/v1/event',
                method: 'POST',
                body: newEvent
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Pessimistic cache update
                try {
                    const { data: newEvent } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getEvents', arg.cacheKey,
                            (draft) => {

                                draft.data.data.unshift(newEvent.data);

                            }
                        )
                    );
                } catch (error) {
                    console.error('Error updating query data:', error);
                }
            },
        }),
        updateEvent: builder.mutation({
            query: ({ id, updatedEvent }) => ({
                url: `/api/v1/event/${id}`,
                method: 'PUT',
                body: updatedEvent
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Pessimistic cache update
                try {
                    const { data: updatedData } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getEvents', arg.cacheKey,

                            (draft) => {
                                const index = draft.data.data.findIndex(
                                    (event) => event.id == arg.id
                                );
                                draft.data.data[index] = updatedData.data;
                            }
                        )
                    );
                } catch (error) {
                    console.error('Error updating query data:', error);
                }
            },
        }),
        importEvents: builder.mutation({
            query: ({ formData }) => ({
                url: '/api/v1/event/import',
                method: 'POST',
                body: formData
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Pessimistic cache update
                try {
                    const { data: newEvents } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getEvents', arg.cacheKey,
                            (draft) => {
                                draft.data.data = [...draft.data.data, ...newEvents.data];

                            }
                        )
                    );
                } catch (error) {
                    console.error('Error updating query data:', error);
                }
            },
        }),

        deleteEvent: builder.mutation({
            query: ({ id }) => ({
                url: `/api/v1/event/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Optimistic cache update
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getEvents', arg.cacheKey,
                        (draft) => {
                            const index = draft.data.data.findIndex(
                                (event) => event.id == arg.id
                            );
                            if (index !== -1) {
                                draft.data.data.splice(index, 1);

                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),

        updateStatus: builder.mutation({
            query: ({ id }) => ({
                url: `/api/v1/event/update-status/${id}`,
                method: 'PUT',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Optimistic cache update
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getEvents', arg.cacheKey,
                        (draft) => {
                            const index = draft.data.data.findIndex(
                                (event) => event.id == arg.id
                            );
                            if (index !== -1) {
                                draft.data.data[index].completed = 1;


                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),

    }),
});

export const {
    useAddEventMutation,
    useDeleteEventMutation,
    useImportEventsMutation,
    useGetEventQuery,
    useGetEventsQuery,
    useUpdateStatusMutation,
    useUpdateEventMutation
} = eventsApi;
