interface SecondaryButtonProps {
  secondaryPressed: () => void;
}

const SecondaryButton = ({ secondaryPressed }: SecondaryButtonProps) => {
  return (
    <button
      onClick={secondaryPressed}
      className="w-full py-3 px-6 rounded-xl text-lg font-semibold bg-white border-2 border-zinc-200 text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200 shadow-sm mt-3"
    >
      Ilmoittaudu varasijalle
    </button>
  );
};

export default SecondaryButton;
