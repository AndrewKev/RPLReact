import axios from 'axios'
import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import HomeComponent from '../components/HomeComponent'

const Shared = () => {
  const param = useParams()
  const [shareList, setShareList] = useState([])

  const getShared = async () => {
    await axios.get(`http://localhost:5000/${param.username}/content/shared`)
      .then(res => setShareList(res.data))
      .catch(err => console.log(err))
    // console.log(res.data)
    // setShareList(res.data)
  }

  useEffect(() => {
    getShared()
  }, [])

  console.log(shareList)

  return (
    <div className='m-28'>
      {shareList.map(data => (
        <div className='mb-3' key={data.id}>
          <p className='font-medium italic'>{data.whoShare} membagikan</p>
          <HomeComponent idPost={data.idPost} like={data.totalLike} isLiked={data.isLiked} photoProfile={data.photoProfile} friendName={data.username} image={data.url} desc={data.description} postUp={data.postCreated} />
        </div>
      ))}
    </div>
  )
}

export default Shared