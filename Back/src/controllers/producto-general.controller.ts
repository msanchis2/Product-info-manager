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
import {ProductoGeneral} from '../models';
import {ProductoGeneralRepository} from '../repositories';
@authenticate('jwt')
export class ProductoGeneralController {
  constructor(
    @repository(ProductoGeneralRepository)
    public productoGeneralRepository : ProductoGeneralRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/producto-generals')
  @response(200, {
    description: 'ProductoGeneral model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductoGeneral)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoGeneral, {
            title: 'NewProductoGeneral',
            exclude: ['id'],
          }),
        },
      },
    })
    productoGeneral: Omit<ProductoGeneral, 'id'>,
  ): Promise<ProductoGeneral> {
    return this.productoGeneralRepository.create(productoGeneral);
  }

  @get('/producto-generals/count')
  @response(200, {
    description: 'ProductoGeneral model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductoGeneral) where?: Where<ProductoGeneral>,
  ): Promise<Count> {
    return this.productoGeneralRepository.count(where);
  }

  @get('/producto-generals')
  @response(200, {
    description: 'Array of ProductoGeneral model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductoGeneral, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductoGeneral) filter?: Filter<ProductoGeneral>,
  ): Promise<ProductoGeneral[]> {
    return this.productoGeneralRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/producto-generals')
  @response(200, {
    description: 'ProductoGeneral PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoGeneral, {partial: true}),
        },
      },
    })
    productoGeneral: ProductoGeneral,
    @param.where(ProductoGeneral) where?: Where<ProductoGeneral>,
  ): Promise<Count> {
    return this.productoGeneralRepository.updateAll(productoGeneral, where);
  }

  @get('/producto-generals/{id}')
  @response(200, {
    description: 'ProductoGeneral model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductoGeneral, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProductoGeneral, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductoGeneral>
  ): Promise<ProductoGeneral> {
    return this.productoGeneralRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/producto-generals/{id}')
  @response(204, {
    description: 'ProductoGeneral PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoGeneral, {partial: true}),
        },
      },
    })
    productoGeneral: ProductoGeneral,
  ): Promise<void> {
    await this.productoGeneralRepository.updateById(id, productoGeneral);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/producto-generals/{id}')
  @response(204, {
    description: 'ProductoGeneral PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() productoGeneral: ProductoGeneral,
  ): Promise<void> {
    await this.productoGeneralRepository.replaceById(id, productoGeneral);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/producto-generals/{id}')
  @response(204, {
    description: 'ProductoGeneral DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productoGeneralRepository.deleteById(id);
  }
}
