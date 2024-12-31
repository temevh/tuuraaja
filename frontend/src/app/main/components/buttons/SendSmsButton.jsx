const SendSmsButton = ({ sendSms, buttonState }) => {
  <button
    onClick={sendSms}
    disabled={buttonState}
    className={`ml-16 rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
      buttonState
        ? "bg-buttonprimary hover:bg-buttonsecondary"
        : "bg-gray-400 cursor-not-allowed"
    }`}
  >
    <p className="text-white font-bold text-md">tekstiviesti</p>
  </button>;
};

export default SendSmsButton;
