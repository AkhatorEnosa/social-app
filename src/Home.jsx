import { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } from "./components/api/apiSlice"
import { useState } from "react"
import PostCard from "./components/PostCard"
import Navbar from "./components/Navbar"

const Home = () => {
  const [newPost, setNewPost] = useState("")

  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery();
  const [addPost] = useAddPostMutation()
  const [deletePost] = useDeletePostMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    //addTodo
    if(newPost !== '') {
      addPost({
        id: String(posts.length + Math.floor(Math.random() * (70 - 10 + 1) + 10)),
        title: newPost.substring(1, 20),
        body: newPost,
        tags: ['time'],
        reactions: {likes: 0, dislikes: 0},
        userId: Math.floor(Math.random() * (7000 - 500 + 1) + 500)
      })
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
              <button className="btn btn-primary">Post</button>
          </form>
        </div>

  let content
  if (isLoading) {
    content = <p>Loading ...</p>
  } else if (isSuccess) {
    content = posts.map(post => {
      return <PostCard key={post.id} userId={post.userId} postContent={post.body} 
      deletePost={()=>deletePost({ id: post.id})}
      />
    })
  } else if(isError) {
    content = <p>{error}</p>
  }

  return (
    <div className="w-full flex flex-col items-center gap-10">
        <Navbar />
        <div className="w-96 flex flex-col items-center py-20 gap-10">

          {newPostForm}
          {content}
        </div>
    </div>
  )
}

export default Home