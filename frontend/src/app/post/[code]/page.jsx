"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import { TakeButton, SecondaryButton } from "./components";

const PostPage = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [isFilled, setIsFilled] = useState(null);
  const [userdata, setUserdata] = useState(null);

  const params = useParams();
  const postCode = params.code;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getposts", {
          params: { code: postCode },
        });
        setPost(response.data[0]);
        setIsFilled(response.data[0].isFilled);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const fetchUser = async () => {
      let userToken = "";
      if (localStorage.getItem("token")) {
        userToken = localStorage.getItem("token");
      }
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getsubinfo",
          {
            params: {
              token: userToken,
            },
          }
        );
        setUserdata(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
    fetchUser();
  }, [postCode]);

  const primaryPressed = async () => {
    if (isFilled !== true) {
      try {
        const userData = {
          firstname: userdata.firstName,
          lastname: userdata.lastName,
          email: userdata.email,
          phoneNumber: userdata.phoneNumber,
        };
        console.log("userdata:", userdata);
        const response = await axios.post(
          "http://localhost:5000/api/handlepost",
          {
            user: userData,
            postCode: postCode,
            primary: true,
          }
        );

        if (response.status === 200) {
          const confirmResponse = await axios.get(
            "http://localhost:5000/api/checkprimary",
            {
              params: {
                postCode: postCode,
                email: userdata.email,
              },
            }
          );

          if (confirmResponse.data.isPrimary) {
            setIsFilled(true);
            alert("Ilmoittautuminen onnistui");
          } else {
            alert("Ilmoittautuminen epäonnistui");
          }
        }
      } catch (error) {
        console.error("Error handling post:", error);
      }
    }
  };

  const secondaryPressed = async () => {
    if (isFilled === true) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/handlepost",
          {
            user: userdata,
            postCode: postCode,
            primary: false,
          }
        );
        if (response.status === 200) {
          setIsFilled(true);
        }
        alert(response.data.message);
      } catch (error) {
        console.error("Error making the API call:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-black font-bold text-3xl">Ladataan...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-black font-bold text-3xl">No post found</p>
      </div>
    );
  }

  const date = new Date(post.date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  const bgColor = isFilled ? "bg-red-400" : "bg-green-800";

  const isPrimaryUser =
    userdata && post.primarySub && post.primarySub.email === userdata.email;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${bgColor}`}>
        <h1 className="text-3xl underline font-bold text-white mb-4">
          {post.subject}
        </h1>
        <h1 className="text-xl font-bold text-white mb-4">
          Jyväskylän Normaalikoulu
        </h1>
        <p className="text-lg text-white mb-2">Aika: {formattedDate}</p>
        <p className="text-lg text-white">
          Status: {isFilled ? "Varattu" : "Vapaana"}
        </p>
        {isPrimaryUser && (
          <p className="text-lg text-white mt-2">Paikka varattu sinulle</p>
        )}
        <TakeButton
          isFilled={isFilled}
          setIsFilled={setIsFilled}
          primaryPressed={primaryPressed}
        />
        {isFilled && <SecondaryButton secondaryPressed={secondaryPressed} />}
      </div>
    </div>
  );
};

export default PostPage;
