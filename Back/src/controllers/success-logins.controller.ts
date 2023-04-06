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
import {SuccessLogins} from '../models';
import {SuccessLoginsRepository} from '../repositories';

export class SuccessLoginsController {
  constructor(
    @repository(SuccessLoginsRepository)
    public successLoginsRepository : SuccessLoginsRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/success-logins')
  @response(200, {
    description: 'SuccessLogins model instance',
    content: {'application/json': {schema: getModelSchemaRef(SuccessLogins)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SuccessLogins, {
            title: 'NewSuccessLogins',
            exclude: ['id'],
          }),
        },
      },
    })
    successLogins: Omit<SuccessLogins, 'id'>,
  ): Promise<SuccessLogins> {
    return this.successLoginsRepository.create(successLogins);
  }

  @get('/success-logins/count')
  @response(200, {
    description: 'SuccessLogins model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SuccessLogins) where?: Where<SuccessLogins>,
  ): Promise<Count> {
    return this.successLoginsRepository.count(where);
  }

  @get('/success-logins')
  @response(200, {
    description: 'Array of SuccessLogins model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SuccessLogins, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SuccessLogins) filter?: Filter<SuccessLogins>,
  ): Promise<SuccessLogins[]> {
    return this.successLoginsRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/success-logins')
  @response(200, {
    description: 'SuccessLogins PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SuccessLogins, {partial: true}),
        },
      },
    })
    successLogins: SuccessLogins,
    @param.where(SuccessLogins) where?: Where<SuccessLogins>,
  ): Promise<Count> {
    return this.successLoginsRepository.updateAll(successLogins, where);
  }

  @get('/success-logins/{id}')
  @response(200, {
    description: 'SuccessLogins model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SuccessLogins, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SuccessLogins, {exclude: 'where'}) filter?: FilterExcludingWhere<SuccessLogins>
  ): Promise<SuccessLogins> {
    return this.successLoginsRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/success-logins/{id}')
  @response(204, {
    description: 'SuccessLogins PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SuccessLogins, {partial: true}),
        },
      },
    })
    successLogins: SuccessLogins,
  ): Promise<void> {
    await this.successLoginsRepository.updateById(id, successLogins);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/success-logins/{id}')
  @response(204, {
    description: 'SuccessLogins PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() successLogins: SuccessLogins,
  ): Promise<void> {
    await this.successLoginsRepository.replaceById(id, successLogins);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/success-logins/{id}')
  @response(204, {
    description: 'SuccessLogins DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.successLoginsRepository.deleteById(id);
  }
}
