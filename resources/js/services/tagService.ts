// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"



// Define a service using a base URL and expected endpoints
export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getTags: builder.query<any, string>({
      query: () => `tags`,
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTagsQuery } = tagApi
