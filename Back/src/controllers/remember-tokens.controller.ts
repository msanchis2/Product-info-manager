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
import {RememberTokens} from '../models';
import {RememberTokensRepository} from '../repositories';

export class RememberTokensController {
  constructor(
    @repository(RememberTokensRepository)
    public rememberTokensRepository : RememberTokensRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/remember-tokens')
  @response(200, {
    description: 'RememberTokens model instance',
    content: {'application/json': {schema: getModelSchemaRef(RememberTokens)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RememberTokens, {
            title: 'NewRememberTokens',
            exclude: ['id'],
          }),
        },
      },
    })
    rememberTokens: Omit<RememberTokens, 'id'>,
  ): Promise<RememberTokens> {
    return this.rememberTokensRepository.create(rememberTokens);
  }

  @get('/remember-tokens/count')
  @response(200, {
    description: 'RememberTokens model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RememberTokens) where?: Where<RememberTokens>,
  ): Promise<Count> {
    return this.rememberTokensRepository.count(where);
  }

  @get('/remember-tokens')
  @response(200, {
    description: 'Array of RememberTokens model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RememberTokens, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RememberTokens) filter?: Filter<RememberTokens>,
  ): Promise<RememberTokens[]> {
    return this.rememberTokensRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/remember-tokens')
  @response(200, {
    description: 'RememberTokens PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RememberTokens, {partial: true}),
        },
      },
    })
    rememberTokens: RememberTokens,
    @param.where(RememberTokens) where?: Where<RememberTokens>,
  ): Promise<Count> {
    return this.rememberTokensRepository.updateAll(rememberTokens, where);
  }

  @get('/remember-tokens/{id}')
  @response(200, {
    description: 'RememberTokens model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RememberTokens, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RememberTokens, {exclude: 'where'}) filter?: FilterExcludingWhere<RememberTokens>
  ): Promise<RememberTokens> {
    return this.rememberTokensRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/remember-tokens/{id}')
  @response(204, {
    description: 'RememberTokens PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RememberTokens, {partial: true}),
        },
      },
    })
    rememberTokens: RememberTokens,
  ): Promise<void> {
    await this.rememberTokensRepository.updateById(id, rememberTokens);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/remember-tokens/{id}')
  @response(204, {
    description: 'RememberTokens PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rememberTokens: RememberTokens,
  ): Promise<void> {
    await this.rememberTokensRepository.replaceById(id, rememberTokens);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/remember-tokens/{id}')
  @response(204, {
    description: 'RememberTokens DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rememberTokensRepository.deleteById(id);
  }
}
