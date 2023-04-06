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
import {Empresas} from '../models';
import {EmpresasRepository} from '../repositories';

@authenticate('jwt')
export class EmpresasController {
  constructor(
    @repository(EmpresasRepository)
    public empresasRepository : EmpresasRepository,
  ) {}

  @authorize({allowedRoles: ['admin']})
  @post('/empresas')
  @response(200, {
    description: 'Empresas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empresas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresas, {
            title: 'NewEmpresas',
            exclude: ['id'],
          }),
        },
      },
    })
    empresas: Omit<Empresas, 'id'>,
  ): Promise<Empresas> {
    return this.empresasRepository.create(empresas);
  }

  @get('/empresas/count')
  @response(200, {
    description: 'Empresas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empresas) where?: Where<Empresas>,
  ): Promise<Count> {
    return this.empresasRepository.count(where);
  }

  @get('/empresas')
  @response(200, {
    description: 'Array of Empresas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empresas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empresas) filter?: Filter<Empresas>,
  ): Promise<Empresas[]> {
    return this.empresasRepository.find(filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/empresas')
  @response(200, {
    description: 'Empresas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresas, {partial: true}),
        },
      },
    })
    empresas: Empresas,
    @param.where(Empresas) where?: Where<Empresas>,
  ): Promise<Count> {
    return this.empresasRepository.updateAll(empresas, where);
  }

  @get('/empresas/{id}')
  @response(200, {
    description: 'Empresas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empresas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Empresas, {exclude: 'where'}) filter?: FilterExcludingWhere<Empresas>
  ): Promise<Empresas> {
    return this.empresasRepository.findById(id, filter);
  }

  @authorize({allowedRoles: ['admin']})
  @patch('/empresas/{id}')
  @response(204, {
    description: 'Empresas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresas, {partial: true}),
        },
      },
    })
    empresas: Empresas,
  ): Promise<void> {
    await this.empresasRepository.updateById(id, empresas);
  }

  @authorize({allowedRoles: ['admin']})
  @put('/empresas/{id}')
  @response(204, {
    description: 'Empresas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() empresas: Empresas,
  ): Promise<void> {
    await this.empresasRepository.replaceById(id, empresas);
  }

  @authorize({allowedRoles: ['admin']})
  @del('/empresas/{id}')
  @response(204, {
    description: 'Empresas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.empresasRepository.deleteById(id);
  }
}
