import React from "react";
import { useEffect, useState } from 'react';
import { Box, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useGetOwnersQuery, useOwnerDeleteMutation, useOwnerUpdateMutation } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import axios from "axios";
import { Snackbar } from "@mui/material";


const Owner = () => {
  const theme = useTheme();
  const [validationErrors, setValidationErrors] = useState({});
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [newOwnerData, setNewOwnerData] = useState({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [, setUpdateSuccess] = useState(false);
  const [{ isLoading: isDeleting }] = useOwnerDeleteMutation();
  const {  isLoading, refetch } = useGetOwnersQuery();
  const [data, setData] = useState([]);
  const [ownerUpdate] = useOwnerUpdateMutation();
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };
  useEffect(() => {
    const fetchDataToUpdate = async () => {
      try {
        if (updateData && updateData._id) {
          await axios.put(`http://localhost:5000/api/auth/ownerUpdate/${updateData._id}`, updateData);
          setUpdateSuccess(true); 
          setTimeout(() => setUpdateSuccess(false), 2000);
        }
      } catch (error) {
        console.error("Error fetching data for update:", error);
      }
    };

    if (isUpdateDialogOpen) {
      fetchDataToUpdate();
    }
    fun();
  }, [isUpdateDialogOpen, updateData]);

  const fun = async () => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from storage
    
    try {
      const response = await axios.get('http://localhost:5000/api/auth/ownerFind', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setData(response.data);
    } catch (error) {
      throw new Error('hereistheerro'); // Throw an error if the request fails
    }
  }
  

  useEffect(()=>{
    fun();
  },[])
  const handleUpdate = async (rowData) => {
    setIsUpdateDialogOpen(true);
    setUpdateData(rowData); 
  };
  const handleInputChange = async (e, field) => {
    const updatedValue = e.target.value;
    setUpdateData((prevData) => ({
      ...prevData,
      [field]: updatedValue,
    }));
  };
  const handleCloseUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
    setUpdateData({});
  };
  const handleFormSubmit = async (updateData) => {
    try {
      const errors = {};

      if (!updateData.username || updateData.username.length < 5) {
        errors.username = 'Username must be at least 5 characters long.';
      }

      if (!updateData.email || !/\S+@\S+\.\S+/.test(updateData.email)) {
        errors.email = 'Please enter a valid email address.';
      }

      if (!updateData.phoneNo || !/^\d{10}$/.test(updateData.phoneNo)) {
        errors.phoneNo = 'Please enter a valid 10-digit phone number.';
      }

      if (!updateData.cityName) {
        errors.cityName = 'Please enter a city name.';
      }

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      console.log(updateData._id);
      await ownerUpdate({ id: updateData._id, ...updateData });
      console.log("Successfully updated the owner data:", updateData);
      fun();
      showSnackbar("Update successful");
      const updatedOwners = data.map(owner => {
        if (owner._id === updateData._id) {
          return { ...owner, AdminsNoOf: updateData.AdminsNoOf };
        }
        return owner;
      });
      fun(updatedOwners);
    } catch (error) {
      console.error("Error updating owner data:", error);
    }
    handleCloseUpdateDialog(); 
  };



  const handleDelete = async (rowData) => {
    const confirmed = window.confirm("Are you sure you want to delete this owner?");
    if (!confirmed) return;

    try {
      console.log(rowData);
      await axios.delete(`http://localhost:5000/api/auth/ownerDelete/${rowData._id}`);
      fun();
      showSnackbar("Delete successful");
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };
  const handleAddInputChange = (e, field) => {
    const updatedValue = e.target.value;
    setNewOwnerData((prevData) => ({
      ...prevData,
      [field]: updatedValue,
    }));
  };
  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    setNewOwnerData({});
  };
  const handleAddFormSubmit = async () => {
    try {
      const errors = {};
      const requiredFields = ['password', 'email', 'phoneNo',  'cityName', 'ownerId','username'];
  
      requiredFields.forEach(field => {
        if (!newOwnerData[field]) {
          errors[field] = `Please provide ${field}.`;
        }
      });
      if ( newOwnerData.username.length < 5) {
        errors.usernamea = 'Username must be at least 5 characters long.';
      }

      if ( !/\S+@\S+\.\S+/.test(newOwnerData.email)) {
        errors.emaila = 'Please enter a valid email address.';
      }

      if ( !/^\d{10}$/.test(newOwnerData.phoneNo)) {
        errors.phoneNoa = 'Please enter a valid 10-digit phone number.';
      }
      if ( newOwnerData.password.length < 5) {
        errors.passworda = 'Password must be at least 5 characters long.';
      }

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
      const response = await axios.post('http://localhost:5000/api/auth/ownerAdd', newOwnerData);
      if (response.status === 201) {
        fun();
        showSnackbar("Owner added successfully");
        handleCloseAddDialog();
      } else {
        console.error("Error adding Owner:", response.data);
        showSnackbar("Error adding Owner. Please try again.");
      }
    } catch (error) {
      console.error("Error adding Owner:", error);
      showSnackbar("Error adding Owner. Please try again.");
     }
  };
  const columns = [
    {
      field: "ownerId",
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
      field: "AdminsNoOf",
      headerName: "No Admin",
      flex: .4,
    },
    {
      field: "role",
      headerName: "",
      flex: .7,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDelete(params.row)}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleUpdate(params.row)}>
              Update
            </Button>
          </Box>
        );
      },
    },
  ];
  const addOwner = () => {
    setIsAddDialogOpen(true);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="OWNER" subtitle="Managing owner and list of owners" />
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
         <Button
          variant="contained"
          color="primary"
          onClick={addOwner}
          sx={{
            position: "absolute",
            top: "120px",
            right: "70px",
          }}
        >
         + Add Owner
        </Button>
      </Box>
      <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog} sx={{ padding: '20px' }}>
        <DialogTitle>Add Owner</DialogTitle>
        <DialogContent>
        <TextField
            label="Id"
            value={newOwnerData.ownerId || ''}
            onChange={(e) => handleAddInputChange(e, 'ownerId')}
            error={!!validationErrors.OwnerId}
            helperText={validationErrors.OwnerId}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            value={newOwnerData.username || ''}
            onChange={(e) => handleAddInputChange(e, 'username')}
            error={!!validationErrors.usernamea}
            helperText={validationErrors.usernamea}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            value={newOwnerData.email || ''}
            onChange={(e) => handleAddInputChange(e, 'email')}
            error={!!validationErrors.emaila}
            helperText={validationErrors.emaila}
            fullWidth
            margin="normal"
          />
            <TextField
            label="Phone No"
            name="phoneNo"
            value={newOwnerData.phoneNo || ''}
            onChange={(e) => handleAddInputChange(e, 'phoneNo')}
            error={!!validationErrors.phoneNoa}
            helperText={validationErrors.phoneNoa}
            fullWidth
            margin="normal"
          />
        
          <TextField
            label="cityName"
            name="cityName"
            value={newOwnerData.cityName || ''}
            onChange={(e) => handleAddInputChange(e, 'cityName')}
            error={!!validationErrors.cityNamea}
            helperText={validationErrors.cityNamea}
            fullWidth
            margin="normal"
          />
          
          <TextField
            label="password"
            name="password"
            value={newOwnerData.password || ''}
            onChange={(e) => handleAddInputChange(e, 'password')}
            error={!!validationErrors.passworda}
            helperText={validationErrors.passworda}
            fullWidth
            margin="normal"
          />
   
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddFormSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog} sx={{ padding: '20px' }}>
        <DialogTitle>Update Owner</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={updateData.username || ''}
            onChange={(e) => handleInputChange(e, 'username')}
            error={!!validationErrors.username}
            helperText={validationErrors.username}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            value={updateData.email || ''}
            onChange={(e) => handleInputChange(e, 'email')}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNo"
            value={updateData.phoneNo || ''}
            onChange={(e) => handleInputChange(e, 'phoneNo')}
            error={!!validationErrors.phoneNo}
            helperText={validationErrors.phoneNo}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="cityName"
            value={updateData.cityName || ''}
            onChange={(e) => handleInputChange(e, 'cityName')}
            error={!!validationErrors.cityName}
            helperText={validationErrors.cityName}
            fullWidth
            margin="normal"
          />
       

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary" sx={{ color: '#ED2939' }}>
            Cancel
          </Button>
          <Button onClick={() => handleFormSubmit(updateData)} color="primary" sx={{ color: '#00FF00' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isSnackbarOpen}
        message={snackbarMessage}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setIsSnackbarOpen(false)}
      />
    </Box>
  );
};

export default Owner;
