import React, { useState } from "react";
import axios from "axios";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Customers from "scenes/customers";
import Medicine from "scenes/Medicine";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import Owner from "scenes/owner";
import Adminno from "scenes/adminno";
import LoginForm from "scenes/login";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (userData) => {
    try {
      // Assuming login request is made to "/api/login"
      const response = await axios.post("/api/login", userData);
      if (response.status === 200) {
        // Login successful
        setLoggedIn(true);
      } else {
        // Login failed
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginForm handleLogin={handleLogin} />} />
            {loggedIn && (
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Customers" element={<Customers />} />
                <Route path="/medicine" element={<Medicine />} />
                <Route path="/Geography" element={<Geography />} />
                <Route path="/Overview" element={<Overview />} />
                <Route path="/Daily" element={<Daily />} />
                <Route path="/Monthly" element={<Monthly />} />
                <Route path="/Breakdown" element={<Breakdown />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/Owner" element={<Owner />} />
                <Route path="/Performance" element={<Performance />} />
                <Route path="/Adminno" element={<Adminno />} />
              </Route>
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
