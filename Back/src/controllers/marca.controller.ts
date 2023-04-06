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
import {Marca} from '../models';
import {MarcaRepository} from '../repositories';

@authenticate('jwt')
export class MarcaController {
  constructor(
    @repository(MarcaRepository)
    public MarcaRepository : MarcaRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/Marca')
  @response(200, {
    description: 'Marca model instance',
    content: {'application/json': {schema: getModelSchemaRef(Marca)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {
            title: 'NewMarca',
            exclude: ['id'],
          }),
        },
      },
    })
    Marca: Omit<Marca, 'id'>,
  ): Promise<Marca> {
    return this.MarcaRepository.create(Marca);
  }

  @get('/Marca/count')
  @response(200, {
    description: 'Marca model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Marca) where?: Where<Marca>,
  ): Promise<Count> {
    return this.MarcaRepository.count(where);
  }

  @get('/Marca')
  @response(200, {
    description: 'Array of Marca model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Marca, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Marca) filter?: Filter<Marca>,
  ): Promise<Marca[]> {
    return this.MarcaRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/Marca')
  @response(200, {
    description: 'Marca PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {partial: true}),
        },
      },
    })
    Marca: Marca,
    @param.where(Marca) where?: Where<Marca>,
  ): Promise<Count> {
    return this.MarcaRepository.updateAll(Marca, where);
  }

  @get('/Marca/{id}')
  @response(200, {
    description: 'Marca model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Marca, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Marca, {exclude: 'where'}) filter?: FilterExcludingWhere<Marca>
  ): Promise<Marca> {
    return this.MarcaRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/Marca/{id}')
  @response(204, {
    description: 'Marca PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {partial: true}),
        },
      },
    })
    Marca: Marca,
  ): Promise<void> {
    await this.MarcaRepository.updateById(id, Marca);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/Marca/{id}')
  @response(204, {
    description: 'Marca PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() Marca: Marca,
  ): Promise<void> {
    await this.MarcaRepository.replaceById(id, Marca);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/Marca/{id}')
  @response(204, {
    description: 'Marca DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.MarcaRepository.deleteById(id);
  }
}
