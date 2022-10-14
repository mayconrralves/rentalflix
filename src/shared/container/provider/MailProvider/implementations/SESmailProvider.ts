import { injectable } from 'tsyringe';
import Handlebars from 'handlebars';
import fs from 'fs';

import nodemailer, { Transporter } from 'nodemailer';
import { IMailProvider } from '../IMailProvider';
import { SES } from 'aws-sdk';

@injectable()
class SESmailProvider implements IMailProvider {
    private client: Transporter;
    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: '2010-12-01',
                region: process.env.AWS_REGION,
            }),
        });
    }
    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8');

        const templateParse = Handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        await this.client.sendMail({
            to,
            from: 'Rentx <mrra@mayconrralves.com>',
            subject,
            html: templateHTML,
        });
    }
}

export { SESmailProvider };
