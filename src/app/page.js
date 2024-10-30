import ClassSubject from "./components/filters/ClassSubject";
import Calendar from "react-calendar";

export default function Home() {
  return (
    <div className="w-full bg-blue-400">
      <div className="w-1/2 grid grid-cols-1 gap-y-6">
        <ClassSubject />
        <Calendar />
      </div>
    </div>
  );
}
