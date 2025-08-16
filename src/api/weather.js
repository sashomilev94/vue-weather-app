import axios from "axios";
import { API_KEY, API_URL } from "./config";

function createParams(city) {
	return {
		q: city,
		appid: API_KEY,
		units: "metric",
	};
}

export async function getWeather(city) {
	const { data } = await axios.get(`${API_URL}/weather`, { params: createParams(city) });
	return data;
}