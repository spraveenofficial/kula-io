import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const reposApi = createApi({
    name: "repos",
    reducerPath: "repos",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.github.com/search/users",
    }),
    endpoints: (builder) => ({
        getRepos: builder.query({
            query: ({ topic,
                location, page, sort }) => `?q=type:user+language:${topic}+location:${location}&sort=${sort}&page=${page}&per_page=10`,
        }),
        providesTags: (result) =>
            result
                ? [
                    ...result.data.map(({ id }) => ({
                        type: "Posts",
                        id,
                    })),
                ]
                : [{ type: "Posts", id: "LIST" }],
    }),
})

export const { useGetReposQuery } = reposApi

export const useGetLazyReposQuery = reposApi.endpoints.getRepos.useLazyQuery