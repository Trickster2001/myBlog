import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

const PostCard = ({post}) => {

  return (
    <Link to={`/post/${post.$id}`}>
    <div className={`${post.status === "inactive" ? "bg-red-500" : ""} bg-white rounded-xl p-4 border border-black shadow-lg`} >
      <div className='mx-auto '>
        <div className='mb-4 w-[60vw] sm:w-[30vw] md:w-[20vw] h-fit  py-3'>
          <img src={service.getFilePreview(post.featuredImage)} className='rounded-xl h-[300px] mx-auto border border-b-black' alt={post.title} />
        <h2 className='text-2xl font-bold underline text-orange-500 text-center mt-3'>{post.title}</h2>
        <h2 className='font-bold text-white text-center'>{`${post.status === "inactive" ? "INACTIVE" : ""}`}</h2>
        </div>
      </div>
      </div>
    </Link>
  )
}

export default PostCard