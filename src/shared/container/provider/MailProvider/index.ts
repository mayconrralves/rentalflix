import { container } from 'tsyringe';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESmailProvider } from './implementations/SESmailProvider';

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESmailProvider),
};
container.registerInstance(
    'MailProvider',
    mailProvider[process.env.MAIL_PROVIDER]
);
