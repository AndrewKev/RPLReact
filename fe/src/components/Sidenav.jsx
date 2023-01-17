import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Avatar } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
// import Home from "../pages/Home";
// import Friends from "../pages/Friends";
// import NewPost from "../pages/NewPost";
// import Settings from "../pages/Settings";
import Navbar from "./Navbar";
import axios from "axios";
// import Welcome from "../pages/Welcome";
// import '../style/input.css'

const Sidenav = () => {
  const navigate = useNavigate()
  const name = useParams()

  const abu = '#95AED1'
  const merah = '#DB162F'
  const [title, setTitle] = useState('Sosmed')
  //const [warna, setWarna] = useState('#95AED1') // #95AED1 -> Abu, #DB162F -> Merah
  const [home, setWarnaHome] = useState(abu)
  const [friend, setWarnaFriend] = useState(abu)
  const [post, setWarnaPost] = useState(abu)
  const [setting, setWarnaSetting] = useState(abu)

  const [profil, setProfil] = useState('')

  const getUser = async () => {
    const res = await axios.get(`http://localhost:5000/${name.username}`)
    // console.log(res.data[0].photoProfile)
    setProfil(res.data.user[0].photoProfile)
  }

  const gantiTitle = (value) => {
    setTitle(value)
  }

  const logout = () => {
    navigate('/')
  }

  useEffect(() => {
    if (window.location.pathname === `/${name.username}/home`) {
      document.title = title
      setWarnaHome(merah)
      setWarnaFriend(abu)
      setWarnaPost(abu)
      setWarnaSetting(abu)
    } else if (window.location.pathname === `/${name.username}/friends`) {
      document.title = title
      setWarnaHome(abu)
      setWarnaFriend(merah)
      setWarnaPost(abu)
      setWarnaSetting(abu)
    } else if (window.location.pathname === `/${name.username}/new-post`) {
      document.title = title
      setWarnaHome(abu)
      setWarnaFriend(abu)
      setWarnaPost(merah)
      setWarnaSetting(abu)
    } else if (window.location.pathname === `/${name.username}/settings`) {
      document.title = title
      setWarnaHome(abu)
      setWarnaFriend(abu)
      setWarnaPost(abu)
      setWarnaSetting(merah)
    } else {
      document.title = title
      setWarnaHome(abu)
      setWarnaFriend(abu)
      setWarnaPost(abu)
      setWarnaSetting(abu)
    }

    getUser()
  }, [title, home, name])

  return (
    // <Router>
    <Fragment>
      <Navbar />
      <div className="flex flex-col justify-between border-r-2 shadow h-screen  w-20 fixed top-0 pt-[120px] pb-4">
        <ul className="flex flex-col items-center">
          <li>
            <Link to={`/${name.username}/home`} onClick={() => { gantiTitle('Home') }}>
              <svg className="mb-5" width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.24978 29.1667H10.4164V43.75C10.4164 44.3025 10.6359 44.8324 11.0266 45.2231C11.4173 45.6138 11.9472 45.8333 12.4998 45.8333H37.4998C38.0523 45.8333 38.5822 45.6138 38.9729 45.2231C39.3636 44.8324 39.5831 44.3025 39.5831 43.75V29.1667H43.7498C44.1524 29.167 44.5465 29.0505 44.8841 28.8312C45.2218 28.6118 45.4885 28.2992 45.6519 27.9312C45.8164 27.5635 45.8705 27.1558 45.8076 26.7578C45.7447 26.3599 45.5676 25.9887 45.2977 25.6896L26.5477 4.85624C25.7581 3.97708 24.2414 3.97708 23.4519 4.85624L4.70186 25.6896C4.43247 25.9889 4.25559 26.3598 4.19262 26.7576C4.12965 27.1553 4.1833 27.5627 4.34707 27.9306C4.51084 28.2985 4.77771 28.611 5.11539 28.8304C5.45308 29.0498 5.8471 29.1666 6.24978 29.1667ZM18.6435 28.5083C18.7081 28.7062 20.3373 33.3333 24.9998 33.3333C29.7269 33.3333 31.3373 28.5687 31.3539 28.5187L35.3123 29.8125C35.2102 30.1271 32.7144 37.5 24.9998 37.5C17.2852 37.5 14.7894 30.1271 14.6873 29.8146L18.6435 28.5083Z"
                  fill={home} />
              </svg>
            </Link>
          </li>
          <li>
            <Link to={`/${name.username}/friends`} onClick={() => gantiTitle('Friends')}>
              <svg className="mb-5" width="40" height="40" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.375 36.75C18.375 36.75 15.75 36.75 15.75 34.125C15.75 31.5 18.375 23.625 28.875 23.625C39.375 23.625 42 31.5 42 34.125C42 36.75 39.375 36.75 39.375 36.75H18.375ZM28.875 21C30.9636 21 32.9666 20.1703 34.4435 18.6935C35.9203 17.2166 36.75 15.2136 36.75 13.125C36.75 11.0364 35.9203 9.03338 34.4435 7.55653C32.9666 6.07969 30.9636 5.25 28.875 5.25C26.7864 5.25 24.7834 6.07969 23.3065 7.55653C21.8297 9.03338 21 11.0364 21 13.125C21 15.2136 21.8297 17.2166 23.3065 18.6935C24.7834 20.1703 26.7864 21 28.875 21Z"
                  fill={friend} />
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M13.692 36.75C13.3029 35.9305 13.1088 35.032 13.125 34.125C13.125 30.5681 14.91 26.9062 18.207 24.36C16.5614 23.8529 14.8469 23.605 13.125 23.625C2.625 23.625 0 31.5 0 34.125C0 36.75 2.625 36.75 2.625 36.75H13.692Z"
                  fill={friend} />
                <path
                  d="M11.8125 21C13.553 21 15.2222 20.3086 16.4529 19.0779C17.6836 17.8472 18.375 16.178 18.375 14.4375C18.375 12.697 17.6836 11.0278 16.4529 9.79711C15.2222 8.5664 13.553 7.875 11.8125 7.875C10.072 7.875 8.40282 8.5664 7.17211 9.79711C5.9414 11.0278 5.25 12.697 5.25 14.4375C5.25 16.178 5.9414 17.8472 7.17211 19.0779C8.40282 20.3086 10.072 21 11.8125 21Z"
                  fill={friend} />
              </svg>
            </Link>
          </li>
          <li>
            <Link to={`/${name.username}/new-post`} onClick={() => gantiTitle('New Post')}>
              <svg className="mb-5" width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.7502 25H31.2502M25.0002 18.75V31.25M8.3335 12.5V10.4167C8.3335 9.86413 8.55299 9.33422 8.94369 8.94352C9.33439 8.55282 9.86429 8.33333 10.4168 8.33333H12.5002M22.9168 8.33333H27.0835M37.5002 8.33333H39.5835C40.136 8.33333 40.6659 8.55282 41.0566 8.94352C41.4473 9.33422 41.6668 9.86413 41.6668 10.4167V12.5M41.6668 22.9167V27.0833M41.6668 37.5V39.5833C41.6668 40.1359 41.4473 40.6658 41.0566 41.0565C40.6659 41.4472 40.136 41.6667 39.5835 41.6667H37.5002M27.0835 41.6667H22.9168M12.5002 41.6667H10.4168C9.86429 41.6667 9.33439 41.4472 8.94369 41.0565C8.55299 40.6658 8.3335 40.1359 8.3335 39.5833V37.5M8.3335 27.0833V22.9167"
                  stroke={post}
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </li>
          <li>
            <Link to={`/${name.username}/settings`} onClick={() => gantiTitle('Settings')}>
              <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M25.6142 18.7803C24.3318 18.6536 23.0417 18.9264 21.9204 19.5614C20.7991 20.1963 19.9014 21.1622 19.3503 22.327C18.7992 23.4918 18.6216 24.7985 18.8419 26.0681C19.0621 27.3377 19.6693 28.5083 20.5805 29.4194C21.4917 30.3306 22.6622 30.9379 23.9318 31.1581C25.2014 31.3783 26.5081 31.2007 27.6729 30.6496C28.8377 30.0985 29.8037 29.2008 30.4386 28.0795C31.0735 26.9582 31.3463 25.6681 31.2197 24.3857C31.0753 22.9482 30.4383 21.6048 29.4167 20.5832C28.3951 19.5616 27.0517 18.9247 25.6142 18.7803V18.7803ZM40.663 25C40.659 25.6794 40.6091 26.3577 40.5136 27.0303L44.9286 30.4932C45.1209 30.6525 45.2504 30.8749 45.2942 31.1207C45.338 31.3666 45.2933 31.62 45.1679 31.8359L40.9911 39.0625C40.8643 39.2764 40.666 39.4386 40.4313 39.5206C40.1965 39.6026 39.9404 39.5991 39.7079 39.5107L35.3232 37.7451C35.0814 37.6488 34.8195 37.6141 34.5609 37.6439C34.3024 37.6737 34.0553 37.7672 33.8417 37.916C33.1725 38.3768 32.4693 38.7862 31.7382 39.1406C31.5083 39.2523 31.3095 39.4189 31.1593 39.6257C31.0091 39.8325 30.9121 40.073 30.8769 40.3262L30.2197 45.0029C30.1765 45.2499 30.0489 45.4743 29.8586 45.6376C29.6684 45.8009 29.4274 45.8931 29.1767 45.8984H20.8232C20.5766 45.8942 20.3389 45.8061 20.1491 45.6486C19.9594 45.4911 19.8289 45.2737 19.7792 45.0322L19.123 40.3623C19.0861 40.1064 18.9866 39.8635 18.8333 39.6553C18.6799 39.4471 18.4775 39.2801 18.2441 39.1689C17.5138 38.8164 16.813 38.406 16.1484 37.9414C15.9356 37.7933 15.6893 37.7006 15.4317 37.6714C15.1741 37.6423 14.9133 37.6777 14.6728 37.7744L10.289 39.5391C10.0567 39.6275 9.80059 39.6312 9.56585 39.5494C9.33111 39.4675 9.13278 39.3055 9.00578 39.0918L4.82903 31.8652C4.70345 31.6493 4.65858 31.3959 4.70239 31.15C4.74621 30.9041 4.87586 30.6817 5.06828 30.5225L8.79973 27.5928C9.00416 27.4305 9.16483 27.2197 9.26715 26.9796C9.36947 26.7395 9.41021 26.4776 9.38567 26.2178C9.35051 25.8105 9.32903 25.4043 9.32903 24.9971C9.32903 24.5898 9.34953 24.1895 9.38567 23.791C9.40753 23.5327 9.36479 23.2731 9.26131 23.0354C9.15783 22.7978 8.99686 22.5896 8.79289 22.4297L5.0634 19.5C4.8741 19.3399 4.74718 19.1184 4.70486 18.8741C4.66254 18.6298 4.70754 18.3785 4.83195 18.1641L9.00871 10.9375C9.13555 10.7236 9.33382 10.5614 9.56858 10.4794C9.80333 10.3974 10.0595 10.4009 10.2919 10.4893L14.6767 12.2549C14.9185 12.3512 15.1804 12.3859 15.4389 12.3561C15.6975 12.3263 15.9446 12.2328 16.1581 12.084C16.8273 11.6232 17.5305 11.2138 18.2616 10.8594C18.4915 10.7477 18.6903 10.5811 18.8405 10.3743C18.9908 10.1675 19.0878 9.92696 19.123 9.67383L19.7802 4.99707C19.8234 4.75008 19.951 4.52575 20.1412 4.36241C20.3314 4.19907 20.5725 4.10687 20.8232 4.10156H29.1767C29.4232 4.10583 29.661 4.19395 29.8507 4.3514C30.0405 4.50885 30.1709 4.72625 30.2206 4.96777L30.8769 9.6377C30.9137 9.89362 31.0132 10.1365 31.1666 10.3447C31.3199 10.5529 31.5223 10.7199 31.7558 10.8311C32.486 11.1836 33.1869 11.594 33.8515 12.0586C34.0643 12.2067 34.3106 12.2994 34.5682 12.3286C34.8258 12.3577 35.0866 12.3223 35.3271 12.2256L39.7109 10.4609C39.9432 10.3725 40.1993 10.3688 40.434 10.4506C40.6687 10.5325 40.8671 10.6945 40.9941 10.9082L45.1708 18.1348C45.2964 18.3507 45.3413 18.6041 45.2975 18.85C45.2536 19.0959 45.124 19.3183 44.9316 19.4775L41.2001 22.4072C40.9948 22.569 40.8332 22.7795 40.73 23.0197C40.6268 23.2598 40.5853 23.5219 40.6093 23.7822C40.6415 24.1865 40.663 24.5928 40.663 25Z"
                  stroke={setting}
                  strokeWidth="3.125" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </li>
        </ul>

        <div className="flex flex-col items-center">
          <Dropdown
            label={<Avatar alt="User settings" img={profil} rounded={true} />}
            arrowIcon={false}
            inline={true}
          >
            <Dropdown.Item>
              <Link to={`/${name.username}/detail`}>
                Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link to={`/${name.username}/shared`}>
                Shared
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <button onClick={logout}>
                Sign out
              </button>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/user/home" element={<Home/>} />
          <Route path="/user/friends" element={<Friends/>} />
          <Route path="/user/new-post" element={<NewPost/>} />
          <Route path="/user/settings" element={<Settings/>} />
        </Routes> */}
    </Fragment>
    // </Router>
  )
}

export default Sidenav