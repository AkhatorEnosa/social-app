const PostCard = () => {
  return (
    <div className="w-full py-5 px-3 flex flex-col gap-3 justify-center items-center rounded-md shadow-md hover:bg-slate-200/50 duration-200 transition-all cursor-pointer">
        <h3>Akhator Osakhogba</h3>
        <p className="w-full text-start">Post details</p>
        <div className="w-full flex gap-2 justify-between items-center">
            <button className="btn btn-success">Comment</button>
            <button className="btn btn-info">Like</button>
            <button className="btn btn-primary">Bookmark</button>
        </div>
    </div>
  )
}

export default PostCard