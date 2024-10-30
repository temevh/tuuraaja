import ClassSubject from "./components/filters/ClassSubject";

export default function Home() {
  return (
    <div className="w-full">
      <p className="text-sky-400">Select filters</p>
      <div className="w-64 bg-gray-200">
        <ClassSubject />
      </div>
    </div>
  );
}
