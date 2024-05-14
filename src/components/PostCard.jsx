import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

const PostCard = ({post}) => {

  return (
    <Link to={`/post/${post.$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={service.getFilePreview(post.featuredImage)} className='rounded-xl' alt={post.title} />
        </div>
        <h2 className='text-xl font-bold'>{post.title}</h2>
      </div>
    </Link>
  )
}

export default PostCard