import express from "express"
import z from "zod"
import { config } from "dotenv"
import { Channel } from "amqplib"
import connectChannel from "./rabbitmq/connectChannel"

const app = express()
config()
let channel: Channel

app.use(express.json())

app.post("/send-email", async (req, res) => {
    try {
        const bodySchema = z.object({
            to: z.string().email(),
            subject: z.string(),
            html: z.string()
        })
        const validateResult = bodySchema.safeParse(req.body)
        if (!validateResult.success) {
            res.status(400).json(validateResult.error)
            return
        }

        const { to, subject, html } = validateResult.data

        channel.sendToQueue("emailQueue", Buffer.from(JSON.stringify({ to, subject, html })))
        res.status(200).json({ message: "Email sended!" })
        return
    } catch (error) {
        console.error(error)
    }
})

void (async () => {
    try {
        channel = await connectChannel()
        
        app.listen(Number(process.env.API_PORT), () => {
            console.log("API Started!")
        })
    } catch (error) {
        console.error(error)
    }
})()