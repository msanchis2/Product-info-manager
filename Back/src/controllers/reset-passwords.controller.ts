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
import {ResetPasswords} from '../models';
import {ResetPasswordsRepository} from '../repositories';

export class ResetPasswordsController {
  constructor(
    @repository(ResetPasswordsRepository)
    public resetPasswordsRepository : ResetPasswordsRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/reset-passwords')
  @response(200, {
    description: 'ResetPasswords model instance',
    content: {'application/json': {schema: getModelSchemaRef(ResetPasswords)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetPasswords, {
            title: 'NewResetPasswords',
            exclude: ['id'],
          }),
        },
      },
    })
    resetPasswords: Omit<ResetPasswords, 'id'>,
  ): Promise<ResetPasswords> {
    return this.resetPasswordsRepository.create(resetPasswords);
  }

  @get('/reset-passwords/count')
  @response(200, {
    description: 'ResetPasswords model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ResetPasswords) where?: Where<ResetPasswords>,
  ): Promise<Count> {
    return this.resetPasswordsRepository.count(where);
  }

  @get('/reset-passwords')
  @response(200, {
    description: 'Array of ResetPasswords model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResetPasswords, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ResetPasswords) filter?: Filter<ResetPasswords>,
  ): Promise<ResetPasswords[]> {
    return this.resetPasswordsRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/reset-passwords')
  @response(200, {
    description: 'ResetPasswords PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetPasswords, {partial: true}),
        },
      },
    })
    resetPasswords: ResetPasswords,
    @param.where(ResetPasswords) where?: Where<ResetPasswords>,
  ): Promise<Count> {
    return this.resetPasswordsRepository.updateAll(resetPasswords, where);
  }

  @get('/reset-passwords/{id}')
  @response(200, {
    description: 'ResetPasswords model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ResetPasswords, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ResetPasswords, {exclude: 'where'}) filter?: FilterExcludingWhere<ResetPasswords>
  ): Promise<ResetPasswords> {
    return this.resetPasswordsRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/reset-passwords/{id}')
  @response(204, {
    description: 'ResetPasswords PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetPasswords, {partial: true}),
        },
      },
    })
    resetPasswords: ResetPasswords,
  ): Promise<void> {
    await this.resetPasswordsRepository.updateById(id, resetPasswords);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/reset-passwords/{id}')
  @response(204, {
    description: 'ResetPasswords PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resetPasswords: ResetPasswords,
  ): Promise<void> {
    await this.resetPasswordsRepository.replaceById(id, resetPasswords);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/reset-passwords/{id}')
  @response(204, {
    description: 'ResetPasswords DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resetPasswordsRepository.deleteById(id);
  }
}
