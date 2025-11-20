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

    updateUser: builder.mutation({
      query: (data: any) => ({
        url: `/user/update-admin`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (coupleId: string) => ({
        url: `/user/hard-delete/${coupleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getAllSubscription: builder.query({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateSubscription: builder.mutation({
      query: (data: any) => ({
        url: `/subscription/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
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
      providesTags: ["User"],
    }),
    authChangePassword: builder.mutation({
      query: (data: any) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    securityPolicy: builder.query({
      query: () => ({
        url: "/security",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    createSecurityPolicy: builder.mutation({
      query: (data: any) => ({
        url: "/security",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateSecurityPolicy: builder.mutation({
      query: (data: any) => ({
        url: `/security/${data.type}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getAllFAQ: builder.query({
      query: () => ({
        url: "/faq",
      }),
      providesTags: ["User"],
    }),
    createFAQ: builder.mutation({
      query: (data: any) => ({
        url: "/faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateFAQ: builder.mutation({
      query: (data: any) => {
        const id = data.id;
        const payload = {
          title: data.title,
          description: data.description,
        };

        return {
          url: `/faq/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["User"],
    }),

    deleteFAQ: builder.mutation({
      query: (id: string) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMetaQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSecurityPolicyQuery,
  useGetAllSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useGetAllTransactionLogQuery,
  useAuthChangePasswordMutation,
  useCreateSecurityPolicyMutation,
  useUpdateSecurityPolicyMutation,
  useGetAllFAQQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = dashboardApi;
