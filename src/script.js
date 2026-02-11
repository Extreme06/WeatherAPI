const inputCity = document.getElementById('inputCity')
const cityForm = document.getElementById('cityForm')

cityForm.addEventListener('submit', async (e) => {
	e.preventDefault()
	let cityName = encodeURIComponent(inputCity.value.toLowerCase())
	if (!cityName) console.log(cityName)

	const data = await getData(cityName)
	console.log(data)
})

async function getData(cityName) {
	const response = await fetch(`/getWeather?city=${cityName}`)
	const data = await response.json()

	return data
}
