import * as React from "react";
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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";

import "../../../styles/common.styles.scss";
import "./maincontainer.styles.scss";
import RouterList from "../../../routes/routerList";

const drawerWidth = 240;

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];

function DashboardPage() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let navigate = useNavigate();
  const location = useLocation();

  const [routeList] = useState([
    { path: RouterList.admin.admin, title: "HOME", icon: <DashboardIcon /> },
    { path: RouterList.admin.adminfatwas, title: "FATWA" },
    { path: RouterList.admin.article, title: "ARTICLE" },
    { path: RouterList.admin.category, title: "CATEGORY" },
    { path: RouterList.admin.user, title: "USER", icon: <DashboardIcon /> },
    { path: RouterList.admin.musthafthies, title: "MUSTAFTHI" },
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
            <div className="row col-md-8">
              <div className="col-auto px-0 pointer">
                <ArrowBackIosIcon onClick={() => navigate(-1)} />
              </div>
              <div className="col-auto px-0">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {getPathName()}
                </Typography>
              </div>
            </div>
            <div className="col-md-2 logout-section">
              {/* <Button
                color="inherit"
                onClick={() => navigate(`${RouterList.user.login}`)}
              >
                Logout
              </Button> */}

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
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
              {routeList.map((item, index) => {
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton onClick={() => navigate(item.path)}>
                      <ListItemIcon>
                        {item.icon || <HomeIcon />}
                        {/* {index % 2 === 0 ? <HomeIcon /> : <ViewListIcon />} */}
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
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
