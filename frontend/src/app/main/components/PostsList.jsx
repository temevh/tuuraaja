import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <div className="w-full h-full bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <p className="text-2xl font-bold tracking-tight text-zinc-900 mb-6">
        Sijaisuusilmoitukset
      </p>
      <div className="flex flex-col gap-3">
        {posts.length !== 0 ? (
          posts.map((post) => {
            return <PostCard post={post} key={post.code} />;
          })
        ) : (
          <div className="flex items-center justify-center w-full min-h-[200px] border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50 mt-4">
            <p className="text-center text-zinc-500 font-medium">
              Ei ilmoituksia
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
