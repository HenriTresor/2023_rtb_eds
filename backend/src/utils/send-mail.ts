import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMPT_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PWD
    }
} as nodemailer.TransportOptions)

const sendMail = async (to: string, subject: string, body: string) => {
    try {
        const info = await transporter.sendMail({
            from: "shimwamanat70@gmail.com",
            to,
            subject,
            text: body
        })

        if (info.accepted) console.log("email sent")
        return info.messageId
    } catch (error: any) {
        console.log('error sending mail:', error.message)
    }
}

export default sendMail