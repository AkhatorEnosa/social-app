import { CiBookmarkPlus, CiHeart, CiTrash } from "react-icons/ci"

/* eslint-disable react/prop-types */
const PostCard = ({userId, postContent, deletePost, datetime, postId}) => {
  return (
    <div className="w-full py-5 px-3 flex flex-col gap-3 justify-center items-center text-sm rounded-md shadow-md hover:bg-slate-200/50 duration-200 transition-all cursor-pointer">
        <h3 className="w-full font-bold text-left">{userId}</h3>
        <p className="w-full text-start">{postContent}</p>
        <span className="w-full text-start text-[0.5rem] text-black/50">{datetime}</span>
        <div className="w-full flex gap-2 justify-between items-center pt-5 px-10 text-lg">
            <CiHeart className="hover:text-green-700"/>
            <CiBookmarkPlus className="hover:text-blue-600"/>
            <CiTrash onClick={deletePost} className="hover:text-red-700" title={postId}/>
        </div>
    </div>
  )
}

export default PostCard