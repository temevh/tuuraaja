import SubName from "../components/mobileFields/SubName";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-amber-600 flex justify-center items-center p-6">
      <div className="grid grid-cols-1 gap-y-6">
        <SubName />
      </div>
    </div>
  );
}
