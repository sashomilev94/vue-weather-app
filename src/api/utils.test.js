import { describe, it, expect } from 'vitest';
import { getForecastChunk } from './utils';

describe('getForecastChunk', () => {
	const forecastList = [
		{ dt_txt: '2025-08-17 09:00:00', main: { temp_min: 10, temp_max: 15 }, weather: [{ icon: 'a' }] },
		{ dt_txt: '2025-08-17 12:00:00', main: { temp_min: 12, temp_max: 18 }, weather: [{ icon: 'b' }] },
		{ dt_txt: '2025-08-18 12:00:00', main: { temp_min: 14, temp_max: 20 }, weather: [{ icon: 'c' }] },
	];

	it('groups forecast by day and selects noon entry for icon', () => {
		const chunk = getForecastChunk(forecastList);
		expect(chunk.length).toBe(2);

		expect(chunk[0]).toEqual({
			weekday: expect.any(String),
			fullDate: expect.any(String),
			tempMax: '18',
			tempMin: '10',
			icon: 'b'
		});

		expect(chunk[1].icon).toBe('c');
	});

	it('handles missing noon entry by picking first entry', () => {
		const noNoon = [
			{ dt_txt: '2025-08-17 09:00:00', main: { temp_min: 5, temp_max: 10 }, weather: [{ icon: 'x' }] },
		];
		const chunk = getForecastChunk(noNoon);
		expect(chunk[0].icon).toBe('x');
	});
});
