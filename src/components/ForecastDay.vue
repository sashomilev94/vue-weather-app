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
	<div class="bg-white shadow-lg rounded p-4 text-center">
		<p class="font-semibold">{{ day }}, {{ date }}</p>
		<img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" alt="Weather icon" class="mx-auto" />
		<p>{{ tempMax }}° / {{ tempMin }}°C</p>
	</div>
</template>