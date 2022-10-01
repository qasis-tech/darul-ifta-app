import React, { useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Avatar from "@mui/material/Avatar";
import { URLS } from "../../../config/urls.config";
import BackgroundImage from "../../../assets/login_bg.jpg";

import "../../../styles/common.styles.scss";
import "./login.styles.scss";
import { useNavigate } from "react-router-dom";
import routerList from "../../../routes/routerList";
import ButtonComponent from "../../../components/ButtonComponent";
import { StoreLocal } from "../../../utils/localStore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loader from "../../../components/common/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [screens, setScreens] = useState("email");
  const [isVisible, setVisible] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [imgSrc, setImgsrc] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleContinue = ({ email }) => {
    setLoader(true);
    axios
      .post(
        `${URLS.user}${URLS.profile_pic}`,
        { email: email },
        {
          "Content-Type": "application/json",
        }
      )
      .then(({ data }) => {
        console.log("res email", data.data);
        setLoader(false);
        setImgsrc(data.data);
        setScreens("password");
      })
      .catch((err) => {
        setLoader(false);
        console.log("error login", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    setLoader(true);
    axios
      .post(
        `${URLS.user}${URLS.login}`,
        { email: email, password: password },
        {
          "Content-Type": "application/json",
        }
      )
      .then(({ data }) => {
        setLoader(false);
        console.log("res login", data);
        if (data.success && data.data) {
          StoreLocal("@darul-ifta-login-details", data.data);
          navigate(`${routerList.user.accountUser}`);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("error login", err);
      });
  };

  const handleRegister = ({ email, googleId, imageUrl, name }) => {
    setLoader(true);
    let payload = {
      email,
      name,
      googleId,
      photoUrl: imageUrl,
    };

    axios
      .post(`${URLS.user}${URLS.googleAuth}`, payload, {
        "Content-Type": "application/json",
      })
      .then(({ data }) => {
        setLoader(false);
        if (data.success && data.data) {
          StoreLocal("@darul-ifta-login-details", data.data, () => {
            navigate(`${routerList.user.accountUser}`);
          });
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("error in signin with google", err);
      });
  };

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
              <h2>Sign in</h2>

              {screens === "email" ? (
                <>
                  <form onSubmit={handleSubmit(handleContinue)}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Email Address"
                      variant="standard"
                      className="email"
                      {...register("email", {
                        required: "Email ID is required",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Invalid email Id ( eg: example@mail.com ) ",
                        },
                      })}
                    />
                    <div className="error">{errors?.email?.message}</div>
                    <div className="signin-btn">
                      {isLoader ? (
                        <Loader />
                      ) : (
                        <button className="btn" type="submit">
                          Continue
                        </button>
                      )}
                    </div>
                  </form>
                </>
              ) : (
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className="password-row">
                    <div className="col-md-2 avatar">
                      <Avatar alt="pro_image" src={imgSrc} />
                    </div>
                    <div className="col-md-10">
                      <TextField
                        fullWidth
                        id="standard-basic"
                        label="Password"
                        variant="standard"
                        className="email"
                        type={isVisible ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Minimum 8 character",
                          },
                        })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setVisible(!isVisible)}
                                edge="end"
                              >
                                {!isVisible ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <div className="error">{errors?.password?.message}</div>
                    </div>
                  </div>
                  <div className="signin-btn">
                    {isLoader ? (
                      <Loader />
                    ) : (
                      <button className="btn " type="submit">
                        Login
                      </button>
                    )}
                  </div>
                </form>
              )}

              <div className="separator">Or</div>

              <div className="socialBtn">
                {isLoader ? (
                  <Loader />
                ) : (
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Continue with Google"
                    onSuccess={(aa) => {
                      console.log("DOne", aa);
                      handleRegister(aa?.profileObj);
                    }}
                    onFailure={(ee) => {
                      console.log("Fail", ee);
                    }}
                    cookiePolicy={"single_host_origin"}
                  />
                )}

                <div className="facebook icon text">
                  <FacebookIcon className="icons-size " />
                  Continue with Facebook
                </div>
              </div>

              <div className="back-btn">
                <a className="text" onClick={() => navigate("/")}>
                  Back to home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
