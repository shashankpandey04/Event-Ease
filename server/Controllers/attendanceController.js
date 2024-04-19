import attendanceAuthentication from "./../Sheets/attAuth.js";
import dotenv from "dotenv";
dotenv.config();

const attendanceID = process.env.SHEET_ID || null;

class AttendanceController {
  static async markAttendance(req, res) {
    console.log(req.body);
    const { regNo } = req.body;
    let ts = Date.now();
    let date = new Date(ts);
    let hour = ("0" + date.getHours()).slice(-2);
    let min = date.getMinutes();
    const inTime = `${hour}:${min}`;

    try {
      const sheets = await attendanceAuthentication();
      const sheet1Response = await sheets.spreadsheets.values.get({
        spreadsheetId: attendanceID,
        range: "A1:F800",
      });
      const sheet1Data = sheet1Response.data.values || [];

      // console.log(sheet1Data);
      // Check if the registration number exists in the spreadsheet
      const registrationExists = sheet1Data.some((row) => row[3] === regNo);
      // console.log(registrationExists);

      if (registrationExists) {
        // Find the row number where the registration number is present
        const rowIndex = sheet1Data.findIndex((row) => row[3] === regNo);
        if (sheet1Data[rowIndex][4]) {
          return res
            .status(409)
            .json({ message: "!! Attendance has been marked already" });
        }
        const rowNumber = rowIndex !== -1 ? rowIndex + 1 : -1; // Adjust the row number (Excel rows start from 1)

        // Append the inTime to the same row where the registration number is found
        await sheets.spreadsheets.values.update({
          spreadsheetId: attendanceID,
          range: `E${rowNumber}:E${rowNumber}`,
          valueInputOption: "RAW",
          requestBody: {
            values: [[inTime]],
          },
        });

        console.log(
          "Attendance marked for: ",
          sheet1Data[rowIndex][1],
          " ",
          regNo
        );
        return res
          .status(200)
          .json({ message: "Attendance marked successfully!" });
      } else {
        return res.status(404).json({ message: "Not Registered" });
      }
    } catch (error) {
      console.error("Error checking and appending inTime:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  static async markPostLunchAttendance(req, res) {

    console.log(req);
    const { regNo } = req.body;
    let ts = Date.now();
    let date = new Date(ts);
    let hour = ("0" + date.getHours()).slice(-2);
    let min = date.getMinutes();
    const inTime = `${hour}:${min}`;

    try {
      const sheets = await attendanceAuthentication();
      const sheet1Response = await sheets.spreadsheets.values.get({
        spreadsheetId: attendanceID,
        range: "A1:F4000",
      });
      const sheet1Data = sheet1Response.data.values || [];

      // console.log(sheet1Data);
      // Check if the registration number exists in the spreadsheet
      const registrationExists = sheet1Data.some((row) => row[3] === regNo);
      // console.log(registrationExists);

      if (registrationExists) {
        // Find the row number where the registration number is present
        const rowIndex = sheet1Data.findIndex((row) => row[3] === regNo);
        if (sheet1Data[rowIndex][5]) {
          return res
            .status(409)
            .json({ message: "!! Attendance has been marked already" });
        }
        const rowNumber = rowIndex !== -1 ? rowIndex + 1 : -1; // Adjust the row number (Excel rows start from 1)

        // Append the inTime to the same row where the registration number is found
        await sheets.spreadsheets.values.update({
          spreadsheetId: attendanceID,
          range: `F${rowNumber}:F${rowNumber}`,
          valueInputOption: "RAW",
          requestBody: {
            values: [[inTime]],
          },
        });

        console.log(
          "Attendance marked for: ",
          sheet1Data[rowIndex][1],
          " ",
          regNo
        );
        return res
          .status(200)
          .json({ message: "Attendance marked successfully!" });
      } else {
        return res.status(404).json({ message: "Not Registered" });
      }
    } catch (error) {
      console.error("Error checking and appending inTime:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}

export default AttendanceController;

// static addParticipant = async (regNo, name) => {
//   let ts = Date.now();
//   let date = new Date(ts);
//   let hour = ("0" + date.getHours()).slice(-2);
//   let min = date.getMinutes();
//   const time = `${hour}:${min}`;

//   const sheets = attendanceAuthentication();
//   const checkRequestSheet1 = {
//     spreadsheetId: attendanceID,
//     range: "Sheet1",
//   };
//   //i am back
//   const responseSheet1 = await sheets.spreadsheets.values.get(
//     checkRequestSheet1
//   );
//   const sheet1Data = responseSheet1.data.values || [];

//   const registrationExistsSheet1 = await checkInSheet(
//     regNo,
//     sheet1Data
//   );
//   if (!registrationExistsSheet1) {
//     try {
//       // Create a request to get data from "Sheet2" to check if the registration number exists
//       const checkRequestSheet2 = {
//         spreadsheetId: attendanceID,
//         range: "Sheet2",
//       };
//       const responseSheet2 = await sheets.spreadsheets.values.get(
//         checkRequestSheet2
//       );
//       const sheet2Data = responseSheet2.data.values || [];

//       const registrationExistsSheet2 = await checkInSheet(
//         regNo,
//         sheet2Data
//       );
//       if (registrationExistsSheet2) {
//         return await markTimedAttendance(regNo, time, "IN");
//       }

//       const valuesToAppend = [[regNo, name]];
//       const appendRequest = {
//         spreadsheetId: attendanceID,
//         range: "Sheet2", // Adjust the target range for "Sheet2"
//         valueInputOption: "RAW",
//         insertDataOption: "INSERT_ROWS",
//         resource: {
//           values: valuesToAppend,
//         },
//       };

//       const appendResponse = await sheets.spreadsheets.values.append(
//         appendRequest
//       );
//       console.log(appendResponse);

//       const response = await markTimedAttendance(
//         regNo,
//         time,
//         "IN"
//       );

//       return [response[0], `Registered ${name} successfully! ${response[1]}`];
//     } catch (error) {
//       console.error("Error checking and appending data:", error);
//       return [false, "Error occurred"];
//     }
//   } else {
//     try {
//       // Find the row with the registration number in Sheet1
//       const rowToCopy = sheet1Data.find(
//         (row) => row[0] === regNo
//       );

//       // Append the row to Sheet2
//       const valuesToAppend = [rowToCopy];

//       // Create the append request for "Sheet2"
//       const appendRequest = {
//         spreadsheetId: attendanceID,
//         range: "Sheet2", // Adjust the target range for "Sheet2"
//         valueInputOption: "RAW",
//         insertDataOption: "INSERT_ROWS",
//         resource: {
//           values: valuesToAppend,
//         },
//       };

//       const appendResponse = await sheets.spreadsheets.values.append(
//         appendRequest
//       );
//       console.log(
//         "Values appended to Sheet2 successfully:",
//         appendResponse.data
//       );

//       let ts = Date.now();
//       let date = new Date(ts);
//       let hour = ("0" + date.getHours()).slice(-2);
//       let min = date.getMinutes();
//       const time = `${hour}:${min}`;
//       await markTimedAttendance(regNo, time, "IN");
//       return [
//         true,
//         `${rowToCopy[1]} was Already Registered and In-Time is marked successfully!`,
//       ];
//     } catch (error) {
//       console.error("Error checking and appending data:", error);
//       return [false, "PARTICIPANT IS REGISTERD ALREADY, ERROR OCCURED!!"];
//     }
//   }
// };

// static addBreakOut = async (regNo, time) => {
//   const sheets = attendanceAuthentication();

//   try {
//     // Create a request to get data from "Sheet2" to check if the registration number exists
//     const checkRequestSheet2 = {
//       spreadsheetId: attendanceID, // Replace with your actual spreadsheet ID
//       range: "Sheet2", // Adjust the target sheet name
//     };

//     const responseSheet2 = await sheets.spreadsheets.values.get(
//       checkRequestSheet2
//     );
//     const sheet2Data = responseSheet2.data.values || [];

//     // Find the row index with the registration number in Sheet2
//     const rowIndexToUpdate = sheet2Data.findIndex(
//       (row) => row[0] === regNo
//     );

//     if (rowIndexToUpdate !== -1) {
//       // Check if "Break Out" column is already filled in Sheet2
//       if (
//         sheet2Data[rowIndexToUpdate][2] &&
//         sheet2Data[rowIndexToUpdate][2].trim() !== ""
//       ) {
//         return [false, "Break Out time is marked already"];
//       }

//       // Create the update request for "Sheet2"
//       const updateRequestSheet2 = {
//         spreadsheetId: attendanceID, // Replace with your actual spreadsheet ID
//         range: `Sheet2!C${rowIndexToUpdate + 1}`, // Adjust the target range for "Break Out"
//         valueInputOption: "RAW",
//         resource: {
//           values: [[time]],
//         },
//       };

//       const updateResponseSheet2 = await sheets.spreadsheets.values.update(
//         updateRequestSheet2
//       );

//       console.log(
//         "Break-Out time marked successfully in Sheet2:",
//         updateResponseSheet2.data
//       );

//       return [true, "Break-Out time marked successfully!"];
//     } else {
//       return [false, "Attendance is not marked, please add registration!"];
//     }
//   } catch (error) {
//     console.error("Error checking and updating data:", error);
//     return [false, "Error occurred"];
//   }
// };
