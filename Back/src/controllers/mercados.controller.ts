import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
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
import {PasswordHasherBindings} from '../keys';
import {Mercados} from '../models';
import {MercadosRepository} from '../repositories';
import {BcryptHasher} from '../services/hash.password';
@authenticate('jwt')
export class MercadosController {
  constructor(
    @repository(MercadosRepository)
    public MercadosRepository : MercadosRepository,

    // @inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,

  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/Mercados')
  @response(200, {
    description: 'Mercados model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mercados)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mercados, {
            title: 'NewMercados',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Mercados, 'id'>,
  ): Promise<Mercados> {
    usuario.password = await this.hasher.hashPassword(usuario.password)
    return this.MercadosRepository.create(usuario);
  }

  @get('/Mercados/count')
  @response(200, {
    description: 'Mercados model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mercados) where?: Where<Mercados>,
  ): Promise<Count> {
    return this.MercadosRepository.count(where);
  }

  @get('/Mercados')
  @response(200, {
    description: 'Array of Mercados model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mercados, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mercados) filter?: Filter<Mercados>,
  ): Promise<Mercados[]> {
    return this.MercadosRepository.find(filter);
  }

  @get('/Mercados/{id}')
  @response(200, {
    description: 'Mercados model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mercados, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Mercados, {exclude: 'where'}) filter?: FilterExcludingWhere<Mercados>
  ): Promise<Mercados> {
    return this.MercadosRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/Mercados/{id}')
  @response(204, {
    description: 'Mercados PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mercados, {partial: true}),
        },
      },
    })
    Mercados: Partial<Mercados>,
  ): Promise<void> {
    if (Mercados.password && Mercados.password.length > 6) Mercados.password = await this.hasher.hashPassword(Mercados.password)
    else delete Mercados.password
    await this.MercadosRepository.updateById(id, Mercados);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/Mercados/{id}')
  @response(204, {
    description: 'Mercados PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() Mercados: Mercados,
  ): Promise<void> {
    await this.MercadosRepository.replaceById(id, Mercados);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/Mercados/{id}')
  @response(204, {
    description: 'Mercados DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.MercadosRepository.deleteById(id);
  }
}
