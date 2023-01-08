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
import ArticleIcon from "@mui/icons-material/Article";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PeopleIcon from "@mui/icons-material/People";
import ReorderIcon from "@mui/icons-material/Reorder";
import LogoImage from "../../../assets/logo-main-logo-blue.svg";

import "../../../styles/common.styles.scss";
import "./maincontainer.styles.scss";
import RouterList from "../../../routes/routerList";

const drawerWidth = 240;

const pages = ["Products", "Pricing", "Blog"];
const settings = [
  {
    label: "Profile",
    link: `${RouterList.admin.admin}/${RouterList.admin.profile}`,
  },
  { label: "Logout" },
];

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
    {
      path: RouterList.admin.adminfatwas,
      title: "FATWA",
      icon: <ListAltIcon />,
    },
    { path: RouterList.admin.article, title: "ARTICLE", icon: <ArticleIcon /> },
    {
      path: RouterList.admin.category,
      title: "CATEGORY",
      icon: <SummarizeIcon />,
    },
    {
      path: RouterList.admin.mufthiAndStudent,
      title: "Mufthi & Student",
      icon: <PeopleIcon />,
    },
    {
      path: RouterList.admin.user,
      title: "Musthafti (User)",
      icon: <PeopleIcon />,
    },
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
            <div className="col-md-2 logo pointer">
              <img
                className="bg-light logo-image rounded"
                src={LogoImage}
                alt="logo image"
              />
            </div>
            <div className="row col-md-8 ">
              <div className="col-auto px-0 pointer">
                {getPathName() !== "Dashboard" && (
                  <ArrowBackIosIcon onClick={() => navigate(-1)} />
                )}
              </div>
              <div className="col-auto px-0">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {getPathName()}
                </Typography>
              </div>
            </div>
            <div className="col-md-2 logout-section">
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
                  {settings.map((setting, index) => {
                    return (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          handleCloseUserMenu();
                          setting?.link && navigate(setting?.link);
                        }}
                      >
                        <Typography variant="subtitle2">
                          {setting?.label}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
            </div>
          </Toolbar>
        </div>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#000",
            color: "#fff",
          },
        }}
      >
        <Toolbar />
        <div style={{}}>
          <Box sx={{ overflow: "auto" }}>
            <List>
              {routeList.map((item, index) => {
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton onClick={() => navigate(item.path)}>
                      <ListItemIcon style={{ color: "#fff" }}>
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
