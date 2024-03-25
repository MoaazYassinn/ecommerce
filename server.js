import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { bootstrap } from './src/modules/index.routes.js'
import dotenv from "dotenv"
import cors from "cors"
const app = express()
const port = 3000
dotenv.config()
dbConnection()

app.use(cors())
app.use(express.json())
bootstrap(app)
app.use('/uploads',express.static('uploads'))

app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))