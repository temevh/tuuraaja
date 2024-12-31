const CreatePostButton = ({ sendEmail, buttonState }) => {
  return (
    <button
      onClick={sendEmail}
      disabled={buttonState}
      className={`rounded-lg p-4 transition duration-300 ease-in-out transform shadow-lg ${
        buttonState
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-buttonprimary hover:scale-105"
      }`}
    >
      <p className="text-white font-bold text-md">Luo ilmoitus</p>
    </button>
  );
};

export default CreatePostButton;
