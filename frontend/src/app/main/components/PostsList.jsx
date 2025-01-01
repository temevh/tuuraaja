import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <div>
      <div>
        <p className="text-3xl text-center pb-4 text-black">
          Sijaisuusilmoitukset
        </p>
        {posts.map((post) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </div>
    </div>
  );
};

export default PostList;
