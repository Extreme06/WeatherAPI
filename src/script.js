const inputCity = document.getElementById('inputCity')
const cityForm = document.getElementById('cityForm')
const cityParagraph = document.getElementById('cityParagraph')
const temperature = document.getElementById('temperature')

cityForm.addEventListener('submit', async (e) => {
	e.preventDefault()
	const cityName = encodeURIComponent(inputCity.value.trim())
	if (!cityName) {
		alert('Please insert name before submiting')
		return
	}
	try {
		const data = await getData(cityName)
		cityParagraph.innerText = data.location.name
		temperature.innerText = `${data.current.temp_c}°C`
	} catch (errorMessage) {
		console.error('Error: ', errorMessage)
		alert('Failed to fetch weather data')
	}
})

async function getData(cityName) {
	const response = await fetch(`/getWeather?city=${cityName}`)
	console.log(response)
	if (!response.ok) {
		console.error('HTTP error! status: ', response.status)
		return
	}
	const data = await response.json()

	return data
}
