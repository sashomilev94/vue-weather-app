<script setup>
	defineProps([
		'date',
		'day',
		'tempMax',
		'tempMin',
		'icon'
	])
</script>

<template>
	<div class="flex bg-white/10 shadow items-center justify-between px-2 py-1 mb-2 rounded text-white">
		<div class="forecastImageWrapper">
			<img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" alt="Weather icon" />
		</div>

		<p class="font-semibold">{{ day }}, {{ date }}</p>
		<p>{{ tempMax }}° / {{ tempMin }}°C</p>
	</div>
</template>