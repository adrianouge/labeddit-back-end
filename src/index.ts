import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { usersRouter } from './routers/UsersRouter'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Server running on port ${Number(process.env.PORT)}`)
})

app.use('/users', usersRouter)