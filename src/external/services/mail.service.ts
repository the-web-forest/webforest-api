import { Injectable, Logger } from '@nestjs/common';
import { ActivationRequest } from 'src/domain/entities/activation.request';
import IMailService from 'src/domain/interfaces/services/mail.service.interface';
import { User } from '../../domain/entities/user';

@Injectable()
export default class MailService implements IMailService {
  private readonly logger = new Logger(MailService.name);

  async sendUserActivationEmail(request: ActivationRequest): Promise<void> {
    // TODO
    this.logger.warn('Method not implemented');
    this.logger.log({
      email: request.user.email,
      hash: request.hash,
    });
  }

  async sendWelcomeEmail(user: User): Promise<void> {
    // TODO
    this.logger.debug(user);
    this.logger.warn('Method not implemented');
  }
}
