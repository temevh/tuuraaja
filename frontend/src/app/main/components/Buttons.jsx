const Buttons = ({ fetchSubs, sendSms, sendEmail, buttonState }) => {
  return (
    <div className="flex flex-row">
      <button onClick={fetchSubs}>
        <div className="bg-red-500 ">
          <p className="text-black font-bold text-md">Hae sijaisia</p>
        </div>
      </button>
      <button onClick={sendEmail} disabled={buttonState}>
        <p className="text-black font-bold text-md">sähköposti</p>
      </button>
      <button onClick={sendSms} disabled={buttonState}>
        <p className="text-black font-bold text-md">tekstiviesti</p>
      </button>
    </div>
  );
};

export default Buttons;
