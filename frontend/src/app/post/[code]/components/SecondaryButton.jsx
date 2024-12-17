const SecondaryButton = ({ secondaryPressed }) => {
  return (
    <div className="rounded-md text-center p-4">
      <button
        onClick={secondaryPressed}
        className={
          "w-3/4 pt-2 pb-2 rounded-md text-lg bg-yellow-500 hover:bg-yellow-700"
        }
      >
        <p className="text-white underline text-lg">Ilmoittaudu varasijalle</p>
      </button>
    </div>
  );
};

export default SecondaryButton;
