const inputCity = document.getElementById('inputCity')
const cityForm = document.getElementById('cityForm')
const temperature = document.getElementById('temperature')
const cityParagraph = document.getElementById('cityParagraph')

cityForm.addEventListener('submit', async (e) => {
	e.preventDefault()
	let cityName = encodeURIComponent(inputCity.value.toLowerCase())
	if (!cityName) console.log(cityName)

	const data = await getData(cityName)

	cityParagraph.innerText = data.location.name
	temperature.innerText = data.current.temp_c

	console.log(data)
})

async function getData(cityName) {
	const response = await fetch(`/getWeather?city=${cityName}`)
	const data = await response.json()

	return data
}
