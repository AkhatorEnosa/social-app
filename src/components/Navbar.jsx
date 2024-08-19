/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const Navbar = ({params, handleLogout}) => {
  // const {
  //   data: users } = useGetUserQuery();
  // // let content;

  // const findUser = users.find(user => user.u_name == id)

  // if(findUser) {
  //     console.log(findUser)
  // }

  return (
    <header className='w-full flex justify-between items-center px-20 py-5 shadow-sm'>
        <h1 className='text-3xl font-black'>Wannabe Social</h1>
        <ul className='flex gap-5 justify-center items-center text-sm font-medium'>
          { params ? <><li className="tracking-tight">{params}</li> <button className="btn btn-error text-white btn-sm" onClick={handleLogout}>Logout</button></> :
            <>
              <Link to={'/login'}><li className="btn btn-info text-white">Login</li></Link>
              <Link to={'/register'}><li className="btn btn-primary text-white">Register</li></Link>
            </>
          }
        </ul>
    </header>
  )
}

export default Navbar