const express = require('express')
const connectToDb = require('./config/db')
const app = express()
const port = 3000
app.use(express.json())
connectToDb()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api', require('./Routes/createUser'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})