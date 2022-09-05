import { useState } from "react";
import { Outlet, useNavigate, useLocation, Router } from "react-router-dom";
import { startCase } from "lodash";

import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";

import "../../../styles/common.styles.scss";
import "./mainContainer.styles.scss";
import RouterList from "../../../routes/routerList";

const drawerWidth = 240;

function DashboardPage() {
  let navigate = useNavigate();
  const location = useLocation();

  const [routeList] = useState([
    { path: RouterList.admin.admin, title: "Dashboard" },
    { path: RouterList.admin.categoryList, title: "Category" },
    { path: RouterList.admin.productList, title: "Products" },
    { path: RouterList.admin.orderList, title: "Orders" },
    { path: RouterList.admin.stockList, title: "Stocks" },
    { path: RouterList.admin.userList, title: "Users" },
  ]);
  const getPathName = () =>
    startCase(
      location?.pathname.split("/").pop() === "admin"
        ? "Dashboard"
        : location?.pathname.split("/").pop()
    );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <div className="row appbar-heading-section">
          <Toolbar>
            <div className="col-md-2 logo">
              <Typography variant="h6" noWrap component="div">
                Company Logo
              </Typography>
            </div>
            <div className="col-md-8">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {getPathName()}
              </Typography>
            </div>
            <div className="col-md-2 logout-section">
              <Button
                color="inherit"
                onClick={() => navigate(`${RouterList.user.login}`)}
              >
                Logout
              </Button>
            </div>
          </Toolbar>
        </div>

        {/* <div className="row appbar-heading-section">
          <div className="col-md-2">
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Clipped drawer
              </Typography>
            </Toolbar>
          </div>
          <div className="col-md-10">
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Dashboard
              </Typography>
            </Toolbar>
          </div>
        </div> */}
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        style={{ backgroundColor: "green" }}
      >
        <Toolbar />
        <div style={{}}>
          <Box sx={{ overflow: "auto" }}>
            <List>
              {routeList.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => navigate(item.path)}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Divider />
          {/* <Box className="logout" onClick={() => navigate("/login")}>
            Logout
          </Box> */}
        </div>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardPage;
