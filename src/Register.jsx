import { useState } from "react"
import Navbar from "./components/Navbar"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { register } from "./components/api/apiSlice"

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [u_name, setUname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = () => {
        dispatch(register({
            name,
            u_name,
            email,
            password
        })).then(action => {
            localStorage.setItem("user", JSON.stringify({
                id: action.payload.id,
                name: action.payload.name,
                u_name: action.payload.u_name,
                email: action.payload.email
                }))
            navigate('/login')
        })

            // if(u_name !== '' && password !== '') {
            //     const findUser = users.find(user => user.u_name == u_name && user.password == password)


            //     if(findUser !== undefined && findUser.logged_in == false) {
            //         // updateLogin({
            //         //      ...users[findUser.id-1], logged_in: !findUser.logged_in
            //         // })
            //         console.log("For a fact, there is a user like this")
            //         navigate(`/${u_name}`)
            //     } else {
            //         console.log("ahaaahhah")
            //     }
            // } else {
            //     console.log('input field empty')
            // }
        // reset fields
                setUname('')
                setPassword('')
    }


  return (
    <div className="w-full flex flex-col gap-20 pb-20 justify-center items-center">
    <Navbar />

        <div className="w-96 flex flex-col gap-10 border-[1px] border-black/20 rounded-md p-4">
            <>
            <h1 className="text-2xl font-medium">Register</h1>
                <input type="text" name="name" id="name" value={name} placeholder="Fullname" className="input input-bordered input-md" onChange={(e)=>setName(e.target.value)}/>
                <input type="text" name="username" id="username" value={u_name} placeholder="Username" className="input input-bordered input-md" onChange={(e)=>setUname(e.target.value)}/>
                <input type="email" name="email" id="email" value={email} placeholder="Email" className="input input-bordered input-md" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" name="password" id="password" value={password} placeholder="Password" className="input input-bordered input-md" autoComplete="" onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn btn-primary" onClick={handleSubmit}>Login</button></>
        </div>
        <p className="text-xs">Already have an account? <Link to="/login" className="text-blue-500 cursor-pointer">Login</Link></p>
    </div>
  )
}

export default Register