import emailjs, { EmailJSResponseStatus } from "@emailjs/nodejs";

export const sendEmails = async (req, res) => {
  const { recipients, date, subject, postCode } = req.body;

  console.log("date in backend", date);

  const templateParams = {
    email: "temehama@gmail.com",
    subject,
    date,
    postCode,
  };

  console.log("templateParams", templateParams);

  try {
    const response = await emailjs.send(
      process.env.SERVICEID,
      process.env.TEMPLATEID,
      templateParams,
      {
        publicKey: process.env.PUBLIC_KEY,
        privateKey: process.env.PRIVATE_KEY,
      },
    );
    console.log("SUCCESS!", response.status, response.text);
    return res
      .status(200)
      .json({ message: "Sähköpostit lähetetty onnistuneesti" });
  } catch (error) {
    console.error("Error sending emails:", error);
    return res.status(500).json({
      message: "Failed to send emails",
      error: error.text || error.message || "Unknown error",
    });
  }
};
