<script setup>
	import { ref } from 'vue'

	const searchTerm = ref('')
	const emit = defineEmits(['search'])

	const handleSearch = () => {
		if (searchTerm.value.trim()) {
			emit('search', searchTerm.value.trim())
			searchTerm.value = '' // reset value after submit
		}
	}
</script>

<template>
	<div class="flex gap-2">
		<input
			v-model="searchTerm"
			@keyup.enter="handleSearch"
			type="text"
			placeholder="Search city..."
			class="flex-1 p-2 border rounded"
		/>
		<button @click="handleSearch" class="bg-blue-700 text-white font-bold px-4 py-2 rounded">
			Search
		</button>
	</div>
</template>