import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWeather } from './useWeather';
import * as api from './weather';
import * as utils from './utils';

vi.mock('./weather');
vi.mock('./utils');

describe('useWeather', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('fetches weather and forecast successfully', async () => {
		const fakeWeather = { name: 'Paris', main: { temp: 20, feels_like: 18 }, weather: [{ main: 'Clear', icon: '01d' }] };
		const fakeForecast = { list: [{ dt_txt: '2025-08-17 12:00:00', main: { temp_min: 10, temp_max: 15 }, weather: [{ icon: 'b' }] }] };
		const fakeChunk = [{ weekday: 'Sun', fullDate: '8/17/2025', tempMax: '15', tempMin: '10', icon: 'b' }];

		api.getWeather.mockResolvedValue(fakeWeather);
		api.getForecast.mockResolvedValue(fakeForecast);
		utils.getForecastChunk.mockReturnValue(fakeChunk);

		const { weather, forecast, error, loading, fetchWeather } = useWeather();

		const promise = fetchWeather('Paris');
		expect(loading.value).toBe(true); // loading starts immediately

		await promise;

		expect(weather.value).toEqual(fakeWeather);
		expect(forecast.value).toEqual(fakeChunk);
		expect(error.value).toBe('');
		expect(loading.value).toBe(false);
	});

	it('handles 404 error', async () => {
		api.getWeather.mockRejectedValue({ response: { status: 404 } });
		api.getForecast.mockResolvedValue({ list: [] });

		const { error, loading, fetchWeather } = useWeather();
		await fetchWeather('UnknownCity');

		expect(error.value).toBe('City not found');
		expect(loading.value).toBe(false);
	});

	it('handles network error', async () => {
		api.getWeather.mockRejectedValue({ request: {} });
		api.getForecast.mockResolvedValue({ list: [] });

		const { error, loading, fetchWeather } = useWeather();
		await fetchWeather('Paris');

		expect(error.value).toBe('No response from the server');
		expect(loading.value).toBe(false);
	});

	it('handles unexpected error', async () => {
		api.getWeather.mockRejectedValue({});
		api.getForecast.mockResolvedValue({ list: [] });

		const { error, loading, fetchWeather } = useWeather();
		await fetchWeather('Paris');

		expect(error.value).toBe('Unexpected error');
		expect(loading.value).toBe(false);
	});
});
