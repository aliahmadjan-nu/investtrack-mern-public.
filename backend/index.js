const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const routes = require('./routes')

dotenv.config()

const app = express()
app.use(express.json())

const fixed = ['http://localhost:3000']
if (process.env.FRONTEND_URL) fixed.push(process.env.FRONTEND_URL)

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true)
    if (fixed.includes(origin)) return cb(null, true)
    if (!process.env.FRONTEND_URL && origin.endsWith('.vercel.app')) return cb(null, true) // temp allow until env set
    return cb(new Error('Not allowed by CORS'))
  }
}))

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api', routes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('db ok')
  app.listen(PORT, () => console.log('server here', PORT))
}).catch((err) => {
  console.log(err)
})
