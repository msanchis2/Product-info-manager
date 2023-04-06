import {HttpErrors} from '@loopback/rest';
import * as isEmail from 'isemail';
import {Credentials} from '../repositories/index';

export function validateCredentials(credentials: Credentials) {
  if (!isEmail.validate(credentials.mail)) {
    throw new HttpErrors.UnprocessableEntity('Invalid Email');
  }
  if (credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity('Password length should be greater or equal to 8')
  }
}
