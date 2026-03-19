const PostCard = ({ post }) => {
  const date = new Date(post.date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  const secondarySubs = post.secondarySubs;
  const borderColor = post.isFilled ? "border-emerald-500" : "border-rose-400";

  return (
    <div
      className={`bg-white border border-zinc-200 border-l-4 ${borderColor} rounded-xl p-5 mb-2 w-full shadow-sm`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-start">
          <p className="text-lg font-bold text-zinc-900">{post.subject}</p>
          <p className="text-sm font-medium text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">{formattedDate}</p>
        </div>
        
        <div className="flex flex-col gap-2">
          {post.primarySub.email ? (
            <div className="flex flex-row items-center gap-2 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
              <p className="text-zinc-600 text-sm font-medium">Ensisijainen:</p>
              <p className="text-zinc-900 text-sm font-semibold">
                {post.primarySub.firstname} {post.primarySub.lastname}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center py-2 bg-rose-50 border border-rose-100 rounded-lg">
              <p className="text-sm font-medium text-rose-600">Ei vielä sijaista</p>
            </div>
          )}
          
          {secondarySubs.length !== 0 ? (
            <div className="flex items-center">
              <p className="text-zinc-500 text-sm font-medium">Varalla: <span className="text-zinc-900 font-semibold">{secondarySubs.length}</span></p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
