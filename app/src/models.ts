import mongoose from "mongoose";

const Schema = mongoose.Schema;

export type GeoInfo = {
	ip: string;
    city: string;
    region: string;
	country: string;
    coordinates: string;
    postal_code: string;
    timezone: string;
    organisation: string;
};

export const GeoInfoSchema = new Schema({
	ip: {
		type: "string",
		required: true,
	},
	city: {
		type: "string",
		required: true,
	},
	region: {
		type: "string",
		required: true,
	},
	country: {
		type: "string",
		required: true,
	}, 
	coordinates: {
		type: "string",
		required: true,
	},
	postal_code: {
		type: "string",
		required: true,
	},
	timezone: {
		type: "string",
		required: true,
	},
	organisation: {
		type: "string",
		required: true,
	}
});