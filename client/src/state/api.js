import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth/" }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Customers",
    "Medicines",
    "Bills",
    "Geography",
    "Sales",
    "Admins",
    "Owners",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
  
    
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    adminAdd: build.mutation({
      query: () => ({
          url: "adminAdd",
          method: 'POST',
      }),
      providesTags: ["Admins"],
  }),
    getAdmins: build.query({
      query: () => "adminFind",
      providesTags: ["Admins"],
    }),
    adminDelete: build.mutation({
      query: (id) => ({
        url: `adminDelete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admins'], 
    }),
    adminUpdate: build.mutation({
      query: (id) => ({
          url: `adminUpdate/${id}`,
          method: 'PUT',
      }),
      // providesTags: ['Admins'],
  }),  
  getOwners: build.query({
    query: () => "ownerFind",
    providesTags: ["Owners"],
  }),
  ownerDelete: build.mutation({
    query: (id) => ({
      url: `ownerDelete/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['Owners'], 
  }),
  ownerUpdate: build.mutation({
    query: (id) => ({
        url: `ownerUpdate/${id}`,
        method: 'PUT',
    }),
}),  
getBills: build.query({
  query: () => "billFind",
  providesTags: ["Bills"],
}),
    getMedicines: build.query({
      query: () => "medicineFind",
      providesTags: ["Medicines"],
    }),
    medicineDelete: build.mutation({
      query: (id) => ({
        url: `medicineDelete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Medicines'], 
    }),
    medicineUpdate: build.mutation({
      query: (id) =>({
        url: `medicineUpdate/${id}`,
        method: 'PUT',
    }),
  }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useAdminAddMutation,
  useGetAdminsQuery,
  useAdminDeleteMutation,
  useAdminUpdateMutation,
  useGetBillsQuery,
  useGetOwnersQuery,
  useOwnerDeleteMutation,
  useOwnerUpdateMutation,
  useMedicineDeleteMutation,
  useMedicineUpdateMutation,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useGetMedicinesQuery,
} = api;