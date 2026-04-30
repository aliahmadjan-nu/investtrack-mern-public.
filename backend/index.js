const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const routes = require('./routes')

dotenv.config()

const app = express()
app.use(express.json())

const corsOrigin = process.env.FRONTEND_URL || 'http://localhost:3000'
app.use(cors({ origin: corsOrigin }))

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
