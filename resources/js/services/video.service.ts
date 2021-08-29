// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


// Define a service using a base URL and expected endpoints
export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/videos" }),
  endpoints: (build) => ({
    index: build.query<any , any>({
      query(body) {
        return {
          url: ``,
          method: "GET",
          // body
        }
      }
    }),
    create: build.mutation<any , any>({
      query(body) {
        return {
          url: ``,
          method: "POST",
          body
        }
      }
    }),
    update: build.mutation<any , any>({
      query(body) {
        return {
          url: `/${body.id}`,
          method: "PUT",
          body
        }
      }
    }),
    find: build.query<any , any>({
      query(body) {
        return {
          url: `/${body.id}`,
          method: "GET",
        }
      }
    }),
    destroy: build.mutation<any , any>({
      query(body) {
        return {
          url: `/${body.id}`,
          method: "DELETE",
        }
      }
    }),
    updatePost: build.mutation<any, Partial<any> & Pick<any, 'id'>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ id, ...patch }) => ({
        url: `${id}`,
        method: 'PATCH',
        body: patch,
      }),

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: any }) => response.data,
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useIndexQuery, useCreateMutation } = videoApi
