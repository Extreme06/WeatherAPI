import 'dotenv/config'

import path from 'path'
import express from 'express'
const app = express()

const PORT = 3001
app.use(express.static(path.join(import.meta.dirname, 'src', 'views')))

app.get('/', (_req, res) => {
	res.sendFile(path.join(import.meta.dirname, 'src', 'views', 'index.html'))
})

app.get('/script.js', (_req, res) => {
	console.log('[request for script.js]')
	res.sendFile(path.join(import.meta.dirname, 'src', 'script.js'))
})

app.get('/getWeather', (req, res) => {
	//need to request cityName variable
	const data = getWeather()
	console.log(data)
	res.send(data)
})

app.listen(PORT, () => {
	console.log(`Server running on port : ${PORT}`)
})

async function getWeather() {
	try {
		const apiKey = process.env.WEATHER_API_KEY
		const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}` //need cityName here from script.js

		const response = await fetch(url)
		const data = await response.json()
		return data
	} catch (errorMessage) {
		throw new Error(errorMessage)
	}
}
