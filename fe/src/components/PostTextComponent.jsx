import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Alert} from 'flowbite-react'

const PostTextComponent = () => {
	const name = useParams()
	const [descPost, setDescPost] = useState('')
	const [message, setMessage] = useState('') 

	const navigate = useNavigate()

	const onChangeDesc = (e) => {
		setDescPost(e.target.value)
	}

	const handlePostText = async (e) => {
		e.preventDefault()

		try {
			const up = await axios.post(`http://localhost:5000/${name.username}/new-post`, {description: descPost})
			// console.log(up)
			setMessage(up.data.msg)
			setTimeout(() => {
				navigate(`/${name.username}/home`)
			}, 2000)
		} catch (error) {
			// console.log(error)	
			setMessage(error.response.data.msg)
		}
	}

	// console.log(descPost)
	return (
		<form onSubmit={handlePostText}>
			<div className="mb-4 max-w-lg bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700">
				<div className="py-2 px-4 bg-white rounded-t-lg">
					<textarea required onChange={onChangeDesc} id="comment" rows="4" maxLength="1000" className="px-0 w-full text-sm text-gray-900 bg-white border-0 focus:ring-0" placeholder="Ouch..."></textarea>
				</div>
				<div className="flex justify-end items-center py-2 px-3 border-t">
					<button type="submit" className="inline-flex items-center py-2.5 px-10 text-xs font-medium text-center text-white bg-blue-700 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
						Post
					</button>
				</div>
			</div>
				{message ? <Alert
              color="info"
							className="max-w-lg"
            >
              <span>
                <span className="font-medium">
                {message}
                </span>
              </span>
            </Alert> : ''}
		</form>
	)
}

export default PostTextComponent