import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <div>
      <div>
        <p className="text-3xl text-center pb-4 text-black">
          Sijaisuusilmoitukset
        </p>
        {posts.length !== 0 ? (
          posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })
        ) : (
          <p className="text-black text-center text-2xl pt-40">
            Ei ilmoituksia
          </p>
        )}
      </div>
    </div>
  );
};

export default PostList;
