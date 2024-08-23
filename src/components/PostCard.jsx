import { FaBookmark, FaHeart, FaTrash } from "react-icons/fa"

/* eslint-disable react/prop-types */
const PostCard = ({userId, status, uImg, uName, postContent, like, bookmark, deletePost, datetime, postId}) => {
  return ( 
    <div className="w-full py-5 px-3 flex flex-col items-start text-sm rounded-md shadow-md hover:bg-slate-200/50 duration-200 transition-all cursor-pointer">
        <div className="flex gap-2">
          <img src={uImg} alt="" className="w-10 h-10"/>
          <div>
            <div className="w-full flex gap-2 justify-center items-center">
              <h3 className="w-full font-bold text-left">{uName}</h3>
            </div>
            <div>
              <p className="w-full text-start">{postContent}</p>
              <span className="w-full text-start text-[0.5rem] text-black/50">{datetime}</span>
            </div>
          </div>
        </div>  
        
        {
          status ? <div className="w-full flex gap-2 justify-between items-center pt-5 px-10 text-xs">
              <span className="flex justify-center items-center gap-1 hover:text-green-700"><FaHeart className=" text-sm"/>{like} Like</span>
              <span className="flex justify-center items-center gap-1 hover:text-blue-600"><FaBookmark className=" text-sm"/>{bookmark} Bookmark</span>
             {userId ? <span className="flex justify-center items-center gap-1 hover:text-red-700" onClick={deletePost}><FaTrash className=" text-sm" title={postId}/> Delete</span> : '' }
          </div> : ''
        }
    </div>
  )
}

export default PostCard