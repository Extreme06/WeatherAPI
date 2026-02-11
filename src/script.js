const inputCity = document.getElementById('inputCity')
const submitButton = document.getElementById('submitButton')

submitButton.addEventListener('click', async () => {
	let cityName = encodeURIComponent(inputCity.value.toLowerCase())
	const data = await getData(cityName)
	console.log(data)
})

async function getData(cityName) {
	const response = await fetch(`/getWeather?city=${cityName}`)
	const data = await response.json()

	return data
}
