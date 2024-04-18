import start from "./../Mailer.js";
import fs from "fs/promises";
import qr from "qrcode";

class EmailController {
  static sendEmail = async (req, res) => {
    //send email logic
    try {
      const rawData = await fs.readFile("dataList.json");
      const data = JSON.parse(rawData);

      // Function to generate a QR code as a data URL
      for (const element of data) {
        if (element.regNo) {
          const qrCode = await qr.toDataURL(element.regNo); // Await here
          var base64Data = qrCode.replace(/^data:image\/png;base64,/, "");
          fs.writeFile(
            `QrCodes/${element.regNo}.png`,
            base64Data,
            "base64",
            function (err) {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }

      await start();
      res.json({ message: "Emails sent successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default EmailController;


