import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    event: {
        search_text: "", status: "", per_page: 10, page: 1
    },
};

const cacheKeySlice = createSlice({
    name: 'cacheKey',
    initialState,
    reducers: {
        updateCacheKey(state, action) {
            const { key, payload } = action.payload;
            state[key] = {
                ...state[key],
                ...payload,
            };
        }
    }
});

export const { updateCacheKey } = cacheKeySlice.actions;
export default cacheKeySlice.reducer;
