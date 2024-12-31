const FetchSubsButton = ({ fetchSubs }) => {
  return (
    <button
      onClick={fetchSubs}
      className="bg-buttonprimary rounded-lg p-4 hover:bg-buttonsecondary transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
    >
      <p className="text-white font-bold text-md">Hae sijaisia</p>
    </button>
  );
};

export default FetchSubsButton;
