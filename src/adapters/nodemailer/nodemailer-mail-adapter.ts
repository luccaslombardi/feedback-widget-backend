import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6c3ee8086d1915",
      pass: "b754c82135514c"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData)  {
        await transport.sendMail({
        from: 'feedget <oi@feedback.com>',
        to: 'Luccas Lombardi <luccas.lombardi@hotmail.com>',
        subject: subject,
        html: body
    })
    }


}   