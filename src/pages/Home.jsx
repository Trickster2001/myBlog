import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { PostCard } from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getActivePosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
    console.log("posts from app", posts);
  }, []);
  return (
    <div>
      <div className="flex flex-wrap justify-center my-2 gap-4">
        {posts.map((post) => (
          // console.log(post);
          <div key={post.$id} >
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
