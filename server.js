import 'dotenv/config'
import { getWeather } from './weather.api.js'
import path from 'path'
import express from 'express'
const app = express()

const PORT = process.env.PORT
app.use(express.static(path.join(import.meta.dirname, 'src', 'views')))

app.get('/', (_req, res) => {
	res.sendFile(path.join(import.meta.dirname, 'src', 'views', 'index.html'))
})

app.get('/script.js', (_req, res) => {
	console.log('[request for script.js]')
	res.sendFile(path.join(import.meta.dirname, 'src', 'script.js'))
})

app.get('/getWeather', async (req, res) => {
	//need to request cityName variable
	const city = req.query.city
	const data = await getWeather(city)
	// console.log(data)
	res.send(data)
})

app.listen(PORT, () => {
	console.log(`Server running on port : ${PORT}`)
})

// async function getWeather(city) {
// 	try {
// 		const apiKey = process.env.WEATHER_API_KEY

// 		const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}` //need cityName here from script.js

// 		const response = await fetch(url)
// 		const data = await response.json()

// 		console.log(data)

// 		return data
// 	} catch (errorMessage) {
// 		throw new Error(errorMessage)
// 	}
// }
