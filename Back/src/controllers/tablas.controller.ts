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
import {Tablas} from '../models';
import {TablasRepository} from '../repositories';

@authenticate('jwt')
export class TablasController {
  constructor(
    @repository(TablasRepository)
    public TablasRepository : TablasRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/Tablas')
  @response(200, {
    description: 'Tablas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tablas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tablas, {
            title: 'NewTablas',
            exclude: ['id'],
          }),
        },
      },
    })
    Tablas: Omit<Tablas, 'id'>,
  ): Promise<Tablas> {
    return this.TablasRepository.create(Tablas);
  }

  @get('/Tablas/count')
  @response(200, {
    description: 'Tablas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tablas) where?: Where<Tablas>,
  ): Promise<Count> {
    return this.TablasRepository.count(where);
  }

  @get('/Tablas')
  @response(200, {
    description: 'Array of Tablas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tablas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tablas) filter?: Filter<Tablas>,
  ): Promise<Tablas[]> {
    return this.TablasRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/Tablas')
  @response(200, {
    description: 'Tablas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tablas, {partial: true}),
        },
      },
    })
    Tablas: Tablas,
    @param.where(Tablas) where?: Where<Tablas>,
  ): Promise<Count> {
    return this.TablasRepository.updateAll(Tablas, where);
  }

  @get('/Tablas/{id}')
  @response(200, {
    description: 'Tablas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tablas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tablas, {exclude: 'where'}) filter?: FilterExcludingWhere<Tablas>
  ): Promise<Tablas> {
    return this.TablasRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/Tablas/{id}')
  @response(204, {
    description: 'Tablas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tablas, {partial: true}),
        },
      },
    })
    Tablas: Tablas,
  ): Promise<void> {
    await this.TablasRepository.updateById(id, Tablas);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/Tablas/{id}')
  @response(204, {
    description: 'Tablas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() Tablas: Tablas,
  ): Promise<void> {
    await this.TablasRepository.replaceById(id, Tablas);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/Tablas/{id}')
  @response(204, {
    description: 'Tablas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.TablasRepository.deleteById(id);
  }
}
