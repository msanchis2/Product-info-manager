import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
// import {SECURITY_SCHEME_SPEC} from './utils/security-spec';
import {SECURITY_SCHEME_SPEC} from '@loopback/authentication-jwt';
import {AuthorizationComponent, AuthorizationDecision, AuthorizationOptions, AuthorizationTags} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import * as dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import {JWTStrategy} from './authentication-stratgies/jwt-stratgies';
import {EmailManagerBindings, FileUploadBindings, PasswordHasherBindings, RefreshTokenConstants, RefreshTokenServiceBindings, TokenServiceBindings, TokenServiceConstants, UserServiceBindings} from './keys';
import {MySequence} from './sequence';
import {EmailService, MyAuthorizationProvider} from './services';
import {BcryptHasher} from './services/hash.password';
import {JWTService} from './services/jwt-service';
import {RefreshTokenService} from './services/refresh-token.service';
import {MyUserService} from './services/user.service';

export {ApplicationConfig};

export class SvanApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // get .env configuration
    dotenv.config({path: '.env'});

    // setup binding
    this.setupBinding();

    // Add security spec
    this.addSecuritySpec();

    // Configure file upload with multer options
    this.configureFileUpload(options.fileStorageDirectory);

    // Authentication strategies (bearer token)
    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, JWTStrategy)

    // bind set authorization options
    const authoptions: AuthorizationOptions = {
      precedence: AuthorizationDecision.DENY,
      defaultDecision: AuthorizationDecision.DENY,
    };
    // mount authorization component
    const binding = this.component(AuthorizationComponent);
    // configure authorization component
    this.configure(binding.key).to(authoptions);
    // bind the authorizer provider
    this
      .bind('authorizationProviders.my-authorizer-provider')
      .toProvider(MyAuthorizationProvider)
      .tag(AuthorizationTags.AUTHORIZER);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
  setupBinding(): void {
    // this.bind('service.hasher').toClass(BcryptHasher);
    // this.bind('rounds').to(10);
    // this.bind('service.user.service').toClass(MyUserService)
    // this.bind('service.jwt.service').toClass(JWTService);
    // this.bind('authentication.jwt.secret').to('dvchgdvcjsdbhcbdjbvjb');
    // this.bind('authentication.jwt.expiresIn').to('7h');

    // password hasher bindings
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);
    this.bind(PasswordHasherBindings.ROUNDS).to(10)
    // user bindings
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
    // token bindings
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(TokenServiceConstants.TOKEN_SECRET_VALUE);
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);

    /// refresh bindings
    this.bind(RefreshTokenServiceBindings.REFRESH_TOKEN_SERVICE).toClass(RefreshTokenService);
    // refresh token bindings
    this.bind(RefreshTokenServiceBindings.REFRESH_SECRET).to(RefreshTokenConstants.REFRESH_SECRET_VALUE);
    this.bind(RefreshTokenServiceBindings.REFRESH_EXPIRES_IN).to(RefreshTokenConstants.REFRESH_EXPIRES_IN_VALUE);
    this.bind(RefreshTokenServiceBindings.REFRESH_ISSUER).to(RefreshTokenConstants.REFRESH_ISSUER_VALUE);

    // Email bindings
    this.bind(EmailManagerBindings.SEND_MAIL).toClass(EmailService);
  }
  addSecuritySpec(): void {
    this.api({
      openapi: '3.0.0',
      info: {
        title: 'Svan application',
        version: '1.0.0',
      },
      paths: {},
      components: {securitySchemes: SECURITY_SCHEME_SPEC},
      security: [
        {
          // secure all endpoints with 'jwt'
          jwt: [],
        },
      ],
      servers: [{url: '/'}],
    });
  }
  /**
   * Configure `multer` options for file upload
   */
  protected configureFileUpload(destination?: string) {
    // Upload files to `dist/.sandbox` by default
    destination = destination ?? path.join(__dirname, '../public/multimedia');
    this.bind(FileUploadBindings.STORAGE_DIRECTORY).to(destination);
    const multerOptions: multer.Options = {
      storage: multer.diskStorage({
        destination,
        // Use the original file name as is
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    };
    // Configure the file upload service with multer options
    this.configure(FileUploadBindings.FILE_UPLOAD_SERVICE).to(multerOptions);
  }
}
