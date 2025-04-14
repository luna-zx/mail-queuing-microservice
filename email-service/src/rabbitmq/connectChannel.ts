import amqp from "amqplib"
import { config } from "dotenv"

config()

export default async () => {
    const channel = await (await amqp.connect(process.env.RABBITMQ_URL)).createChannel()
    await channel.assertQueue("emailQueue")
    return channel
}