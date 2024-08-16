import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className='w-full flex justify-between px-20 py-5 shadow-sm'>
        <h1 className='text-3xl font-black'>Wannabe Social</h1>
        <ul className='flex gap-5 justify-center items-center'>
            <Link to={'/login'}><li className="btn btn-info text-white">Login</li></Link>
            <Link to={'/register'}><li className="btn btn-primary text-white">Register</li></Link>
        </ul>
    </header>
  )
}

export default Navbar