import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import * as dotenv from 'dotenv';
import {Usuarios} from './models';
import {Credentials} from './repositories/usuarios.repository';
import {EmailManager} from './services/email.service';
import {PasswordHasher} from './services/hash.password';
import {RefreshTokenService} from './services/refresh-token.service';
import {FileUploadHandler} from './types';

// get .env configuration
dotenv.config({path: '.env'});

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = process.env.TOKEN_SECRET_VALUE || '';
  export const TOKEN_EXPIRES_IN_VALUE = process.env.TOKEN_EXPIRES_IN_VALUE || '';
}
export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expiresIn',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.jwt.service',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.rounds');
}

export namespace RefreshTokenConstants {
  /**
   * The default secret used when generating refresh token.
   */
  export const REFRESH_SECRET_VALUE = process.env.REFRESH_SECRET_VALUE || '';
  /**
   * The default expiration time for refresh token.
   */
  export const REFRESH_EXPIRES_IN_VALUE = process.env.REFRESH_EXPIRES_IN_VALUE || '';
  /**
   * The default issuer used when generating refresh token.
   */
  export const REFRESH_ISSUER_VALUE = process.env.REFRESH_ISSUER_VALUE || '';
}
export namespace RefreshTokenServiceBindings {
  export const REFRESH_TOKEN_SERVICE = BindingKey.create<RefreshTokenService>(
    'services.authentication.jwt.refresh.tokenservice',
  );
  export const REFRESH_SECRET = BindingKey.create<string>(
    'authentication.jwt.refresh.secret',
  );
  export const REFRESH_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.refresh.expires.in.seconds',
  );
  export const REFRESH_ISSUER = BindingKey.create<string>(
    'authentication.jwt.refresh.issuer',
  );
  /**
   * The backend datasource for refresh token's persistency.
   */
  export const DATASOURCE_NAME = 'mysql';
  /**
   * Key for the repository that stores the refresh token and its bound user
   * information
   */
  export const REFRESH_REPOSITORY = 'repositories.RefreshTokenRepository';
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<Credentials, Usuarios>>(
    'services.user.service',
  );
}

export namespace FileUploadBindings {
  /**
 * Binding key for the file upload service
 */
  export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadHandler>(
    'services.FileUpload',
  );

  /**
   * Binding key for the storage directory
   */
  export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');

}
export namespace EmailManagerBindings {
  export const SEND_MAIL = BindingKey.create<EmailManager>('services.email.send');
}
