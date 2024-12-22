const Buttons = ({ fetchSubs, sendSms, sendEmail, buttonState }) => {
  return (
    <div className="flex flex-row gap-4">
      <button
        onClick={fetchSubs}
        className="bg-buttonprimary rounded-lg p-4 hover:bg-buttonsecondary transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
      >
        <p className="text-black font-bold text-md">Hae sijaisia</p>
      </button>
      <button
        onClick={sendEmail}
        disabled={!buttonState}
        className={`ml-80 rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
          !buttonState
            ? "bg-buttonprimary hover:bg-buttonsecondary"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        <p className="text-black font-bold text-md">sähköposti</p>
      </button>
      <button
        onClick={sendSms}
        disabled={!buttonState}
        className={`ml-16 rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
          !buttonState
            ? "bg-buttonprimary hover:bg-buttonsecondary"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        <p className="text-black font-bold text-md">tekstiviesti</p>
      </button>
    </div>
  );
};

export default Buttons;
