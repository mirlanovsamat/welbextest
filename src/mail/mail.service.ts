import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(email, link) {
        const url = link; 
    
        await this.mailerService.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './confirmation', 
            context: {
                name: email,
                url,
            },
        });
      }
}
