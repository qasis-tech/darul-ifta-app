import React from "react";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

import BackgroundImage from "../../../assets/login_bg.jpg";

import "../../../styles/common.styles.scss";
import "./login.styles.scss";
import { useNavigate } from "react-router-dom";
import routerList from "../../../routes/routerList";
import ButtonComponent from "../../../components/ButtonComponent";


const Login = () => {
  const navigate = useNavigate();
  const [screens, setScreens] = useState("email");
  const [isVisible, setVisible] = useState(false);
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleContinue=()=>{ 
    setScreens("password")
  }

  const handleLogin=({email,password})=>{
    let payload={email:email,password:password}
    axios.post("http://localhost:1337/user/login",payload,{
      "Content-Type": "application/json",
    })
    .then((res)=> {
   console.log("res login",res.data)
   alert(res.data.message)
  //  navigate(`${routerList.user.accountUser}`)
    })
    .catch((err)=>{
      console.log("error login",err)
    })
   

  }

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
              <form onSubmit={handleSubmit(handleLogin)}>
                <h2>Sign in</h2>
                {/* <p className="text">
                  {" "}
                  New user?
                  <a href="" className="link-text">
                    Create an account
                  </a>{" "}
                </p> */}
                {screens==="email"?(
                  <>
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
                 
                 </>
                ):(
                  <>
                  <div className="avatar">
               <Avatar  alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
               </div>
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
                      message: "Minimum 8 charecter",
                    },
                  })}
                 
                />
                 <div className="error">{errors?.password?.message}</div>

                </>
                )}
                <ButtonComponent
                label={
                  screens === "email"
                    ? "Continue"
                    :"Login"     
                }
                handleClick={() => {
                  screens==="email"?
                  handleContinue():
                  handleSubmit();
                   }}
                >
                </ButtonComponent>
                <div className="separator">Or</div>
                <div className="socialBtn">
                  <div className="google icon text">
                    <GoogleIcon className="icons-size" />
                    Continue with Google
                  </div>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
