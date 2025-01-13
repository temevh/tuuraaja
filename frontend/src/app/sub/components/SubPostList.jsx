import SubPostCard from "./SubPostCard";

const SubPostList = ({ userPosts }) => {
  return (
    <div className="w-full bg-blue-900 rounded-lg h-full px-2">
      <p className="text-2xl mb-2 text-center">Omat vuoroni</p>
      {userPosts.length !== 0 ? (
        userPosts.map((post) => {
          return <SubPostCard post={post} key={post.id} />;
        })
      ) : (
        <div className="items-center justify-center">
          <p className="text-center justify-center items-center mt-36">
            Ei tulevia vuoroja
          </p>
        </div>
      )}
    </div>
  );
};

export default SubPostList;
