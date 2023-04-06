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
import {Settings} from '../models';
import {SettingsRepository} from '../repositories';

export class SettingsController {
  constructor(
    @repository(SettingsRepository)
    public settingsRepository : SettingsRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/settings')
  @response(200, {
    description: 'Settings model instance',
    content: {'application/json': {schema: getModelSchemaRef(Settings)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Settings, {
            title: 'NewSettings',
            exclude: ['id'],
          }),
        },
      },
    })
    settings: Omit<Settings, 'id'>,
  ): Promise<Settings> {
    return this.settingsRepository.create(settings);
  }

  @get('/settings/count')
  @response(200, {
    description: 'Settings model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Settings) where?: Where<Settings>,
  ): Promise<Count> {
    return this.settingsRepository.count(where);
  }

  @get('/settings')
  @response(200, {
    description: 'Array of Settings model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Settings, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Settings) filter?: Filter<Settings>,
  ): Promise<Settings[]> {
    return this.settingsRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/settings')
  @response(200, {
    description: 'Settings PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Settings, {partial: true}),
        },
      },
    })
    settings: Settings,
    @param.where(Settings) where?: Where<Settings>,
  ): Promise<Count> {
    return this.settingsRepository.updateAll(settings, where);
  }

  @get('/settings/{id}')
  @response(200, {
    description: 'Settings model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Settings, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Settings, {exclude: 'where'}) filter?: FilterExcludingWhere<Settings>
  ): Promise<Settings> {
    return this.settingsRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/settings/{id}')
  @response(204, {
    description: 'Settings PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Settings, {partial: true}),
        },
      },
    })
    settings: Settings,
  ): Promise<void> {
    await this.settingsRepository.updateById(id, settings);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/settings/{id}')
  @response(204, {
    description: 'Settings PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() settings: Settings,
  ): Promise<void> {
    await this.settingsRepository.replaceById(id, settings);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/settings/{id}')
  @response(204, {
    description: 'Settings DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.settingsRepository.deleteById(id);
  }
}
