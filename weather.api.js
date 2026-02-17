const apiKey = process.env.WEATHER_API_KEY
const baseURL = process.env.WEATHER_URL.toString()

if (!apiKey || !baseURL) throw new Error('Failed connection with dotenv file')

const cityCache = new Map()

const CITY_CACHE_TTL = 60000 // 1min
const CITY_CACHE_SIZE_LIMIT = 15

export async function getWeather(cityName) {
	cityName = cityName.toLowerCase()

	//check cache for requested data before fetching
	if (cityCache.has(cityName)) {
		const cachedCity = cityCache.get(cityName)
		console.log({ cachedAt: cachedCity.cachedAt })

		if (Date.now() - cachedCity.cachedAt < CITY_CACHE_TTL) {
			console.log(`Returning ${cityName} data from cache...`)

			const { cachedAt, ...data } = cachedCity

			return data
		} else cityCache.delete(cityName)
	}

	//check if cache exceeds its limit
	if (cityCache.size >= CITY_CACHE_SIZE_LIMIT) {
		const firstKey = cityCache.keys().next().value
		if (cityCache.delete(firstKey))
			console.log(
				`[${Date.now()}]Cache exceeded its limit, sucessfuly cleared ${firstKey}`,
			)
	}

	//fetch desired information
	try {
		const url = new URL(baseURL)
		url.searchParams.set('key', apiKey)
		url.searchParams.set('q', cityName)

		const response = await fetch(url.toString())
		if (!response.ok)
			throw new Error(`Failed to fetch weather data. Status code: ${response.status}`)

		const data = await response.json()

		//save information in cache
		cityCache.set(cityName, {
			...data,
			cachedAt: Date.now(),
		})
		console.log(
			`[${new Date().toISOString()}]: [${cityCache.size}]Caching data for: [${data.location.name}]`,
		)

		return data
	} catch (errorMessage) {
		throw Error(errorMessage)
	}
}
