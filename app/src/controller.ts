import mongoose from "mongoose";
import { GeoInfo, GeoInfoSchema } from "./models";
export const getUserIPDetails = async (request: any, response: any) => {
	const GeoInfoModel = mongoose.model('GeoInfo', GeoInfoSchema);

	try {
		const getGeoDataResponse = await fetch(`https://ipinfo.io/geo`)
		const rawGeoData = await getGeoDataResponse.json();
		const geoData: GeoInfo = {
			ip: rawGeoData.ip,
			city: rawGeoData.city,
			region: rawGeoData.region,
			country: rawGeoData.country,
			coordinates: rawGeoData.loc,
			postal_code: rawGeoData.postal,
			timezone: rawGeoData.timezone,
			organisation: rawGeoData.org
		}

		// Save to database
		const geoDataToSave = new GeoInfoModel(geoData);
		geoDataToSave.save().then((savedGeoData) => {
			response.send(savedGeoData);
		})
	} catch (error) {
		console.error(error);
	}
};