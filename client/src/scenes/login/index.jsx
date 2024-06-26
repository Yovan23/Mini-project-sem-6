// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios"; 
// // import "./Loginform.css";

// // const LoginForm = ({ handleLogin }) => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const navigate = useNavigate();
// // // Update the handleButtonClick function in your frontend code
// // const handleButtonClick = async (role) => {
// //   try {
// //     const response = await axios.post("http://localhost:5000/api/auth/login", { username, password, role });
// //     const { msg, token, userId } = response.data;

// //     if (response.status === 200) {
// //       handleLogin({ username, password, role, token, userId });
// //       navigate("/dashboard"); // Always navigate to dashboard upon successful login
// //     } else {
// //       setErrorMessage(msg);
// //       setTimeout(() => {
// //         setErrorMessage(""); 
// //       }, 1000);
// //     }
// //   } catch (error) {
// //     console.error("Error:", error);
// //     setErrorMessage("Login Failed. Please try again.");
// //   }
// // };

// //   // const handleButtonClick = async (role) => {
// //   //   try {
// //   //     const response = await axios.post("http://localhost:5000/api/auth/login", { username, password, role });
// //   //     const { msg, token, userId } = response.data;

// //   //     if (response.status === 200) {
// //   //       handleLogin({ username, password, role, token, userId });
// //   //       switch (role) {
// //   //         case "superAdmin":
// //   //           navigate("/dashboard"); 
// //   //           break;
// //   //         case "Owner":
// //   //           navigate("/dashboard"); 
// //   //           break;
// //   //         case "Admin":
// //   //           navigate("/dashboard"); 
// //   //           break;
// //   //         default:
// //   //           break;
// //   //       }
// //   //     } else {
// //   //       setErrorMessage(msg);
// //   //       setTimeout(() => {
// //   //         setErrorMessage(""); 
// //   //       }, 1000);
// //   //     }
// //   //   } catch (error) {
// //   //     console.error("Error:", error);
// //   //     setErrorMessage("Login Failed. Please try again.");
// //   //   }
// //   // };

// //   return (
// //     <div className="login-form">
// //       <h2>Login</h2>
// //       <div className="form-group">
// //         <label htmlFor="username">Username:</label>
// //         <input
// //           type="text"
// //           id="username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //         />
// //       </div>
// //       <div className="form-group">
// //         <label htmlFor="password">Password:</label>
// //         <input
// //           type="password"
// //           id="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />
// //       </div>
// //       <div className="button-group">
// //         <button onClick={() => handleButtonClick("superAdmin")}>Super Admin</button>
// //         <button onClick={() => handleButtonClick("Owner")}>Owner</button>
// //         <button onClick={() => handleButtonClick("Admin")}>Admin</button>
// //       </div>
// //       <p className={`error-message ${errorMessage ? "" : "hide"}`}>{errorMessage}</p>
// //     </div>
// //   );
// // };

// // export default LoginForm;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; 
// import "./Loginform.css";

// const LoginForm = ({ handleLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("admin"); // Default role set to admin
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLoginSubmit = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", { username, password, role });
//       const { msg, token, userId } = response.data;

//       if (response.status === 200) {
//         handleLogin({ username, password, role, token, userId });
//         navigate("/dashboard"); 
//       } else {
//         setErrorMessage(msg);
//         setTimeout(() => {
//           setErrorMessage(""); 
//         }, 1000);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setErrorMessage("Login Failed. Please try again.");
//     }
//   };

//   return (
//     <div className="login-form">
//       <h2>Login</h2>
//       <div className="form-group role-selection">
//         <label htmlFor="role">Role:</label>
//         <div className="radio-group">
//           <div>
//             <input
//               type="radio"
//               id="admin"
//               name="role"
//               value="admin"
//               checked={role === "admin"}
//               onChange={() => setRole("admin")}
//             />
//             <label htmlFor="admin">Admin</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="superAdmin"
//               name="role"
//               value="superAdmin"
//               checked={role === "superAdmin"}
//               onChange={() => setRole("superAdmin")}
//             />
//             <label htmlFor="superAdmin">Super Admin</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="owner"
//               name="role"
//               value="owner"
//               checked={role === "owner"}
//               onChange={() => setRole("owner")}
//             />
//             <label htmlFor="owner">Owner</label>
//           </div>
//         </div>
//       </div>
//       <div className="form-group">
//   <label htmlFor="username">Username:</label>
//   <input
//     type="text"
//     id="username"
//     value={username}
//     onChange={(e) => setUsername(e.target.value)}
//   />
// </div>
// <div className="form-group">
//   <label htmlFor="password">Password:</label>
//   <input
//     type="password"
//     id="password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//   />
// </div>
//       <button className="login-button" onClick={handleLoginSubmit}>Login</button>
//       <p className={`error-message ${errorMessage ? "" : "hide"}`}>{errorMessage}</p>
//     </div>
//   );
// };

// export default LoginForm;
// Login form component

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Snackbar } from "@mui/material";
import "./Loginform.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole ] = useState("admin")
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };
  const handleLogin = async (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);

    navigate("/dashboard");
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { username, password, role });
      const { msg, token } = response.data;
// console.log(response.data.role);

      if (response.status === 200) {
        handleLogin(token); 
      } else {
        setErrorMessage(msg);
        setTimeout(() => {
          setErrorMessage(""); 
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Enter valid username and password.");
    }
  };

  const handleSignUpSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username: newUsername,
        password: newPassword,
        role: "superAdmin" 
      });
      showSnackbar("Sign up successful!");
      console.log("Sign Up Response:", response.data);
  
      setNewUsername("");
      setNewPassword("");
      setShowSignUpForm(false);
     
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="login-form">
      <h2>Login</h2>
      <div className="form-group role-selection">
  <div className="radio-group">
    <div>
      <input
        type="radio"
        id="admin"
        name="role"
        value="admin"
        checked={role === "admin"}
        onChange={() => setRole("admin")}
      />
      <label htmlFor="admin">Admin</label>
    </div>
    <div>
      <input
        type="radio"
        id="superAdmin"
        name="role"
        value="superAdmin"
        checked={role === "superAdmin"}
        onChange={() => setRole("superAdmin")}
      />
      <label htmlFor="superAdmin">Super Admin</label>
    </div>
    <div>
      <input
        type="radio"
        id="owner"
        name="role"
        value="owner"
        checked={role === "owner"}
        onChange={() => setRole("owner")}
      />
      <label htmlFor="owner">Owner</label>
    </div>
  </div>
</div>
  <div className="form-group">
  <label htmlFor="username">Username:</label>
  <input
    type="text"
    id="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
</div>
<div className="form-group">
  <label htmlFor="password">Password:</label>
  <input
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</div>
      <button className="login-button" onClick={handleLoginSubmit}>Login</button>
      <p className={`error-message ${errorMessage ? "" : "hide"}`}>{errorMessage}</p>
      {!showSignUpForm && (
        <p className="sign-up-text" onClick={() => setShowSignUpForm(true)}>Sign Up</p>
      )}

{showSignUpForm && (
        <div className="sign-up-form">
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="newUsername">Username:</label>
            <input
              type="text"
              id="newUsername"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
      <label htmlFor="newRole">Role:</label>
      <input
        type="text"
        id="newRole"
        value="superAdmin" 
        readOnly 
      />
    </div>
          <button className="sign-up-button" onClick={handleSignUpSubmit}>Sign Up</button>
        </div>
      )}
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
    </div>
    
  );
};


export default LoginForm;
