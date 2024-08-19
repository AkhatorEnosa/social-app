import { useState } from "react"
import Navbar from "./components/Navbar"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "./components/api/apiSlice"

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()


    const handleSubmit = () => {
            if(email !== '' && password !== '') {
                dispatch(login({
                    email,
                    password
                })).then(action => {
                    localStorage.setItem("user", JSON.stringify({
                        id: action.payload.id,
                        name: action.payload.name,
                        email: action.payload.email
                        }))
                    navigate('/')
                })
            } else {
                console.log('input field empty')
            }
        // reset fields
                setEmail('')
                setPassword('')
    }


  return (
    <div className="w-full flex flex-col gap-20 pb-20 justify-center items-center">
    <Navbar />

        <div className="w-96 flex flex-col gap-10 border-[1px] border-black/20 rounded-md p-4">
            <>
            <h1 className="text-2xl font-medium">Login</h1>
                <input type="email" name="email" id="email" value={email} placeholder="Email Address" className="input input-bordered input-md" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" name="password" id="password" value={password} placeholder="Password" className="input input-bordered input-md" autoComplete="" onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn btn-primary" onClick={handleSubmit}>Login</button></>
        </div>
        <p className="text-xs">Don&lsquo;t have an account? <Link to="/register" className="text-blue-500 cursor-pointer">Register</Link></p>
    </div>
  )
}

export default Login