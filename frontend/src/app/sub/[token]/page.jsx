"use client";
import SubInfo from "../components/SubInfo";
import axios from "axios";

import { useEffect, useState } from "react";

const userPage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchSubInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getsubinfo",
          {
            params: {
              token: token,
            },
          }
        );
        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sub info", error);
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
              params: {
                code: post,
              },
            }
          );
          return response.data;
        });

        const posts = await Promise.all(postRequests);
        setUserPosts(posts);
      } catch (error) {
        console.error("Error fetching sub posts", error);
      }
    };

    if (userInfo && userInfo.posts) {
      fetchUserPosts();
    }
  }, [userInfo]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tl from-gradientend to-gradientstart">
      {loading ? (
        <p>Ladataan...</p>
      ) : (
        <div>
          <SubInfo userInfo={userInfo} userPosts={userPosts} />
        </div>
      )}
    </div>
  );
};

export default userPage;
