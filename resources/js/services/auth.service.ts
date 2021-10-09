// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import ILoginData from "../contracts/Data/ILoginData"

interface IAuthData {
  token: string,
  user: any
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/login" }),
  tagTypes: ["IAuthData"],
  endpoints: (build) => ({
    login: build.mutation<IAuthData, Partial<ILoginData>>({
      query(body) {
        return {
          url: ``,
          method: "POST",
          body
        }
      },
      invalidatesTags: [{ type: "IAuthData", id: "LIST" }]
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = authApi
