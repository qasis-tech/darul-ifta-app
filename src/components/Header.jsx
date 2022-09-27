import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import HouseIcon from "@mui/icons-material/House";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import LogoImage from "../assets/logo-main-logo-blue.svg";

import "../styles/header.styles.scss";
import routerList from "../routes/routerList";
import { getLocal } from "../utils/localStore";

const HeaderComponent = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    let loginData = await getLocal();
    console.log("getLocal()", loginData);
    if (loginData) {
      navigate(`${routerList.user.accountUser}`);
    } else navigate(`${routerList.user.login}`);
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
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
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
                  class="nav-item"
                  onClick={() => navigate(`${routerList.user.askFatwas}`)}
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

                {/* <li class="nav-item">
                  <form class="d-flex search-nav">
                    <input
                      className="form-control custom-menu"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />

                    <button
                      className="btn btn-sm border custom-menu px-2"
                      type="button"
                    >
                      <SearchIcon />
                    </button>
                  </form>
                </li> */}

                <li
                  className="btn-group nav-item"
                  dropdown
                  onClick={handleLogin}
                >
                  <div className="d-flex justify-content-center align-items-center custom-menu px-3">
                    <PersonIcon />
                  </div>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderComponent;
