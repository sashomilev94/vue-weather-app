<script setup>
	import { ref, computed } from "vue";
	import { getWeather, getForecast } from "./api/weather";
	import SearchBar from "./components/SearchBar.vue";
	import CurrentWeather from "./components/CurrentWeather.vue";

	const weather = ref(null);
	const error = ref("");
	const loading = ref(false);
	const showContainer = computed(() => weather.value || error.value || loading.value)

	async function fetchWeather(city) {
		error.value = "";
		weather.value = null;
		loading.value = true

		try {
			weather.value = await getWeather(city);
		} catch (err) {
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
			loading.value = false;
		}
	}
</script>

<template>
	<div class="min-h-screen flex justify-center bg-blue-400 p-4">
		<div class="w-full max-w-md">
			<div class="p-6 bg-blue-800/30 backdrop-blur-md shadow-xl rounded-2xl">
				<h1 class="text-3xl font-bold mb-6 text-center text-white drop-shadow">
					Weather App
				</h1>

				<SearchBar @search="fetchWeather" />
			</div>

			<div v-if="showContainer" class="mt-6 bg-blue-800/30 shadow-lg rounded-2xl p-6 text-center text-white">
				<p v-if="error" class="text-white font-bold text-center bg-red-500/80 p-3 rounded-lg">
					{{ error }}
				</p>

				<div v-if="loading" class="flex justify-center py-8">
					<div class="w-12 h-12 border-4 border-white/40 border-t-transparent rounded-full animate-spin"></div>
				</div>

				<CurrentWeather
					v-if="weather"
					:city="weather.name"
					:temp="weather.main.temp.toFixed()"
					:feelsLike="weather.main.feels_like.toFixed()"
					:description="weather.weather[0].main"
					:icon="weather.weather[0].icon"
				/>
			</div>
		</div>
	</div>
</template>