/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom"
import { getCurrUser, logout } from "./api/apiSlice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"

const Navbar = () => {
  
  const [name, setName] = useState('')
  const [u_img, setUimg] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
           { name ? <><img src={u_img} alt="profile_pic" className="w-10 h-10"/><li className="tracking-tight">{name}</li> <button className="btn btn-error btn-outline text-white btn-sm" onClick={handleLogout}>Logout</button></> :
            <>
              <Link to={'/login'}><li className="btn btn-info btn-outline btn-sm text-white">Login</li></Link>
              <Link to={'/register'}><li className="btn btn-primary btn-outline btn-sm text-white">Register</li></Link>
            </>
          }
        </ul>
    </header>
  )
}

export default Navbar