"use client";
import SubInfo from "./components/SubInfo";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../../types";

const UserPage = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<User>(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getsubinfo",
          {
            withCredentials: true,
          },
        );
        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sub info", error);
        router.push("/");
      }
    };
    fetchSubInfo();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const postRequests = userInfo.posts.map(async (post) => {
          const response = await axios.get(
            "http://localhost:5000/api/getposts",
            {
              params: { code: post },
              withCredentials: true,
            },
          );
          return response.data;
        });

        const posts = await Promise.all(postRequests);
        setUserPosts(posts);
      } catch (error) {
        console.error("Error fetching sub posts", error);
      }
    };

    if (userInfo?.posts) fetchUserPosts();
  }, [userInfo]);

  return (
    <div className="min-h-screen flex w-1/2 mx-auto bg-white items-center justify-center">
      {loading ? (
        <p>Ladataan...</p>
      ) : (
        <SubInfo userInfo={userInfo} userPosts={userPosts} />
      )}
    </div>
  );
};

export default UserPage;
