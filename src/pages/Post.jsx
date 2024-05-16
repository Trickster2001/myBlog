import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { Button, Input } from "../components";
import { useForm } from "react-hook-form";

const Post = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [comments, setComments] = useState([])

  const { slug } = useParams();

  const {register, handleSubmit, reset} = useForm({
    defaultValues: {
      common: slug,
      comment: ""
    }
  })

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  console.log(isAuthor);

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      service.getComments(slug).then((comment) => {
        if(comment) {
          setComments(comment.documents)
        }
      })
      });
    }
  }, [slug, navigate]);

  console.log("Post is ", post);

  const deleteMe = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const commentHere = (data) => {
    service.createComment({...data}).then((data) => {
      if(data) {
        service.getComments(slug).then((comment) => {
          setComments(comment.documents);
        })
      }
    })
    reset();
    // console.log(data);
  }

  console.log("length ", comments.length)

  return post ? (
    <>
      <div className="w-full flex flex-col sm:flex-row sm:flex-wrap p-4">
        <div className=" w-[80vw] sm:w-[50vw] max-h-[50vh] my-4 mx-auto sm:mx-0">
          <img className="mx-auto max-h-[50vh]" src={service.getFilePreview(post.featuredImage)} alt="" />
          {/* hello */}
        </div>
        <div className="flex flex-col mx-8  sm:w-[45vw] sm:mx-0 justify-center px-5">
          <h1 className="text-2xl font-semibold text-center">{post.title}</h1>
          <h2 className="text-justify my-4">
          {parse(post.content)}
          </h2>
          {isAuthor && (
            <div className="flex justify-between my-5">
              <div>
              <Link to={`/editPost/${post.$id}`}>
                <Button className="px-5 py-2 text-white rounded-lg bg-green-500">
                  Edit
                </Button>
              </Link>
              </div>
              <div>
              <Button className="bg-red-500 px-5 py-2 text-white rounded-lg" onClick={deleteMe}>
                Delete
              </Button>
              </div>
            </div>
          )}
        </div>
        <div className="mx-8 sm:w-full">
          <h1 className="font-semibold underline py-2 text-xl">Comments:</h1>
          <div className={`${comments.length>0 ? "border border-black p-2 rounded-lg" : ""}`}>
          {/* <div className="border border-black p-2 rounded-lg"> */}
          {/* {comments ? comments.map((comment) => (
            <p className="underline" key={comment.$id}>{comment.comment}</p>
          )) : null} */}
          {comments.length>0 ? comments.map((comment) => (
            <p className="underline" key={comment.$id}>{comment.comment}</p>
          )) : <p className="text-blue-500">Not a single comment yet.. Be the First to Comment!</p>}
          </div>
        </div>
        <div id="comment" className="mx-8 my-4 sm:w-full">
          <form onSubmit={handleSubmit(commentHere)}>
            <Input className="w-1/2 hidden" type="text" placeholder="common at" {...register("common")}  />
            <Input className="w-1/2" type="text" placeholder="comment here" {...register("comment",{required:true})}  />
            <Button type="submit" className="bg-blue-500 text-white px-5 py-2 my-2 rounded-lg">comment</Button>
          </form>
        </div>
        
      </div>
    </>
  ) : (
    <p>loading...</p>
  );
};

export default Post;
