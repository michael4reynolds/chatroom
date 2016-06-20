import express from 'express'
import * as path from 'path'
const app = express()

app.use(express.static(path.join(__dirname, '../public')))
app.listen(8000)
