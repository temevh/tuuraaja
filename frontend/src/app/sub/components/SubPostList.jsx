import SubPostCard from "./SubPostCard";

const SubPostList = ({ userPosts }) => {
  return (
    <div className="w-full bg-white border border-zinc-200 rounded-2xl p-6 h-full shadow-sm">
      <p className="text-2xl font-bold tracking-tight text-zinc-900 mb-6">Omat vuoroni</p>
      <div className="flex flex-col gap-3">
        {userPosts.length !== 0 ? (
          userPosts.map((post) => {
            return <SubPostCard post={post} key={post.id} />;
          })
        ) : (
          <div className="flex items-center justify-center w-full min-h-[200px] border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50">
            <p className="text-center text-zinc-500 font-medium">
              Ei tulevia vuoroja
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubPostList;
