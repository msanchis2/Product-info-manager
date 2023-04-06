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
import {Categorias} from '../models';
import {CategoriasRepository} from '../repositories';

@authenticate('jwt')
export class CategoriasController {
  constructor(
    @repository(CategoriasRepository)
    public categoriasRepository : CategoriasRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/categorias')
  @response(200, {
    description: 'Categorias model instance',
    content: {'application/json': {schema: getModelSchemaRef(Categorias)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categorias, {
            title: 'NewCategorias',
            exclude: ['id'],
          }),
        },
      },
    })
    categorias: Omit<Categorias, 'id'>,
  ): Promise<Categorias> {
    return this.categoriasRepository.create(categorias);
  }

  @authorize({allowedRoles: ['admin']})
  @get('/categorias/count')
  @response(200, {
    description: 'Categorias model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Categorias) where?: Where<Categorias>,
  ): Promise<Count> {
    return this.categoriasRepository.count(where);
  }

  @get('/categorias')
  @response(200, {
    description: 'Array of Categorias model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Categorias, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Categorias) filter?: Filter<Categorias>,
  ): Promise<Categorias[]> {
    return this.categoriasRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/categorias')
  @response(200, {
    description: 'Categorias PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categorias, {partial: true}),
        },
      },
    })
    categorias: Categorias,
    @param.where(Categorias) where?: Where<Categorias>,
  ): Promise<Count> {
    return this.categoriasRepository.updateAll(categorias, where);
  }

  @get('/categorias/{id}')
  @response(200, {
    description: 'Categorias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Categorias, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Categorias, {exclude: 'where'}) filter?: FilterExcludingWhere<Categorias>
  ): Promise<Categorias> {
    return this.categoriasRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/categorias/{id}')
  @response(204, {
    description: 'Categorias PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categorias, {partial: true}),
        },
      },
    })
    categorias: Categorias,
  ): Promise<void> {
    await this.categoriasRepository.updateById(id, categorias);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/categorias/{id}')
  @response(204, {
    description: 'Categorias PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() categorias: Categorias,
  ): Promise<void> {
    await this.categoriasRepository.replaceById(id, categorias);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/categorias/{id}')
  @response(204, {
    description: 'Categorias DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.categoriasRepository.deleteById(id);
  }
}
