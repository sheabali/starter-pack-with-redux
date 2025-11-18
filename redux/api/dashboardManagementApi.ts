/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

interface GetAllUsersParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getMeta: builder.query({
      query: () => ({
        url: "/meta",
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: (params: GetAllUsersParams = {}) => {
        // Build query string from params
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.searchTerm)
          queryParams.append("searchTerm", params.searchTerm);
        if (params.status && params.status !== "All Status") {
          queryParams.append("status", params.status);
        }

        const queryString = queryParams.toString();
        return {
          url: `/user${queryString ? `?${queryString}` : ""}`,
        };
      },
      providesTags: ["User"],
    }),

    // Add delete mutation
    deleteUser: builder.mutation({
      query: (coupleId: string) => ({
        url: `/user/${coupleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getAllSubscription: builder.query({
      query: () => ({
        url: "/subscription",
      }),
    }),
    updateSubscription: builder.mutation({
      query: (data: any) => ({
        url: `/subscription/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getAllTransactionLog: builder.query({
      query: ({ page, limit, status }: any) => {
        const params: any = {};

        if (page) params.page = page;
        if (limit) params.limit = limit;
        if (status) params.status = status;

        return {
          url: "/payment/admin",
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const {
  useGetMetaQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetAllSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useGetAllTransactionLogQuery,
} = dashboardApi;
