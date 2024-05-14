import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config';
import { PostForm } from '../components';

const EditPost = () => {
  const {slug} = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    if(slug) {
      service.getPost(slug).then((post) => {
        if(post) {
          setPost(post);
        }
      })
    } else {
      navigate("/");
    }
    console.log(post)
  },[slug])
  return post ? (
    <PostForm post={post} />
  ) : null
}

export default EditPost