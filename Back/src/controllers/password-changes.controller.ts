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
import {PasswordChanges} from '../models';
import {PasswordChangesRepository} from '../repositories';
@authenticate('jwt')
export class PasswordChangesController {
  constructor(
    @repository(PasswordChangesRepository)
    public passwordChangesRepository : PasswordChangesRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/password-changes')
  @response(200, {
    description: 'PasswordChanges model instance',
    content: {'application/json': {schema: getModelSchemaRef(PasswordChanges)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PasswordChanges, {
            title: 'NewPasswordChanges',
            exclude: ['id'],
          }),
        },
      },
    })
    passwordChanges: Omit<PasswordChanges, 'id'>,
  ): Promise<PasswordChanges> {
    return this.passwordChangesRepository.create(passwordChanges);
  }

  @get('/password-changes/count')
  @response(200, {
    description: 'PasswordChanges model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PasswordChanges) where?: Where<PasswordChanges>,
  ): Promise<Count> {
    return this.passwordChangesRepository.count(where);
  }

  @get('/password-changes')
  @response(200, {
    description: 'Array of PasswordChanges model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PasswordChanges, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PasswordChanges) filter?: Filter<PasswordChanges>,
  ): Promise<PasswordChanges[]> {
    return this.passwordChangesRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/password-changes')
  @response(200, {
    description: 'PasswordChanges PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PasswordChanges, {partial: true}),
        },
      },
    })
    passwordChanges: PasswordChanges,
    @param.where(PasswordChanges) where?: Where<PasswordChanges>,
  ): Promise<Count> {
    return this.passwordChangesRepository.updateAll(passwordChanges, where);
  }

  @get('/password-changes/{id}')
  @response(200, {
    description: 'PasswordChanges model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PasswordChanges, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PasswordChanges, {exclude: 'where'}) filter?: FilterExcludingWhere<PasswordChanges>
  ): Promise<PasswordChanges> {
    return this.passwordChangesRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/password-changes/{id}')
  @response(204, {
    description: 'PasswordChanges PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PasswordChanges, {partial: true}),
        },
      },
    })
    passwordChanges: PasswordChanges,
  ): Promise<void> {
    await this.passwordChangesRepository.updateById(id, passwordChanges);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/password-changes/{id}')
  @response(204, {
    description: 'PasswordChanges PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() passwordChanges: PasswordChanges,
  ): Promise<void> {
    await this.passwordChangesRepository.replaceById(id, passwordChanges);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/password-changes/{id}')
  @response(204, {
    description: 'PasswordChanges DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.passwordChangesRepository.deleteById(id);
  }
}
