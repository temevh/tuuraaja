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
      className="bg-green-300 rounded-md pl-2 flex flex-cols-3 mb-4 w-full p-2"
      onClick={postClicked}
    >
      <div>
        <div className="flex flex-row gap-2">
          <p className="text-xl font-bold text-black">{post[0].subject}</p>
          <p className="text-md text-black mt-1">{formattedDate}</p>
        </div>
        <p className="text-black">Jyväskylän normaalikoulu lukio</p>
      </div>
    </div>
  );
};

export default SubPostCard;
