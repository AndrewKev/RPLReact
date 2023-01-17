import React, { useEffect } from 'react'
import { Avatar } from "flowbite-react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CommentComponent from '../components/CommentComponent';
import { useRef } from 'react';

function Comment(props) {
  const param = useParams()

  const [allComment, setAllComment] = useState([])
  const [userPost, setUserPost] = useState({})
  const [txtComment, setTxtComment] = useState('')

  const inp = useRef('')

  
  const onChangeComment = (e) => {
    setTxtComment(e.target.value)
  }
  
  const getComment = async () => {
    const res = await axios.get(`http://localhost:5000/comment/${param.idPost}`)
    // console.log(res.data.userPost[0])
    setAllComment(res.data.arrComment)
    setUserPost(res.data.userPost[0])
  }

  const handleAddComment = async (e) => {
    e.preventDefault()

    await axios.post(`http://localhost:5000/${param.username}/comment/${param.idPost}`, {comment: txtComment})

    getComment()

    inp.current.value = ''
  }

  const descOrImg = () => {
    if(userPost.url == null) {
      return (<h2 className="text-2xl font-semibold py-7">{userPost.description}</h2>)
    } else {
      return (
        <div className="flex justify-center">
          <img src={userPost.url} alt="" />
        </div>
      )
    }
  }

  console.log(userPost)


  useEffect(() => {
    getComment()
  }, [])

  return (
    <div className='m-28'>
      <div className="flex">
        <div className="border-2 rounded-2xl mb-4 w-[30rem] xl:w-[35rem]">
          <div className="flex items-center p-7">
            <Avatar alt="User" img={userPost.photoProfile} rounded={true} />
            <div className="ml-4">
              <h3 className="font-medium text-lg">{userPost.usernamePost}</h3>
              <p className="font-light text-[#505050] text-xs">{userPost.postCreated}</p>
            </div>
          </div>
          <hr />
          <div className="px-7">
            {descOrImg()}
            {/* <h2 className="text-2xl font-semibold py-7">{userPost.description}</h2> */}
          </div>
          <hr />
          <form className='p-4 flex gap-2' onSubmit={handleAddComment}>
            <div className="relative z-0 w-full">
              <input ref={inp} onChange={onChangeComment} required type="text" id="small_standard" maxLength="100" class="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="small_standard" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Comment</label>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-0 focus:outline-none">Kirim</button>
          </form>

          <hr />
          <div className='p-4'>
            {allComment.map(data => (<CommentComponent photoProfile={data.photoProfile} username={data.username} comment={data.userComment} />))}
          </div>


        </div>
      </div>
    </div>
  )
}

export default Comment