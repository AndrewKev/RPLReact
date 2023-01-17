import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const Forgot = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [message, setMessage] = useState('')

  const onChangeUsername = (e) => {
    const usernameInput = e.target.value;
    setUsername(usernameInput);
  };

  const onChangePassword = (e) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
  };

  const handleReset = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:5000/${username}/edit-pass`, {pass: password});
    navigate('/login');
  }

  console.log(password)

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow-xl dark:bg-gray-700">
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Forgot Password</h3>
            <form className="space-y-6" onSubmit={handleReset}>
              <div className="relative z-0 mb-6 w-full group">
                <input type="text" name="usernameInputLogin" id="usernameInputLogin"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " required
                  onChange={onChangeUsername}
                />
                <label for="usernameInputLogin"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input type="password" name="passInputLogin" id="passInputLogin"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " required
                  onChange={onChangePassword}
                />
                <label for="passInputLogin"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              </div>
              <button type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Reset Password
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
