import { Router } from "express";
import { report_POST, getReport_GET } from "../controllers/reports.controller";

const router = Router();

router.post("/reports", report_POST);
router.get("/reports", getReport_GET);

export { router };