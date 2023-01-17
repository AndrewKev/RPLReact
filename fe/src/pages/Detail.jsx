import axios from 'axios'
import React from 'react'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar } from "flowbite-react";
import HomeComponent from "../components/HomeComponent";

const Detail = () => {
  const param = useParams()
  const [dataUser, setDataUser] = useState([])
  const [postUser, setPostUser] = useState([])

  const getUser = async () => {
    if(window.location.pathname === `/${param.username}/friends/detail/${param.friend}`) {
      const res = await axios.get(`http://localhost:5000/${param.friend}`)
      setDataUser(res.data.user)
      setPostUser(res.data.listPosts)
    } else {
      const res = await axios.get(`http://localhost:5000/${param.username}`)
      setDataUser(res.data.user)
      setPostUser(res.data.listPosts)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  // console.log(dataUser)
  return (
    <div className='mx-28 mt-28 pb-28 lg:flex gap-8'>
      <div className='flex flex-col'>
        <div className='border shadow-md w-fit rounded-md mb-8'>
          {dataUser.map(data => (
            <Fragment key={data.idUser}>
              <div className='flex flex-col items-center'>
                <div className='flex flex-col justify-center'>
                  <img className='w-[20rem] relative z-0' src="https://i.ibb.co/L5RpYpM/steve-johnson-gbh-Opn9-NLAc-unsplash.jpg" alt="" />
                  <div className='relative -top-20'>
                    <Avatar
                      img={data.photoProfile}
                      size="xl"
                      rounded={true}
                    />
                    <p className='font-bold text-2xl mb-4 mt-3 text-center'>"{data.username}"</p>
                  </div>
                </div>
                <div className='grid grid-cols-2 justify-center -mt-20 mb-2 gap-4'>
                  <div className='text-center'>
                    <p className='text-gray-500'>Birthday</p>
                    <p className='font-bold text-md'>{data.birthday}</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-gray-500'>Country</p>
                    <p className='font-bold'>{data.country}</p>
                  </div>
                  <div className='col-span-2 text-center'>
                    <p className='text-gray-500'>Bio</p>
                    <p className='font-bold'>{data.bio}</p>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className='border shadow-md p-4 w-fit h-screen/2 overflow-auto'>
        {dataUser.map(data => (
          <p className='font-medium mb-5 text-xl'>{data.username}'s Posts</p>
        ))}

        {postUser.length > 0 ? postUser.map(data => (
          <HomeComponent key={data.idPost} idPost={data.idPost} like={data.totalLike} isLiked={data.isLiked} photoProfile={data.photoProfile} friendName={data.username} image={data.url} desc={data.description} postUp={data.postCreated} />
        )) : (<h1>No Post</h1>)}

      </div>
    </div>
  )
}

export default Detail