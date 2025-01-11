import SubPostCard from "./SubPostCard";

const SubPostList = ({ userPosts }) => {
  return (
    <div className="w-full">
      <p className="text-2xl mb-2 text-center">Omat vuoroni</p>
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
