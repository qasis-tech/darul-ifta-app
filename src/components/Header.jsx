import React, { useState, useEffect } from "react";
import HouseIcon from '@mui/icons-material/House';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoImage from "../assets/logo-main-logo-blue.svg";
import "../styles/header.styles.scss";
const HeaderComponent = () => {
    return(
        
<div className="navbar-section container">
  <nav
    className="navbar navbar-expand-lg navbar-light bg-light navbar-wrapper-main"
  >
    <div className="col-md-4 col-lg-4 col-xs-5 navbar-log-wrapper">
      <a className="navbar-brand" routerLink="/">
        <img
          className="img-thumnails img-logo"
          src={LogoImage}
          alt="logo image"
        />
      </a>
    </div>
    <button
      className="navbar-toggler me-2"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor03"
      aria-controls="navbarColor03"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div
      className="collapse navbar-collapse navbar-wrapper"
      id="navbarColor03"
    >
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active custom-menu" aria-current="page"
            ><HouseIcon/>
          </a>
        </li>
        <li class="nav-item">
          <a className="nav-link custom-menu" aria-current="page">Ask Question</a>
        </li>

        <li className="nav-item">
          <a className="nav-link custom-menu" aria-current="page">Fatwa</a>
        </li>

        <li class="nav-item">
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
             <SearchIcon/>
            </button>
          </form>
        </li>

        <li
          className="btn-group nav-item"
          dropdown
        >

          <div
            className="d-flex justify-content-center align-items-center custom-menu px-3"
          >
           <PersonIcon/>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</div>

    );
};

export default HeaderComponent;
