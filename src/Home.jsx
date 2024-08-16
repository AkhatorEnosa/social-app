import PostCard from "./components/PostCard"

const Home = () => {
  return (
    <div className="w-screen flex flex-col items-center py-20">
        <h1>Timeline</h1>
        <div className="flex flex-col gap-10 justify-center items-center">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
    </div>
  )
}

export default Home