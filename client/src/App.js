// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { themeSettings } from "theme";
// import Layout from "scenes/layout";
// import Dashboard from "scenes/dashboard";
// import Bill from "scenes/customers";
// import Medicine from "scenes/Medicine";
// import Geography from "scenes/geography";
// import Overview from "scenes/overview";
// import Daily from "scenes/daily";
// import Monthly from "scenes/monthly";
// import Breakdown from "scenes/breakdown";
// import Admin from "scenes/admin";
// import Performance from "scenes/performance";
// import Owner from "scenes/owner";
// import Admins from "scenes/adminno";
// import Inventory  from "scenes/inventory";
// function App() {
//   const mode = useSelector((state) => state.global.mode);
//   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
//   return (
//     <div className="app">
//       <BrowserRouter>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <Routes>
//             <Route element={<Layout />}>
//               <Route path="/" element={<Navigate to="/dashboard" replace />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/Bill" element={<Bill />} />
//               <Route path="/Inventory" element={<Inventory />} />
//               <Route path="/Geography" element={<Geography />} />
//               <Route path="/Overview" element={<Overview />} />
//               <Route path="/Daily" element={<Daily />} />
//               <Route path="/Monthly" element={<Monthly />} />
//               <Route path="/Breakdown" element={<Breakdown />} />
//               <Route path="/Admin" element={<Admin />} />
//               <Route path="/Admins" element={<Admins />} />
//               <Route path="/Owner" element={<Owner />} />
//               <Route path="/Performance" element={<Performance />} />
//             </Route>
//           </Routes>
//         </ThemeProvider>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
// App.js

// import React, { useState } from 'react';
// import LoginForm from './try/LoginForm';
// import RegisterForm from './try/RegisterForm';

// const App = () => {
//   const [loggedIn, setLoggedIn] = useState(false);

//   const handleLogin = (userData) => {
//     // Perform login logic, e.g., send login request to backend
//     console.log('Logging in with:', userData);
//     // Assuming login is successful, set loggedIn state to true
//     setLoggedIn(true);
//   };

//   // In the parent component (e.g., App.js)
// // In the parent component (e.g., App.js)

// const handleRegister = async (userData) => {
//   try {
//     const response = await fetch('/api/auth/reg', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//     });
//     console.log(userData);
//     if (!response.ok) {
//       throw new Error('Failed to register user');
//     }

//     const data = await response.json();
//     // Optionally, you can handle the response data here (e.g., save tokens, display success message)
//     console.log('User registered successfully:', data);
//   } catch (error) {
//     console.error('Registration error:', error.message);
//     // Optionally, you can handle error states here (e.g., display error message to the user)
//   }
// };

//   return (
//     <div>
//       {!loggedIn ? (
//         <div>
//           <LoginForm handleLogin={handleLogin} />
//           <RegisterForm handleRegister={handleRegister} />
//         </div>
//       ) : (
//         <h2>Welcome, logged in user!</h2>
//       )}
//     </div>
//   );
// };

// export default App;
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { themeSettings } from "theme";
// import Layout from "scenes/layout";
// import Dashboard from "scenes/dashboard";
// import Bill from "scenes/customers";
// import Medicine from "scenes/Medicine";
// import Geography from "scenes/geography";
// import Overview from "scenes/overview";
// import Daily from "scenes/daily";
// import Monthly from "scenes/monthly";
// import Breakdown from "scenes/breakdown";
// import Admin from "scenes/admin";
// import Performance from "scenes/performance";
// import Owner from "scenes/owner";
// import Admins from "scenes/adminno";
// import Inventory  from "scenes/inventory";
// import LoginForm from "scenes/login";
// import Order from "scenes/order";
// import { RoleProvider } from '../src/assets/RoleContext';

// function App() {
//   const mode = useSelector((state) => state.global.mode);
//   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const handleLogin = async (userData) => {
//     console.log("Login attempted with:", userData);
//     if (userData.username === "validUser" && userData.password === "validPassword") {
//       setLoggedIn(true);
//     } else {
//       console.error("Login failed: Invalid credentials");
//     }
//   };

//   return (
//     <div className="app">
//       <BrowserRouter>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <Routes>
//           <Route path="/" element={<Navigate to="/login" replace />} />
//           <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
//             <Route element={<Layout />}>
              
             
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/Bill" element={<Bill />} />
//               <Route path="/medicine" element={<Medicine />} />
//               {/* <Route path="/Inventory" element={<Inventory />} /> */}
//               <Route path="/Geography" element={<Geography />} />
//               <Route path="/Overview" element={<Overview />} />
//               <Route path="/Daily" element={<Daily />} />
//               <Route path="/Monthly" element={<Monthly />} />
//               <Route path="/Breakdown" element={<Breakdown />} />
//               <Route path="/Admin" element={<Admin />} />
//               <Route path="/Owner" element={<Owner />} />
//               <Route path="/Performance" element={<Performance />} />
//               <Route path="/Admins" element={<Admins />} />              
//               <Route path="/Order" element={<Order />} />
              
//             </Route>
        
//           </Routes>
//         </ThemeProvider>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import React, { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Bill from "scenes/customers";
import Medicine from "scenes/Medicine";
import Sales from "scenes/sales/index";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import Owner from "scenes/owner";
import Admins from "scenes/adminno";
import Inventory  from "scenes/inventory";
import LoginForm from "scenes/login";
import Order from "scenes/order";
import OrderPage from "scenes/orderpage";
import OrderList from "scenes/orderlist";
import Sidebar from "./components/Sidebar"; 


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = async (userData) => {
    console.log("Login attempted with:", userData);
    if (userData.username === "validUser" && userData.password === "validPassword") {
      setLoggedIn(true);
    } else {
      console.error("Login failed: Invalid credentials");
    }
  };

  return (
    <div 
    className="app"
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Bill" element={<Bill />} />
                <Route path="/medicine" element={<Medicine />} />
                <Route path="/Inventory" element={<Inventory />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/Owner" element={<Owner />} />
                <Route path="/Performance" element={<Performance />} />
                <Route path="/Admins" element={<Admins />} />              
                <Route path="/Order" element={<Order />} />
                <Route path="/OrderPage" element={<OrderPage />} />
                <Route path="/OrderList" element={<OrderList />} />
                <Route path="/Sales" element={<Sales />} />
              </Route>
            </Routes>
            <Sidebar /> 
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
