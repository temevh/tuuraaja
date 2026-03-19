import { useRouter } from "next/navigation";

const SubPostCard = ({ post }) => {
  const router = useRouter();

  const date = new Date(post[0].date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  const postClicked = () => {
    console.log(post);
  };

  return (
    <div
      className="bg-white border border-zinc-200 border-l-4 border-l-zinc-900 rounded-xl p-5 mb-2 w-full shadow-sm hover:shadow-md hover:border-zinc-300 transition-all cursor-pointer group"
      onClick={postClicked}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-row justify-between items-start mb-2">
          <p className="text-lg font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">{post[0].subject}</p>
          <p className="text-sm font-medium text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">{formattedDate}</p>
        </div>
        <div className="flex items-center mt-2">
          <p className="text-zinc-600 text-sm font-medium">Jyväskylän normaalikoulu lukio</p>
        </div>
      </div>
    </div>
  );
};

export default SubPostCard;
