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
import {Idiomas} from '../models';
import {IdiomasRepository} from '../repositories';
// @authenticate('jwt')
export class IdiomasController {
  constructor(
    @repository(IdiomasRepository)
    public idiomasRepository : IdiomasRepository,
  ) {}
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin']})
  @post('/idiomas')
  @response(200, {
    description: 'Idiomas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Idiomas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Idiomas, {
            title: 'NewIdiomas',
            exclude: ['id'],
          }),
        },
      },
    })
    idiomas: Omit<Idiomas, 'id'>,
  ): Promise<Idiomas> {
    return this.idiomasRepository.create(idiomas);
  }

  @get('/idiomas/count')
  @response(200, {
    description: 'Idiomas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Idiomas) where?: Where<Idiomas>,
  ): Promise<Count> {
    return this.idiomasRepository.count(where);
  }

  @get('/idiomas')
  @response(200, {
    description: 'Array of Idiomas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Idiomas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Idiomas) filter?: Filter<Idiomas>,
  ): Promise<Idiomas[]> {
    return this.idiomasRepository.find(filter);
  }
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin']})
  @patch('/idiomas')
  @response(200, {
    description: 'Idiomas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Idiomas, {partial: true}),
        },
      },
    })
    idiomas: Idiomas,
    @param.where(Idiomas) where?: Where<Idiomas>,
  ): Promise<Count> {
    return this.idiomasRepository.updateAll(idiomas, where);
  }

  @get('/idiomas/{id}')
  @response(200, {
    description: 'Idiomas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Idiomas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Idiomas, {exclude: 'where'}) filter?: FilterExcludingWhere<Idiomas>
  ): Promise<Idiomas> {
    return this.idiomasRepository.findById(id, filter);
  }
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin']})
  @patch('/idiomas/{id}')
  @response(204, {
    description: 'Idiomas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Idiomas, {partial: true}),
        },
      },
    })
    idiomas: Idiomas,
  ): Promise<void> {
    await this.idiomasRepository.updateById(id, idiomas);
  }
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin']})
  @put('/idiomas/{id}')
  @response(204, {
    description: 'Idiomas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() idiomas: Idiomas,
  ): Promise<void> {
    await this.idiomasRepository.replaceById(id, idiomas);
  }
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin']})
  @del('/idiomas/{id}')
  @response(204, {
    description: 'Idiomas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.idiomasRepository.deleteById(id);
  }
}
