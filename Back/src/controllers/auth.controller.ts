import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, post, requestBody, response, SchemaObject} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {PasswordHasherBindings, RefreshTokenServiceBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {Usuarios} from '../models';
import {Credentials, UsuariosRepository} from '../repositories';
import {validateCredentials} from '../services';
import {BcryptHasher} from '../services/hash.password';
import {JWTService} from '../services/jwt-service';
import {RefreshTokenService} from '../services/refresh-token.service';
import {MyUserService} from '../services/user.service';
import {AuthLoginObject, TokenObject} from '../types';


// Describes the type of grant object taken in by method "refresh"
type RefreshGrant = {
  refreshToken: string;
};

// Describes the schema of grant object
const RefreshGrantSchema: SchemaObject = {
  type: 'object',
  required: ['refreshToken'],
  properties: {
    refreshToken: {
      type: 'string',
    },
  },
};

// Describes the request body of grant object
const RefreshGrantRequestBody = {
  description: 'Reissuing Acess Token',
  required: true,
  content: {
    'application/json': {schema: RefreshGrantSchema},
  },
};

// Describe the schema of user credentials
const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['mail', 'password'],
  properties: {
    mail: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class AuthController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,

    // @inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,

    // @inject('service.user.service')
    @inject(UserServiceBindings.USER_SERVICE)
    public usuariosService: MyUserService,

    // @inject('service.jwt.service')
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

    @inject(RefreshTokenServiceBindings.REFRESH_TOKEN_SERVICE)
    public refreshService: RefreshTokenService,
  ) { }
  @authenticate('jwt')

  @authorize({allowedRoles: ['admin']})
  @post('/auth/signup')
  @response(200, {
    description: 'User',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios),
      },
    },
  })

  async signup(@requestBody() userData: Usuarios) {
    const credentials = {
      mail: userData.mail,
      password: userData.password
    };
    validateCredentials(credentials);
    userData.password = await this.hasher.hashPassword(userData.password)
    const savedUser = await this.usuariosRepository.create(userData);
    // TODO: Revisar
    // delete savedUser.password;
    return savedUser;
  }

  @post('/auth/login')
  @response(200, {
    description: 'Token',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: {
              type: 'string'
            }
          }
        }
      }
    }
  })

  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // make sure user exist,password should be valid
    const user = await this.usuariosService.verifyCredentials(credentials);
    const userProfile = this.usuariosService.convertToUserProfile(user);

    const token = await this.jwtService.generateToken(userProfile);
    return Promise.resolve({token: token})
  }


  @authenticate("jwt")
  @get('/usuarios/me')
  @response(200, {
    description: 'Usuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<UserProfile> {
    return Promise.resolve(currentUser);
  }

  /**
   * A login function that returns refresh token and access token.
   * @param credentials User email and password
   */
  @post('/usuarios/refresh-login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                accessToken: {
                  type: 'string',
                },
                refreshToken: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async refreshLogin(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<AuthLoginObject> {
    // ensure the user exists, and the password is correct
    const user = await this.usuariosService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile: UserProfile =
      this.usuariosService.convertToUserProfile(user);
    const accessToken = await this.jwtService.generateToken(userProfile);
    const tokens = await this.refreshService.generateToken(
      userProfile,
      accessToken,
    );
    const {password, ...userData} = user;
    return {
      accessToken: tokens.accessToken,
      expiresIn: tokens.expiresIn ?? undefined,
      refreshToken: tokens.refreshToken ?? undefined,
      userData: userData
    };
  }

  @authorize({allowedRoles: ['admin']})
  @post('/auth/refresh-token', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                accessToken: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
    },
  })
  async refresh(
    @requestBody(RefreshGrantRequestBody) refreshGrant: RefreshGrant,
  ): Promise<TokenObject> {
    return this.refreshService.refreshToken(refreshGrant.refreshToken);
  }
}
