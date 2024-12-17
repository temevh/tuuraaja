const TakeButton = ({ isFilled, primaryPressed }) => {
  return (
    <div className="rounded-md text-center mt-4 p-4">
      <button
        disabled={isFilled}
        onClick={primaryPressed}
        className={`w-full p-4 rounded-md text-2xl ${
          isFilled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-400 hover:bg-green-600"
        }`}
      >
        <p className={`text-white ${isFilled ? "opacity-50" : "opacity-100"}`}>
          {isFilled ? "Paikka varattu" : "Ilmoittaudu"}
        </p>
      </button>
    </div>
  );
};

export default TakeButton;
