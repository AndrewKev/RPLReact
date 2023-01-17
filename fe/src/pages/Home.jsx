import React, { useState, useEffect } from "react";
import HomeComponent from "../components/HomeComponent";
import RekomenFriend from "../components/RekomenFriend";
import { useParams } from "react-router-dom";

import axios from 'axios'

const Home = () => {
  const name = useParams()

  const [postsFriends, setPostsFriends] = useState([])
  // const [totalLike, setTotalLike] = useState([])

  const getPost = async () => {
    const res = await axios.get(`http://localhost:5000/${name.username}/home`)
    // console.log(res.data)
    setPostsFriends(res.data)
    // setTotalLike(res.data.totalLike)
  }

  useEffect(() => {
    getPost()
  }, [])

  // getPost()

  return (
    <div className="flex mt-28 ml-28">
      <div>
        {postsFriends.map(data => (
          <HomeComponent key={data.idPost} idPost={data.idPost} like={data.totalLike} isLiked={data.isLiked} photoProfile={data.photoProfile} friendName={data.username} image={data.url} desc={data.description} postUp={data.postCreated} />
        ))}
      </div>
      {/* <div> */}
        <RekomenFriend />
      {/* </div> */}
    </div>
  )
}

export default Home