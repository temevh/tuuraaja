const FetchSubsButton = ({ fetchSubs }) => {
  return (
    <button
      onClick={fetchSubs}
      className="bg-zinc-900 text-white font-semibold rounded-xl px-6 py-3 hover:bg-zinc-800 transition-colors duration-200 shadow-sm"
    >
      <p className="text-md">Hae sijaisia</p>
    </button>
  );
};

export default FetchSubsButton;
