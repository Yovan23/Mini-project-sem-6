import React ,{useState,useEffect} from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import axios from 'axios';
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetMedicinesQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const {  isLoading } =  useGetMedicinesQuery();
  const [data, setData] = useState([]);
  const fun = async () => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from storage
    
    try {
      const response = await axios.get('http://localhost:5000/api/auth/medicineFind', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setData(response.data);
      // console.log("hey.......");
      // console.log(response.data);
    } catch (error) {
      throw new Error('hereistheerro'); // Throw an error if the request fails
    }
  }
  

  useEffect(()=>{
    fun();
  },[])

  const columns = [
    {
      field: "medicineId",
      headerName: "Medicine ID",
      flex: 1,
    },
    {
      field: "medicineName",
      headerName: "Medicne Name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "category",
      flex: 1,
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          // value={data && data.totalCustomers}
          value={"10"}
          increase="+10%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          // value={data && data.todayStats.totalSales}
          value={"10"}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sales"
          // value={data && data.thisMonthStats.totalSales}
          value={"10"}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          // value={data && data.yearlySalesTotal}
          value={"10"}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* //ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
            rows={(data) || []}
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
