require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/authRoutes')
const charityRoutes = require('./routes/charityRoutes')
const subscriptionRoutes = require('./routes/subscriptionRoutes')

app.use('/api/auth', authRoutes)
app.use('/api/charities', charityRoutes)
app.use('/api/subscriptions', subscriptionRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
