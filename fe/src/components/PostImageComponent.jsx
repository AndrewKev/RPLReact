import React, { Fragment } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
// import base64url from 'base64url'
import { Alert } from 'flowbite-react'
// import  imgbb  from 'imgbb-uploader'

import { Buffer } from "buffer";
Buffer.from('anything', 'base64');
window.Buffer = window.Buffer || require("buffer").Buffer;

const PostImageComponent = () => {
	const [image, setImage] = useState(null)
	const [imgPreview, setImgPreview] = useState('')
	const [uploaded, setUploaded] = useState('')
	const [msg, setMsg] = useState('')

	const navigate = useNavigate()
	const param = useParams()
	// let keyApi = '1fdc21c2e23fbee68151a3690dd8fd6b'

	const onChangeImage = (e) => {
		let willUpload = e.target.files[0]
		// console.log(willUpload)
		setImgPreview(URL.createObjectURL(willUpload))
		setImage(willUpload)
	}

	// console.log(image.substring(27))

	const uploadImage = async (img) => {
		let body = new FormData()
		body.set('key', 'f1923a477c0829821e0e5712083c75d3')
		body.append('image', img)

		return await axios({
			method: 'post',
			url: 'https://api.imgbb.com/1/upload',
			data: body
		})
	}

	const handleSubmitImage = async (e) => {
		e.preventDefault()

		// imgbbUploader("f1923a477c0829821e0e5712083c75d3", base64url(image))
		// 	.then((response) => console.log(response))
		// 	.catch((error) => console.error(error));

		// let bfr = Buffer.from(base64url(image), 'base64')
		// const res = await axios.post(`https://api.imgbb.com/1/upload?key=${keyApi}&image=${base64url(image)}}`)
		// console.log(res)

		await uploadImage(image)
			.then(resp => {
				// console.log(resp.data.data) // I'm aware it's data.data, that is how it returns stuff
				setUploaded(resp.data.data.image.url)
				setMsg('Foto berhasil di upload')
				setImgPreview('')
				// console.log(uploaded)
				axios.post(`http://localhost:5000/${param.username}/new-image`, {url: resp.data.data.image.url})
				setTimeout(() => {
					navigate(`/${param.username}/home`)
				}, 3000)
			})
			.catch(err => {
				console.log(err)
			})
		
	}

	return (
		<Fragment>
			<form onSubmit={handleSubmitImage} className="mb-3 flex gap-4">
				<label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-52 bg-[#5FD068] hover:bg-green-500 rounded-xl cursor-pointer ">
					<div className="flex flex-col justify-center items-center py-2">
						<p className="text-sm text-white dark:text-gray-400"><span className="font-semibold">Choose Photo</span></p>
					</div>
					<input onChange={onChangeImage} id="dropzone-file" type="file" className="hidden" />
				</label>
				<button className="text-white bg-[#00A2ED] px-4 w-52 py-2 text-sm font-bold rounded-xl focus:ring-4 focus:ring-blue-200">Upload</button>
			</form>
			{msg ? <Alert
				color="info"
				className="max-w-lg"
			>
				<span>
					<span className="font-medium">
						{msg}
					</span>
				</span>
			</Alert> : ''}
			{/* {uploaded} */}
			<img className="max-w-md" src={imgPreview} alt=""></img>
		</Fragment>
	)
}

export default PostImageComponent