const PostCard = ({ post }) => {
  return (
    <div className="bg-red-300 rounded-md">
      <p>{post.date}</p>
      <p>{post.subject}</p>
    </div>
  );
};

export default PostCard;
