import { useEffect, useState } from "react"
import PostCard from "./components/PostCard"
import Navbar from "./components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { getCurrUser } from "./components/api/apiSlice"
import { fetchPosts } from "./components/api/PostSlice"

const Home = () => {
  const [newPost, setNewPost] = useState("")
  const [name, setName] = useState('')

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.post)

  useEffect(()=> {
    dispatch(getCurrUser)
    if(getCurrUser()) {
      setName(getCurrUser().name)
    } else {
      setName('')
    }
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchPosts())
    }, 2000);
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

  let content = posts.isLoading == false && posts.posts !== null ? posts.posts.map(post => (
       <PostCard key={post.id} userId={post.user_id} postContent={post.body} datetime={post.datetime} postId={post.id}
      deletePost={''}
      />)) :  <div className="w-full h-56 flex flex-col justify-center items-center"><span className="loading loading-dots loading-lg "></span></div>
      // ()=>deletePost({ id: post.id})

  return (
    <div className="w-full flex flex-col items-center gap-10">
        <Navbar params={name}/>
        <div className="w-96 flex flex-col items-center py-20 gap-10">

          {newPostForm}
          {/* {posts.loading ? console.log("loading") : posts.posts.map(post => console.log(post.id))} */}
          {/* {console.log(posts.posts)} */}
          <div className="cards flex flex-col gap-5 justify-center items-center">
            {content}
          </div>
        </div>
    </div>
  )
}

export default Home