import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Permisos, Roles} from '../models';
import {PermisosRepository} from '../repositories';

export class PermisosController {
  constructor(
    @repository(PermisosRepository)
    public permisosRepository : PermisosRepository,
  ) {}

  @post('/permisos')
  @response(200, {
    description: 'Permisos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Permisos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {
            title: 'NewPermisos',
            exclude: ['id'],
          }),
        },
      },
    })
    permisos: Omit<Permisos, 'id'>,
  ): Promise<Permisos> {
    return this.permisosRepository.create(permisos);
  }

  @get('/permisos/count')
  @response(200, {
    description: 'Permisos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Permisos) where?: Where<Permisos>,
  ): Promise<Count> {
    return this.permisosRepository.count(where);
  }

  @get('/permisos')
  @response(200, {
    description: 'Array of Permisos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Permisos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Permisos) filter?: Filter<Permisos>,
  ): Promise<Permisos[]> {
    return this.permisosRepository.find(filter);
  }

  @patch('/permisos')
  @response(200, {
    description: 'Permisos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {partial: true}),
        },
      },
    })
    permisos: Permisos,
    @param.where(Permisos) where?: Where<Permisos>,
  ): Promise<Count> {
    return this.permisosRepository.updateAll(permisos, where);
  }

  @get('/permisos/{id}')
  @response(200, {
    description: 'Permisos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Permisos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Permisos, {exclude: 'where'}) filter?: FilterExcludingWhere<Permisos>
  ): Promise<Permisos> {
    return this.permisosRepository.findById(id, filter);
  }

  @patch('/permisos/{id}')
  @response(204, {
    description: 'Permisos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {partial: true}),
        },
      },
    })
    permisos: Permisos,
  ): Promise<void> {
    await this.permisosRepository.updateById(id, permisos);
  }

  @put('/permisos/{id}')
  @response(204, {
    description: 'Permisos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() permisos: Permisos,
  ): Promise<void> {
    await this.permisosRepository.replaceById(id, permisos);
  }

  @del('/permisos/{id}')
  @response(204, {
    description: 'Permisos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.permisosRepository.deleteById(id);
  }
  // Engancho aqui la funcion para sacar la matriz que relaciona roles y sus permisos
  @get('/permisos/matrix')
  @response(200, {
    description: 'Array de permisos matriz',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Roles, {includeRelations: true}),
        },
      },
    },
  })
  async getPermissionsMatrix(
    @param.filter(Permisos) filter?: Filter<Permisos>,
  ): Promise<Permisos[]> {
    return this.permisosRepository.getPermissionsMatrix();
  }

}
