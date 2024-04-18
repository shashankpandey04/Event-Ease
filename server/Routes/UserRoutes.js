import express from "express";
import EmailController from "../Controllers/emailController.js";
import attendanceController from "../Controllers/attendanceController.js";

const router = express.Router();

//PROTECTED ROUTES

router.get("/sendEmails", EmailController.sendEmail);
router.get("/markAttendance", attendanceController.markAttendance);

export default router;