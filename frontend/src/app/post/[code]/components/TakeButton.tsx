interface TakeButtonProps {
  isFilled: boolean;
  primaryPressed: () => void;
}

const TakeButton = ({ isFilled, primaryPressed }: TakeButtonProps) => {
  return (
    <button
      disabled={isFilled}
      onClick={primaryPressed}
      className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-colors duration-200 shadow-sm ${
        isFilled
          ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
          : "bg-zinc-900 text-white hover:bg-zinc-800"
      }`}
    >
      {isFilled ? "Paikka varattu" : "Ilmoittaudu ensisijaiseksi"}
    </button>
  );
};

export default TakeButton;
