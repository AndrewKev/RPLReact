import axios from "axios";
import { Avatar, Dropdown } from "flowbite-react";
import React from "react";
// import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from 'sweetalert2'

const FriendComponent = (props) => {
	const name = useParams()
	
	const refreshFriend = (value) => {
		props.refresh(value)
	}

	// const passMsg = (value) => {
	// 	props.msg(value)
	// }

	const handleDel = async () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await axios.delete(`http://localhost:5000/${name.username}/friends/del/${props.idUser}`)
				
				Swal.fire(
					'Deleted!',
					`${res.data.msg}`,
					'success'
				)
			}
			refreshFriend(await axios.get(`http://localhost:5000/${name.username}/friends`))
		})
		// console.log(res.data.msg)
		// passMsg(msg)
	}
	
	return (
		<div className="border-2 rounded-2xl p-8 w-4/5 xl:w-2/4 flex items-center justify-between h-24 mb-2">
			<div className="flex items-center">
				<Avatar img={props.photoProfile} rounded={true} />
				<h2 className="ml-4 text-base font-semibold">{props.username}</h2>
			</div>
			<div>
				<Dropdown label='' arrowIcon={true}
          inline={true}>
					<Dropdown.Item>
						<Link to={`/${name.username}/friends/detail/${props.username}`}>
							Profile
						</Link>
					</Dropdown.Item>
					<Dropdown.Item className="text-red-600">
						<button onClick={handleDel}>
							Unfriend
						</button>
					</Dropdown.Item>
				</Dropdown>
			</div>
		</div>
	)
}

export default FriendComponent