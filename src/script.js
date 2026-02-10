// const apiKey = process.env.WEATHER_API_KEY
const city = 'Subotica'

const inputCity = document.getElementById('inputCity')
const submitButton = document.getElementById('submitButton')

submitButton.addEventListener('click', () => {
	const cityName = inputCity.value.toLowerCase()
	console.log(cityName)
	getData(cityName)
})

async function getData() {
	const response = await fetch('/getWeather')
	const data = await response.json()
	console.log(data)
}

async function getData(cityName) {
	const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`
	try {
		console.log(`\nAttempting to fetch weather for {${city.toLowerCase()}}`)
		const response = await fetch(url)

		if (!response.ok) throw new Error('Fetch failed')
		console.log('Fetch successful')
		const data = await response.json()

		// console.log(data)
	} catch (errorMessage) {
		throw new Error(errorMessage)
	}
}

async function initApp() {
	const response = await fetch('/api/config')
	const config = await response.json()

	console.log('My API Key is:', config.apiKey)
	// Now you can use config.apiKey in your logic
}

initApp()
