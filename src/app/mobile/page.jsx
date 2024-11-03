import SubInfo from "../components/mobileFields/SubInfo";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-amber-600 flex justify-center items-center p-6">
      <div className="grid grid-cols-1 gap-y-6">
        <SubInfo />
      </div>
    </div>
  );
}
