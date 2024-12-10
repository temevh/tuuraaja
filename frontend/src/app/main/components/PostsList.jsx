import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:5000/api/getposts");
      setPosts(response.data);
      setLoading(false);
    };

    fetchPosts();
  });

  return (
    <div>
      {loading ? (
        <p>Ladataan...</p>
      ) : (
        <div>
          <p className="text-2xl text-black text-center pb-4">
            Sijaisuusilmoitukset
          </p>
          {posts.map((post) => {
            return <PostCard post={post} />;
          })}
        </div>
      )}
    </div>
  );
};

export default PostList;
