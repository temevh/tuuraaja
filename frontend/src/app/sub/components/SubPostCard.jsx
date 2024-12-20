const SubPostCard = ({ post }) => {
  const date = new Date(post[0].date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  return (
    <div className="bg-green-300 rounded-md pl-2 flex flex-cols-3 mb-4 w-full">
      <div>
        <p className="text-xl font-bold text-black">{post[0].subject}</p>
        <p className="text-lg text-black">{formattedDate}</p>
      </div>
    </div>
  );
};

export default SubPostCard;
