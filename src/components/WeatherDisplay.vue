<script setup>
	import CurrentWeather from './CurrentWeather.vue';
	import ForecastDay from './ForecastDay.vue';
	
	defineProps([
		'weather',
		'forecast',
		'loading',
		'error',
	]);
</script>

<template>
	<div v-if="weather || error || loading" class="mt-6 p-6 bg-blue-800/30 backdrop-blur-md shadow-xl rounded-2xl">
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
</template>
  