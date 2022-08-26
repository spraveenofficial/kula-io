import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRepos = createAsyncThunk("repos/fetchRepos", async (payload) => {
    const { topic,
        location, page, sort } = payload;
    const { data } = await axios.get(`https://api.github.com/search/users?q=type:user+language:${topic}+location:${location}&sort=${sort}&page=${page}&per_page=10`);
    return data;
}
);


export const reposSlice = createSlice({
    name: "repos",
    initialState: {
        repos: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        setRepos: (state, action) => {
            state.repos = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRepos.pending, (state, action) => {
            state.repos = [];
            state.loading = true;
        }),
            builder.addCase(fetchRepos.fulfilled, (state, action) => {
                state.repos = action.payload;
                state.loading = false;
                state.success = true;
            }),
            builder.addCase(fetchRepos.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    },
})

export default reposSlice.reducer;