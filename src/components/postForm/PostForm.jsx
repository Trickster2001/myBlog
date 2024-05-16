import React, { useCallback, useEffect } from 'react'
import {Input, Button, RTE, Select} from "../index"
import { useForm } from 'react-hook-form'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({post}) => {
  const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "hello there",
      status: post?.status || "active",
    }});

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log(data)
    console.log(data.image[0]);
    if(post) {
     const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
     if(file) {
      service.deleteFile(post.featuredImage);
     }
     const dbPost = await service.updatePost(post.$id, {...data, featuredImage: file ? file.$id : undefined})
     if(dbPost) {
      navigate(`/post/${dbPost.$id}`)
     }
    } else {
      const file = await service.uploadFile(data.image[0]);
      console.log("fileis ", file)
      if(file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await service.createPost({...data, userId: userData.$id});
        console.log("db post", dbPost)
        if(dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if(value && typeof value==="string"){
      const slug = value.toLowerCase().replace(/ /g, '-');
      setValue('slug', slug);
      return slug;
    }
    return "";
  },[])

  useEffect(()=>{
    const subscription = watch((value, {name}) => {
      if(name==="title"){
        setValue("slug", slugTransform(value.title, {shouldValidate: true}))
      }
    })
    return (()=>{
      subscription.unsubscribe()
    })
  },[watch, slugTransform, setValue])
  return (
    <div className='p-2 h-screen'>
      <form className='sm:flex' onSubmit={handleSubmit(submit)}>
      <div id="left" className=' p-3 w-full sm:w-1/2'>
        <Input
        label="Title"
        type="text"
        placeholder="Enter the tittle"
        className="mb-4"
        {...register("title", {required:true})}
        />
        <Input
        label="slug"
        type="text"
        placeholder="Enter the slug"
        className="mb-4"
        {...register("slug", {required:true})}
        onInput = {(e) => {
          setValue('slug', slugTransform(e.currentTarget.value), {shouldValidate: true});
        }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className='hidden sm:block border border-black'></div>
      <div id="right" className=' p-3 sm:w-1/2'>
      <Input
        label="featured Image"
        type="file"
        placeholder="Enter the tittle"
        className="mb-4"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", {required: !post})}
        />
        {post && (
          <div className="w-full mb-4">
          <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
          />
      </div>
        )}
        <Select label="status" options={["active", "inactive"]} {...register("status", {required:true})} />

        <Button type='submit' className='bg-green-600 text-white p-2 px-5 rounded-lg'>Submit</Button>
      </div>
      </form>
    </div>
  )
}

export default PostForm