import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const reposApi = createApi({
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

export const { useGetReposQuery } = reposApi