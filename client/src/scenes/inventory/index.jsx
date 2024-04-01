import React, { useEffect, useState } from "react";
import { Box, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetInventoryQuery, useInventoryUpdateMutation } from "state/api";
import Header from "components/Header";
import axios from "axios";
import { Snackbar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
const Inventory = () => {
  const theme = useTheme();
  const [validationErrors, setValidationErrors] = useState({});
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [data, setData] = useState();
  const [rows,setRows] = useState([]);
  const [rowData, setRowData] = useState({});
  const [inventoryId, setInventoryId] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { isLoading, refetch } = useGetInventoryQuery();
  const [medicineUpdate] = useInventoryUpdateMutation();
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.get('http://localhost:5000/api/auth/inventoryFind', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        console.log(response.data);
        setInventoryId(response.data[0]._id);
        const rows = response.data[0].medicines ? response.data[0].medicines.map((medicine, index) => ({
          id: index + 1,
          medicineId: medicine.medicineId || '',
          medicineName: medicine.medicineName || '',
          category: medicine.category || '',
          unitPrice: medicine.unitPrice || 0,
          stock: medicine.stock || 0,
          place: medicine.place || '',
        })) : [];
        setRows(rows); 
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };
    const handleRowClick = (rowData) => {
      setRowData(rowData);
    };
    useEffect(() => {
    fetchData();
  }, []);
  

  useEffect(() => {
    refetch();
  }, []);

  const handleUpdate = (rowData) => {
    setIsUpdateDialogOpen(true);
    setRowData(rowData); 
    setUpdateData(rowData);
  };

  const handleInputChange = (e, field) => {
    const updatedValue = e.target.value;
    setUpdateData((prevData) => ({
      ...prevData,
      [field]: updatedValue,
    }));
  };

  const handleCloseUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
    setUpdateData({});
    fetchData();
  };
 
  const handleFormSubmit = async () => {
    try {
      const { medicineId } = rowData || {}; // Get the medicineId from rowData, default to an empty object if rowData is undefined
      if (!medicineId) {
        console.error("Error: medicineId is undefined");
        return;
      }
      const response = await axios.put(`http://localhost:5000/api/auth/inventories/${inventoryId}/medicines/${medicineId}/place`, updateData);
      console.log("Successfully updated the inventory data:", response.data);
    } catch (error) {
      console.error("Error updating inventory data:", error);
    }
    handleCloseUpdateDialog();
  };
  

  

  const columns = [
    { field: 'medicineId', headerName: 'Medicine ID', width: 150 },
    { field: 'medicineName', headerName: 'Medicine Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 200 },
    { field: 'unitPrice', headerName: 'Unit Price', width: 120 },
    { field: 'stock', headerName: 'Stock', width: 100 },
    { field: 'place', headerName: 'Place', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleUpdate(params.row)}
        >
           {<EditIcon style={{ color: 'white' }} />}
        </Button>
      ),
    },
  ];
//   const rows = response.data[0].medicines ? response.data[0].medicines.map((medicine, index) => ({
//     id: index + 1,
//     medicineID: medicine.medicineID || '',
//     medicineName: medicine.medicineName || '',
//     unitPrice: medicine.unitPrice || 0,
//     stock: medicine.stock || 0,
//     place: medicine.place || '',
// })) : [];


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
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          handleRowClick
          // checkboxSelection
        />
      </Box>
 
      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog} sx={{ padding: '20px' }}>
        <DialogTitle>Update Place</DialogTitle>
        <DialogContent>
          <TextField
            label="Place"
            name="Place"
            value={updateData.place || ''}
            onChange={(e) => handleInputChange(e, 'place')}
            error={!!validationErrors.place}
            helperText={validationErrors.place}
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

export default Inventory;
