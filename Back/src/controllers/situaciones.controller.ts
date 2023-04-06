import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
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
import {Situaciones} from '../models';
import {SituacionesRepository} from '../repositories';

@authenticate('jwt')
export class SituacionesController {
  constructor(
    @repository(SituacionesRepository)
    public SituacionesRepository : SituacionesRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/Situaciones')
  @response(200, {
    description: 'Situaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Situaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Situaciones, {
            title: 'NewSituaciones',
            exclude: ['id'],
          }),
        },
      },
    })
    Situaciones: Omit<Situaciones, 'id'>,
  ): Promise<Situaciones> {
    return this.SituacionesRepository.create(Situaciones);
  }

  @get('/Situaciones/count')
  @response(200, {
    description: 'Situaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Situaciones) where?: Where<Situaciones>,
  ): Promise<Count> {
    return this.SituacionesRepository.count(where);
  }

  @get('/Situaciones')
  @response(200, {
    description: 'Array of Situaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Situaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Situaciones) filter?: Filter<Situaciones>,
  ): Promise<Situaciones[]> {
    return this.SituacionesRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/Situaciones')
  @response(200, {
    description: 'Situaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Situaciones, {partial: true}),
        },
      },
    })
    Situaciones: Situaciones,
    @param.where(Situaciones) where?: Where<Situaciones>,
  ): Promise<Count> {
    return this.SituacionesRepository.updateAll(Situaciones, where);
  }

  @get('/Situaciones/{id}')
  @response(200, {
    description: 'Situaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Situaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Situaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Situaciones>
  ): Promise<Situaciones> {
    return this.SituacionesRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/Situaciones/{id}')
  @response(204, {
    description: 'Situaciones PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Situaciones, {partial: true}),
        },
      },
    })
    Situaciones: Situaciones,
  ): Promise<void> {
    await this.SituacionesRepository.updateById(id, Situaciones);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/Situaciones/{id}')
  @response(204, {
    description: 'Situaciones PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() Situaciones: Situaciones,
  ): Promise<void> {
    await this.SituacionesRepository.replaceById(id, Situaciones);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/Situaciones/{id}')
  @response(204, {
    description: 'Situaciones DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.SituacionesRepository.deleteById(id);
  }
}
