import { google } from "googleapis"

const attendanceAuthentication = () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "./Sheets/creds.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    
    const sheets = google.sheets({ version: "v4", auth }); // Use 'auth' directly for API authentication
    return sheets;
};

export default attendanceAuthentication;