// @ts-nocheck
import { /* inject, */ BindingScope, config, CoreBindings, injectable} from '@loopback/core';
// import Utils from '../utils';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {Email} from '../models';


export interface EmailManager<T = Object> {
  sendMail(mailObj: Email): Promise<T>;
}

@injectable({scope: BindingScope.TRANSIENT})
export class EmailService {
  constructor(/* Add @inject to inject parameters */
    @config({
      fromBinding: CoreBindings.APPLICATION_INSTANCE,
      propertyPath: 'email'
    })
    private options: SMTPTransport,
  ) {
  }

  /*
   * Add service methods here
   */
  async sendMail(mailObj: Email): Promise<object> {
    const transporter = nodemailer.createTransport(this.options)

    return transporter.sendMail(mailObj);
  }
}
