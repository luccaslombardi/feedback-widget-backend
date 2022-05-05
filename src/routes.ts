import express from 'express'
import nodemailer from 'nodemailer'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedback-repository';

export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6c3ee8086d1915",
      pass: "b754c82135514c"
    }
  });

routes.post('/feedbacks',async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository)

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send()

/*    await transport.sendMail({
        from: 'feedget <oi@feedback.com>',
        to: 'Luccas Lombardi <luccas.lombardi@hotmail.com>',
        subject: 'Novo Feedback',
        html: [
            `<div style='font-family:sans-serif; font-size:16px; color:#222;'>`,
            `<p>Tipo do Feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })*/
})