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
import {Plantilla} from '../models';
import {PlantillaRepository} from '../repositories';

@authenticate('jwt')
export class PlantillaController {
  constructor(
    @repository(PlantillaRepository)
    public PlantillaRepository : PlantillaRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/Plantilla')
  @response(200, {
    description: 'Plantilla model instance',
    content: {'application/json': {schema: getModelSchemaRef(Plantilla)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plantilla, {
            title: 'NewPlantilla',
            exclude: ['id'],
          }),
        },
      },
    })
    Plantilla: Omit<Plantilla, 'id'>,
  ): Promise<Plantilla> {
    return this.PlantillaRepository.create(Plantilla);
  }

  @get('/Plantilla/count')
  @response(200, {
    description: 'Plantilla model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Plantilla) where?: Where<Plantilla>,
  ): Promise<Count> {
    return this.PlantillaRepository.count(where);
  }

  @get('/Plantilla')
  @response(200, {
    description: 'Array of Plantilla model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Plantilla, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Plantilla) filter?: Filter<Plantilla>,
  ): Promise<Plantilla[]> {
    return this.PlantillaRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/Plantilla')
  @response(200, {
    description: 'Plantilla PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plantilla, {partial: true}),
        },
      },
    })
    Plantilla: Plantilla,
    @param.where(Plantilla) where?: Where<Plantilla>,
  ): Promise<Count> {
    return this.PlantillaRepository.updateAll(Plantilla, where);
  }

  @get('/Plantilla/{id}')
  @response(200, {
    description: 'Plantilla model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Plantilla, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Plantilla, {exclude: 'where'}) filter?: FilterExcludingWhere<Plantilla>
  ): Promise<Plantilla> {
    return this.PlantillaRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/Plantilla/{id}')
  @response(204, {
    description: 'Plantilla PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plantilla, {partial: true}),
        },
      },
    })
    Plantilla: Plantilla,
  ): Promise<void> {
    await this.PlantillaRepository.updateById(id, Plantilla);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/Plantilla/{id}')
  @response(204, {
    description: 'Plantilla PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() Plantilla: Plantilla,
  ): Promise<void> {
    await this.PlantillaRepository.replaceById(id, Plantilla);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/Plantilla/{id}')
  @response(204, {
    description: 'Plantilla DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.PlantillaRepository.deleteById(id);
  }
}
