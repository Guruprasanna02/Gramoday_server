import { Response, Request } from "express";
import reportModel from "../models/reports.model";
import ReportDetails from "../models/reports.model.d";
import { generateReportID } from "../utils/utils";

const report_POST = async function (req: Request, res: Response) {
  try {
    const resReport = req.body.reportDetails;
    const report = await reportModel.findOne({
      "reportDetails.marketID": resReport.marketID,
      "reportDetails.cmdtyID": resReport.cmdtyID,
    });
    if (report && resReport) {
      const reportDetails = report.reportDetails;
      if (!reportDetails.userID.includes(resReport.userID)) {
        reportDetails.userID.push(resReport.userID);
        reportDetails.prices.push(resReport.price / resReport.convFctr);
        reportDetails.Price =
          reportDetails.prices.reduce((a, b) => a + b, 0) /
          reportDetails.prices.length;
        const updateReport = await reportModel.findOneAndUpdate(
          {
            "reportDetails.marketID": resReport.marketID,
            "reportDetails.cmdtyID": resReport.cmdtyID,
          },
          {
            reportDetails: reportDetails,
          }
        );
        return res
          .status(200)
          .json({ status: "sucess", reportID: reportDetails._id });
      } else {
        return res.status(400).json({ message: "Report already exists" });
      }
    } else if (!report && resReport) {
      resReport.prices = [resReport.price / resReport.convFctr];
      const reportID = generateReportID();
      resReport.reportID = reportID;
      const newReport = await reportModel.create({
        "reportDetails.userID": [resReport.userID],
        "reportDetails.marketID": resReport.marketID,
        "reportDetails.marketName": resReport.marketName,
        "reportDetails.cmdtyID": resReport.cmdtyID,
        "reportDetails.marketType": resReport.marketType,
        "reportDetails.cmdtyName": resReport.cmdtyName,
        "reportDetails.prices": [resReport.price / resReport.convFctr],
        "reportDetails.Price": resReport.price / resReport.convFctr,
		"reportDetails.timeStamp": Math.floor(Date.now() / 1000),
		"reportDetails.priceUnit": "Kg",
        "reportDetails._id": reportID,
      });
      return res.status(200).json({ status: "sucess", reportID: reportID });
    }
  } catch (err) {
	  console.log(err);
    return res.status(500).json({ message: "Error" });
  }
};

const getReport_GET = async function (req: Request, res: Response) {
  try {
    const report: ReportDetails | null = await reportModel.findOne({
      "reportDetails._id": req.query.reportID,
    });

    if (report) {
		report.reportDetails.priceUnit = "kg";
      return res.status(200).json(report.reportDetails);
    } else {
      return res.status(400).json({ message: "Report not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err, message: "Error" });
  }
};

export { report_POST, getReport_GET };
