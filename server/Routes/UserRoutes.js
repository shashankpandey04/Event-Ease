import express from "express";
import EmailController from "../Controllers/emailController.js";
import attendanceController from "../Controllers/attendanceController.js";

const router = express.Router();

//PROTECTED ROUTES

router.get("/sendEmails", EmailController.sendEmail);
router.post("/markAttendance", attendanceController.markAttendance);
router.post("/markPostLunchAttendance", attendanceController.markPostLunchAttendance);

export default router;