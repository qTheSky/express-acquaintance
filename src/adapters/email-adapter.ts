import nodemailer from 'nodemailer'

export const emailAdapter = {
		async sendEmail(email: string, subject: string, message: string) {
				const transport = nodemailer.createTransport({
						service: 'gmail',
						auth: {
								user: 'thesky946@gmail.com',
								pass: 'xweuvcjyxrilbycv',
						}
				})

				const info = await transport.sendMail({
						from: 'Miha <thesky946@gmail.com>',
						to: email,
						subject,
						html: message,
				})
				return info
		}
}
