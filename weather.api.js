const apiKey = process.env.WEATHER_API_KEY
const cityCache = new Map()
// const CITY_CACHE_TTL = 60 * 60 * 1000 // 1h
const CITY_CACHE_TTL = 60000 // 1min
const CITY_CACHE_SIZE_LIMIT = 15

export async function getWeather(cityName) {
	if (cityCache.has(cityName)) {
		const cachedCity = cityCache.get(cityName)
		console.log({ cachedAt: cachedCity.cachedAt })

		if (Date.now() - cachedCity.cachedAt < CITY_CACHE_TTL) {
			console.log(`Returning ${cityName} data from cache...`)

			const { cachedAt, ...data } = cachedCity

			return data
		} else {
			cityCache.delete(cityName)
		}
	}

	// if (cachedCity.size > CITY_CACHE_SIZE_LIMIT) cachedCity

	try {
		const url = new URL('http://api.weatherapi.com/v1/current.json')
		url.searchParams.set('key', apiKey)
		url.searchParams.set('q', cityName)
		// ;('?key=${apiKey}&q=${cityName}')

		console.log(url.toString())

		const response = await fetch(url.toString())
		if (!response.ok) throw new Error('Failed to fetch weather data.')

		const data = await response.json()

		console.log(
			`[${new Date().toISOString()}]: [${cityCache.size}]Caching data for: [${data.location.name}]`,
		)

		cityCache.set(cityName, {
			...data,
			cachedAt: Date.now(),
		})

		return data
	} catch (errorMessage) {
		throw new Error(errorMessage)
	}
}
