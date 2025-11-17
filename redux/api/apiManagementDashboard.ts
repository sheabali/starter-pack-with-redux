/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getMeta: builder.query({
      query: () => ({
        url: "/meta",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetMetaQuery } = dashboardApi;
