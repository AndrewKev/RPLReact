import axios from "axios"
import { useState } from "react"
import { Fragment } from "react"
import { useParams } from "react-router-dom"
import { Avatar } from "flowbite-react";
import { useEffect } from "react";

const RekomenComponent = (props) => {
	const name = useParams()
	const [infoBtn, setInfoBtn] = useState('Add')

	const refresh = (value) => {
		props.refreshFriend(value)
	}

	const handleAddFriend = async () => {
		if(infoBtn === 'Add') {
			await axios.post(`http://localhost:5000/${name.username}/friends/add/${props.idUser}`)
			// if(window.location.pathname === `/${name.username}/friends`) {
				// await refresh(axios.get(`http://localhost:5000/${name.username}/friends`))
			// }
			setInfoBtn('Unfriend')
		} else {
			await axios.delete(`http://localhost:5000/${name.username}/friends/del/${props.idUser}`)
			// if(window.location.pathname === `/${name.username}/friends`) {
				// await refresh(axios.get(`http://localhost:5000/${name.username}/friends`))
			// }
			setInfoBtn('Add')
		}
	}

	return (
		<Fragment>
				<div className="flex items-center py-4 px-9 ">
					<Avatar alt="User" img={props.photoProfile} rounded={true} />
					{/* <img className="rounded-full h-16 w-20 object-fill" src={props.photoProfile} alt="user profile" /> */}
					<div className="flex justify-between ml-4 w-[-webkit-fill-available]">
						<h3 className="font-semibold truncate w-28 xl:w-full">{props.username}</h3>
						<button className="font-bold text-blue-500 hover:text-blue-700" onClick={handleAddFriend}>{infoBtn}</button>
					</div>
				</div>
				<hr />
		</Fragment>
	)
}

export default RekomenComponent