import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:1997'}),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: res => res.sort((a,b) => b.id - a.id),
            providesTags: ['Posts']
        }),
        addPost:  builder.mutation({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Posts']
        }),
        deletePost: builder.mutation({
            query: ({id}) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Posts']
        })
    })
})

export const {
    useGetPostsQuery, 
    useAddPostMutation,
    useDeletePostMutation } = apiSlice