const SendEmailButton = ({ sendEmail, buttonState }) => {
  <button
    onClick={sendEmail}
    disabled={buttonState}
    className={`ml-80 rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
      buttonState
        ? "bg-buttonprimary hover:bg-buttonsecondary"
        : "bg-gray-400 cursor-not-allowed"
    }`}
  >
    <p className="text-white font-bold text-md">sähköposti</p>
  </button>;
};

export default SendEmailButton;
