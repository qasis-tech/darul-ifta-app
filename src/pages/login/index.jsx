import React from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

import BackgroundImage from "../../assets/login_bg.jpg";

import "../../styles/common.styles.scss";
import "./login.styles.scss";

const Login = () => {
  return (
    <section className="login-section">
      <div
        className="container login-container"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="formWraper">
          <div className="formDiv">
            <form>
              <h2>Sign in</h2>
              <p className="text"> New user? Create an account</p>
              <TextField fullWidth id="standard-basic" label="Email Address" variant="standard" />
              {/* <hr />
              <div className="orDiv">Or</div> */}
              <div className="checkBox">
                <input type="checkbox" name="checkbox" id="checkbox" />
                <span className="text">Keep me signed in</span>
              </div>
              <button className="btn btn-success" type="submit">
                SIGN IN
              </button>
              <div className="forgotpassword-link">
                <p>
                  <a
                    href="#"
                    className="text"
                  >
                    Forgot Password
                  </a>{" "}
                </p>
              </div>
              <div className="signup-link">
                <p className="text">
                  Create new account?
                  <a
                    href="#"
                    className="text"
                  >
                    Sign Up
                  </a>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
