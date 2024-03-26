const User = require("../Model/user_Model");
const Med = require("../Model/medicine_Model");
const Admin = require("../Model/admin_Model");
const Bill = require("../Model/bill_Model");
const Order = require("../Model/order_Model");
const Owner = require("../Model/owner_Model");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const home = async (req,res) => {
    try {
        res
        .status(200)
        .send("hey..");
    } catch (error) {
       next(error);
    }
}

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    console.log('Received request body:', req.body); 

    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// const login = async (req, res) => {
//   try {
//       const { username, password, role } = req.body;
//       let userExist;

//       if (role === 'admin') {
//           userExist = await Admin.findOne({ username });
//       } else if (role === 'owner') {
//           userExist = await Owner.findOne({ username });
//       } else if (role === 'superAdmin') {
//         userExist = await User.findOne({ username });
//       } else {
//           return res.status(400).json({ msg: "Invalid Role" });
//       }

//       if (!userExist || userExist.role !== role) {
//           return res.status(400).json({ msg: "Invalid Credentials" });
//       }

//       const isPasswordValid = await userExist.comparePassword(password);
//       if (isPasswordValid) {
//           const token = await userExist.generateToken();
//           res.status(200).json({
//               msg: "Login Successful",
//               token,
//               userId: userExist._id.toString()
//           });
//       } else {
//           res.status(401).json({ msg: "Invalid username and password" });
//       }

//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ msg: "Internal Server Error" });
//   }
// };
// const login = async (req, res) => {
//   try {
//     const { username, password, role } = req.body;
//     let userExist;

//     switch (role) {
//       case 'superAdmin':
//         userExist = await User.findOne({ username });
//         break;
//       case 'owner':
//         userExist = await Owner.findOne({ username });
//         break;
//       case 'admin':
//         userExist = await Admin.findOne({ username });
//         break;
//       default:
//         return res.status(400).json({ msg: "Invalid Role" });
//     }

//     if (!userExist || userExist.role !== role) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     const isPasswordValid = await userExist.comparePassword(password);
//     if (isPasswordValid) {
//       const token = await userExist.generateToken();
//       res.status(200).json({
//         msg: "Login Successful",
//         token,
//         userId: userExist._id.toString()
//       });
//     } else {
//       res.status(401).json({ msg: "Invalid username and password" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// };
const login = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    let userExist;

    switch (role) {
      case 'superAdmin':
        userExist = await User.findOne({ username });
        break;
      case 'owner':
        userExist = await Owner.findOne({ username });
        break;
      case 'admin':
        userExist = await Admin.findOne({ username });
        break;
      default:
        return res.status(400).json({ msg: "Invalid Role" });
    }

    if (!userExist || userExist.role !== role) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);
    if (isPasswordValid) {
      const token = jwt.sign({ userId: userExist._id }, JWT_SECRET);
      res.status(200).json({
        msg: "Login Successful",
        token,
        userId: userExist._id.toString()
      });
    } else {
      res.status(401).json({ msg: "Invalid username and password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const medicine = async (req,res) => {
        const { medicineId,medicineName,category,unitPrice } = req.body;
        const addmedicine = await Med.create(req.body);
        res
        .status(201)
        .json({ 
            message: "Add Medicine Successful", 
           });  
   
};

const change_Password =async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await user.comparePassword(currentPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    await user.changePassword(currentPassword, newPassword);

    res.status(200).json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const medicineFind = async (req,res) => {
    const medicines = await Med.find();
    res.status(200).json(medicines);
};

const medicineUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log(id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId format' });
        }

        const updatedMedicine = await Med.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMedicine) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        res.status(200).json(updatedMedicine);
    } catch (error) {
        console.error('Error in medicineUpdate:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

const medicineDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMedicine = await Med.findByIdAndDelete(id);

        if (!deletedMedicine) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        res.status(200).json({ message: 'Medicine deleted successfully' });
    } catch (error) {
        console.error('Error in medicineDelete:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
const createInitialInventory = async (adminId) => {
  try {
      // Define initial inventory items for the admin (if needed)
      const initialInventoryItems = [
          // Define your initial inventory items here
      ];

      // Create inventory items for the admin
      const inventoryItems = await Promise.all(initialInventoryItems.map(async (item) => {
          // Create inventory item
          const newItem = new Inventory({ ...item, adminId });
          return await newItem.save();
      }));

      return inventoryItems;
  } catch (error) {
      console.error('Error creating initial inventory:', error);
  }
};
const  adminAdd = async (req,res,next) => {
    try {
      const { adminId,username,cityName,location,phoneNo,email,password,owner,role } = req.body;
      const adminadd = await Admin.create(req.body);
    const inventory = await createInitialInventory(adminadd._id);
    console.log(adminadd._id);
    await updateOwnersWithAdminsCount();
          res.status(201).json({message: 'Add Admin Successful'});
    } catch (error) {
        console.log(error);
    }
};

const adminFind = async (req,res) => {
    const findAdmin = await Admin.find();
    res.status(200).json(findAdmin);
};

const adminUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId format' });
        }
        const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error('Error in adminUpdate:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

const adminDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
    await updateOwnersWithAdminsCount();

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error in adminDelete:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

const updateOwnersWithAdminsCount = async () => {
  try {
      const ownersWithAdmins = await Owner.aggregateWithAdminsAndUpdate();

      for (const owner of ownersWithAdmins) {
          await Owner.findOneAndUpdate(
              { _id: owner._id },
              { $set: { AdminsNoOf: owner.AdminsNoOf } },
              { new: true }
          );
      }

      console.log("Owners updated successfully with AdminsNoOf");
  } catch (error) {
      console.error("Error updating owners with AdminsNoOf:", error);
  }
};

const ownerAdd = async (req, res, next) => {
  try {
    const { ownerId, username, cityName, phoneNo, email, password, role } = req.body;
    const addOwner = await Owner.create(req.body);
    await updateOwnersWithAdminsCount();
    res.status(201).json({ message: 'Add Owner Successful',addOwner });
  } catch (error) {
    next(error);
  }
};


const ownerFind = async (req,res) => {
  const findOwner = await Owner.find();
  res.status(200).json(findOwner);
};

const ownerUpdate = async (req, res) => {
  try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ error: 'Invalid ObjectId format' });
      }
      const updatedOwner = await Owner.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedOwner) {
          return res.status(404).json({ error: 'Owner not found' });
      }
      res.status(200).json(updatedOwner);
  } catch (error) {
      console.error('Error in adminUpdate:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

const ownerDelete = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedOwner = await Owner.findByIdAndDelete(id);

      if (!deletedOwner) {
          return res.status(404).json({ error: 'Owner not found' });
      }

      res.status(200).json({ message: 'Owner deleted successfully' });
  } catch (error) {
      console.error('Error in ownerDelete:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

const billCreate = async (req, res) => {
  try {
    const { customerName, phoneNo, medicines } = req.body;

    for (const medicine of medicines) {
      const fetchedMedicine = await Med.findOne({ medicineName: medicine.medicineName });
      if (!fetchedMedicine) {
        throw new Error("Medicine not found: " + medicine.medicineName);
      }

      medicine.medicineId = fetchedMedicine.medicineId;
      medicine.unitPrice = fetchedMedicine.unitPrice;
      medicine.category = fetchedMedicine.category;


      if (isNaN(medicine.quantity) || medicine.quantity <= 0) {
        throw new Error("Invalid quantity for medicine: " + medicine.medicineName);
      }

      medicine.subTotal = fetchedMedicine.unitPrice * medicine.quantity;
      if (isNaN(medicine.subTotal) || medicine.subTotal <= 0) {
        throw new Error("Invalid subtotal for medicine: " + medicine.medicineName);
      }
    }

    const totalAmount = medicines.reduce((total, medicine) => total + medicine.subTotal, 0);

    const newBill = new Bill({
      customerName,
      phoneNo,
      medicines,
      totalAmount,
    });

    await newBill.save();

    res.status(201).json({ message: "Bill created successfully", data: newBill });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ message: "Error creating bill" });
  }
};

const billFind = async (req,res) => {
const FindBill = await Bill.find();
res.status(200).json(FindBill);
};

const billFindOne = async (req, res) => {
  try {
    const { billId } = req.params;

    const bill = await Bill.findOne({ billId });

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.json({ message: 'Bill found', data: bill });
  } catch (error) {
    console.error('Error fetching bill:', error);
    res.status(500).json({ message: 'Error fetching bill' });
  }
};

// const billUpdate = async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ error: 'Invalid ObjectId format' });
//         }
//         const updatedBill = await Bill.findByIdAndUpdate(id, req.body, { new: true });
//         if (!updatedBill) {
//             return res.status(404).json({ error: 'Bill not found' });
//         }
//         res.status(200).json(updatedBill);
//     } catch (error) {
//         console.error('Error in billUpdate:', error);
//         res.status(500).json({ error: 'Internal Server Error', details: error.message });
//     }
// };

const addMedicineToBillController = async (req, res) => {
    try {
      const { billId, medicineId ,quantity } = req.body;
  
      const medicine = await Med.findById(medicineId);
  
      if (!medicine) {
        return res.status(404).json({ error: 'Medicine not found' });
      }
      
      const bill = await Bill.findOne({ billId });
  
      if (!bill) {
        return res.status(404).json({ error: 'Bill not found' });
      }
      const isExistingMedicine = bill.medicines.some(
        (med) => med.medicineId.toString() === medicineId
      );
  
      if (isExistingMedicine) {
        return res
          .status(400)
          .json({ error: 'Medicine already exists in the bill' });
      }
      const medicineName = medicine.medicineName;
      const unitPrice = medicine.unitPrice;
      const subTotal = quantity * unitPrice;
      const totalPrice = quantity * unitPrice;
      const updatedBill = await Bill.findOneAndUpdate(
        { billId },
        {
          $push: {
            medicines: {
              medicineId,
              medicineName,
              quantity,
              unitPrice,
              subTotal,
              totalPrice,
            },
          },
          $inc: {
            totalAmount: totalPrice,
          },
        },
        { new: true } 
      );
  
      if (!updatedBill) {
        return res.status(404).json({ error: 'Bill not found' });
      }
      res.status(200).json({ message: 'Medicine added to bill successfully', updatedBill });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const createOrder = async (req, res) => {
    try {
        const { adminId,totalAmount } = req.body;

       
        if (!adminId || !orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ error: 'Invalid input' });
        }

     
        const orderItemsWithSubtotal = orderItems.map(item => {
            const subTotal = item.unitPrice * item.quantity;
            return {
                ...item,
                subTotal: subTotal
            };
        });

   
        const order = new Order({ adminId, orderItems: orderItemsWithSubtotal });

      
        const savedOrder = await order.save();
        
       const createOrder = await Order.create(req.body);

        res.status(201).json({ message: 'Order created successfully', 
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  const findOrder = async (req, res) => {
    try {
      const { adminId } = req.params;
  
      const orders = await Order.find({ adminId });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for the specified admin' });
      }
      
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const findAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found' });
      }
  
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderItems } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        for (const newItem of orderItems) {
            newItem.quantity = Number(newItem.quantity);

            const medicine = await Med.findById(newItem.medicineId);

            if (!medicine) {
                return res.status(404).json({ error: `Medicine not found for ID: ${newItem.medicineId}` });
            }

            const existingIndex = order.orderItems.findIndex(item => item.medicineId.toString() === newItem.medicineId);

            if (existingIndex !== -1) {
                order.orderItems[existingIndex].quantity += newItem.quantity;
                order.orderItems[existingIndex].subTotal += (newItem.quantity * medicine.unitPrice);
                order.totalAmount += (newItem.quantity * medicine.unitPrice)  ;
              } else {
                const subTotal = newItem.quantity * medicine.unitPrice;
                const totalPrice =  subTotal;
                order.orderItems.push({
                    medicineId: newItem.medicineId,
                    medicineName: medicine.medicineName,
                    quantity: newItem.quantity,
                    unitPrice: medicine.unitPrice,
                    subTotal: subTotal,
                    totalAmount: totalPrice,
                });
                order.totalAmount += totalPrice;
            }
        }
  const updatedOrder = await order.save();
        res.status(200).json({ message: 'Order items updated successfully', updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
  const deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId;
  
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      await Order.findByIdAndDelete(orderId);
  
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
module.exports = { home,register,login,change_Password,medicine , medicineFind,medicineUpdate,medicineDelete,
     adminAdd , adminFind ,adminUpdate,adminDelete , 
     ownerAdd,ownerFind,ownerUpdate,ownerDelete ,
     billCreate ,billFind, addMedicineToBillController ,billFindOne, 
     createOrder,findOrder,findAllOrders,updateOrder,deleteOrder};