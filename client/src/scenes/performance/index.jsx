
import React, { useState,useEffect } from 'react';
import { Box, useTheme,Typography } from '@mui/material'; 
import { useGetBillsQuery } from 'state/api';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import CustomColumnMenu from 'components/DataGridCustomColumnMenu';
import MenuItem from '@mui/material/MenuItem'; 
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import {   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
const CustomDropdownMenu = ({ medicines, anchorEl, anchorPosition, open, onClose }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorPosition={anchorPosition}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <div>
        {medicines.map((medicine, index) => (
          <MenuItem key={index} value={medicine.medicineName}>
            {`${medicine.medicineName} (Qty: ${medicine.quantity})`}
          </MenuItem>
        ))}
      </div>
    </Popover>
  );
};

const Performance = () => {
  const {  isLoading } = useGetBillsQuery();
  const [medicinesData, setMedicinesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const theme = useTheme();
  const [data, setData] = useState([]);
  // const userId = useSelector((state) => state.global.userId);
  
  const fun = async () => {
    const token = localStorage.getItem('token'); 
    
    try {
      const response = await axios.get('http://localhost:5000/api/auth/billFind', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setData(response.data);
    } catch (error) {
      throw new Error('hereistheerro'); // Throw an error if the request fails
    }
  }
  
  useEffect(() => {
    if (data) {
      const medicinesMap = new Map();
      const categoriesMap = new Map();
      data.forEach(bill => {
        bill.medicines.forEach(medicine => {
          const { medicineName, category, quantity } = medicine;
          if (medicinesMap.has(medicineName)) {
            const existingQuantity = medicinesMap.get(medicineName);
            medicinesMap.set(medicineName, existingQuantity + quantity);
          } else {
            medicinesMap.set(medicineName, quantity);
          }
          if (categoriesMap.has(category)) {
            const existingQuantity = categoriesMap.get(category);
            categoriesMap.set(category, existingQuantity + quantity);
          } else {
            categoriesMap.set(category, quantity);
          }
        });
      });
      const medicinesArray = Array.from(medicinesMap.entries()).map(([medicineName, quantity]) => ({
        name: medicineName,
        quantity
      }));
      const categoriesArray = Array.from(categoriesMap.entries()).map(([category, quantity]) => ({
        name: category,
        quantity
      }));
      setMedicinesData(medicinesArray);
      setCategoriesData(categoriesArray);
    }
  }, [data]);  
  useEffect(()=>{
    fun();
  },[]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 }); // State to track position

  const handleCellClick = (params, event) => {
    setSelectedRow(params.row);
    setAnchorPosition({
      top: event.currentTarget.offsetTop + event.currentTarget.offsetHeight,
      left: event.currentTarget.offsetLeft,
    });
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setSelectedRow(null);
    setAnchorEl(null);
  };

  const columns = [
    {
      field: "billId",
      headerName: "Bill ID",
      flex: .5,
    },
    {
      field: "customerName",
      headerName: "customer Name",
      flex: .5,
    },
    {
      field: "phoneNo",
      headerName: "phone No.",
      flex: 1,

    },
    {
      field: "totalAmount",
      headerName: "Amount",
      flex: 0.5,
      renderCell: (params) => `Rs.${Number(params.value).toFixed(2)}`,
    },
    {
      field: 'medicines',
      headerName: 'Medicines',
      flex: 1,
      renderCell: (params) => (
        <Button onClick={(event) => handleCellClick(params, event)} sx={{ color: 'white' }}>
          View Medicines
        </Button>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      valueGetter: (params) => {
        const createdAt = new Date(params.value);
        const date = createdAt.toLocaleDateString();
        const time = createdAt.toLocaleTimeString();
        return `D: ${date} ||T: ${time}`;
      },
    },
    
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales Performance Here"
      />
          
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
          // rows={(data) || []}
          rows={(data || []).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
        {anchorEl && (
          <CustomDropdownMenu
            medicines={selectedRow ? selectedRow.medicines : []}
            anchorEl={anchorEl}
            anchorPosition={anchorPosition} 
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          />
        )}
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box mt="20px" width="45%">
          <Typography variant="h6">Medicine Quantities</Typography>
          <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.default, color: 'white' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Medicine Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicinesData
                  .slice()
                  .sort((a, b) => b.quantity - a.quantity)
                  .map((medicine, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {medicine.name}
                      </TableCell>
                      <TableCell align="right">{medicine.quantity}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box mt="20px" width="45%">
          <Typography variant="h6">Category Quantities</Typography>
          <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.default, color: 'white' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoriesData
                  .slice()
                  .sort((a, b) => b.quantity - a.quantity)
                  .map((category, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {category.name}
                      </TableCell>
                      <TableCell align="right">{category.quantity}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

</Box>
  );
};

export default Performance;

