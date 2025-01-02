const PostCard = ({ post }) => {
  const date = new Date(post.date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  const secondarySubs = post.secondarySubs;
  const bgColor = post.isFilled ? "#90EE90" : "#f69697";

  return (
    <div
      className="bg-green-300 rounded-md pl-2 flex flex-cols-3 mb-4"
      style={{ backgroundColor: bgColor }}
    >
      <div>
        <p className="text-xl font-bold text-black">{post.subject}</p>
        <p className="text-lg text-black">{formattedDate}</p>
      </div>
      <div className="pl-6">
        {post.primarySub.email ? (
          <div className="flex flex-row">
            <p className="text-black text-xl pr-2">Ensisijainen:</p>
            <p className="text-black text-xl underline">
              {post.primarySub.firstname} {post.primarySub.lastname}
            </p>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-2xl text-black">Ei vielä sijaista</p>
          </div>
        )}
        <div className="flex flex-row gap-2">
          {secondarySubs.length !== 0 ? (
            <p className="text-black">Varalla: {secondarySubs.length}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
