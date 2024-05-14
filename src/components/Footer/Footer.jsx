import React from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {
  const data = useSelector((state) => state.auth.userData);
  console.log(data);
  return (
    <div>Footer</div>
  )
}

export default Footer