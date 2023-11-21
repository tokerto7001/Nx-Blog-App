import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export class EmailService {
    fullName: string;
    email: string;
    constructor(fullName: string, email: string) {
        this.fullName = fullName;
        this.email = email;
    }

    async sendRegisterEmail(verifyUrl: string) {
        await this.sendEmail(
            'Registration',
            `<h1>Verify link </h1>
            <a href=${verifyUrl}>Verify</a>`,
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

            await sgMail.send(options);
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err);
        }
    }
}
