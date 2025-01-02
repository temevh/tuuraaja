"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const PostPage = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [isFilled, setIsFilled] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [isPrimary, setIsPrimary] = useState(false);
  const [isSecondary, setIsSecondary] = useState(false);

  const params = useParams();
  const postCode = params.code;
  let token = "";

  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    if (token) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/getposts",
            {
              params: { code: postCode },
            }
          );
          setPost(response.data[0]);
          setIsFilled(response.data[0].isFilled);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };

      const fetchUser = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/getsubinfo",
            {
              params: {
                token: token,
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
    }
  }, [postCode]);

  useEffect(() => {
    if (userdata && post) {
      const isPrimaryUser =
        post.primarySub && post.primarySub.email === userdata.email;
      const isSecondaryUser =
        post.secondarySubs &&
        post.secondarySubs.some((sub) => sub.email === userdata.email);

      setIsPrimary(isPrimaryUser);
      setIsSecondary(isSecondaryUser);
    }
  }, [userdata, post]);

  const primaryPressed = async () => {
    if (isFilled !== true) {
      try {
        const userData = {
          firstname: userdata.firstName,
          lastname: userdata.lastName,
          email: userdata.email,
          phoneNumber: userdata.phoneNumber,
        };
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
            const token = localStorage.getItem("token");
            try {
              const editResponse = await axios.post(
                "http://localhost:5000/api/editsubinfo",
                { post: postCode, subCode: token }
              );
              if (editResponse.status === 200) {
                alert(editResponse.data.message);
                setIsPrimary(true);
              } else {
                alert("Failed to update substitute info");
              }
            } catch (editError) {
              console.error("Error updating substitute info:", editError);
            }
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
          setIsSecondary(true);
        }
        alert(response.data.message);
      } catch (error) {
        console.error("Error making the API call:", error);
      }
    }
  };

  const cancelPrimary = async () => {
    const response = await axios.post("http://localhost:5000/api/editpost", {
      action: "cancelPrimary",
      email: userdata.email,
      code: postCode,
    });
    alert(response.data.message);
    setIsPrimary(false);
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

  let bgColor = "bg-green-800";
  if (isPrimary) {
    bgColor = "bg-green-400";
  } else if (isSecondary) {
    bgColor = "bg-yellow-400";
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${bgColor}`}>
        <h1 className="text-3xl underline font-bold text-black mb-4">
          {post.subject}
        </h1>
        <h1 className="text-xl font-bold text-black mb-4">
          Jyväskylän Normaalikoulu
        </h1>
        <p className="text-lg text-black mb-2">{formattedDate} klo 14:15</p>
        {isPrimary && (
          <p className="text-2xl text-black underline">Ensisijainen </p>
        )}
        {isPrimary && (
          <button onClick={cancelPrimary}>
            <div className="bg-buttonprimary hover:bg-buttonsecondary rounded-lg p-2 mt-6">
              <p className="text-2xl">Peru ilmoittautuminen</p>
            </div>
          </button>
        )}
        {isSecondary && (
          <p className="text-lg text-black mt-2">Varasijalla: [nro]</p>
        )}
        {!isPrimary && !isSecondary && (
          <>
            {!isFilled && (
              <button
                className="bg-blue-500 text-black p-2 rounded"
                onClick={primaryPressed}
              >
                Ilmoittaudu ensisijaiseksi
              </button>
            )}
            {isFilled && (
              <button
                className="bg-blue-500 text-black p-2 rounded"
                onClick={secondaryPressed}
              >
                Ilmoittaudu toissijaiseksi
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostPage;
