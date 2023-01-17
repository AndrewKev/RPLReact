import React, { Fragment, useState } from "react";
import { Avatar, Tooltip, Modal, Button, Dropdown } from "flowbite-react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShareListComponent from "../components/ShareListComponent";
import { useEffect } from "react";
import FriendComponent from "./FriendComponent";
import Swal from 'sweetalert2'
// import { useEffect } from "react";

const HomeComponent = (props) => {
  const [countLike, setCountLike] = useState((props.like ? props.like : 0))
  const [isLike, setIsLike] = useState(props.isLiked)
  const [color, setColor] = useState('#DB162F')
  const [friendList, setFriendList] = useState([])
  const navigate = useNavigate()

  const getFriends = async () => {
    const res = await axios.get(`http://localhost:5000/${name.username}/friends`)
    // console.log(res.data)
    setFriendList(res.data)
  }

  const name = useParams()

  const handleLike = async () => {
    if (isLike === false) {
      await axios.post(`http://localhost:5000/${name.username}/like/${props.idPost}`)
      setCountLike(countLike + 1)
      setColor('#DB162F')
      setIsLike(true)
    } else {
      await axios.delete(`http://localhost:5000/${name.username}/unlike/${props.idPost}`)
      setCountLike(countLike - 1)
      setColor('#fff')
      setIsLike(false)
    }
  }

  const descOrImg = () => {
    if (props.image == null) {
      return (<h2 className="text-2xl font-semibold py-7">{props.desc}</h2>)
    } else {
      return (
        <div className="flex justify-center">
          <img src={props.image} alt="" />
        </div>
      )
    }
  }

  const [tampil, setTampil] = useState(false)

  const onClick = () => {
    setTampil(true)
  }
  const onClose = () => {
    setTampil(false)
  }
  const handleClose = (newValue) => {
    setTampil(newValue)
  }

  const handleDelete = async () => {
    await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/${name.username}/deletePostId/${props.idPost}`)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
          )
          navigate(`/${name.username}/home`)
      }
    })
    
  }

  const isUser = () => {
    if (window.location.pathname === `/${name.username}/detail`) {
      return (
        <Dropdown
          label=''
          arrowIcon={true}
          inline={true}
        >
          <Dropdown.Item onClick={() => handleDelete()}>
            Delete
          </Dropdown.Item>
        </Dropdown>
      )
    }
  }

  useEffect(() => {
    getFriends()
  }, [])

  return (
    <Fragment>
      <div className="flex">
        <div className="border-2 rounded-2xl mb-4 w-[30rem] xl:w-[35rem]">
          <div className="flex items-center justify-between">
            <div className="flex items-center p-7">
              <Avatar alt="User" img={props.photoProfile} rounded={true} />
              <div className="ml-4">
                <h3 className="font-medium text-lg">{props.friendName}</h3>
                <p className="font-light text-[#505050] text-xs">{props.postUp}</p>
              </div>
            </div>
            <div className="mr-8">
              {isUser()}
            </div>
          </div>
          <hr />
          <div className="px-7">
            {descOrImg()}
            {/* <h2 className="text-2xl font-semibold py-7">{props.desc}</h2> */}
          </div>
          <hr />
          <div className="p-7 flex">
            <div className="mr-8">
              <Tooltip content={`${countLike} Likes`}>
                <button onClick={() => handleLike()}>
                  <svg className="inline-block" width="32" height="32" viewBox="0 0 32 32" fill={isLike ? color : 'none'}
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.99984 5.33333C5.94984 5.33333 2.6665 8.61666 2.6665 12.6667C2.6665 20 11.3332 26.6667 15.9998 28.2173C20.6665 26.6667 29.3332 20 29.3332 12.6667C29.3332 8.61666 26.0498 5.33333 21.9998 5.33333C19.5198 5.33333 17.3265 6.56466 15.9998 8.44933C15.3236 7.48613 14.4253 6.70006 13.3809 6.15765C12.3364 5.61525 11.1767 5.3325 9.99984 5.33333Z"
                      stroke={isLike ? color : '#271033'} strokeWidth="2.66667" strokeLinecap="round"
                      strokeLinejoin="round" />
                  </svg>
                </button>
              </Tooltip>
            </div>
            <div className="mr-8">
              <Tooltip content='Comment'>
                <Link to={`/${name.username}/comment/${props.idPost}`}>
                  {/* <Link to={`/${name.username}/comment/${props.idPost}/${props.desc}/${props.friendName}/${props.postUp}`}> */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.66667 28V22.4573C5 20.5107 4 18.032 4 15.3333C4 9.07467 9.37333 4 16 4C22.6267 4 28 9.07467 28 15.3333C28 21.592 22.6267 26.6667 16 26.6667C13.784 26.6738 11.6062 26.0902 9.69067 24.976L6.66667 28ZM16 24C21.1547 24 25.3333 20.12 25.3333 15.3333C25.3333 10.5467 21.1547 6.66667 16 6.66667C10.8453 6.66667 6.66667 10.5467 6.66667 15.3333C6.66667 20.12 10.8453 24 16 24Z"
                      fill="#271033" />
                  </svg>
                </Link>
              </Tooltip>
            </div>
            <div className="mr-8">
              <Tooltip content='Share'>
                <button onClick={onClick}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.6668 3.33067C23.4446 3.33059 24.2101 3.52482 24.8938 3.89571C25.5774 4.2666 26.1577 4.8024 26.5817 5.45446C27.0057 6.10652 27.2601 6.85418 27.3218 7.62953C27.3836 8.40488 27.2506 9.18337 26.9351 9.8943C26.6195 10.6052 26.1314 11.2261 25.515 11.7004C24.8985 12.1748 24.1734 12.4877 23.4054 12.6106C22.6374 12.7336 21.8508 12.6627 21.1171 12.4045C20.3834 12.1463 19.7258 11.7089 19.2041 11.132L13.1268 14.604C13.4114 15.5124 13.4114 16.4862 13.1268 17.3947L19.2028 20.8693C19.9753 20.0157 21.036 19.4776 22.1811 19.3583C23.3262 19.239 24.475 19.547 25.4069 20.2231C26.3387 20.8992 26.988 21.8957 27.2299 23.0213C27.4718 24.1469 27.2894 25.3222 26.7176 26.3215C26.1458 27.3208 25.225 28.0736 24.132 28.4353C23.039 28.7971 21.8509 28.7423 20.7959 28.2815C19.7408 27.8207 18.8932 26.9863 18.4158 25.9386C17.9384 24.891 17.8649 23.7039 18.2094 22.6053L12.1334 19.1293C11.5006 19.8291 10.6706 20.3207 9.75287 20.5394C8.83511 20.7582 7.87262 20.6938 6.99219 20.3547C6.11176 20.0156 5.3547 19.4178 4.82074 18.64C4.28678 17.8621 4.00098 16.9408 4.00098 15.9973C4.00098 15.0539 4.28678 14.1325 4.82074 13.3547C5.3547 12.5769 6.11176 11.979 6.99219 11.64C7.87262 11.3009 8.83511 11.2365 9.75287 11.4552C10.6706 11.674 11.5006 12.1656 12.1334 12.8653L18.2094 9.39333C17.9908 8.69417 17.9398 7.95339 18.0605 7.23086C18.1812 6.50833 18.4701 5.82433 18.904 5.23414C19.3379 4.64394 19.9046 4.16412 20.5583 3.83346C21.212 3.50279 21.9342 3.33055 22.6668 3.33067ZM22.6668 21.3307C21.9588 21.3307 21.2799 21.6119 20.7793 22.1125C20.2787 22.6131 19.9974 23.292 19.9974 24C19.9974 24.708 20.2787 25.3869 20.7793 25.8875C21.2799 26.3881 21.9588 26.6693 22.6668 26.6693C23.3747 26.6693 24.0537 26.3881 24.5543 25.8875C25.0549 25.3869 25.3361 24.708 25.3361 24C25.3361 23.292 25.0549 22.6131 24.5543 22.1125C24.0537 21.6119 23.3747 21.3307 22.6668 21.3307ZM8.66944 13.3307C7.96149 13.3307 7.28253 13.6119 6.78193 14.1125C6.28134 14.6131 6.0001 15.292 6.0001 16C6.0001 16.708 6.28134 17.3869 6.78193 17.8875C7.28253 18.3881 7.96149 18.6693 8.66944 18.6693C9.37739 18.6693 10.0563 18.3881 10.5569 17.8875C11.0575 17.3869 11.3388 16.708 11.3388 16C11.3388 15.292 11.0575 14.6131 10.5569 14.1125C10.0563 13.6119 9.37739 13.3307 8.66944 13.3307ZM22.6668 5.33067C21.9588 5.33067 21.2799 5.6119 20.7793 6.1125C20.2787 6.61309 19.9974 7.29205 19.9974 8C19.9974 8.70795 20.2787 9.38691 20.7793 9.8875C21.2799 10.3881 21.9588 10.6693 22.6668 10.6693C23.3747 10.6693 24.0537 10.3881 24.5543 9.8875C25.0549 9.38691 25.3361 8.70795 25.3361 8C25.3361 7.29205 25.0549 6.61309 24.5543 6.1125C24.0537 5.6119 23.3747 5.33067 22.6668 5.33067Z"
                      fill="#271033" />
                  </svg>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={tampil}
        onClose={onClose}
      >
        <Modal.Header>
          Share Post
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {friendList.map(data => (<ShareListComponent handleClose={(value) => handleClose(value)} key={data.idUser} idPost={props.idPost} idUser={data.idUser} photoProfile={data.photoProfile} username={data.username} />))}
            {/* <ShareListComponent /> */}
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default HomeComponent