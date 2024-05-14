import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { Button } from "../components";

const Post = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const { slug } = useParams();

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

  return post ? (
    <>
      <div className="w-full flex ">
        <div className="w-1/4 mr-4">
          <img src={service.getFilePreview(post.featuredImage)} alt="" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          {parse(post.content)}
          {isAuthor && (
            <div>
            <Link to={`/editPost/${post.$id}`}>
            <Button bgColor="bg-green-500" className="mr-3">
                Edit
            </Button>
        </Link>
            <Button bgColor="bg-red-500" onClick={deleteMe}>
              Delete
            </Button>
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <p>loading...</p>
  );
};

export default Post;
