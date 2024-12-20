import SubPostCard from "./SubPostCard";

const SubPostList = ({ userPosts }) => {
  console.log(userPosts);
  return (
    <div className="w-full">
      {userPosts ? (
        userPosts.map((post) => {
          return <SubPostCard post={post} key={post.id} />;
        })
      ) : (
        <p>No sub posts</p>
      )}
    </div>
  );
};

export default SubPostList;
