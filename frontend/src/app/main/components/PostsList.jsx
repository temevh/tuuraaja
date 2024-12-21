import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:5000/api/getposts");
      console.log("posts", response.data);
      setPosts(response.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Ladataan...</p>
      ) : (
        <div>
          <p className="text-3xl text-center pb-4 text-black">
            Sijaisuusilmoitukset
          </p>
          {posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default PostList;
