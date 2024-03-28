import React from "react";
import { useEffect, useState } from 'react';
import { Box, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useGetAdminsQuery, useAdminDeleteMutation, useAdminUpdateMutation  } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import axios from "axios";
import { Snackbar } from "@mui/material";

//  const Admin = ({ loggedInOwner }) => { //243 , 279
const Admin = () => {

   const theme = useTheme();
  const [validationErrors, setValidationErrors] = useState({});
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [newAdminData, setNewAdminData] = useState({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // eslint-disable-next-line
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const {  isLoading } = useGetAdminsQuery();
  const [data, setData] = useState([]);
  const [{ isLoading: isDeleting }] = useAdminDeleteMutation();
  const [adminUpdate] = useAdminUpdateMutation();
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };
  // console.log(data);

  useEffect(() => {
    const fetchDataToUpdate = async () => {
      try {
        if (updateData && updateData._id) {
          await axios.put(`http://localhost:5000/api/auth/adminUpdate/${updateData._id}`, updateData);
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
  }, [isUpdateDialogOpen, updateData]);

  const fun = async () => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from storage
    
    try {
      const response = await axios.get('http://localhost:5000/api/auth/adminFind', {
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

      if (!updateData.location) {
        errors.location = 'Please enter a location.';
      }

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      console.log(updateData._id);
      await adminUpdate({ id: updateData._id, ...updateData });
      console.log("Successfully updated the admin data:", updateData);
      fun();
      showSnackbar("Update successful");
    } catch (error) {
      console.error("Error updating admin data:", error);
    }
    handleCloseUpdateDialog(); 
  };
  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    setNewAdminData({});
  };
  // const handleDelete = async (rowData) => {
  //   const confirmed = window.confirm("Are you sure you want to delete this Admin?");
  //   if (!confirmed) return;
  
  //   try {
  //     const response = await axios.delete(`http://localhost:5000/api/auth/adminDelete/${rowData._id}`);
  //     refetch();
  
  //     if (response.status === 200) {
  //       showSnackbar("Admin deleted successfully!");
  //     } else {
  //       console.error("Error deleting admin:", response.data);
  //       showSnackbar("Error deleting admin. Please try again."); 
  //     }
  //   } catch (error) {
  //     console.error("Error deleting the item:", error);
  //     showSnackbar("Unexpected error occurred. Please try again later."); 
  //   }
  // };
  const handleDelete = async (rowData) => {
    const confirmed = window.confirm("Are you sure you want to delete this Admin?");
    if (!confirmed) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/auth/adminDelete/${rowData._id}`);
      showSnackbar("Admin deleted successfully!");
      fun();
    } catch (error) {
      console.error("Error deleting the admin:", error);
      showSnackbar("Error deleting admin. Please try again.");
    }
  };
  
  
  const handleAddInputChange = (e, field) => {
    const updatedValue = e.target.value;
    setNewAdminData((prevData) => ({
      ...prevData,
      [field]: updatedValue,
    }));
  };

  const handleAddFormSubmit = async () => {
    try {
      const errors = {};
      const requiredFields = ['password', 'owner', 'email', 'phoneNo', 'location', 'cityName', 'adminId','username'];
  
      requiredFields.forEach(field => {
        if (!newAdminData[field]) {
          errors[field] = `Please provide ${field}.`;
        }
      });
      if ( newAdminData.username.length < 5) {
        errors.usernamea = 'Username must be at least 5 characters long.';
      }

      if ( !/\S+@\S+\.\S+/.test(newAdminData.email)) {
        errors.emaila = 'Please enter a valid email address.';
      }

      if ( !/^\d{10}$/.test(newAdminData.phoneNo)) {
        errors.phoneNoa = 'Please enter a valid 10-digit phone number.';
      }
      if ( newAdminData.password.length < 5) {
        errors.passworda = 'Password must be at least 5 characters long.';
      }
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
  
      const response = await axios.post('http://localhost:5000/api/auth/adminAdd', newAdminData);
      if (response.status === 201) {
        fun();
        showSnackbar("Admin added successfully");
        handleCloseAddDialog();
      } else {
        console.error("Error adding admin:", response.data);
        showSnackbar("Error adding admin. Please try again.");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      showSnackbar("Error adding admin. Please enter all value.");
    } 
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
    {
      field: "role",
      headerName: "",
      flex: 1,
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

  const addAdmin = () => {
    setIsAddDialogOpen(true);
  };
  
  // const filteredAdmins = data?.filter(admin => admin.owner === loggedInOwner);
// console.log(loggedInOwner);
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
          // rows={filteredAdmins || []}
          rows={data || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
         <Button
          variant="contained"
          color="primary"
          onClick={addAdmin}
          sx={{
            position: "absolute",
            top: "120px",
            right: "70px",
          }}
        >
         + Add Admin
        </Button>
      </Box>
      <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog} sx={{ padding: '20px' }}>
        <DialogTitle>Add Admin</DialogTitle>
        <DialogContent>
        <TextField
            label="Id"
            value={newAdminData.adminId || ''}
            onChange={(e) => handleAddInputChange(e, 'adminId')}
            error={!!validationErrors.adminId}
            helperText={validationErrors.adminId}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            value={newAdminData.username || ''}
            onChange={(e) => handleAddInputChange(e, 'username')}
            error={!!validationErrors.usernamea}
            helperText={validationErrors.usernamea}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            value={newAdminData.email || ''}
            onChange={(e) => handleAddInputChange(e, 'email')}
            error={!!validationErrors.emaila}
            helperText={validationErrors.emaila}
            fullWidth
            margin="normal"
          />
            <TextField
            label="Phone No"
            name="phoneNo"
            value={newAdminData.phoneNo || ''}
            onChange={(e) => handleAddInputChange(e, 'phoneNo')}
            error={!!validationErrors.phoneNoa}
            helperText={validationErrors.phoneNoa}
            fullWidth
            margin="normal"
          />
            <TextField
            label="Owner"
            name="owner"
            value={newAdminData.owner || ''}
            onChange={(e) => handleAddInputChange(e, 'owner')}
            error={!!validationErrors.ownera}
            helperText={validationErrors.ownera}
            fullWidth
            margin="normal"
          />
          <TextField
            label="cityName"
            name="cityName"
            value={newAdminData.cityName || ''}
            onChange={(e) => handleAddInputChange(e, 'cityName')}
            error={!!validationErrors.cityNamea}
            helperText={validationErrors.cityNamea}
            fullWidth
            margin="normal"
          />
          <TextField
            label="location"
            name="location"
            value={newAdminData.location || ''}
            onChange={(e) => handleAddInputChange(e, 'location')}
            error={!!validationErrors.locationa}
            helperText={validationErrors.locationa}
            fullWidth
            margin="normal"
          />
          <TextField
            label="password"
            name="password"
            value={newAdminData.password || ''}
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
        <DialogTitle>Update Admin</DialogTitle>
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
          <TextField
            label="Location"
            name="location"
            value={updateData.location || ''}
            onChange={(e) => handleInputChange(e, 'location')}
            error={!!validationErrors.location}
            helperText={validationErrors.location}
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

export default Admin;
