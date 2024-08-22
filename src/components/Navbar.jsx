/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom"
import { getCurrUser, logout } from "./api/apiSlice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"

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
    <header className='w-full flex justify-between items-center px-20 py-5 shadow-sm'>
        <Link to='/'> <h1 className='text-base md:text-3xl font-black'>Wannabe Social</h1> </Link>
        <ul className='flex gap-5 justify-center items-center text-sm font-medium'>
           { name ? <div className="flex flex-col gap-5 justify-center items-center"><div className="flex gap-2 justify-center items-center bg-black/5 px-2 py-1 rounded-full hover:shadow-sm cursor-pointer" onClick={toggleShowLogout}><img src={u_img} alt="profile_pic" className="w-10 h-10 border-[1px] border-black/30 rounded-full"/>{!showLogout ? <li className="tracking-tight">{name}</li> : <span className="text-error hover:underline" onClick={handleLogout}>Logout</span> }</div> </div> :
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