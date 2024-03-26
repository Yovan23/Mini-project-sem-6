import React from "react";
import { useEffect, useState } from 'react';
import { Box, useTheme} from "@mui/material";
import { useGetAdminsQuery, useAdminDeleteMutation, useAdminUpdateMutation } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import axios from "axios";



const Adminno = () => {
  const theme = useTheme();
  const [updateData, setUpdateData] = useState({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // eslint-disable-next-line
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { data, isLoading, refetch } = useGetAdminsQuery();
  const [{ isLoading: isDeleting }] = useAdminDeleteMutation();
  const [adminUpdate] = useAdminUpdateMutation();
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };

  const columns = [
    {
      field: "adminId",
      headerName: "ID",
      flex: .5,
    },
    {
      field: "username",
      headerName: "Name",
      flex: .5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: .5,
    },
    {
      field: "phoneNo",
      headerName: "Phone Number",
      flex: .5,
    },
    {
      field: "cityName",
      headerName: "City",
      flex: .5,
    },
    {
      field: "location",
      headerName: "Location",
      flex: .5,
    },
    {
      field: "owner",
      headerName: "Owner Name",
      flex: .5,
    },
   
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      
      </Box>
      
     
   
    </Box>
  );
};

export default Adminno;
