import nodemailer from 'nodemailer';

export class EmailService {
    fullName: string;
    email: string;
    constructor(fullName: string, email: string) {
        this.fullName = fullName;
        this.email = email;
    }

    async sendRegisterEmail(verifyUrl: string) {
        await this.sendEmail(
            'Registeration',
            `<h1>Verify link ${verifyUrl}</h1>`,
        );
    }

    async sendEmail(subject: string, content: string) {
        try {
            const options = {
                to: this.email,
                from: process.env.SENDGRID_MAIL!,
                subject: subject,
                html: content,
            };

            const transporter = nodemailer.createTransport({
                host: 'smtp.sendgrid.net',
                port: 587,
                auth: {
                    user: 'apikey',
                    pass: process.env.SENDGRID_API_KEY,
                },
            });

            transporter
                .sendMail(options)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        } catch (err: any) {
            console.log(err);
        }
    }
}
