import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// import { Label, TextInput } from 'flowbite-react'

const UsernameSetting = (props) => {

	const [username, setUsername] = useState(props.username)
	// const usrInpt = useRef(username)

	const handlePassing = (value) => {
		props.passingUsername(value)
	}

	const onChangeUsername = (e) => {
		setUsername(e.target.value)
		handlePassing(e.target.value)
	}

	// useEffect((value) => {
	// 	handlePassing(value)
	// }, [username])
	
	
	return (
		<div className="mt-6">
			<label htmlFor="username" className="font-bold ">Username</label>
			<div className="flex">
				<span
					className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
					@
				</span>
				<input type="text" id="username"
					className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="elonmusk" value={username} onChange={onChangeUsername} />
			</div>
		</div>
	)
}

export default UsernameSetting