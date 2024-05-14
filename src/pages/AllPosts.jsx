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
    console.log(posts)
  },[])
  return (
    <div className='flex'>
      {posts.map((post) => (
        <div key={post.$id}>
        <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}

export default AllPosts