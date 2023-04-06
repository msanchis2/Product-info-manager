// Uncomment these imports to begin using these cool features!
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Permisos, Roles
} from '../models';
import {RolesRepository} from '../repositories';

export class RelacionRolPermisosController {
  constructor(
    @repository(RolesRepository) protected rolesRepository: RolesRepository
  ) { }
// OBTENGO ROLES CON SUS PERMISOS
  @get('/roles/{id}/permisos', {
    responses: {
      '200': {
        description: 'Array de Roles como Permisos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Permisos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Permisos>,
  ): Promise<Permisos[]> {
    return this.rolesRepository.permisos(id).find(filter);
  }

  // Se crean permisos relacionado con los roles

  @post('/roles/{id}/permisos', {
    responses: {
      '200': {
        description: 'Roles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Permisos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Roles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {
            title: 'NewRelacionRolesPermisos',
            exclude: ['id'],
            optional: ['rolesId']
          }),
        },
      },
    }) permisos: Omit<Permisos, 'id'>,
  ): Promise<Permisos> {
    return this.rolesRepository.permisos(id).create(permisos);
  }

// PATH RELACIONES

  @patch('/roles/{id}/permisos', {
    responses: {
      '200': {
        description: 'Relaciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {partial: true}),
        },
      },
    })
    permisos: Partial<Permisos>,
    @param.query.object('where', getWhereSchemaFor(Permisos)) where?: Where<Permisos>,
  ): Promise<Count> {
    return this.rolesRepository.permisos(id).patch(permisos, where);
  }

// Borrar Permiso

  @del('/roles/{id}/permisos', {
    responses: {
      '200': {
        description: 'Relacion permisos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Permisos)) where?: Where<Permisos>,
  ): Promise<Count> {
    return this.rolesRepository.permisos(id).delete(where);
  }

}
