import React, { useEffect, useState } from "react";
import { Box, useTheme,Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetMedicinesQuery,useMedicineUpdateMutation } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import axios from "axios";
import { Snackbar } from "@mui/material";

const Medicine = () => {
  const theme = useTheme();
  const [validationErrors, setValidationErrors] = useState({});
  const [newMedicineData, setNewMedicineData] = useState({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // eslint-disable-next-line
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const {  isLoading , refetch} = useGetMedicinesQuery({
  //   page: page + 1,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  });
  const [medicineUpdate] = useMedicineUpdateMutation();
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };
  useEffect(() => {
    const fetchDataToUpdate = async () => {
      try {
        if (updateData && updateData._id) {
          await axios.put(`http://localhost:5000/api/auth/medicineUpdate/${updateData._id}`, updateData);
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

      if (!updateData.medicineId || updateData.medicineId.length < 6) {
        errors.medicineId = 'Medicine must be at least 6 characters long.';
      }

      if (!updateData.medicineName  ) {
        errors.medicineName = 'Please enter medicine name.';
      }

      if (!updateData.category ) {
        errors.category = 'Please enter a category.';
      }

      if (!updateData.unitPrice) {
        errors.unitPrice = 'Please enter a unit price.';
      }else if (!/^\d+(\.\d{1,2})?$/.test(updateData.unitPrice)) {
        errors.unitPrice = 'Please enter a valid unit price.';
      }

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      console.log(updateData._id);
      await medicineUpdate({ id: updateData._id, ...updateData });
      console.log("Successfully updated the admin data:", updateData);
      refetch();
      showSnackbar("Update successful");
    } catch (error) {
      console.error("Error updating admin data:", error);
    }
    handleCloseUpdateDialog(); 
  };

  const handleDelete = async (rowData) => {
    const confirmed = window.confirm("Are you sure you want to delete this Medicine?");
    if (!confirmed) return;

    try {
      console.log(rowData);
      await axios.delete(`http://localhost:5000/api/auth/medicineDelete/${rowData._id}`);
      console.log("Successfully deleted the item with ID:", rowData._id);
      refetch();
      showSnackbar("Delete successful");
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };
  const handleAddInputChange = (e, field) => {
    const updatedValue = e.target.value;
    setNewMedicineData((prevData) => ({
      ...prevData,
      [field]: updatedValue,
    }));
  };
  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    setNewMedicineData({});
  };
  const handleAddFormSubmit = async () => {
    try {
      const errors = {};
    
      if (!newMedicineData.medicineId || newMedicineData.medicineId.length < 6) {
        errors.medicineIda = 'Medicine must be at least 6 characters long.';
      }

      if (!newMedicineData.medicineName  ) {
        errors.medicineNamea = 'Please enter medicine name.';
      }

      if (!newMedicineData.category ) {
        errors.categorya = 'Please enter a category.';
      }else if (!/^\d+(\.\d{1,2})?$/.test(newMedicineData.unitPrice)) {
        errors.unitPricea = 'Please enter a valid unit price.';
      }

      if (!newMedicineData.unitPrice) {
        errors.unitPricea = 'Please enter a unit price.';
      }
  
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
      const response = await axios.post('http://localhost:5000/api/auth/medicine', newMedicineData);
      if (response.status === 201) {
        refetch();
        showSnackbar("Medicine added successfully");
        setIsAddDialogOpen(false);
      } else {
        console.error("Error adding medicine:", response.data);
        showSnackbar("Error adding medicine. Please try again.");
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
      showSnackbar("Error adding medicine. Please try again.");
     } //finally {
    //   setNewMedicineData({});
    // }
    handleCloseAddDialog();
  };
  const columns = [
    {
      field: "medicineId",
      headerName: " ID",
      flex: 1,
    },
    {
      field: "medicineName",
      headerName: "Medicine name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
   
    {
      field: "unitPrice",
      headerName: "unit Price",
      flex: 1,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <Button variant="contained" color="primary" onClick={() => handleDelete(params.row)}>
              Delete
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleUpdate(params.row)}>
              Update
            </Button>
          </Box>
        );
      },
    },
  ];
  const addMedicine = () => {
    setIsAddDialogOpen(true);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Medicine" subtitle="Entire list of Medicine" />
      <Box
        height="80vh"
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
          rows={(data) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      {/* </Box> */}
      <Button
          variant="contained"
          color="primary"
          onClick={addMedicine}
          sx={{
            position: "absolute",
            top: "120px",
            right: "70px",
          }}
        >
         + Add Medicine
        </Button>
      </Box>
      <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog} sx={{ padding: '20px' }}>
        <DialogTitle>Add Medicine</DialogTitle>
        <DialogContent>
        <TextField
            label="Id"
            value={newMedicineData.medicineId || ''}
            onChange={(e) => handleAddInputChange(e, 'medicineId')}
            error={!!validationErrors.medicineIda}
            helperText={validationErrors.medicineIda}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Medicine Name"
            value={newMedicineData.medicineName || ''}
            onChange={(e) => handleAddInputChange(e, 'medicineName')}
            error={!!validationErrors.medicineNamea}
            helperText={validationErrors.medicineNamea}
            fullWidth
            margin="normal"
          />

          <TextField
            label="category"
            name="category"
            value={newMedicineData.category || ''}
            onChange={(e) => handleAddInputChange(e, 'category')}
            error={!!validationErrors.categorya}
            helperText={validationErrors.categorya}
            fullWidth
            margin="normal"
          />
            <TextField
            label="unitPrice"
            name="unitPrice"
            value={newMedicineData.unitPrice || ''}
            onChange={(e) => handleAddInputChange(e, 'unitPrice')}
            error={!!validationErrors.unitPricea}
            helperText={validationErrors.unitPricea}
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
        <DialogTitle>Update Medicine</DialogTitle>
        <DialogContent>
          <TextField
            label="Medicine ID"
            name="medicineId"
            value={updateData.medicineId || ''}
            onChange={(e) => handleInputChange(e, 'medicineId')}
            error={!!validationErrors.medicineId}
            helperText={validationErrors.medicineId}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Medicine Name"
            name="medicineName"
            value={updateData.medicineName || ''}
            onChange={(e) => handleInputChange(e, 'medicineName')}
            error={!!validationErrors.medicineName}
            helperText={validationErrors.medicineName}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={updateData.category || ''}
            onChange={(e) => handleInputChange(e, 'category')}
            error={!!validationErrors.category}
            helperText={validationErrors.category}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Unit Price"
            name="unitPrice"
            value={updateData.unitPrice || ''}
            onChange={(e) => handleInputChange(e, 'unitPrice')}
            error={!!validationErrors.unitPrice}
            helperText={validationErrors.unitPrice}
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

export default Medicine;
