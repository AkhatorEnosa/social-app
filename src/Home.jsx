import { useEffect, useState } from "react"
import PostCard from "./components/PostCard"
import Navbar from "./components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { getCurrUser } from "./components/api/apiSlice"
import { addPost, fetchPosts } from "./components/api/PostSlice"

const Home = () => {
  const [newPost, setNewPost] = useState("")
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  // const [userId, setUserId] = useState('')
  // const [allPosts, setAllPosts] = useState()

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.post)
  const currUserData = dispatch(getCurrUser)
  const datenow = new Date()

  useEffect(()=> {
    currUserData
    if(getCurrUser()) {
      setName(getCurrUser().name)
      setStatus(getCurrUser().logged_in)
    } else {
      setName('')
      setStatus('')
    }
  }, [currUserData])

  useEffect(() => {
      dispatch(fetchPosts())
    setInterval(() => {
      dispatch(fetchPosts())
    }, 60000);
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
      dispatch(fetchPosts())
    if(newPost !== '') {
      dispatch(addPost({
        // id: posts.posts.length > 0 ? posts.posts.length + 1 : 1, //get correct id
        body: newPost,
        reactions: {likes: 0, dislikes: 0},
        datetime: datenow.toString(),
        u_name: currUserData.name,
        user_id: currUserData.id,
        u_img: currUserData.u_img
      }))
      console.log("Valid to send")
    }
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
              <button className={newPost !== '' ? "btn btn-secondary" : "hidden"}>Post</button>
          </form>
        </div>

  let content;
  
  if(posts.isLoading == false && posts.posts !== null && posts.posts.length > 0) {
    const allPosts = posts.posts
    
    // sort posts before mapping
    content = allPosts.toSorted((a,b) => b.datetime - a.datetime).map(post => (
                <PostCard key={post.id} userId={post.user_id} status={status} uImg={post.u_img} uName={post.u_name} postContent={post.body} datetime={post.datetime} postId={post.id}
                deletePost={''}
                />))
  }else if(posts.error == true) {
    content = <div className="w-full h-56 flex flex-col justify-center items-center">Network error. Try reload page.</div>
  }else if (posts.isLoading == false && posts.posts !== null && posts.posts.length === 0) {
    content = <div className="w-full h-56 flex flex-col justify-center items-center">No posts to see yet</div>
  } else {
    content = <div className="w-full h-56 flex flex-col justify-center items-center"><span className="loading loading-dots loading-lg text-secondary"></span></div>
  }
  // let content = posts.isLoading == false && posts.posts !== null ? posts.posts.map(post => (
  //      <PostCard key={post.id} userId={post.user_id} postContent={post.body} datetime={post.datetime} postId={post.id}
  //     deletePost={''}
  //     />)) :  <div className="w-full h-56 flex flex-col justify-center items-center"><span className="loading loading-dots loading-lg text-secondary"></span></div>
      // ()=>deletePost({ id: post.id})

  return (
    <div className="w-full flex flex-col items-center gap-10">
        <Navbar params={name}/>
        <div className="w-96 flex flex-col items-center py-20 gap-10">

          {newPostForm}
          <div className="w-full flex flex-col gap-5 justify-center items-center">
            {content}
          </div>
        </div>
    </div>
  )
}

export default Home