// const mongoose = require('mongoose');
// const Inventory = require('../Model/inventory_Model');
// const Medicine = require('../Model/medicine_Model');
// const User = require('../Model/user_Model');

//     // const getUserInventory = async (req, res) => {
//     //     try {
//     //         // Obtain user ID from request or authentication token
//     //         const userId = req.user.id;
    
//     //         // Fetch user's inventory from database based on userId
//     //         const userInventory = await Inventory.find({ userId });
    
//     //         res.status(200).json({ inventory: userInventory });
//     //     } catch (error) {
//     //         console.error(error);
//     //         res.status(500).json({ error: 'Internal Server Error' });
//     //     }
//     // };
//      // try {
//         //     const { inventoryId, medicines } = req.body;
    
//         //     // Check if an inventory document with the given inventoryId already exists
//         //     let inventory = await Inventory.findOne({ inventoryId });
    
//         //     if (!inventory) {
//         //         // If inventory doesn't exist, create a new one
//         //         const allMedicines = await Medicine.find().select('medicineName category unitPrice');
//         //         const populatedMedicines = [];
    
//         //         for (const item of medicines) {
//         //             const populatedItem = allMedicines.find(med => med._id.toString() === item.medicineId);
    
//         //             if (!populatedItem) {
//         //                 throw new Error(`Medicine not found for ID: ${item.medicineId}`);
//         //             }
    
//         //             populatedMedicines.push({
//         //                 medicineId: item.medicineId,
//         //                 medicineName: populatedItem.medicineName,
//         //                 category: populatedItem.category,
//         //                 unitPrice: populatedItem.unitPrice,
//         //                 quantity: item.quantity,
//         //             });
//         //         }
    
//         //         for (const med of allMedicines) {
//         //             if (!medicines.some(item => item.medicineId === med._id.toString())) {
//         //                 populatedMedicines.push({
//         //                     medicineId: med._id,
//         //                     medicineName: med.medicineName,
//         //                     category: med.category,
//         //                     unitPrice: med.unitPrice,
//         //                     quantity: 0,
//         //                 });
//         //             }
//         //         }
    
//         //         inventory = new Inventory({ inventoryId, medicines: populatedMedicines });
//         //     } else {
//         //         // If inventory exists, update it with the new medicines and quantities
//         //         for (const item of medicines) {
//         //             const existingMedicine = inventory.medicines.find(med => med.medicineId === item.medicineId);
//         //             if (existingMedicine) {
//         //                 existingMedicine.quantity += item.quantity;
//         //             } else {
//         //                 inventory.medicines.push({
//         //                     medicineId: item.medicineId,
//         //                     medicineName: item.medicineName,
//         //                     category: item.category,
//         //                     unitPrice: item.unitPrice,
//         //                     quantity: item.quantity,
//         //                 });
//         //             }
//         //         }
//         //     }
    
//         //     // Save the inventory document
//         //     const savedInventory = await inventory.save();
    
//         //     res.status(201).json({ message: 'Inventory created/updated successfully', inventory: savedInventory });
//         // } catch (error) {
//         //     console.error(error);
//         //     res.status(500).json({ error: 'Internal Server Error' });
//         // }
//         const createInventory = async (req, res) => {
//             const { inventoryId, adminId } = req.body;
        
//             try {
//                 const allMedicines = await Medicine.find({});
        
//                 const medicines = [];
        
//                 allMedicines.forEach(medicine => {
//                     const existingMedicine = medicines.find(item => item.medicineId === medicine._id);
        
//                     if (!existingMedicine) {
//                         medicines.push({ medicineId: medicine._id, quantity: 0 });
//                     }
//                 });
        
//                 const newItem = new Inventory({ inventoryId, adminId, medicines });
        
//                 await newItem.save();
        
//                 res.status(201).json({ newItem, allMedicines });
//             } catch (error) {
//                 console.error('Error creating inventory item:', error);
//                 res.status(500).json({ error: 'Internal Server Error' });
//             }
//         };
         

// const addMedicineToInventory  = async (req, res) => {
//     try {
//         const { inventoryId, medicineId, medicineName, category, unitPrice, stock, place } = req.body;
    
//         // Check if the inventory exists
//         const inventory = await Inventory.findById(inventoryId);
//         if (!inventory) {
//           return res.status(404).json({ message: 'Inventory not found' });
//         }
    
//         // Create or find the medicine in the database
//         let newMedicine = await Medicine.findOneAndUpdate({ medicineId }, { medicineName, category }, { upsert: true, new: true });
    
//         // Add the medicine to the inventory
//         inventory.medicines.push({
//           medicineId: newMedicine._id,
//           medicineName,
//           category,
//           unitPrice,
//           stock,
//           place
//         });
    
//         // Save the inventory with added medicine
//         await inventory.save();
    
//         res.status(201).json({ message: 'Medicine added to inventory successfully' });
//       } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Error adding medicine to inventory' });
//       }
//     };
// //     try {
// //         const { inventoryId, medicines } = req.body;

// //         // Check if the inventory exists
// //         const existingInventory = await Inventory.findOne({ inventoryId });
// //         if (!existingInventory) {
// //             return res.status(404).json({ error: 'Inventory not found' });
// //         }

// //         // Update existing medicines or add new medicines
// //         for (const updatedMedicine of medicines) {
// //             const existingMedicineIndex = existingInventory.medicines.findIndex(item => item.medicineId.toString() === updatedMedicine.medicineId);
// //             if (existingMedicineIndex !== -1) {
// //                 // If the medicine already exists in the inventory, update its quantity by adding the new quantity
// //                 existingInventory.medicines[existingMedicineIndex].quantity = Number(existingInventory.medicines[existingMedicineIndex].quantity) + Number(updatedMedicine.quantity);
// //             } else {
// //                 // If the medicine doesn't exist in the inventory, add it with the new quantity
// //                 existingInventory.medicines.push({
// //                     medicineId: updatedMedicine.medicineId,
// //                     medicineName: updatedMedicine.medicineName,
// //                     category: updatedMedicine.category,
// //                     unitPrice: updatedMedicine.unitPrice,
// //                     quantity: updatedMedicine.quantity
// //                 });
// //             }
// //         }

// //         // Update the inventory in the database
// //         const savedInventory = await existingInventory.save();

// //         res.status(200).json({ message: 'Inventory updated successfully', inventory: savedInventory });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // };

// module.exports = {
//     createInventory,addMedicineToInventory,

// };
