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

//   // const handleCloseBillModal = () => {
//   //   setIsOpenBillModal(false);
//   //   setSelectedBillId(null);
//   // };
//   // const handleOpenBillModal = () => {
//   //   setIsBillModalOpen(true);
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { name: ownername, adminname: adminname, medicines, medicineName, quantity } = formData;

//       // if (!customerName || !phoneNo || medicines.length === 0 || medicineName || quantity) {
//       //   console.error("Customer name, phone number are required.");
//       //   return;
//       // }
//       if (!ownername || !adminname ) {
//         console.error("Owner name and Admin name are required.");
//         return;
//       }
    
//       const newMedicine = {
//         medicineName,
//         quantity: parseInt(quantity),
//        // Ensure quantity is converted to integer if necessary
//       };

//       const billData = {
//         ownername,
//         adminname,
//         medicines: [...medicines, newMedicine], 
//       };

//       const response = await axios.post("http://localhost:5000/api/auth/createOrder", billData);
//       console.log("Bill created successfully:", response.data);

//       const fetchedBillId = response.data.data.billId; // Assuming the billId is returned in the response
//       const fetchedBillResponse = await axios.get(`http://localhost:5000/api/auth/billFindOne/${fetchedBillId}`,);
//       const fetchedBillData = fetchedBillResponse.data;
//       console.log("Fetched bill data:", fetchedBillData);
//       setFetchedBillData(fetchedBillData);
// //       console.log("hey...");
// // console.log(fetchedBillData.data.billId);
// // console.log(fetchedBillData.data.customerName);
// // console.log(fetchedBillData.data.medicines);

//       setIsBillCreated(true);
//       handleOpenBillModal();
//     setIsOpenForm(false); // Close the form
    
//     } catch (error) {
//       console.error("Error creating bill:", error);
//       // Handle errors (e.g., display error message)
//     }
//   };  

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
// <Box m="1.5rem 2.5rem">
//   <Header title="Order" subtitle="Ordering medicine..." />
//   <Box mt={3}>
//     <form onSubmit={handleSubmit}>
//       <TextField
//         fullWidth
//         label="Owner Name"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         variant="outlined"
//         margin="normal"
//       />
//       <TextField
//         fullWidth
//         label="Admin Name"
//         name="adminname"
//         value={formData.adminname}
//         onChange={handleChange}
//         variant="outlined"
//         margin="normal"
//       />    
//       <TextField
//         fullWidth
//         label="Quantity"
//         name="quantity"
//         value={formData.quantity}
//         onChange={handleChange}
//         variant="outlined"
//         margin="normal"
//       />
//       <TextField
//         fullWidth
//         label="Medicine Name"
//         name="medicineName"
//         value={formData.medicineName}
//         onChange={handleChange}
//         variant="outlined"
//         margin="normal"
//         autoComplete="off"
//         InputProps={{
//           endAdornment: (
//             <React.Fragment>
//               {medicinesLoading ? "Loading..." : (
//                 <Box
//                   style={{
//                     position: "absolute",
//                     zIndex: 1,
//                     width: "100%",
//                     marginTop: "55px",
//                   }}
//                 >
//                   {formData.medicineName && (
//                     <Box
//                       style={{
//                         position: "absolute",
//                         top: "100%",
//                         width: "100%",
//                         backgroundColor: "#ffffff",
//                         boxShadow: "0px 2px 4px rgba(38, 38, 38, 0.1)",
//                         borderRadius: "4px",
//                         color: "#000000",
//                       }}
//                     >
//                       {renderSuggestions()}
//                     </Box>
//                   )}
//                 </Box>
//               )}
//             </React.Fragment>
//           )
//         }}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleMedicineAdd}
//         sx={{ mt: 2 }}
//       >
//         Add Medicine
//       </Button>
//       <Box mt={2}>
//         <ul>
//           {formData.medicines.map((med, index) => (
//             <li key={index}>
//               {med.medicineName} -- {med.unitPrice} * {med.quantity} = {med.subTotal}
//             </li>
//           ))}
//         </ul>
//         <div>Total Amount: Rs.{handleTotalAmount()}</div>
//       </Box>
//       <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//         Submit
//       </Button>
//     </form>
//   </Box>
// </Box>

//   );  
// };

// export default Customers;
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import { useGetMedicinesQuery } from "state/api";

const Order = () => {
  const token = localStorage.getItem('token');
  const { data: medicinesData, isLoading: medicinesLoading } = useGetMedicinesQuery();
  const [formData, setFormData] = useState({
    ownerName: "",
    adminName: "",
    orderItems: [],
    medicineName: "",
    quantity: "",
  });
  const [suggestions, setSuggestions] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { ownerName, adminName, orderItems, medicineName, quantity } = formData;

      if (!ownerName || !adminName) {
        console.error("Owner name and Admin name are required.");
        return;
      }

      const newOrderItem = {
        medicineName,
        quantity: parseInt(quantity),
      };

      const orderData = {
        Username: ownerName,
        ownerName: adminName,
        orderItems: [...orderItems, newOrderItem],
      };

      const response = await axios.post("http://localhost:5000/api/auth/createOrder", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Order created successfully:", response.data);

      // Clearing form fields
      setFormData({
        ownerName: "",
        adminName: "",
        orderItems: [],
        medicineName: "",
        quantity: "",
      });

    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTotalAmount = () => {
    return formData.orderItems.reduce((total, item) => total + (item.unitPrice * parseInt(item.quantity)), 0);
  };



  const handleOrderItemAdd = () => {
    const { medicineName, quantity } = formData;
    if (medicineName && quantity) {
      const selectedMedicine = medicinesData.find(medicine => medicine.medicineName === medicineName);
      if (selectedMedicine) {
        const subTotal = selectedMedicine.unitPrice * parseInt(quantity);
        const newOrderItem = {
          medicineId: selectedMedicine.medicineId,
          medicineName,
          quantity: parseInt(quantity),
          unitPrice: selectedMedicine.unitPrice,
          subTotal: subTotal,
        };
        setFormData({
          ...formData,
          orderItems: [...formData.orderItems, newOrderItem],
          medicineName: "",
          quantity: "",
        });
        setSuggestions([]);
      } else {
        console.error("Selected medicine not found in medicinesData");
      }
    } else {
      console.error("Medicine name and quantity are required");
    }
    if (medicinesData) {
      setSuggestions(medicinesData);
    }
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
          </MenuItem>
        );
      }
      return null;
    });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Order" subtitle="Ordering medicine..." />
      <Box mt={3}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Owner Name"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Admin Name"
            name="adminName"
            value={formData.adminName}
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
            onClick={handleOrderItemAdd}
            sx={{ mt: 2 }}
          >
            Add Medicine
          </Button>
          <Box mt={2}>
            <ul>
              {formData.orderItems.map((item, index) => (
                <li key={index}>
                  {item.medicineName} -- {item.unitPrice} * {item.quantity} = {item.subTotal}
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
    </Box>
  );
};

export default Order;