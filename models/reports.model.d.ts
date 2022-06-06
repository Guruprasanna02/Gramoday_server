import mongoose from "mongoose";

interface ReportDetails extends mongoose.Document {
	reportDetails: {
		userID: [string],
		marketID: string,
		marketName: string,
		cmdtyID: string,
		marketType: string,
		cmdtyName: string,
		prices: [number],
		Price: number,
		timeStamp: number,
		priceUnit: string,
		_id: string,
	}
}

export default ReportDetails;