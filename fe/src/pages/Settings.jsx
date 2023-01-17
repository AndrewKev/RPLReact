import React, { Fragment } from "react";
import { useState } from "react";
import BioComponent from "../components/Settings/BioComponetn";
import BirthdaySettingComponent from "../components/Settings/BirthdaySettingComponent";
import ChangePassword from "../components/Settings/ChangePassword";
import CountryComponent from "../components/Settings/CountryComponent";
import ProfilePictureComponent from "../components/Settings/ProfilePictureComponent";
import UsernameSetting from "../components/Settings/UsernameSetting";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from "react";
import Swal from 'sweetalert2'

const Settings = () => {
  const param = useParams()
  const navigate = useNavigate()
  const [detail, setDetail] = useState([])

  // --- data dari user --- //
  const [pp, setPP] = useState('')
  const [uploadedPP, setUploadedPP] = useState('')
  const [username, setUsername] = useState('')
  const [bday, setBday] = useState('')
  const [country, setCountry] = useState('')
  const [bio, setBio] = useState('')
  const [pass, setPass] = useState('')
  const [errUsername, seterrUsername] = useState('')

  const getDataPP = (newValue) => {
    setPP(newValue)
  }

  const getDataUsername = (newValue) => {
    setUsername(newValue)
  }

  const getDataCountry = (newValue) => {
    setCountry(newValue)
  }

  const getDataBday = (newValue) => {
    setBday(newValue)
  }

  const getDataBio = (newValue) => {
    setBio(newValue)
  }

  const getDataPass = (newValue) => {
    setPass(newValue)
  }

  const getDetail = async () => {
    const res = await axios.get(`http://localhost:5000/${param.username}`)
    setDetail(res.data.user)
    console.log(res.data.user[0])
    setUsername(res.data.user[0].username)
    setCountry(res.data.user[0].country)
    setBday(res.data.user[0].birthday)
    setBio(res.data.user[0].bio)
    // setPass(res.data[0].bio)
  }

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

  const update = async () => {
    if (pp !== '') {
      await uploadImage(pp)
        .then(resp => {
          // console.log(resp.data.data) // I'm aware it's data.data, that is how it returns stuff
          setUploadedPP(resp.data.data.image.url)
          // axios.put(`http://localhost:5000/${param.username}/edit-pp`,
          //   {
          //     photoProfile: resp.data.data.image.url
          //   }
          // )
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (username !== '') {
      await axios.put(`http://localhost:5000/${param.username}/edit-username`, { username: username })
    }

    // if(bday.match(bday)) {
    // await axios.put(`http://localhost:5000/${param.username}/edit-birthday`, {birthday: bday})
    // }

    if (country !== '') {
      await axios.put(`http://localhost:5000/${param.username}/edit-country`, { country: country })
    }

    // if(bio !== '') {
    //   await axios.put(`http://localhost:5000/${param.username}/edit-bio`, {bio: bio})
    // } 

    // if(pass !== '') {
    //   await axios.put(`http://localhost:5000/${param.username}/edit-pass`, {password: pass})
    // }

    getDetail()
    Swal.fire(
      'Aye!',
      'Profile Updated!',
      'success'
    )
    if (username !== '') {
      navigate(`/${username}/detail`)
    } else {
      navigate(`/${param.username}/detail`)
    }
    // setTimeout(() => {
    // }, 2000)
  }

  const updatePhoto = async (value) => {
    if (value !== '') {
      await uploadImage(value)
        .then(res => {
          axios.put(`http://localhost:5000/${param.username}/edit-pp`, {photoProfile: res.data.data.image.url})
          // if (username !== '') {
          //   navigate(`/${username}/detail`)
          // } else {
          //   navigate(`/${param.username}/detail`)
          // }
        })
    }
  }

  

  const updateUsername = async (value) => {
    // if (username !== '') {
      try {
        await axios.put(`http://localhost:5000/${param.username}/edit-username`, { username: value })
      } catch (error) {
        console.log(error.response.data.msg)
        seterrUsername(error.response.data.msg)
      }
    // }
  }

  const updateBday = async (value) => {
    await axios.put(`http://localhost:5000/${param.username}/edit-birthday`, { birthday: value })
  }

  const updateCountry = async (value) => {
    // if (country !== '') {
    await axios.put(`http://localhost:5000/${param.username}/edit-country`, { country: value })
    // }
  }

  const updateBio = async (value) => {
    await axios.put(`http://localhost:5000/${param.username}/edit-bio`, { bio: value })
  }

  const updatePass = async (value) => {
    if (pass !== '') {
      await axios.put(`http://localhost:5000/${param.username}/edit-pass`, { pass: value })
    }
  }

  const updateNew = async (e) => {
    e.preventDefault();
    try {
      updatePhoto(pp)
      updateUsername(username)
      updateBday(bday)
      updateCountry(country)
      updateBio(bio)
      updatePass(pass)
      // await axios.put(`http://localhost:5000/${param.username}/edit`,
      //   {
      //     username: username,
      //     password: pass,

      //   }
      // )
      Swal.fire(
        'Aye!',
        'Profile Updated!',
        'success'
      )
      // getDetail()
      setTimeout(() => {
        if (username !== '') {
          navigate(`/${username}/detail`)
        } else {
          navigate(`/${param.username}/detail`)
        }
      }, 5000)
    } catch (error) {
      console.log(error)
    }

    // getDetail()
    // e.preventDefault(); 
    // return false
  }

  useEffect(() => {
    getDetail()
  }, [])

  console.log(detail[0])
  console.log('pp : ', pp)
  console.log('username : ', username)
  console.log('bday : ', bday)
  console.log('country : ', country)
  console.log('bio : ', bio)
  console.log('pass : ', pass)


  return (
    <form onSubmit={updateNew} className="m-28 w-96">
      {detail.map(data => (
        <Fragment key={data.idUser}>
          <ProfilePictureComponent passingPP={(value) => getDataPP(value)} pp={data.photoProfile} />
          <UsernameSetting passingUsername={(value) => getDataUsername(value)} username={data.username} />
          <BirthdaySettingComponent passingBday={(value) => getDataBday(value)} birthday={data.birthday} />
          <CountryComponent passingCountry={(value) => getDataCountry(value)} country={data.country} />
          <BioComponent passingBio={(value) => getDataBio(value)} bio={data.bio} />
          <ChangePassword passingPass={(value) => getDataPass(value)} />
        </Fragment>
      ))}
      <button type="submit" className="mt-6 text-white w-52 bg-[#00A2ED] hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-xl text-xs px-5 py-2.5 text-center mr-2 mb-2">Save</button>
    </form>
  )
}

export default Settings