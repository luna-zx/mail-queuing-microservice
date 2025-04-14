import amqp, { Channel } from "amqplib"
import { config } from "dotenv"

config()

export default async (): Promise<Channel> => {
    const rabbitmqConnection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await rabbitmqConnection.createChannel()
    await channel.assertQueue("emailQueue")
    return channel
}