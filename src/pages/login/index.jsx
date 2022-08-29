import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import BackgroundImage from "../../assets/login_bg.jpg";

import "../../styles/common.styles.scss";
import "./login.styles.scss";
import { Typography } from "@mui/material";

const Login = () => {
  return (
    <section className="login-section">
      <div
        className="container login-container"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="formWraper">
          <div className="welcome-section">
            <div className="welcomeDiv">
              <h2>Welcome Back!</h2>
            </div>
          </div>
          <div className="main-div">
            <div className="formDiv">
              <form>
                <h2>Sign in</h2>
                <p className="text">
                  {" "}
                  New user?
                  <a href="" className="link-text">
                    Create an account
                  </a>{" "}
                </p>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Email Address"
                  variant="standard"
                />
                <div className="error">Invalid Email Address</div>
                <div className="signin-btn">
                  <button className="btn btn-success" type="submit">
                    Continue
                  </button>
                </div>
                <div class="separator">Or</div>
                <div className="socialBtn">
                  <div className="twitter icon text">
                    <GoogleIcon className="icons-size" />
                    Continue with Google
                  </div>
                  <div className="facebook icon text">
                    <FacebookIcon className="icons-size " />
                    Continue with Facebook
                  </div>
                </div>
                <div className="back-btn">
                  <a href="#" className="text">
                    Back to home
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
