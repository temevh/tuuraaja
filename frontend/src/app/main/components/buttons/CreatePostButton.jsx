const CreatePostButton = ({ sendEmail, buttonState }) => {
  return (
    <button
      onClick={sendEmail}
      disabled={buttonState}
      className={`rounded-xl px-6 py-3 transition-colors duration-200 shadow-sm font-semibold ${
        buttonState
          ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
          : "bg-zinc-900 text-white hover:bg-zinc-800"
      }`}
    >
      <p className="text-md">Luo ilmoitus</p>
    </button>
  );
};

export default CreatePostButton;
