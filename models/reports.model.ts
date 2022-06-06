import { Schema, model } from "mongoose";
import ReportDetails from "./reports.model.d";

const ReportSchema = new Schema<ReportDetails>({
	reportDetails: {
		type: {
			userID: [{
				type: String,
				required: true,
			}],
			marketID: {
				type: String,
				required: true,
			},
			marketName: {
				type: String,
				required: true,
			},
			cmdtyID: {
				type: String,
				required: true,
			},
			marketType: {
				type: String,
				required: true,
			},
			cmdtyName: {
				type: String,
				required: true,
			},
			prices: [{
				type: Number,
				required: true,
			}],
			Price: {
				type: Number,
				required: true,
			},
			timeStamp: {
				type: Number,
				required: true,
			},
			priceUnit: {
				type: String,
				required: true,
			},
			_id: {
				type: String,
				required: true,
			},
		}
	}
})

const Report = model<ReportDetails>("Report", ReportSchema);
export default Report;