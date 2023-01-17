import { Avatar } from "flowbite-react";
import React from "react";
import { useState } from "react";

const ProfilePictureComponent = (props) => {
	// const [profilePicture, setProfilePicture] = useState(props.pp)
	const [image, setImage] = useState(null)
	const [imgPreview, setImgPreview] = useState(props.pp)
	const [uploaded, setUploaded] = useState('')

	const handlePassing = (value) => {
    props.passingPP(value)
  }

	const onChangeImage = (e) => {
		// e.preventDefault()

		let willUpload = e.target.files[0]
		// console.log(willUpload)
		setImgPreview(URL.createObjectURL(willUpload))
		setImage(willUpload)
		handlePassing(willUpload)
	}

	// const handleCancel = (e) => {
	// 	// e.preventDefault()
	// 	setImgPreview(props.pp)
	// 	handleCancel(props.pp)
	// }

	return (
		<div className="flex items-center flex-col w-52">

			<h1 className="font-bold text-2xl mb-3">Profile Picture</h1>
			{/* <img className="rounded-full w-36 h-36" src={imgPreview} alt="" /> */}
			<Avatar
				img= {imgPreview}
				size= "xl"
				rounded= {true}
			/>
			<div className="mt-2">
				<label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-52 bg-[#5FD068] rounded-xl cursor-pointer hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300">
					<div className="flex flex-col justify-center items-center py-2">
						<p className="text-xs text-white dark:text-gray-400"><span className="font-semibold">Change</span></p>
					</div>
					<input onChange={onChangeImage} id="dropzone-file" type="file" className="hidden" />
				</label>
				{/* <button type="button" className="text-white w-full bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-2xl text-sm px-5 py-2 text-center mt-2" onClick={handleCancel}>Cancel Select</button> */}
			</div>
		</div>
	)
}

export default ProfilePictureComponent