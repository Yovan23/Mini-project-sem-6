// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, Typography, MenuItem,Modal } from "@mui/material";
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// import { useGetMedicinesQuery } from "state/api";
// import Header from "components/Header";
// import axios from "axios";

// const Customers = () => {
//   const { data: medicinesData, isLoading: medicinesLoading } = useGetMedicinesQuery();
//   const [isOpenForm, setIsOpenForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     phoneNumber: "",
//     medicines: [],
//     medicineName: "",
   
//   });
//   const [suggestions, setSuggestions] = useState([]);
//   const [isBillCreated, setIsBillCreated] = useState(false);
//   const [, setIsOpenBillModal] = useState(false);
//   const [, setSelectedBillId] = useState(null);
//   const [fetchedBillData, setFetchedBillData] = useState(null);
//   const token = localStorage.getItem('token');
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//          await axios.get("http://localhost:5000/api/auth/medicineFind"); 
//       } catch (error) {
//         console.error("Error fetching medicines:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (medicinesData) {
//       setSuggestions(medicinesData);
//     }
//   }, [medicinesData]);

//   const handleOpenBillModal = (billId) => {
//     setSelectedBillId(billId);
//     setIsOpenBillModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { name: customerName, phoneNumber: phoneNo, medicines, medicineName, quantity } = formData;
//       if (!customerName || !phoneNo ) {
//         alert("Customer name and phone number are required.");
//         return;
//       }
    
//       const newMedicine = {
//         medicineName,
//         quantity: parseInt(quantity),
//        // Ensure quantity is converted to integer if necessary
//       };

//       const billData = {
//         customerName,
//         phoneNo,
//         medicines: [...medicines, newMedicine], // Append the new medicine to the existing list
//       };

//       try {
//         const response = await axios.post('http://localhost:5000/api/auth/billCreate',billData, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//           },
//     });
//     console.log("Bill created successfully:", response.data);
    
//     const fetchedBillId = response.data.data.billId; // Assuming the billId is returned in the response
//     const fetchedBillResponse = await axios.get(`http://localhost:5000/api/auth/billFindOne/${fetchedBillId}`,);
//     const fetchedBillData = fetchedBillResponse.data;
//     console.log("Fetched bill data:", fetchedBillData);
//     setFetchedBillData(fetchedBillData);
//     setIsBillCreated(true);
//     handleOpenBillModal();
//     setIsOpenForm(false); 
  
//       } catch (error) {
//         throw new Error('hereistheerro'); // Throw an error if the request fails
//       }

//     } catch (error) {
//       console.error("Error creating bill:", error);
//     }
//   };
//   const handlePrint = () => {
//     window.print();
//   };
//   const toggleForm = () => {
//     setIsOpenForm(!isOpenForm);
//     setFormData({
//       name: "",
//       phoneNumber: "",
//       medicines: [],
//       medicineName: "",
//       quantity: "",
//   });
//   }

//   const handleChange = (e) => {
//          const { name, value } = e.target;
//         setFormData({
//            ...formData,
//            [name]: value,
//        });
//       };

//       const handleMedicineAdd = async () => {
//         const { medicineName, quantity } = formData;
//         if (medicineName && quantity) {
//           const selectedMedicine = medicinesData.find(medicine => medicine.medicineName === medicineName);
//           if (selectedMedicine) {
//             const subTotal = selectedMedicine.unitPrice * parseInt(quantity);
//             const newMedicine = {
//               medicineId: selectedMedicine.medicineId, // Add medicineId here
//               medicineName,
//               quantity: parseInt(quantity),
//               unitPrice: selectedMedicine.unitPrice,
//               subTotal: subTotal,
//             };
//             setFormData({
//               ...formData,
//               medicines: [
//                 ...formData.medicines,
//                 newMedicine,
//               ],
//               medicineName: "",
//               quantity: "",
//             });
//             setSuggestions([]);
//           } else {
//             console.error("Selected medicine not found in medicinesData");
//           }
//         } else {
//           console.error("Medicine name and quantity are required");
//         }
      
//       if (medicinesData) {
//         setSuggestions(medicinesData);
//       }
//       // setIsMedicineAdded(true); 
//   };


//   const handleTotalAmount = () => {
//     return formData.medicines.reduce((total, med) => total + (med.unitPrice * parseInt(med.quantity)), 0);
//   };
  

//   const handleMedicineSelect = (medicine) => {
//     setFormData({
//       ...formData,
//       medicineName: medicine.medicineName,
//     });
//     setSuggestions([]);
//   };

//   const renderSuggestions = () => {
//     const typedChars = formData.medicineName.toLowerCase();
//     return suggestions.map((medicine) => {
//       const index = medicine.medicineName.toLowerCase().indexOf(typedChars);
//       if (index !== -1) {
//         return (
//           <MenuItem key={medicine._id} onClick={() => handleMedicineSelect(medicine)}>
//             <span>{medicine.medicineName.substring(0, index)}</span>
//             <span style={{ fontWeight: 'bold' }}>
//               {medicine.medicineName.substring(index, index + typedChars.length)}
//             </span>
//             <span style={{ opacity: 0.5 }}>
//               {medicine.medicineName.substring(index + typedChars.length)}
//             </span> 
//             {/* <span> - Rs.{medicine.unitPrice}</span> */}
//           </MenuItem>
//         );
//       }
//       return null;
//     });
//   };
//   const isoDateString = fetchedBillData?.data?.createdAt;
//   const [datePart, timePart] = isoDateString ? isoDateString.split("T") : ["", ""]; 
//   const [year, month, day] = datePart.split("-");
//   const formattedDate = `${day}/${month}/${year}`;  
//   const [hours, minutes] = timePart.split(":").map(Number);
//   const formattedTime = `${hours}:${minutes}`;

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Bill Corner" subtitle="Creat the bill..." />
      
//       <Box>
        
//         {!isOpenForm && (
//           <Button
//             variant="contained"
//             color="primary"
//             style={{ float: "right", marginTop: "-50px" }}
//             onClick={toggleForm}
//           >
//             Create Bill
//           </Button>
//         )}
//         {isOpenForm && (
//           <Box mt={3}>
//             <form onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 variant="outlined"
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 variant="outlined"
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Quantity"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 variant="outlined"
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Medicine Name"
//                 name="medicineName"
//                 value={formData.medicineName}
//                 onChange={handleChange}
//                 variant="outlined"
//                 margin="normal"
//                 autoComplete="off"
//                 InputProps={{
//                   endAdornment: (
//                     <React.Fragment>
//                       {medicinesLoading ? "Loading..." : (
//                         <Box
//                           style={{
//                             position: "absolute",
//                             zIndex: 1,
//                             width: "100%",
//                             marginTop: "55px",
//                           }}
//                         >
//                           {formData.medicineName && (
//                             <Box
//                               style={{
//                                 position: "absolute",
//                                 top: "100%",
//                                 width: "100%",
//                                 backgroundColor: "#ffffff",
//                                 boxShadow: "0px 2px 4px rgba(38, 38, 38, 0.1)",
//                                 borderRadius: "4px",
//                                 color: "#000000",
//                               }}
//                             >
//                               {renderSuggestions()}
//                             </Box>
//                           )}
//                         </Box>
//                       )}
//                     </React.Fragment>
//                   )
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleMedicineAdd}
//                 sx={{ mt: 2 }}
//               >
//                 Add Medicine
//               </Button>
//               <Box mt={2}>
//                 <ul>
//                   {formData.medicines.map((med, index) => (
//                     <li key={index}>
//                       {med.medicineName} -- {med.unitPrice} * {med.quantity} = {med.subTotal}
//                     </li>
//                   ))}
//                 </ul>
//                 <div>Total Amount: Rs.{handleTotalAmount()}</div>
//               </Box>
              
//               <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//                 Submit
//               </Button>
//             </form>
//           </Box>
//         )}

// <Modal open={isBillCreated} onClose={() => setIsBillCreated(false)}>
//   <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'white', color: 'black', boxShadow: 24, p: 4 }}>
//     <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', marginTop: '30px'}}>
//     Shayona Pharma
//     </Typography>
//     <Typography variant="body1" gutterBottom>
//       Customer Name: {fetchedBillData && fetchedBillData.data && fetchedBillData.data.customerName}
//     </Typography>
//     <Typography variant="body1" gutterBottom>
//       Phone Number: {fetchedBillData && fetchedBillData.data && fetchedBillData.data.phoneNo}
//     </Typography>
//     <Typography variant="body1" gutterBottom>
//       Bill ID: {fetchedBillData && fetchedBillData.data && fetchedBillData.data.billId}
//     </Typography>
//     <Typography variant="body1" gutterBottom sx={{ position: 'absolute', top: '5px', right: '40px' }}>
//       Create Date: {formattedDate}
//     </Typography>
//     <Typography variant="body1" gutterBottom sx={{ position: 'absolute', top: '25px', right: '82px' }}>
//       Create Time: {formattedTime}
//     </Typography>
//     <TableContainer>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell style={{ color: 'black' }}>Sr No.</TableCell>
//             <TableCell style={{ color: 'black' }}>Medicine Name</TableCell>
//             <TableCell style={{ color: 'black' }}>Unit Price</TableCell>
//             <TableCell style={{ color: 'black' }}>Quantity</TableCell>
//             <TableCell style={{ color: 'black' }}>Subtotal</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {fetchedBillData && fetchedBillData.data && fetchedBillData.data.medicines.map((medicine, index) => (
//             <TableRow key={index}>
//               <TableCell style={{ color: 'black' }}>{index+1}</TableCell>
//               <TableCell style={{ color: 'black' }}>{medicine.medicineName}</TableCell>
//               <TableCell style={{ color: 'black' }}>Rs. {medicine.unitPrice}</TableCell>
//               <TableCell style={{ color: 'black' }}>{medicine.quantity}</TableCell>
//               <TableCell style={{ color: 'black' }}>Rs. {medicine.subTotal}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
    
//     <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginRight: '30px' }}>
//       <Typography variant="h6" gutterBottom style={{ color: 'black' }}>
//         Total Amount: Rs. {fetchedBillData && fetchedBillData.data && fetchedBillData.data.totalAmount}
//       </Typography>
//     </Box>
//     <Typography variant="body1" gutterBottom sx={{ textAlign: 'center'}}>
//       Thank you..! Come Again..!
//     </Typography>
//     <Button onClick={handlePrint} variant="contained" color="primary" sx={{ mt: 2 }}>
//       Print Bill
//     </Button>
//   </Box>
// </Modal>



//       </Box>
//       <Typography sx={{ marginTop:"55px" , fontSize:"21px"}}>Steps to create billing:- </Typography>
//       <Typography sx={{ marginTop:"25px" , fontSize:"21px"}}>1. Click on "Create Bill" button.</Typography>
//       <Typography sx={{ marginTop:"5px" , fontSize:"21px"}}>2. enter details as per the field need.</Typography>
//       <Typography sx={{ marginTop:"5px" , fontSize:"21px"}}>3. Click on "Add Medicine" button, if you want to add more medicne then write again the quantity and medicine name and then again click on "Add Medicine" button.</Typography>
//       <Typography sx={{ marginTop:"5px" , fontSize:"21px"}}>4. After adding medicines as per the customer requirement click on "Submit" button.</Typography>
//       <Typography sx={{ marginTop:"5px" , fontSize:"21px"}}>5. It will generate the bill, and for priniting the bill, click on "Print" button.</Typography>
//       <Typography sx={{ marginTop:"5px" , fontSize:"21px"}}>6. Then again click on "Print" button for having hardcopy of the bill.</Typography>
//     </Box>
//   );
// };

// export default Customers;
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem,Modal } from "@mui/material";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useGetMedicinesQuery } from "state/api";
import Header from "components/Header";
import axios from "axios";
import { Snackbar } from "@mui/material";

const Customers = () => {
  const { data: medicinesData, isLoading: medicinesLoading } = useGetMedicinesQuery();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    medicines: [],
    medicineName: "",
   
  });
  const [suggestions, setSuggestions] = useState([]);
  const [isBillCreated, setIsBillCreated] = useState(false);
  const [, setIsOpenBillModal] = useState(false);
  const [, setSelectedBillId] = useState(null);
  const [fetchedBillData, setFetchedBillData] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
         await axios.get("http://localhost:5000/api/auth/medicineFind"); 
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (medicinesData) {
      setSuggestions(medicinesData);
    }
  }, [medicinesData]);

  const handleOpenBillModal = (billId) => {
    setSelectedBillId(billId);
    setIsOpenBillModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name: customerName, phoneNumber: phoneNo, medicines, medicineName, quantity } = formData;
      if (!customerName || !phoneNo || !medicineName || !quantity) {
        showSnackbar("Customer name and phone number are required.");
        return;
      }
    
      const newMedicine = {
        medicineName,
        quantity: parseInt(quantity),
      };

      const billData = {
        customerName,
        phoneNo,
        medicines: [...medicines, newMedicine], 
      };

      try {
        const response = await axios.post('http://localhost:5000/api/auth/billCreate',billData, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
    });
    showSnackbar("Bill created successfully");
  
    if (response.data.errors && response.data.errors.length > 0) {
      const errorMessage = response.data.errors[0].error;
      showSnackbar(`Error creating bill: ${errorMessage}`);
      const billId = response.data.data.billId;
            await axios.delete(`http://localhost:5000/api/auth/billDelete/${billId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
      return;
    }
    const fetchedBillId = response.data.data.billId; 
    const fetchedBillResponse = await axios.get(`http://localhost:5000/api/auth/billFindOne/${fetchedBillId}`,);
    const fetchedBillData = fetchedBillResponse.data;
    console.log("Fetched bill data:", fetchedBillData);
    setFetchedBillData(fetchedBillData);
    setIsBillCreated(true);
    handleOpenBillModal();
    setIsOpenForm(false); 
  
      } catch (error) {
        throw new Error('hereistheerro'); 
      }

    } catch (error) {
      console.error("Error creating bill:", error);
    }
  };
  const handlePrint = () => {
    window.print();
  };
  const toggleForm = () => {
    setIsOpenForm(!isOpenForm);
    setFormData({
      name: "",
      phoneNumber: "",
      medicines: [],
      medicineName: "",
      quantity: "",
  });
  }

  const handleChange = (e) => {
         const { name, value } = e.target;
        setFormData({
           ...formData,
           [name]: value,
       });
      };

      const handleMedicineAdd = async () => {
        const { medicineName, quantity } = formData;
        
        if (medicineName && quantity) {
          const selectedMedicine = medicinesData.find(medicine => medicine.medicineName === medicineName);
          if (selectedMedicine) {
            const subTotal = selectedMedicine.unitPrice * parseInt(quantity);
            const newMedicine = {
              medicineId: selectedMedicine.medicineId, // Add medicineId here
              medicineName,
              quantity: parseInt(quantity),
              unitPrice: selectedMedicine.unitPrice,
              subTotal: subTotal,
            };
            setFormData({
              ...formData,
              medicines: [
                ...formData.medicines,
                newMedicine,
              ],
              medicineName: "",
              quantity: "",
            });
            setSuggestions([]);
          } else {
            showSnackbar("Selected medicine not found in medicinesData");
          }
        } else {
          showSnackbar("Medicine name and quantity are required");
        }
      
      if (medicinesData) {
        setSuggestions(medicinesData);
      }
      // setIsMedicineAdded(true); 
  };


  const handleTotalAmount = () => {
    return formData.medicines.reduce((total, med) => total + (med.unitPrice * parseInt(med.quantity)), 0);
  };
  

  const handleMedicineSelect = (medicine) => {
    setFormData({
      ...formData,
      medicineName: medicine.medicineName,
    });
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    const typedChars = formData.medicineName.toLowerCase();
    return suggestions.map((medicine) => {
      const index = medicine.medicineName.toLowerCase().indexOf(typedChars);
      if (index !== -1) {
        return (
          <MenuItem key={medicine._id} onClick={() => handleMedicineSelect(medicine)}>
            <span>{medicine.medicineName.substring(0, index)}</span>
            <span style={{ fontWeight: 'bold' }}>
              {medicine.medicineName.substring(index, index + typedChars.length)}
            </span>
            <span style={{ opacity: 0.5 }}>
              {medicine.medicineName.substring(index + typedChars.length)}
            </span> 
            {/* <span> - Rs.{medicine.unitPrice}</span> */}
          </MenuItem>
        );
      }
      return null;
    });
  };
  const isoDateString = fetchedBillData?.data?.createdAt;
  const [datePart, timePart] = isoDateString ? isoDateString.split("T") : ["", ""]; 
  const [year, month, day] = datePart.split("-");
  const formattedDate = `${day}/${month}/${year}`;  
  const [hours, minutes] = timePart.split(":").map(Number);
  const formattedTime = `${hours}:${minutes}`;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Bill Corner" subtitle="Creat the bill..." />
      
      <Box>
        
        {!isOpenForm && (
          <Button
            variant="contained"
            color="primary"
            style={{ float: "right", marginTop: "-50px" }}
            onClick={toggleForm}
          >
            Create Bill
          </Button>
        )}
        {isOpenForm && (
          <Box mt={3}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Medicine Name"
                name="medicineName"
                value={formData.medicineName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <React.Fragment>
                      {medicinesLoading ? "Loading..." : (
                        <Box
                          style={{
                            position: "absolute",
                            zIndex: 1,
                            width: "100%",
                            marginTop: "55px",
                          }}
                        >
                          {formData.medicineName && (
                            <Box
                              style={{
                                position: "absolute",
                                top: "100%",
                                width: "100%",
                                backgroundColor: "#ffffff",
                                boxShadow: "0px 2px 4px rgba(38, 38, 38, 0.1)",
                                borderRadius: "4px",
                                color: "#000000",
                              }}
                            >
                              {renderSuggestions()}
                            </Box>
                          )}
                        </Box>
                      )}
                    </React.Fragment>
                  )
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleMedicineAdd}
                sx={{ mt: 2 }}
              >
                Add Medicine
              </Button>
              <Box mt={2}>
                <ul>
                  {formData.medicines.map((med, index) => (
                    <li key={index}>
                      {med.medicineName} -- {med.unitPrice} * {med.quantity} = {med.subTotal}
                    </li>
                  ))}
                </ul>
                <div>Total Amount: Rs.{handleTotalAmount()}</div>
              </Box>
              
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
              </Button>
            </form>
          </Box>
        )}

<Modal open={isBillCreated} onClose={() => setIsBillCreated(false)}>
  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'white', color: 'black', boxShadow: 24, p: 4 }}>
    <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', marginTop: '30px'}}>
    Shayona Pharma
    </Typography>
    <Typography variant="body1" gutterBottom>
      Customer Name: {fetchedBillData && fetchedBillData.data && fetchedBillData.data.customerName}
    </Typography>
    <Typography variant="body1" gutterBottom>
      Phone Number: {fetchedBillData && fetchedBillData.data && fetchedBillData.data.phoneNo}
    </Typography>
    <Typography variant="body1" gutterBottom>
      Bill ID: {fetchedBillData && fetchedBillData.data && fetchedBillData.data.billId}
    </Typography>
    <Typography variant="body1" gutterBottom sx={{ position: 'absolute', top: '5px', right: '40px' }}>
      Create Date: {formattedDate}
    </Typography>
    <Typography variant="body1" gutterBottom sx={{ position: 'absolute', top: '25px', right: '82px' }}>
      Create Time: {formattedTime}
    </Typography>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: 'black' }}>Sr No.</TableCell>
            <TableCell style={{ color: 'black' }}>Medicine Name</TableCell>
            <TableCell style={{ color: 'black' }}>Unit Price</TableCell>
            <TableCell style={{ color: 'black' }}>Quantity</TableCell>
            <TableCell style={{ color: 'black' }}>Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchedBillData && fetchedBillData.data && fetchedBillData.data.medicines.map((medicine, index) => (
            <TableRow key={index}>
              <TableCell style={{ color: 'black' }}>{index+1}</TableCell>
              <TableCell style={{ color: 'black' }}>{medicine.medicineName}</TableCell>
              <TableCell style={{ color: 'black' }}>Rs. {medicine.unitPrice}</TableCell>
              <TableCell style={{ color: 'black' }}>{medicine.quantity}</TableCell>
              <TableCell style={{ color: 'black' }}>Rs. {medicine.subTotal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginRight: '30px' }}>
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>
        Total Amount: Rs. {fetchedBillData && fetchedBillData.data && fetchedBillData.data.totalAmount}
      </Typography>
    </Box>
    <Typography variant="body1" gutterBottom sx={{ textAlign: 'center'}}>
      Thank you..! Come Again..!
    </Typography>
    <Button onClick={handlePrint} variant="contained" color="primary" sx={{ mt: 2 }}>
      Print Bill
    </Button>
  </Box>
</Modal>

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
      <Typography sx={{ marginTop:"55px" , fontSize:"21px"}}>Steps to create billing:- </Typography>
      <Typography sx={{ marginTop:"25px" , fontSize:"21px"}}>1. Click on "Create Bill" button.</Typography>
      <Typography sx={{ marginTop:"5px" , fontSize:"21px"}}>2. enter details as per the field need.</Typography>
      <Typography sx={{ marginTop:"5px" , fontSize:"21px"}}>3. Click on "Add Medicine" button, if you want to add more medicne then write again the quantity and medicine name and then again click on "Add Medicine" button.</Typography>
      <Typography sx={{ marginTop:"5px" , fontSize:"21px"}}>4. After adding medicines as per the customer requirement click on "Submit" button.</Typography>
      <Typography sx={{ marginTop:"5px" , fontSize:"21px"}}>5. It will generate the bill, and for priniting the bill, click on "Print" button.</Typography>
      <Typography sx={{ marginTop:"5px" , fontSize:"21px"}}>6. Then again click on "Print" button for having hardcopy of the bill.</Typography>
    </Box>
  );
};

export default Customers;
