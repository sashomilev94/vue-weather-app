<script setup>
	import { ref, computed } from "vue";
	import { getWeather, getForecast } from "./api/weather";
	import SearchBar from "./components/SearchBar.vue";
	import CurrentWeather from "./components/CurrentWeather.vue";
	import ForecastDay from "./components/ForecastDay.vue";
	import { getForecastChunk } from "./api/utils";

	/* Stores current weather data */
	const weather = ref(null);
	/* Stores error message */
	const error = ref("");
	/* Loading indicator for async calls */
	const loading = ref(false);
	/* Stores 5-day forecast data */
	const forecast = ref([]);
	
	/* Determines whether to show the container with results/errors/loading spinner */
	const showContainer = computed(() => weather.value || error.value || loading.value)


	async function fetchWeather(city) {
		/* Reset state before making new request */
		error.value = "";
		forecast.value = []
		weather.value = null;
		loading.value = true

		try {
			/* Fetch both current weather and forecast in parallel */
			const [currentWeatherData, forecastData] = await Promise.all([
				getWeather(city),
				getForecast(city),
			])

			/* Store weather result in state */
			weather.value = currentWeatherData
			/* Extract daily forecast chunks */
			forecast.value = getForecastChunk(forecastData.list)
		} catch (err) {
			/**
			 * Handle different types of errors(API response, network, unknown)
			 */
			if (err.response) {
				const messages = {
					404: "City not found. Please check your spelling.",
					401: "Invalid API key. Please check your configuration."
				};
				error.value = messages[err.response.status] || "Something went wrong. Please try again later.";
			} else if (err.request) {
				error.value = "No response from the server. Check your network.";
			} else {
				error.value = "An unexpected error occurred.";
			}
		} finally {
			/* Reset loading value regardless success/failure */
			loading.value = false;
		}
	}
</script>

<template>
	<div class="min-h-screen flex justify-center bg-blue-400 p-4">
		<div class="w-full">
			<div class="p-6 bg-blue-800/30 backdrop-blur-md shadow-xl rounded-2xl">
				<h1 class="text-3xl font-bold mb-6 text-center text-white drop-shadow">
					Weather App
				</h1>

				<SearchBar @search="fetchWeather" />
			</div>

			<div v-if="showContainer" class="mt-6 p-6 bg-blue-800/30 backdrop-blur-md shadow-xl rounded-2xl">
				<p v-if="error" class="text-white font-bold text-center bg-red-500/80 p-3 rounded-lg">
					{{ error }}
				</p>

				<div v-if="loading" class="flex justify-center py-8">
					<div class="w-12 h-12 border-4 border-white/40 border-t-transparent rounded-full animate-spin"></div>
				</div>

				<CurrentWeather
					v-if="weather"
					class="text-center text-white"
					:city="weather.name"
					:temp="weather.main.temp.toFixed()"
					:feelsLike="weather.main.feels_like.toFixed()"
					:description="weather.weather[0].main"
					:icon="weather.weather[0].icon"
				/>
				
				<div v-if="forecast.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
					<ForecastDay
						v-for="day in forecast"
						:key="day.date"
						:day="day.weekday"
						:date="day.fullDate"
						:tempMax="day.tempMax"
						:tempMin="day.tempMin"
						:icon="day.icon"
					/>
				</div>
			</div>
		</div>
	</div>
</template>