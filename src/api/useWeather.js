import { ref, computed } from 'vue';
import { getWeather, getForecast } from '../api/weather';
import { getForecastChunk } from '../api/utils';

/**
 * Handles weather and forecast data with loading/error state.
 */
export function useWeather() {
	/** Current weather data */
	const weather = ref(null);

	/** 5-day forecast data */
	const forecast = ref([]);

	/** Error message */
	const error = ref('');

	/** Loading state */
	const loading = ref(false);

	/** Whether to show results, error, or loading */
	const showContainer = computed(() => weather.value || error.value || loading.value);

	/**
	 * Fetch weather and forecast for a city.
	 * @param {string} city - City name
	 */
	async function fetchWeather(city) {
		error.value = '';
		forecast.value = [];
		weather.value = null;
		loading.value = true;

		try {
			const [currentWeatherData, forecastData] = await Promise.all([
				getWeather(city),
				getForecast(city),
			]);

			weather.value = currentWeatherData;
			forecast.value = getForecastChunk(forecastData.list);
			console.log(forecastData.list)
		} catch (err) {
			if (err.response) {
				const messages = {
					404: 'City not found',
					401: 'Invalid API key',
				};
				error.value = messages[err.response.status] || 'Something went wrong';
			} else if (err.request) {
				error.value = 'No response from the server';
			} else {
				error.value = 'Unexpected error';
			}
		} finally {
			loading.value = false;
		}
	}

	return { weather, forecast, error, loading, showContainer, fetchWeather };
}
