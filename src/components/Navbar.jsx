/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom"
import { getCurrUser, logout } from "./api/apiSlice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { FaSignOutAlt } from "react-icons/fa"

const Navbar = () => {

  // classlist state 
  const [showLogout, setShowLogout] = useState(false)
  
  const [name, setName] = useState('')
  const [u_img, setUimg] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleShowLogout = () => {
    setShowLogout(!showLogout)
  }

  useEffect(()=> {
    dispatch(getCurrUser)
    if(getCurrUser()) {
      setName(getCurrUser().name)
      setUimg(getCurrUser().u_img)
    } else {
      setName('')
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    setName('')
    navigate('/login')
  }

  return (
    <header className='w-full flex justify-between items-center px-20 py-5 shadow-sm fixed top-0 bg-white/30 backdrop-blur-lg'>
        <Link to='/'> <h1 className='text-base md:text-3xl font-black'>Wannabe Social</h1> </Link>
        <ul className='flex gap-5 justify-center items-center text-sm font-medium'>
           { name ? <div className="relative flex flex-col gap-5 justify-center items-center"><div className="flex gap-2 justify-center items-center hover:bg-black/5 px-2 py-1 rounded-full hover:shadow-lg cursor-pointer" onClick={toggleShowLogout}><img src={u_img} alt="profile_pic" className="w-10 h-10 border-[1px] border-black/30 rounded-full"/><li className="tracking-tight">{name}</li></div> <div className={!showLogout ? "hidden" : "cursor-pointer absolute w-full flex justify-end items-center gap-2 text-right border-t-[1px] top-[50px] mt-2 px-2 text-error hover:underline"} onClick={handleLogout}><FaSignOutAlt /> <p>Logout</p></div></div> :
            <>
              <Link to={'/login'}><li className="text-info hover:underline">Login</li></Link>
              <Link to={'/register'}><li className="text-primary hover:underline">Register</li></Link>
            </>
          }
        </ul>
    </header>
  )
}

export default Navbar