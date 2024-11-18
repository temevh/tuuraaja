import { Button } from "@mui/material";

const Buttons = ({ fetchSubs, sendSms, sendEmail, buttonState }) => {
  return (
    <div className="flex flex-row">
      <Button
        onClick={fetchSubs}
        sx={{
          backgroundColor: "#6eb087",
          width: "25%",
          "&:hover": {
            backgroundColor: "lightgray",
          },
          "&.Mui-disabled": {
            backgroundColor: "gray",
            color: "white",
          },
        }}
      >
        <p className="text-black font-bold text-md">Etsi sijainen</p>
      </Button>
      <Button
        onClick={sendEmail}
        disabled={buttonState}
        sx={{
          backgroundColor: "#b069db",
          width: "15%",
          "&:hover": {
            backgroundColor: "lightgray",
          },
          "&.Mui-disabled": {
            backgroundColor: "gray",
            color: "white",
            opacity: 0.3,
          },
          marginLeft: 52,
        }}
      >
        <p className="text-black font-bold text-md">sähköposti</p>
      </Button>
      <Button
        onClick={sendSms}
        disabled={buttonState}
        sx={{
          backgroundColor: "#b069db",
          width: "15%",
          "&:hover": {
            backgroundColor: "lightgray",
          },
          "&.Mui-disabled": {
            backgroundColor: "gray",
            color: "white",
            opacity: 0.3,
          },
          marginLeft: 4,
        }}
      >
        <p className="text-black font-bold text-md">tekstiviesti</p>
      </Button>
    </div>
  );
};

export default Buttons;
