import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const fetchRepos = createAsyncThunk("repos/fetchRepos", async (technology, { dispatch }) => {
    const api = createApi({
        name: "repos",
        reducerPath: "repos",
        baseQuery: fetchBaseQuery({
            baseUrl: "https://api.github.com/search/users?q=type:user+language:${technology}+location:Bangalore",
        }),
        endpoints: (builder) => ({
            getRepos: builder.query({
                query: (id) => `/${id}`
            })
        })
    })
    return api.endpoints.getRepos.select(technology);
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
            // fetch repos

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRepos.pending, (state, action) => {
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

// export const { setRepos } = reposSlice.actions;

export default reposSlice.reducer;