import React, { useEffect, useState } from 'react'
import service from '../appwrite/config';
import { PostCard } from '../components';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    service.getAllPosts([]).then((posts) => {
      if(posts) {
        setPosts(posts.documents)
      }
    })
    console.log("posts from all", posts)
  },[])

  return (
    <div className='flex flex-wrap justify-center my-2 gap-4'>
      {posts.map((post) => (
        <div key={post.$id} className=''>
        <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}

export default AllPosts