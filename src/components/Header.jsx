import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Nav, Navbar } from "react-bootstrap";

import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
} from "@mui/material";

import HouseIcon from "@mui/icons-material/House";
import PersonIcon from "@mui/icons-material/Person";

import { authLogout } from "../routes/auth";
import routerList from "../routes/routerList";
import Snackbar from "../components/common/Snackbar";
import LogoImage from "../assets/logo-main-logo-blue.svg";
import Logout from "@mui/icons-material/Logout";

import "../styles/header.styles.scss";

const HeaderComponent = ({ closePopup, userLoginDetails }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [errorPopup, setError] = useState({
    visible: false,
    message: "",
    title: "",
  });

  const handleCloseError = () => {
    setError({
      visible: false,
      message: "",
      type: "sucess",
      titile: "",
    });
    closePopup(true);
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (userLoginDetails) {
      navigate(`${routerList.user.accountUser}`);
    } else {
      navigate(`${routerList.user.login}`);
    }
  };

  return (
    <div className="navbar-section container">
      <Navbar bg="light" expand="lg">
        <Container className="navbar-wrapper-main">
          <Navbar.Brand onClick={() => navigate(`${routerList.user.home}`)}>
            <img
              className="img-thumnails img-logo"
              src={LogoImage}
              alt="logo image"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <ul className="navbar-nav mb-lg-0">
                <li
                  className="nav-item"
                  onClick={() => navigate(`${routerList.user.home}`)}
                >
                  <a
                    className="nav-link active custom-menu"
                    aria-current="page"
                  >
                    <HouseIcon />
                  </a>
                </li>
                <li
                  className="nav-item"
                  onClick={() => navigate(`${routerList.user.accountUser}`)}
                >
                  <a className="nav-link custom-menu" aria-current="page">
                    Ask Question
                  </a>
                </li>

                <li
                  className="nav-item"
                  onClick={() => navigate(`${routerList.user.fatwas}`)}
                >
                  <a className="nav-link custom-menu" aria-current="page">
                    Fatwa
                  </a>
                </li>
                <li className="btn-group nav-item" dropdown>
                  {userLoginDetails ? (
                    <>
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar
                          src={userLoginDetails?.profile_pic}
                          sx={{ width: 32, height: 32 }}
                        >
                          {userLoginDetails?.name?.charAt(0)}
                        </Avatar>
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 40,
                              height: 40,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 15,
                              height: 15,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            authLogout(() => {
                              navigate(`${routerList.user.home}`);
                              setError({
                                visible: true,
                                message: "logged out sucessfully",
                                type: "success",
                              });
                            });
                          }}
                        >
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center custom-menu px-3"
                      onClick={() => handleLogin()}
                    >
                      <PersonIcon />
                    </div>
                  )}
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {errorPopup.visible && (
        <Snackbar
          visible={errorPopup.visible}
          message={errorPopup.message}
          type={errorPopup.type}
          title={errorPopup.title}
          onClose={() => handleCloseError()}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(HeaderComponent);
