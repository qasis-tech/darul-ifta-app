import React, { useState } from "react";
import axios from "axios";
// import GoogleLogin from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

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
import SnackBar from "../../../components/common/Snackbar";
import { addUserLoginDetails } from "../../../redux/actions";

const Login = (props) => {
  const navigate = useNavigate();
  const [screens, setScreens] = useState("email");
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [imgSrc, setImgsrc] = useState([]);

  const [errorPopup, setErrorPopup] = useState({
    visible: false,
    message: "",
    type: "error",
    title: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const setError = (value) => {
    setErrorPopup(value);
    setTimeout(() => {
      setErrorPopup({
        visible: false,
        message: "",
        type: "error",
        title: "",
      });
    }, 3500);
  };

  const handleCloseError = () => {
    setError({
      ...errorPopup,
      visible: false,
      message: "",
      type: "",
      titile: "",
    });
  };

  const handleContinue = ({ email }) => {
    setLoader(true);
    axios
      .post(`${URLS.user}${URLS.profile_pic}`, { email })
      .then((res) => {
        console.log("res email", res);
        setLoader(false);
        if (res?.success) {
          setImgsrc(res?.data);
          setScreens("password");
        } else {
          setError({
            visible: true,
            message: res.message,
            type: "error",
          });
        }
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
          StoreLocal("@darul-ifta-user-login-details", data.data, () => {
            props.addUserLoginDetails(data.data);
            navigate(`${routerList.user.accountUser}`);
          });
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
      .then((res) => {
        setLoader(false);
        console.log("Res in Continue Wirth Google", res);
        if (res?.success && res?.data) {
          StoreLocal("@darul-ifta-user-login-details", res.data, () => {
            props.addUserLoginDetails(res.data);
            navigate(`${routerList.user.accountUser}`);
          });
        }
      })
      .catch((err) => {
        setLoader(false);
        console.error("error in signin with google", err);
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
              {/* <h2>Welcome Back!</h2> */}
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
                      {isLoading ? (
                        <Loader skeleton layers={1} />
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
                    {!isLoading && (
                      <button className="btn " type="submit">
                        Login
                      </button>
                    )}
                  </div>
                </form>
              )}

              <div className="separator">Or</div>

              <div className="socialBtn">
                {isLoading ? (
                  <Loader skeleton layers={1} />
                ) : (
                  <>
                    {/* <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Continue with Google"
                      onSuccess={(aa) => {
                        handleRegister(aa?.profileObj);
                      }}
                      onFailure={(ee) => {
                        console.log("Fail", ee);
                      }}
                      cookiePolicy={"single_host_origin"}
                    /> */}
                    <GoogleLogin
                      onSuccess={(res) => {
                        const decoded = jwt_decode(res?.credential);
                        handleRegister({
                          email: decoded.email,
                          name: decoded.name,
                          imageUrl: decoded.picture,
                          googleId: decoded.sub,
                        });
                      }}
                      onError={(e) => {
                        console.log("Login Failed", e);
                      }}
                    />

                    {/* <div className="facebook icon text">
                      <FacebookIcon className="icons-size " />
                      Continue with Facebook
                    </div> */}
                  </>
                )}
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

      <SnackBar
        visible={errorPopup.visible}
        message={errorPopup.message}
        type={errorPopup.type}
        title={errorPopup.title}
        onClose={() => handleCloseError()}
      />
    </section>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  addUserLoginDetails: (payload) => dispatch(addUserLoginDetails(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
