import { apiSlice } from "./apiSlice";
const FORUMS_URL = "/api/forums";

export const forumsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createForum: builder.mutation({
      query: (data) => ({
        url: `${FORUMS_URL}/create-forum`,
        method: "POST",
        body: data,
      }),
    }),
    getForums: builder.mutation({
      query: (data) => ({
        url: `${FORUMS_URL}?skip=${data.skip}&title=${data.title}`,
        method: "GET",
      }),
    }),
    getForum: builder.mutation({
      query: (data) => ({
        url: `${FORUMS_URL}/forum/${data.id}?skip=${data.skip}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateForumMutation, useGetForumsMutation, useGetForumMutation } = forumsApiSlice;