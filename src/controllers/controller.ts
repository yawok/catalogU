export const getUserIPDetails = async (request: any, response: any) => {
	try {
		const getGeoDataResponse = await fetch(`https://ipinfo.io/geo`)
		const geoData = await getGeoDataResponse.json();
		response.send(geoData);
	} catch (error) {
		console.error(error);
	}
};