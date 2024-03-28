// import React from "react";
// import {
//   Box,
//   Divider,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import {
//   ChevronLeft,
//   ChevronRightOutlined,
//   HomeOutlined,
//   Groups2Outlined,
//   ReceiptLongOutlined,
//   // PublicOutlined,
//   PointOfSaleOutlined,
//   TodayOutlined,
//   CalendarMonthOutlined,
//   AdminPanelSettingsOutlined,
//   TrendingUpOutlined,
//   PieChartOutlined,
// } from "@mui/icons-material";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import FlexBetween from "./FlexBetween";

// var f = false;

// const superadmin = [
//   {
//     text: "Dashboard",
//     icon: <HomeOutlined />,
//   },
  
//   {
//     text: "Client Facing",
//     icon: null,
//   }, 
//   {
//     text: "Medicine",
//     icon: null,
//   }, 
//   {
//     text: "Inventory",
//     icon: <Groups2Outlined />,
//   }, 

//   {
//     text: "Sales",
//     icon: null,
//   },
//   {
//     text: "Overview",
//     icon: <PointOfSaleOutlined />,
//   },
//   {
//     text: "Daily",
//     icon: <TodayOutlined />,
//   },
//   {
//     text: "Monthly",
//     icon: <CalendarMonthOutlined />,
//   },
//   {
//     text: "Breakdown",
//     icon: <PieChartOutlined />,
//   },

//   {
//     text: "Management",
//     icon: null,
//   }, 
//   {
//     text: "Admins",
//     icon: <AdminPanelSettingsOutlined />,
//   } ,
//   {
//     text: "Owner",
//     icon: <PieChartOutlined />,
//   },
//   {
//     text: "Performance",
//     icon: <TrendingUpOutlined />,
//   },
// ];

// const owner = [
//   {
//     text: "Dashboard",
//     icon: <HomeOutlined />,
//   },
//   {
//     text: "Client Facing",
//     icon: null,
//   },
//   {
//     text: "Order List",
//     icon: null,
//   },
//   {
//     text: "Performance",
//     icon: <TrendingUpOutlined />,
//   },
//   {
//     text: "Management",
//     icon: null,
//   },
//   {
//     text: "Admin",
//     icon: <AdminPanelSettingsOutlined />,
//   },
//   {
//     text: "Report",
//     icon: null,
//   },
// ]

// const admin = [
//   {
//     text: "Dashboard",
//     icon: <HomeOutlined />,
//   },
//   {
//     text: "Client Facing",
//     icon: null,
//   },
//   {
//     text: "Bill",
//     icon: <ReceiptLongOutlined />,
//   },
//   {
//     text: "Medicine",
//     icon: <Groups2Outlined />,
//   }, 
//   {
//     text: "Order",
//     icon: null,
//   },
//   {
//     text: "Medicines",
//     icon: null,
//   },
//   {
//     text: "Performance",
//     icon: <TrendingUpOutlined />,
//   },
// ]

// const Sidebar = ({
//   user,
//   drawerWidth,
//   isSidebarOpen,
//   setIsSidebarOpen,
//   isNonMobile,
// }) => {
//   const { pathname } = useLocation();
//   const [active, setActive] = useState("");
//   const navigate = useNavigate();
//   const theme = useTheme();

//   useEffect(() => {
//     setActive(pathname.substring(1));
//   }, [pathname]);

//   return (
//     <Box component="nav">
//       {isSidebarOpen && (
//         <Drawer
//           open={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)}
//           variant="persistent"
//           anchor="left"
//           sx={{
//             width: drawerWidth,
//             "& .MuiDrawer-paper": {
//               color: theme.palette.secondary[200],
//               backgroundColor: theme.palette.background.alt,
//               boxSixing: "border-box",
//               borderWidth: isNonMobile ? 0 : "2px",
//               width: drawerWidth,
//             },
//           }}
//         >
//           <Box width="100%">
//             <Box m="1.5rem 2rem 2rem 3rem">
//               <FlexBetween color={theme.palette.secondary.main}>
//                 <Box display="flex" alignItems="center" gap="0.5rem">
//                   <Typography variant="h2" fontWeight="bold">
//                     Shayona
//                   </Typography>
//                 </Box>
//                 {!isNonMobile && (
//                   <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                     <ChevronLeft />
//                   </IconButton>
//                 )}
//               </FlexBetween>
//             </Box>
//             <List>
//               {f === false && owner.map(({ text, icon }) => {
//                 if (!icon) {
//                   return (
//                     <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
//                       {text}
//                     </Typography>
//                   );
//                 }
//                 const lcText = text.toLowerCase();

//                 return (
//                   <ListItem key={text} disablePadding>
//                     <ListItemButton
//                       onClick={() => {
//                         navigate(`/${lcText}`);
//                         setActive(lcText);
//                       }}
//                       sx={{
//                         backgroundColor:
//                           active === lcText
//                             ? theme.palette.secondary[300]
//                             : "transparent",
//                         color:
//                           active === lcText
//                             ? theme.palette.primary[600]
//                             : theme.palette.secondary[100],
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           ml: "2rem",
//                           color:
//                             active === lcText
//                               ? theme.palette.primary[600]
//                               : theme.palette.secondary[200],
//                         }}
//                       >
//                         {icon}
//                       </ListItemIcon>
//                       <ListItemText primary={text} />
//                       {active === lcText && (
//                         <ChevronRightOutlined sx={{ ml: "auto" }} />
//                       )}
//                     </ListItemButton>
//                   </ListItem>
//                 );
//               })}
//               {f === true && superadmin.map(({ text, icon }) => {
//                 if (!icon) {
//                   return (
//                     <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
//                       {text}
//                     </Typography>
//                   );
//                 }
//                 const lcText = text.toLowerCase();

//                 return (
//                   <ListItem key={text} disablePadding>
//                     <ListItemButton
//                       onClick={() => {
//                         navigate(`/${lcText}`);
//                         setActive(lcText);
//                       }}
//                       sx={{
//                         backgroundColor:
//                           active === lcText
//                             ? theme.palette.secondary[300]
//                             : "transparent",
//                         color:
//                           active === lcText
//                             ? theme.palette.primary[600]
//                             : theme.palette.secondary[100],
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           ml: "2rem",
//                           color:
//                             active === lcText
//                               ? theme.palette.primary[600]
//                               : theme.palette.secondary[200],
//                         }}
//                       >
//                         {icon}
//                       </ListItemIcon>
//                       <ListItemText primary={text} />
//                       {active === lcText && (
//                         <ChevronRightOutlined sx={{ ml: "auto" }} />
//                       )}
//                     </ListItemButton>
//                   </ListItem>
//                 );
//               })}
//                {f === false && admin.map(({ text, icon }) => {
//                 if (!icon) {
//                   return (
//                     <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
//                       {text}
//                     </Typography>
//                   );
//                 }
//                 const lcText = text.toLowerCase();

//                 return (
//                   <ListItem key={text} disablePadding>
//                     <ListItemButton
//                       onClick={() => {
//                         navigate(`/${lcText}`);
//                         setActive(lcText);
//                       }}
//                       sx={{
//                         backgroundColor:
//                           active === lcText
//                             ? theme.palette.secondary[300]
//                             : "transparent",
//                         color:
//                           active === lcText
//                             ? theme.palette.primary[600]
//                             : theme.palette.secondary[100],
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           ml: "2rem",
//                           color:
//                             active === lcText
//                               ? theme.palette.primary[600]
//                               : theme.palette.secondary[200],
//                         }}
//                       >
//                         {icon}
//                       </ListItemIcon>
//                       <ListItemText primary={text} />
//                       {active === lcText && (
//                         <ChevronRightOutlined sx={{ ml: "auto" }} />
//                       )}
//                     </ListItemButton>
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Box>

//           <Box position="absolute" bottom="2rem">
//             <Divider />
//             <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
//               <Box textAlign="left">
//                 <Typography
//                   fontWeight="bold"
//                   fontSize="0.9rem"
//                   sx={{ color: theme.palette.secondary[100] }}
//                 >
//                   {user.name}
//                 </Typography>
//                 <Typography
//                   fontSize="0.8rem"
//                   sx={{ color: theme.palette.secondary[200] }}
//                 >
//                   {user.occupation}
//                 </Typography>
//               </Box>
              
//             </FlexBetween>
//           </Box>
//         </Drawer>
//       )}
//     </Box>
//   );
// };

// export default Sidebar;
/////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Divider,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import {
//   ChevronLeft,
//   ChevronRightOutlined,
//   HomeOutlined,
//   Groups2Outlined,
//   ReceiptLongOutlined,
//   PointOfSaleOutlined,
//   TodayOutlined,
//   CalendarMonthOutlined,
//   AdminPanelSettingsOutlined,
//   TrendingUpOutlined,
//   PieChartOutlined,
// } from "@mui/icons-material";
// import { useLocation, useNavigate } from "react-router-dom";
// import FlexBetween from "./FlexBetween";

// const navItems = [
//   {
//     text: "Dashboard",
//     icon: <HomeOutlined />,
//     // roles: ["superAdmin", "admin", "owner"], 
//   },
//   {
//     text: "Client Facing",
//     icon: null,
//     // roles: ["superAdmin", "admin", "owner"],
//   },
//   {
//     text: "Bill",
//     icon: <ReceiptLongOutlined />,
//     roles: ["superAdmin", "admin", "owner"],
//   },
//   {
//     text: "Inventory",
//     icon: <Groups2Outlined />,
//     // roles: ["superAdmin", "admin", "owner"],
//   },
//   {
//     text: "Sales",
//     icon: null,
//     // roles: ["superAdmin", "admin", "owner"],
//     children: [
//       {
//         text: "Overview",
//         icon: <PointOfSaleOutlined />,
//         roles: ["superAdmin", "admin", "owner"],
//       },
//       {
//         text: "Daily",
//         icon: <TodayOutlined />,
//         // roles: ["superAdmin", "admin", "owner"],
//       },
//       {
//         text: "Monthly",
//         icon: <CalendarMonthOutlined />,
//         roles: ["superAdmin", "admin", "owner"],
//       },
//       {
//         text: "Breakdown",
//         icon: <PieChartOutlined />,
//         roles: ["superAdmin", "admin", "owner"],
//       },
//     ],
//   },
//   {
//     text: "Management",
//     icon: null,
//     // roles: ["superAdmin", "admin"],
//     children: [
//       {
//         text: "Admin",
//         icon: <AdminPanelSettingsOutlined />,
//         // roles: ["superAdmin", "admin"],
//       },
//       {
//         text: "Admins",
//         icon: <AdminPanelSettingsOutlined />,
//         // roles: ["superAdmin", "admin"],
//       },
//       {
//         text: "Owner",
//         icon: <PieChartOutlined />,
//         roles: ["superAdmin", "admin"],
//       },
//       {
//         text: "Performance",
//         icon: <TrendingUpOutlined />,
//         // roles: ["superAdmin", "admin"],
//       },
//     ],
//   },
// ];

// const Sidebar = ({
//   user,
//   drawerWidth,
//   isSidebarOpen,
//   setIsSidebarOpen,
//   isNonMobile,
// }) => {
//   const { pathname } = useLocation();
//   const [active, setActive] = useState("");
//   const navigate = useNavigate();
//   const theme = useTheme();

//   useEffect(() => {
//     setActive(pathname.substring(1));
//   }, [pathname]);

//   const filteredNavItems = navItems.filter((item) => {
//     if (!item.roles) return true; // Show if no roles specified
//     return item.roles.includes(user.role);
//   });

//   return (
//     <Box component="nav">
//       {isSidebarOpen && (
//         <Drawer
//           open={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)}
//           variant="persistent"
//           anchor="left"
//           sx={{
//             width: drawerWidth,
//             "& .MuiDrawer-paper": {
//               color: theme.palette.secondary[200],
//               backgroundColor: theme.palette.background.alt,
//               boxSixing: "border-box",
//               borderWidth: isNonMobile ? 0 : "2px",
//               width: drawerWidth,
//             },
//           }}
//         >
//           <Box width="100%">
//             <Box m="1.5rem 2rem 2rem 3rem">
//               <FlexBetween color={theme.palette.secondary.main}>
//                 <Box display="flex" alignItems="center" gap="0.5rem">
//                   <Typography variant="h2" fontWeight="bold">
//                     Shayona
//                   </Typography>
//                 </Box>
//                 {!isNonMobile && (
//                   <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                     <ChevronLeft />
//                   </IconButton>
//                 )}
//               </FlexBetween>
//             </Box>
//             <List>
//               {filteredNavItems.map(({ text, icon, children }) => {
//                 if (!icon) {
//                   return (
//                     <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
//                       {text}
//                     </Typography>
//                   );
//                 }
//                 const lcText = text.toLowerCase();

//                 return (
//                   <ListItem key={text} disablePadding>
//                     <ListItemButton
//                       onClick={() => {
//                         navigate(`/${lcText}`);
//                         setActive(lcText);
//                       }}
//                       sx={{
//                         backgroundColor:
//                           active === lcText
//                             ? theme.palette.secondary[300]
//                             : "transparent",
//                         color:
//                           active === lcText
//                             ? theme.palette.primary[600]
//                             : theme.palette.secondary[100],
//                       }}
//                       >
//                       <ListItemIcon
//                         sx={{
//                           ml: "2rem",
//                           color:
//                             active === lcText
//                               ? theme.palette.primary[600]
//                               : theme.palette.secondary[200],
//                         }}
//                       >
//                         {icon}
//                       </ListItemIcon>
//                       <ListItemText primary={text} />
//                       {children && active === lcText && (
//                         <ChevronRightOutlined sx={{ ml: "auto" }} />
//                       )}
//                     </ListItemButton>
//                     {children && active === lcText && (
//                       <List sx={{ pl: "3rem" }}>
//                         {children.map(({ text, icon }) => (
//                           <ListItem key={text} disablePadding>
//                             <ListItemButton
//                               onClick={() => navigate(`/${text.toLowerCase()}`)}
//                               sx={{
//                                 backgroundColor:
//                                   active === lcText
//                                     ? theme.palette.secondary[300]
//                                     : "transparent",
//                                 color:
//                                   active === lcText
//                                     ? theme.palette.primary[600]
//                                     : theme.palette.secondary[100],
//                               }}
//                             >
//                               <ListItemIcon
//                                 sx={{
//                                   ml: "2rem",
//                                   color:
//                                     active === lcText
//                                       ? theme.palette.primary[600]
//                                       : theme.palette.secondary[200],
//                                 }}
//                               >
//                                 {icon}
//                               </ListItemIcon>
//                               <ListItemText primary={text} />
//                             </ListItemButton>
//                           </ListItem>
//                         ))}
//                       </List>
//                     )}
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Box>

//           <Box position="absolute" bottom="2rem">
//             <Divider />
//             <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
//               <Box textAlign="left">
//                 <Typography
//                   fontWeight="bold"
//                   fontSize="0.9rem"
//                   sx={{ color: theme.palette.secondary[100] }}
//                 >
//                   {user.name}
//                 </Typography>
//                 <Typography
//                   fontSize="0.8rem"
//                   sx={{ color: theme.palette.secondary[200] }}
//                 >
//                   {user.occupation}
//                 </Typography>
//               </Box>
              
//             </FlexBetween>
//           </Box>
//         </Drawer>
//       )}
//     </Box>
//   );
// };

// export default Sidebar;
/////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  // PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

var f = false;

const superAdmin = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Bill",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Medicine",
    icon: <Groups2Outlined />,
  
  },
  {
    text: "Order",
    icon: <ReceiptLongOutlined /> ,
  },
  
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  } ,
  {
    text: "Admins",
    icon: <AdminPanelSettingsOutlined />,
  } ,
  {
    text: "Owner",
    icon: <PieChartOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const owner = [
  {
    text: "Owner",
    icon: <PieChartOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
]

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h2" fontWeight="bold">
                    Shayona
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {f === true && owner.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
              {f === false && superAdmin.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
