// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Roles, Usuarios
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosRolesController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/roles', {
    responses: {
      '200': {
        description: 'Roles belonging to Users',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roles)},
          },
        },
      },
    },
  })
  async getRoles(
    @param.path.number('id') id: typeof Usuarios.prototype.id,
  ): Promise<Roles> {
    return this.usuariosRepository.roles(id);
  }

}
