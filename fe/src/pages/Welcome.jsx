// import { Accordion } from "flowbite-react";
import React from "react";
import {Alert} from 'flowbite-react'
import { useState } from "react";
// import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Form from 'react-validation/build/form'
import AuthService from "../services/auth.service";
import '../style/input.css'
import { useEffect } from "react";

const Welcome = () => {
  // const form = useRef()
  // const checkBtn = useRef()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')


  const onChangeUsername = (e) => {
    const usernameInput = e.target.value;
    setUsername(usernameInput);
  };

  const onChangePassword = (e) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await AuthService.register(username, password)
      navigate('/login')
    } catch (error) {
      console.log(error.response.data.msg)
      setMessage(error.response.data.msg)
    }

  }

  useEffect(() => {
    document.title ='Welcome'
  })

  return (
    <div className="bg-[url('https://i.ibb.co/2s4x283/jr-korpa-9-Xngo-Ipxc-Eo-unsplash-1.png')] bg-contain flex justify-end">
      {/* <img src="https://i.ibb.co/2s4x283/jr-korpa-9-Xngo-Ipxc-Eo-unsplash-1.png" alt="" />   */}
      <div className="container w-2/4 h-screen bg-white pt-20 px-12">
        <h1 className="text-6xl font-bold pb-14">Join Now,</h1>

        <form className="w-3/4" onSubmit={handleRegister}>
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="usernameInput" id="usernameInput"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required
              onChange={onChangeUsername}
            />
            <label htmlFor="usernameInput"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="password" name="passInput" id="passInput"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required
              onChange={onChangePassword}
            />
            <label htmlFor="passInput"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          {message ? <Alert
              color="failure"
              className="mb-2"
            >
              <span>
                <span className="font-medium">
                {message}
                </span>
              </span>
            </Alert> : ''}
          <button type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base px-5 py-2.5 mr-2 mb-2 focus:outline-none">Sign
            Up</button>
        </form>

        <p className="font-medium mt-4 text-sm">By signing up, you agree to the <span className="text-red-600">Terms of
          Service</span> and <span className="text-red-600">Policy</span>.</p>

        <h1 className="mt-24 mb-2 font-bold text-2xl">Already have an account?</h1>
        <Link
          to='login'
          className="flex justify-center w-3/4 rounded-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-base px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800"
          type="button" data-modal-toggle="authentication-modal">
          Sign In
        </Link>
      </div>



    </div>
  )
}

export default Welcome