import React from 'react'
import { Avatar } from "flowbite-react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

export const ShareListComponent = (props) => {
  const param = useParams()
  const navigate = useNavigate()

  const handleClose = (value) => {
    props.handleClose(value)
  }

  const handleShare = async () => {
    // try {
    await axios.post('http://localhost:5000/content/share', { username: param.username, idPost: props.idPost, idFriend: props.idUser })
    .then(() => Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Berhasil share',
      showConfirmButton: false,
      timer: 1500
    }).then(() => handleClose(false)))
    // .catch(err => console.log(err))
    
    
    // } catch (error) {
    //   console.log(error.message)
    // }
  }

  return (
    <div className="border-2 rounded-2xl p-8 flex items-center justify-between h-24 mb-2">
			<div className="flex items-center">
				<Avatar img={props.photoProfile} rounded={true} />
				<h2 className="ml-4 text-base font-semibold">{props.username}</h2>
			</div>
			<div>
      <button onClick={handleShare} className="font-bold text-blue-500 hover:text-blue-700" >Share</button>
			</div>
		</div>
    // <div className="border-2 rounded-2xl p-8  flex items-center justify-between h-24 mb-2">
    //   <div className="flex items-center">
    //     <Avatar img={props.photoProfile} rounded={true} />
    //     <h2 className="ml-4 font-semibold truncate w-28 xl:w-full">{props.username}</h2>
    //   </div>
    //   <div className=''>
    //     <button onClick={handleShare} className="font-bold text-blue-500 hover:text-blue-700" >Share</button>
    //   </div>
    // </div>
  )
}

export default ShareListComponent