import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetOrderQuery } from 'state/api';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import CustomColumnMenu from 'components/DataGridCustomColumnMenu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';

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

const OrderPage = () => {
  const { isLoading } = useGetOrderQuery();
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 }); 

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/auth/findOrder', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { orders } = response.data;
        if (orders.length > 0) {
          const formattedData = orders.map(order => ({
            id: order._id,
            userName: order.Username,
            ownerName: order.ownerName,
            superAdminStatus: order.superAdminStatus,
            ownerStatus: order.ownerStatus,
            totalAmount: order.totalAmount,
            orderItems: order.orderItems,
          }));
          setData(formattedData);
        } else {
          console.log('No orders found');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchData();
  }, []);
  const handleApprove = async (orderId) => {
    try {
      console.log('hey');
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/auth/updateOrder/${orderId}`, {
        ownerStatus: 'Approved',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the local state to reflect the change
      const updatedData = data.map(order => {
        if (order.id === orderId) {
          return { ...order, ownerStatus: 'Approve' };
        }
        return order;
      });
      setData(updatedData);
      console.log(updatedData);
    } catch (error) {
      console.error('Error approving order:', error);
    }
  };
    
  const handleDeny = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/auth/deleteOrder/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(prevData => prevData.filter(order => order.id !== orderId));
      console.log('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  const handleShipping = async (orderId) => {
    try {
    console.log('hey');
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/auth/updateOrder/${orderId}`, {
      superAdminStatus: 'Shipping',
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedData = data.map(order => {
      if (order.id === orderId) {
        return { ...order, superAdminStatus: 'Shipping' };
      }
      return order;
    });
    setData(updatedData);
    console.log(updatedData);
  } catch (error) {
    console.error('Error approving order:', error);
  }
  };
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

  const role = localStorage.getItem('role');
  const columns = [
    {
      field: 'userName',
      headerName: 'Bill ID',
      flex: 0.4,
    },
    {
      field: 'ownerName',
      headerName: 'ownerName',
      flex: 0.5,
    },
    {
      field: 'superAdminStatus',
      headerName: 'superAdminStatus ',
      flex: 0.5,
    },
    {
      field: 'ownerStatus',
      headerName: 'ownerStatus ',
      flex: 0.5,
    },
    {
      field: 'totalAmount',
      headerName: 'Amount',
      flex: 0.5,
      renderCell: (params) => `Rs.${Number(params.value).toFixed(2)}`,
    },
    {
      field: 'orderItems',
      headerName: 'orderItems',
      flex: .5,
      renderCell: (params) => (
        <Button onClick={(event) => handleCellClick(params, event)} sx={{ color: 'white' }}>
          View Medicines
        </Button>
      ),
    },
   
  ];
  if (role === 'owner') {
    columns.push({
      field: 'actions',
      headerName: 'Actions',
      flex: .7,
      renderCell: (params) => (
        <Box>
          <Button variant="contained" color="primary" onClick={() => handleApprove(params.row.id)}>Approve</Button>
          <Button variant="contained" color="secondary" onClick={() => handleDeny(params.row.id)}>Deny</Button>
        </Box>
      ),
    });
  }
  if (role === 'superAdmin') {
    columns.push({
      field: 'actions',
      headerName: 'Shipping',
      flex: 0.5,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleShipping(params.row.id)}>Shipping</Button>
      ),
    });
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="OrderPage" subtitle="Track your Affiliate Sales OrderPage Here" />

      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          rows={data || []}
  columns={columns}
  getRowId={(row) => row.id}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
        {anchorEl && (
          <CustomDropdownMenu
            medicines={selectedRow ? selectedRow.orderItems : []}
            anchorEl={anchorEl}
            anchorPosition={anchorPosition}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          />
        )}
      </Box>
 
    </Box>
  );
};
export default OrderPage;
