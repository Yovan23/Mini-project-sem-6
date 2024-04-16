import React, { useEffect, useState } from 'react';
import { Box, useTheme, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import axios from "axios";
import {  startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';


const Sales = () => {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('today');

  
const userRole = localStorage.getItem("role");
const fetchSalesData = async (startDate, endDate) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/billFindSale', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                filter: selectedOption,
                startDate: startDate.toISOString(), 
                endDate: endDate.toISOString()    
            }
        });
        // console.log(startDate);
        // console.log(endDate);
        // console.log(response.data);
        setData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setIsLoading(false);
    }
}

    useEffect(() => {
        let startDate, endDate;
        const today = new Date();
        switch (selectedOption) {
            case 'today':
                startDate = startOfDay(today);
                // console.log(startDate);
                endDate = endOfDay(today);
                break;
            case 'thisWeek':
                startDate = startOfWeek(today);
                // console.log(" S",startDate);                
                endDate = endOfWeek(today);
                // console.log(" E",endDate);                

                break;
            case 'thisMonth':
                startDate = startOfMonth(today);
                endDate = endOfMonth(today);
                break;
            default:
                startDate = startOfDay(today);
                endDate = endOfDay(today);
        }
        fetchSalesData(startDate, endDate);
    }, [selectedOption]);

    const aggregateDataByMedicine = () => {
        const aggregatedData = {};

        data.forEach(bill => {
            bill.medicines.forEach(medicine => {
                const { medicineName, subTotal, quantity } = medicine;
                if (aggregatedData[medicineName]) {
                    aggregatedData[medicineName].totalAmount += subTotal;
                    aggregatedData[medicineName].quantity += quantity;
                } else {
                    aggregatedData[medicineName] = {
                        totalAmount: subTotal,
                        quantity: quantity
                    };
                }
            });
        });

        return Object.entries(aggregatedData).map(([medicineName, { totalAmount, quantity }], index) => ({
            id: index + 1,
            medicineName,
            totalAmount,
            quantity
        }));
    };

    const aggregateDataByCategory = () => {
        const aggregatedData = {};

        data.forEach(bill => {
            bill.medicines.forEach(medicine => {
                const { category, subTotal, quantity } = medicine;
                if (aggregatedData[category]) {
                    aggregatedData[category].totalAmount += subTotal;
                    aggregatedData[category].quantity += quantity;
                } else {
                    aggregatedData[category] = {
                        totalAmount: subTotal,
                        quantity: quantity
                    };
                }
            });
        });

        return Object.entries(aggregatedData).map(([category, { totalAmount, quantity }], index) => ({
            id: index + 1,
            category,
            totalAmount,
            quantity
        }));
    };

    const aggregateDataByLocation = () => {
        const aggregatedData = {};
    
        data.forEach(bill => {
            bill.medicines.forEach(medicine => {
                const { subTotal } = medicine;
                const { location, adminName, ownerName } = bill;
                const key = `${location}_${adminName}_${ownerName}`; // Create a compound key combining location, adminName, and ownerName
                if (aggregatedData[key]) {
                    aggregatedData[key].totalAmount += subTotal;
                } else {
                    aggregatedData[key] = {
                        totalAmount: subTotal,
                        adminName,
                        location,
                        ownerName
                    };
                }
            });
        });
    
        return Object.entries(aggregatedData).map(([key, { totalAmount, adminName, location, ownerName }], index) => {
            const [locationName, admin, owner] = key.split('_'); // Split the compound key to extract location, adminName, and ownerName
            return {
                id: index + 1,
                location: locationName,
                adminName: admin,
                ownerName: owner,
                totalAmount
            };
        });
    };
    
    const aggregateDataByOwner = () => {
        const aggregatedData = {};
        
        data.forEach(bill => {
            const { ownerName, totalAmount } = bill;
            if (aggregatedData[ownerName]) {
                aggregatedData[ownerName].totalAmount += totalAmount;
            } else {
                aggregatedData[ownerName] = {
                    totalAmount
                };
            }
        });

        return Object.entries(aggregatedData).map(([ownerName, { totalAmount }], index) => ({
            id: index + 1,
            ownerName,
            totalAmount
        }));
    };

    const getTotalAmount = (rows) => {
        return rows.reduce((total, current) => total + current.totalAmount, 0);
    };

    const getTotalQuantity = (rows) => {
        return rows.reduce((total, current) => total + current.quantity, 0);
    };

    const columnsByMedicine = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'medicineName', headerName: 'Medicine Name', flex: 1 },
        { field: 'totalAmount', headerName: 'Total Amount', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', flex: 1 }
    ];

    const columnsByCategory = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'category', headerName: 'Category', flex: 1 },
        { field: 'totalAmount', headerName: 'Total Amount', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', flex: 1 }
    ];

    const columnsByLocation = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'location', headerName: 'Location', flex: 1 },
        { field: 'adminName', headerName: 'Admin Name', flex: 1 },
        { field: 'ownerName', headerName: 'Owner Name', flex: 1 },
        { field: 'totalAmount', headerName: 'Total Amount', flex: 1 }
    ];

    const columnsByOwner = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'ownerName', headerName: 'Owner Name', flex: 1 },
        { field: 'totalAmount', headerName: 'Total Amount', flex: 1 }
    ];

    const rowsByMedicine = aggregateDataByMedicine();
    const rowsByCategory = aggregateDataByCategory();
    const rowsByLocation = aggregateDataByLocation();
    const rowsByOwner = aggregateDataByOwner();

    const totalAmountByMedicine = getTotalAmount(rowsByMedicine);
    const totalAmountByCategory = getTotalAmount(rowsByCategory);
    const totalAmountByLocation = getTotalAmount(rowsByLocation);
    const totalAmountByOwner = getTotalAmount(rowsByOwner);

    const totalQuantityByMedicine = getTotalQuantity(rowsByMedicine);
    const totalQuantityByCategory = getTotalQuantity(rowsByCategory);

    const totalRowByMedicine = { id: 'total', medicineName: 'Total', totalAmount: totalAmountByMedicine, quantity: totalQuantityByMedicine };
    const totalRowByCategory = { id: 'total', category: 'Total', totalAmount: totalAmountByCategory, quantity: totalQuantityByCategory };
    const totalRowByLocation = { id: 'total', location: 'Total', totalAmount: totalAmountByLocation };
    const totalRowByOwner = { id: 'total', ownerName: 'Total', totalAmount: totalAmountByOwner };

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="SALES" subtitle="See the Report.." />
            <Box width="100%" marginBottom="20px" marginTop="10px">
                <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                    <InputLabel id="select-option-label"></InputLabel>
                    <Select
                        labelId="select-option-label"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="thisWeek">This Week</MenuItem>
                        <MenuItem value="thisMonth">This Month</MenuItem>
                    </Select>
                </FormControl>
                <Header title="Sales by Medicine" />
                <DataGrid
                    rows={[...rowsByMedicine, totalRowByMedicine]}
                    columns={columnsByMedicine}
                    loading={isLoading}
                    autoHeight
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                />
            </Box>
            <Box width="100%" marginBottom="2rem">
                <Header title="Sales by Category" />
                <DataGrid
                    rows={[...rowsByCategory, totalRowByCategory]}
                    columns={columnsByCategory}
                    loading={isLoading}
                    autoHeight
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                />
            </Box>
            {(userRole === 'superAdmin' || userRole === 'owner') && (
            <Box width="100%" marginBottom="2rem">
                <Header title="Sales by Location" />
                <DataGrid
                    rows={[...rowsByLocation, totalRowByLocation]}
                    columns={columnsByLocation}
                    loading={isLoading}
                    autoHeight
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                />
            </Box>
            )}
            {userRole === 'superAdmin' && (
                <Box width="100%">
                    <Header title="Sales by Owner" />
                    <DataGrid
                        rows={[...rowsByOwner, totalRowByOwner]}
                        columns={columnsByOwner}
                        loading={isLoading}
                        autoHeight
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 50]}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Sales;

