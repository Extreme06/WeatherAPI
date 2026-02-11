const apiKey = process.env.WEATHER_API_KEY
const cityCache = new Map()
// const CITY_CACHE_TTL = 60 * 60 * 1000 // 1h
const CITY_CACHE_TTL = 60000 // 1min

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

	try {
		const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`
		const response = await fetch(url)
		const data = await response.json()

		// console.log(data)

		console.log(`[${new Date().toISOString()}]: Caching ${cityName} data`)
		cityCache.set(cityName, {
			...data,
			cachedAt: Date.now(),
		})

		return data
	} catch (errorMessage) {
		throw new Error(errorMessage)
	}
}
