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
import {Atributos} from '../models';
import {AtributosRepository} from '../repositories';

@authenticate('jwt')
export class AtributosController {
  constructor(
    @repository(AtributosRepository)
    public atributosRepository : AtributosRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/atributos')
  @response(200, {
    description: 'Atributos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Atributos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atributos, {
            title: 'NewAtributos',
            exclude: ['id'],
          }),
        },
      },
    })
    atributos: Omit<Atributos, 'id'>,
  ): Promise<Atributos> {
    return this.atributosRepository.create(atributos);
  }

  @get('/atributos/count')
  @response(200, {
    description: 'Atributos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Atributos) where?: Where<Atributos>,
  ): Promise<Count> {
    return this.atributosRepository.count(where);
  }

  @get('/atributos')
  @response(200, {
    description: 'Array of Atributos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Atributos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Atributos) filter?: Filter<Atributos>,
  ): Promise<Atributos[]> {
    return this.atributosRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/atributos')
  @response(200, {
    description: 'Atributos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atributos, {partial: true}),
        },
      },
    })
    atributos: Atributos,
    @param.where(Atributos) where?: Where<Atributos>,
  ): Promise<Count> {
    return this.atributosRepository.updateAll(atributos, where);
  }

  @get('/atributos/{id}')
  @response(200, {
    description: 'Atributos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Atributos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Atributos, {exclude: 'where'}) filter?: FilterExcludingWhere<Atributos>
  ): Promise<Atributos> {
    return this.atributosRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/atributos/{id}')
  @response(204, {
    description: 'Atributos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atributos, {partial: true}),
        },
      },
    })
    atributos: Atributos,
  ): Promise<void> {
    await this.atributosRepository.updateById(id, atributos);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/atributos/{id}')
  @response(204, {
    description: 'Atributos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() atributos: Atributos,
  ): Promise<void> {
    await this.atributosRepository.replaceById(id, atributos);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/atributos/{id}')
  @response(204, {
    description: 'Atributos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.atributosRepository.deleteById(id);
  }
}
