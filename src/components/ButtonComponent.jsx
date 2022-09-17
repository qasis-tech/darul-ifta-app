import React from 'react'
import "../pages/user/login/login.styles.scss";

const ButtonComponent = (props) => {
  return (
    <div className="signin-btn">
    <button className="btn " type="submit" onClick={props.handleClick}>
                     {props.label}
                    </button>
                    </div>
  )
}

export default ButtonComponent