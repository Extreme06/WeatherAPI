import 'dotenv/config'
import { getWeather } from './weather.api.js'
import path from 'path'
import express from 'express'
const app = express()

const PORT = process.env.PORT
app.use(express.static(path.join(import.meta.dirname, 'src')))

app.get('/', (_req, res) => {
	res.sendFile(path.join(import.meta.dirname, 'src', 'views', 'index.html'))
})

app.get('/getWeather', async (req, res) => {
	try {
		const city = req.query.city
		if (!city) {
			return res.status(400).json({ error: 'City parameter is required' })
		}

		const data = await getWeather(city)
		res.json(data)
	} catch (error) {
		console.error('Failed fetching weather : ', error)
		res.status(500).json({ error: 'Failed to fetch weather data' })
	}
})

app.get('/slika.jpg', (_req, res) => {
	res.sendFile(path.join(import.meta.dirname, 'src', 'img', 'slika.jpg'))
})

app.listen(PORT, () => {
	console.log(`Server running on port : ${PORT}`)
})
