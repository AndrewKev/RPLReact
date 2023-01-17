import React from "react";
import { useState } from "react";

const ChangePassword = (props) => {
  const [pass, setPass] = useState('')

  const handlePassing = (value) => {
    props.passingPass(value)
  }

  const onChangePass = (e) => {
    setPass(e.target.value)
    handlePassing(e.target.value)
  }

  return(
    <div className="mt-6">
      <label htmlFor="change-pass" className="font-bold">Change password</label>
      <input onChange={onChangePass} type="password" id="change-pass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••"/>
    </div>
  )
}

export default ChangePassword