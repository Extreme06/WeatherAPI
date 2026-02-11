import 'dotenv/config'
import { getWeather } from './weather.api.js'
import path from 'path'
import express from 'express'
const app = express()

const PORT = process.env.PORT
// app.use(express.static(path.join(import.meta.dirname, 'src', 'views')))

app.get('/', (_req, res) => {
	res.sendFile(path.join(import.meta.dirname, 'src', 'views', 'index.html'))
})

app.get('/script.js', (_req, res) => {
	res.sendFile(path.join(import.meta.dirname, 'src', 'script.js'))
})

app.get('/getWeather', async (req, res) => {
	const city = req.query.city
	const data = await getWeather(city)

	res.send(data)
})

app.listen(PORT, () => {
	console.log(`Server running on port : ${PORT}`)
})
