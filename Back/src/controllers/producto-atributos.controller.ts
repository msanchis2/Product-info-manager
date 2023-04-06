/* eslint-disable @typescript-eslint/naming-convention */
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
import {ProductoAtributos} from '../models';
import {ProductoAtributosRepository} from '../repositories';
@authenticate('jwt')
export class ProductoAtributosController {
  constructor(
    @repository(ProductoAtributosRepository)
    public productoAtributosRepository : ProductoAtributosRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/producto-atributos')
  @response(200, {
    description: 'ProductoAtributos model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductoAtributos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoAtributos, {
            title: 'NewProductoAtributos',
            exclude: ['id'],
          }),
        },
      },
    })
    productoAtributos: Omit<ProductoAtributos, 'id'>,
  ): Promise<ProductoAtributos> {
    return this.productoAtributosRepository.create(productoAtributos);
  }

  @get('/producto-atributos/count')
  @response(200, {
    description: 'ProductoAtributos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductoAtributos) where?: Where<ProductoAtributos>,
  ): Promise<Count> {
    return this.productoAtributosRepository.count(where);
  }

  @get('/producto-atributos')
  @response(200, {
    description: 'Array of ProductoAtributos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductoAtributos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductoAtributos) filter?: Filter<ProductoAtributos>,
  ): Promise<ProductoAtributos[]> {
    return this.productoAtributosRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/producto-atributos')
  @response(200, {
    description: 'ProductoAtributos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoAtributos, {partial: true}),
        },
      },
    })
    productoAtributos: ProductoAtributos,
    @param.where(ProductoAtributos) where?: Where<ProductoAtributos>,
  ): Promise<Count> {
    return this.productoAtributosRepository.updateAll(productoAtributos, where);
  }

  @get('/producto-atributos/{id}')
  @response(200, {
    description: 'ProductoAtributos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductoAtributos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProductoAtributos, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductoAtributos>
  ): Promise<ProductoAtributos> {
    return this.productoAtributosRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/producto-atributos/{id}')
  @response(204, {
    description: 'ProductoAtributos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoAtributos, {partial: true}),
        },
      },
    })
    productoAtributos: ProductoAtributos,
  ): Promise<void> {
    await this.productoAtributosRepository.updateById(id, productoAtributos);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/producto-atributos/{id}')
  @response(204, {
    description: 'ProductoAtributos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() productoAtributos: ProductoAtributos,
  ): Promise<void> {
    await this.productoAtributosRepository.replaceById(id, productoAtributos);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/producto-atributos/{id}')
  @response(204, {
    description: 'ProductoAtributos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productoAtributosRepository.deleteById(id);
  }
}
