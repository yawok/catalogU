import mongoose, { ConnectOptions } from "mongoose"

const clientOptions : ConnectOptions = {
	serverApi: {
		version: '1',
		strict: true,
		deprecationErrors: true
	}
}

export const getDB = async (uri? : any) => {
	try {
		await mongoose.connect(uri, clientOptions);
		await mongoose.connection.db?.admin().command({ ping: 1});
		console.log("Connected to db");
	} catch (e){
		console.error("There was an error connecting to the database");
	}
}