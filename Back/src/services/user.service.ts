import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {Usuarios} from '../models';
import {Credentials, UsuariosRepository} from '../repositories/usuarios.repository';
import {BcryptHasher} from './hash.password';

export class MyUserService implements UserService<Usuarios, Credentials>{
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,

    // @inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher

  ) { }
  async verifyCredentials(credentials: Credentials): Promise<Usuarios> {
    // implement this method
    const foundUser = await this.usuariosRepository.findOne({
      include: [
        {
          relation: "roles",
          scope: {
            include: [
              {
                relation: "permisos"
              }
            ]
          }
        }
      ],
      where: {
        mail: credentials.mail,
        // active: true,
        // deleted: false
      }
    });
    if (!foundUser) {
      throw new HttpErrors.NotFound('User not valid');
    }
    const passwordMatched = await this.hasher.comparePassword(credentials.password, foundUser.password)
    if (!passwordMatched)
      throw new HttpErrors.Unauthorized('Password not valid');
    return foundUser;
  }
  convertToUserProfile(user: Usuarios): UserProfile {
    return {
      [securityId]: user.id!.toString(),
      nombre: user.nombre,
      id: user.id,
      mail: user.mail,
      role: user.role
    };
    // throw new Error('Method not implemented.');
  }

}
