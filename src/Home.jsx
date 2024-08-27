import { useEffect, useState } from "react"
import PostCard from "./components/PostCard"
import Navbar from "./components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { getCurrUser } from "./components/api/apiSlice"
import { addLike, addPost,  deletePost, fetchLikes, fetchPosts, removeLike } from "./components/api/PostSlice"

const Home = () => {
  const [newPost, setNewPost] = useState("")
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [uid, setUid] = useState('')

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.post) //get redux state
  const currUserData = dispatch(getCurrUser)
  const datenow = new Date()

  useEffect(()=> {
    currUserData
    if(getCurrUser()) {
      setName(getCurrUser().name)
      setStatus(getCurrUser().logged_in)
      setUid(getCurrUser().id)
    } else {
      setName('')
      setStatus('')
    }
  }, [currUserData])

  useEffect(() => {
      dispatch(fetchPosts())
      dispatch(fetchLikes())
    setInterval(() => {
      dispatch(fetchLikes())
      dispatch(fetchPosts())
    }, 300000);
  }, [dispatch])

// const randomizeLetters = () => {
//   var str = "abcdefghijklmnopqrstuvwxyz";
//     return str.split('').sort(function(){return 0.5-Math.random()}).join('').substring(10,11);
// }

  function randomNum(min, max) { // min and max range
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

 //Add New Post
  const handleSubmit = (e) => {
    e.preventDefault()
    if(newPost !== '') {
      dispatch(addPost({
        id: String(randomNum(1290443493, 903438802823)), //create id
        body: newPost,
        datetime: datenow.toString(),
        u_name: currUserData.name,
        user_id: currUserData.id,
        u_img: currUserData.u_img,
        likesCount: 0
      }))
      dispatch(fetchPosts())
    }
      setNewPost('')
  }

   const countLikes = (id) => {
    if(posts.likes !== null) {
      const filterLikes = posts.likes.filter(like => like.postId == id)
      if(filterLikes) {
        return filterLikes.length
      } else {
        console.log("Jembe")
      }
    }
  }

  const likedPost = (id) => {
    if(posts.likes !== null) {
      const filterLiked = posts.likes.find(like => (like.postId == id) && (like.userId == uid))
      if(filterLiked) {
        return true
      } else {
        return false
      }
    }
  }

  let newPostForm;
  let content;

        {currUserData ? newPostForm = <div className="w-full flex flex-col gap-10 justify-center items-center">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <textarea rows={5} name="post" id="post" 
              className="rounded-lg p-2 placeholder:text-sm"
              placeholder="What do you have in mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}></textarea>
              <button className={newPost !== '' ? "btn btn-secondary" : "hidden"}>Post</button>
          </form>
        </div> : ''}

  
  if(posts.isLoading == false && posts.posts !== null && posts.posts.length > 0) {
    const allPosts = posts.posts
    
    // sort posts before mapping
    content = allPosts.toSorted((a, b) => new Date(b.datetime) - new Date(a.datetime)).map(post => (
                <PostCard 
                  key={post.id} 
                  userId={post.user_id == uid ? true : false} 
                  status={status} 
                  uImg={post.u_img} 
                  uName={post.u_name} 
                  postContent={post.body} 
                  bookmarks={post.bookmarks} 
                  datetime={post.datetime} 
                  postId={post.id}
                  likes={countLikes(post.id)}
                  liked={likedPost(post.id)}
                  likePost={() => {

                        const postLikes = posts.likes
                          const verifyLike = postLikes.find(x => ((x.postId == post.id) && (x.userId == uid)))
                            if(verifyLike == undefined) {
                              dispatch(addLike({
                                "id" : String(randomNum(1290443493, 903438802823)),
                                "postId" : post.id,
                                "userId" : uid
                              }))
                            } else {
                                dispatch(removeLike(verifyLike.id))
                            }
                      }}
                  deletePost={()=> dispatch(deletePost(post.id))}
                />))
  }else if(posts.error == true) {
    content = <div className="w-full h-56 flex flex-col justify-center items-center">Network error. Try reload page.</div>
  }else if (posts.isLoading == false && posts.posts !== null && posts.posts.length === 0) {
    content = <div className="w-full h-56 flex flex-col justify-center items-center">No posts to see yet</div>
  } else {
    content = <div className="w-full h-56 flex flex-col justify-center items-center"><span className="loading loading-dots loading-lg text-secondary"></span></div>
  }
      // ()=>deletePost({ id: post.id})

  return (
    <div className="w-full flex flex-col items-center p-0 m-0">
        <Navbar params={name}/>
        <div className="w-96 flex flex-col items-center pt-28 pb-10 gap-10">

          <div className="w-full flex flex-col gap-5 justify-center items-center">
            {newPostForm}
            {content}
          </div>
        </div>
    </div>
  )
}

export default Home