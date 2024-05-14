import React from 'react'

const Button = ({children, type="button", className="", ...props}) => {
  return (
    <button className={`${className}`} type={type} {...props}>{children}</button>
  )
}

export default Button