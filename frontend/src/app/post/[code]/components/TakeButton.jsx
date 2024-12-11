const TakeButton = ({ isFilled }) => {
  isFilled = false;
  return (
    <div className="rounded-md text-center mt-4 p-4">
      <button
        disabled={isFilled}
        className={`w-full p-4 rounded-md text-2xl ${
          isFilled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-700"
        }`}
      >
        <p className={`text-white ${isFilled ? "opacity-50" : "opacity-100"}`}>
          Ilmoittaudu
        </p>
      </button>
    </div>
  );
};

export default TakeButton;
