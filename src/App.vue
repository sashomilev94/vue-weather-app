<script setup>
	import SearchBar from './components/SearchBar.vue';
	import WeatherDisplay from './components/WeatherDisplay.vue';
	import { useWeather } from './api/useWeather.js';

	const { weather, forecast, loading, error, fetchWeather } = useWeather();
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
  
			<WeatherDisplay
				v-bind="{ weather, forecast, loading, error }"
				class="mt-6"
			/>
		</div>
	</div>
  </template>