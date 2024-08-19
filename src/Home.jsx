import { useEffect, useState } from "react"
import PostCard from "./components/PostCard"
import Navbar from "./components/Navbar"
import { useDispatch } from "react-redux"
import { getCurrUser, logout } from "./components/api/apiSlice"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [newPost, setNewPost] = useState("")
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getCurrUser)
    if(getCurrUser()) {
      setName(getCurrUser().name)
    } else {
      setName('')
    }
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    //addTodo
    // if(newPost !== '') {
    //   addPost({
    //     id: String(posts.length + Math.floor(Math.random() * (70 - 10 + 1) + 10)),
    //     title: newPost.substring(1, 20),
    //     body: newPost,
    //     reactions: {likes: 0, dislikes: 0},
    //     datetime: new Date(),
    //     user_id: 1
    //   })
    // }
      setNewPost('')

      console.log()
  }

  const handleLogout = () => {
    dispatch(logout())
    setName('')
    navigate('/login')
  }

  const newPostForm = 

        <div className="w-full flex flex-col gap-10 justify-center items-center">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <textarea rows={5} name="post" id="post" 
              className="rounded-lg p-2 placeholder:text-sm"
              placeholder="What do you have in mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}></textarea>
              <button className="btn btn-primary">Post</button>
          </form>
        </div>

  // let content = posts.map(post => {
  //      <PostCard key={post.id} userId={post.user_id} postContent={post.body} datetime={post.datetime} postId={post.id}
  //     deletePost={''}
  //     />})
      // ()=>deletePost({ id: post.id})

  return (
    <div className="w-full flex flex-col items-center gap-10">
        <Navbar params={name} handleLogout={handleLogout}/>
        <div className="w-96 flex flex-col items-center py-20 gap-10">

          {newPostForm}
          {/* {content} */}
        </div>
    </div>
  )
}

export default Home