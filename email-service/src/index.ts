import connectChannel from "./rabbitmq/connectChannel"
import transporter from "./email/transporter"
import { EmailData } from "./types/messageData"

void (async () => {
    const channel = await connectChannel()
    console.log("Waiting for messages!")

    channel.consume("emailQueue", async msg => {
        if (!msg) return
        const { to, subject, html } = JSON.parse(msg.content.toString()) as EmailData

        try {
            await transporter.sendMail({
                from: "sigma boy",
                to,
                subject,
                html
            })

            channel.ack(msg)
            console.log("Email sended!")
        } catch (error) {
            console.error(error)
        }
    })
})()