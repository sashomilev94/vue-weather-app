<script setup>
	defineProps([
		'city',
		'temp',
		'feelsLike',
		'description',
		'icon'
	])
</script>

<template>
	<div>
		<h2 class="text-xl font-semibold">
			{{ city }} {{ temp }}°C
			<span v-if="description" class="text-sm font-normal">( {{ description }} )</span>
		</h2>
		<p v-if="feelsLike" class="text-sm">Feels like: {{ feelsLike }}°C</p>
		<img v-if="icon"
			:src="`https://openweathermap.org/img/wn/${icon}@2x.png`"
			alt="Weather icon"
			class="mx-auto"
		/>
	</div>
</template>