import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Navbar = () => {
  const name = useParams()
  const [navTitle, setNavTitle] = useState('Sosmed')
  
  const gantiNavTitle = (value) => {
    setNavTitle(value)
  }

  useEffect(() => {
    if(window.location.pathname === `/${name.username}/home`) {
      gantiNavTitle(`Hello, ${name.username}`)
    } else if(window.location.pathname === `/${name.username}/friends`) {
      gantiNavTitle('Friends')
    } else if(window.location.pathname === `/${name.username}/new-post`) {
      gantiNavTitle('New Post')
    } else if(window.location.pathname === `/${name.username}/settings`) {
      gantiNavTitle('Settings')
    } else if(window.location.pathname === `/${name.username}/detail`) {
      gantiNavTitle(`Detail, ${name.username}`)
    }
  })

  return (
    <div className="fixed z-10 top-0 w-full flex items-center h-20 bg-[#1D3557] text-white">
      <h1 className="text-3xl mx-6 font-medium">Sosial Media</h1>
      <h2 className="ml-4">"{navTitle}"</h2>
    </div>
  )
}

// class Navbar extends Component {
//   render() {
//     return(
//       <div className="fixed z-10 top-0 w-full flex items-center h-20 bg-[#1D3557] text-white">
//         <h1 className="text-3xl mx-6 font-medium">Sosial Media</h1>

//         <h2 className="ml-4">Hello, User</h2>
//       </div>
//     )
//   }
// }

export default Navbar