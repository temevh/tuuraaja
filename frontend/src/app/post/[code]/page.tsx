"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { TakeButton, SecondaryButton } from "./components";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

interface Sub {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber?: string;
}

interface Post {
  date: string;
  subject: string;
  isFilled: boolean;
  primarySub?: Sub;
  secondarySubs?: Sub[];
}

const PostPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);
  const [isFilled, setIsFilled] = useState<boolean | null>(null);
  const [userdata, setUserdata] = useState<UserData | null>(null);
  const [isPrimary, setIsPrimary] = useState<boolean>(false);
  const [isSecondary, setIsSecondary] = useState<boolean>(false);

  const params = useParams();
  const postCode = params.code as string;

  let token = "";

  if (typeof window !== "undefined" && localStorage.getItem("token")) {
    token = localStorage.getItem("token") || "";
  }

  useEffect(() => {
    if (token) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/getposts",
            {
              params: { code: postCode },
            },
          );
          setPost(response.data[0]);
          setIsFilled(response.data[0].isFilled);
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setLoading(false);
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
            },
          );
          setUserdata(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchPosts();
      fetchUser();
    }
  }, [postCode, token]);

  useEffect(() => {
    if (userdata && post) {
      const isPrimaryUser =
        post.primarySub && post.primarySub.email === userdata.email;
      const isSecondaryUser =
        post.secondarySubs &&
        post.secondarySubs.some((sub) => sub.email === userdata.email);

      setIsPrimary(!!isPrimaryUser);
      setIsSecondary(!!isSecondaryUser);
    }
  }, [userdata, post]);

  const primaryPressed = async () => {
    if (isFilled !== true && userdata) {
      try {
        const userDataPayload = {
          firstname: userdata.firstName,
          lastname: userdata.lastName,
          email: userdata.email,
          phoneNumber: userdata.phoneNumber,
        };

        const response = await axios.post(
          "http://localhost:5000/api/handlepost",
          {
            user: userDataPayload,
            postCode: postCode,
            primary: true,
          },
        );

        if (response.status === 200) {
          alert(response.data.message);
          await refreshPostData();
        } else {
          alert("Ilmoittautuminen epäonnistui");
        }
      } catch (error) {
        console.error("Error handling post:", error);
      }
    }
  };

  const secondaryPressed = async () => {
    if (isFilled === true && userdata) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/handlepost",
          {
            user: userdata,
            postCode: postCode,
            primary: false,
          },
        );

        if (response.status === 200) {
          alert(response.data.message);
          await refreshPostData();
        } else {
          alert("Virhe varasijalle ilmoittautumisessa");
        }
      } catch (error) {
        console.error("Error making the API call:", error);
      }
    }
  };

  const refreshPostData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getposts", {
        params: { code: postCode },
      });
      const updatedPost = response.data[0];
      setPost(updatedPost);
      setIsFilled(updatedPost.isFilled);

      if (userdata) {
        const isPrimaryUser =
          updatedPost.primarySub &&
          updatedPost.primarySub.email === userdata.email;
        const isSecondaryUser =
          updatedPost.secondarySubs &&
          updatedPost.secondarySubs.some(
            (sub: Sub) => sub.email === userdata.email,
          );

        setIsPrimary(!!isPrimaryUser);
        setIsSecondary(!!isSecondaryUser);
      }
    } catch (error) {
      console.error("Error refreshing post data:", error);
    }
  };

  const cancelPrimary = async () => {
    if (!userdata) return;
    try {
      const response = await axios.post("http://localhost:5000/api/editpost", {
        action: "cancelPrimary",
        email: userdata.email,
        code: postCode,
      });

      if (response.status === 200) {
        alert(response.data.message);
        await refreshPostData();
      } else {
        alert("Virhe ilmoittautumisen perumisessa");
      }
    } catch (error) {
      console.error("Error cancelling primary registration:", error);
      alert("Virhe ilmoittautumisen perumisessa");
    }
  };

  const cancelSecondary = async () => {
    if (!userdata) return;
    try {
      const response = await axios.post("http://localhost:5000/api/editpost", {
        action: "cancelSecondary",
        email: userdata.email,
        code: postCode,
      });

      if (response.status === 200) {
        alert(response.data.message);
        await refreshPostData();
      } else {
        alert("Virhe varasijan perumisessa");
      }
    } catch (error) {
      console.error("Error cancelling secondary registration:", error);
      alert("Virhe varasijan perumisessa");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-zinc-200 rounded mb-4"></div>
          <p className="text-zinc-500 font-medium">Ladataan...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50">
        <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-10 text-center">
          <p className="text-zinc-900 font-bold text-2xl">Ei ilmoitusta</p>
          <p className="text-zinc-500 mt-2">
            Hakemaasi ilmoitusta ei löytynyt.
          </p>
        </div>
      </div>
    );
  }

  const date = new Date(post.date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  // Minimal Status Cards logic
  let statusBorder = "border-zinc-200";
  let statusBadge = null;

  if (isPrimary) {
    statusBorder = "border-emerald-500";
    statusBadge = (
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg font-medium inline-block mb-4">
        Olet ensisijainen sijaistaja
      </div>
    );
  } else if (isSecondary) {
    statusBorder = "border-amber-400";
    statusBadge = (
      <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-lg font-medium inline-block mb-4">
        Olet varasijalla
      </div>
    );
  } else if (isFilled) {
    statusBorder = "border-zinc-300";
    statusBadge = (
      <div className="bg-zinc-100 border border-zinc-200 text-zinc-600 px-4 py-2 rounded-lg font-medium inline-block mb-4">
        Paikka on jo varattu
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 p-6">
      <div
        className={`w-full max-w-lg bg-white p-8 rounded-2xl shadow-sm border-2 ${statusBorder} transition-colors`}
      >
        {statusBadge}

        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 mb-2">
          {post.subject}
        </h1>
        <h2 className="text-lg font-medium text-zinc-700 mb-6">
          Jyväskylän Normaalikoulu
        </h2>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-8">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3000.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-zinc-900 font-medium">
              {formattedDate}{" "}
              <span className="text-zinc-500 ml-1 font-normal">klo 10:15</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {isPrimary && (
            <button
              onClick={cancelPrimary}
              className="w-full py-3 px-6 rounded-xl text-lg font-semibold bg-white border-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all duration-200 shadow-sm"
            >
              Peru ilmoittautuminen
            </button>
          )}

          {isSecondary && (
            <button
              onClick={cancelSecondary}
              className="w-full py-3 px-6 rounded-xl text-lg font-semibold bg-white border-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all duration-200 shadow-sm"
            >
              Peru varasija
            </button>
          )}

          {!isPrimary && !isSecondary && (
            <>
              {!isFilled && (
                <TakeButton
                  isFilled={!!isFilled}
                  primaryPressed={primaryPressed}
                />
              )}
              {isFilled && (
                <SecondaryButton secondaryPressed={secondaryPressed} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
