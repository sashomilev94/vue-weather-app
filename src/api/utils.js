/**
 * Checks if a forecast entry corresponds to 12:00 (noon).
 *
 * @param {Object} item - A forecast entry object from the API.
 * @param {string} item.dt_txt - Datetime string in the format "YYYY-MM-DD HH:mm:ss".
 * @returns {boolean} True if the entry is at 12:00, otherwise false.
 */
function isNoonEntry(item) {
	return new Date(item.dt_txt).getHours() === 12;
}

/**
 * Formats a datetime string into weekday and full date strings.
 *
 * @param {string} dtTxt - Datetime string in the format "YYYY-MM-DD HH:mm:ss".
 * @returns {Object} An object containing:
 *   - {string} weekday  Short weekday name (e.g. "Mon").
 *   - {string} fullDate Localized full date string (e.g. "8/16/2025").
 */
function formatDate(dtTxt) {
	const dateObj = new Date(dtTxt);
	return {
		weekday: dateObj.toLocaleDateString(undefined, { weekday: "short" }),
		fullDate: dateObj.toLocaleDateString()
	};
}

function formatForecastEntry(dayItems) {
	const temps = dayItems.map(i => i.main);
	const tempMax = Math.max(...temps.map(t => t.temp_max));
	const tempMin = Math.min(...temps.map(t => t.temp_min));

	const iconItem = dayItems.find(isNoonEntry) || dayItems[0];

	const dateInfo = formatDate(dayItems[0].dt_txt);

	return {
		weekday: dateInfo.weekday,
		fullDate: dateInfo.fullDate,
		tempMax: tempMax.toFixed(),
		tempMin: tempMin.toFixed(),
		icon: iconItem.weather[0].icon
	};
}

export function getForecastChunk(list) {
	const days = list.reduce((acc, item) => {
		const dateKey = new Date(item.dt_txt).toISOString().split('T')[0];
		if (!acc[dateKey]) acc[dateKey] = [];
		acc[dateKey].push(item);
		return acc;
	}, {});

	return Object.values(days).slice(0, 5).map(formatForecastEntry);
}