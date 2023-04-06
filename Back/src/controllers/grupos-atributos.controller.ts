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
import {GruposAtributos} from '../models';
import {GruposAtributosRepository} from '../repositories';
@authenticate('jwt')
export class GruposAtributosController {
  constructor(
    @repository(GruposAtributosRepository)
    public gruposAtributosRepository : GruposAtributosRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/grupos-atributos')
  @response(200, {
    description: 'GruposAtributos model instance',
    content: {'application/json': {schema: getModelSchemaRef(GruposAtributos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GruposAtributos, {
            title: 'NewGruposAtributos',
            exclude: ['id'],
          }),
        },
      },
    })
    gruposAtributos: Omit<GruposAtributos, 'id'>,
  ): Promise<GruposAtributos> {
    return this.gruposAtributosRepository.create(gruposAtributos);
  }

  @get('/grupos-atributos/count')
  @response(200, {
    description: 'GruposAtributos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GruposAtributos) where?: Where<GruposAtributos>,
  ): Promise<Count> {
    return this.gruposAtributosRepository.count(where);
  }

  @get('/grupos-atributos')
  @response(200, {
    description: 'Array of GruposAtributos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GruposAtributos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GruposAtributos) filter?: Filter<GruposAtributos>,
  ): Promise<GruposAtributos[]> {
    return this.gruposAtributosRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/grupos-atributos')
  @response(200, {
    description: 'GruposAtributos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GruposAtributos, {partial: true}),
        },
      },
    })
    gruposAtributos: GruposAtributos,
    @param.where(GruposAtributos) where?: Where<GruposAtributos>,
  ): Promise<Count> {
    return this.gruposAtributosRepository.updateAll(gruposAtributos, where);
  }

  @get('/grupos-atributos/{id}')
  @response(200, {
    description: 'GruposAtributos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GruposAtributos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GruposAtributos, {exclude: 'where'}) filter?: FilterExcludingWhere<GruposAtributos>
  ): Promise<GruposAtributos> {
    return this.gruposAtributosRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/grupos-atributos/{id}')
  @response(204, {
    description: 'GruposAtributos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GruposAtributos, {partial: true}),
        },
      },
    })
    gruposAtributos: GruposAtributos,
  ): Promise<void> {
    await this.gruposAtributosRepository.updateById(id, gruposAtributos);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/grupos-atributos/{id}')
  @response(204, {
    description: 'GruposAtributos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() gruposAtributos: GruposAtributos,
  ): Promise<void> {
    await this.gruposAtributosRepository.replaceById(id, gruposAtributos);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/grupos-atributos/{id}')
  @response(204, {
    description: 'GruposAtributos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.gruposAtributosRepository.deleteById(id);
  }
}
