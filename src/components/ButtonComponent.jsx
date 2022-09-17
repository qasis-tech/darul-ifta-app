import React from 'react'

const ButtonComponent = (props) => {
  return (
    <div className="signin-btn">
    <button className="btn btn-success" type="submit" onClick={props.handleClick}>
                     {props.label}
                    </button>
                    </div>
  )
}

export default ButtonComponent