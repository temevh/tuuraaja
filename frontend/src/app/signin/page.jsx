import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen gap-24 bg-gray-600">
      <div className="bg-green-700 rounded-lg hover:bg-green-500">
        <Button>
          <p className="text-white font-bold text-xl hover:text-black">
            Kirjaudu sisään
          </p>
        </Button>
      </div>
      <div className="bg-green-700 rounded-lg hover:bg-green-500">
        <Button>
          <p className="text-white font-bold text-xl hover:text-black">
            Luo profiili
          </p>
        </Button>
      </div>
    </div>
  );
}
