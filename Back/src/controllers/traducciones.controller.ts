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
import {Traducciones} from '../models';
import {TraduccionesRepository} from '../repositories';
export class TraduccionesController {
  constructor(
    @repository(TraduccionesRepository)
    public traduccionesRepository: TraduccionesRepository,
  ) { }
  @authenticate('jwt')
  @post('/traducciones')
  @response(200, {
    description: 'Traducciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Traducciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Traducciones, {
            title: 'NewTraducciones',
            exclude: ['id'],
          }),
        },
      },
    })
    traducciones: Omit<Traducciones, 'id'>,
  ): Promise<Traducciones | any> {
    const existingTranslations = await this.traduccionesRepository.find({where: {['clave']: {eq: traducciones.clave}, ['idiomaId']: {eq: traducciones.idiomaId}}})
    // si hay existentes para la clave enviado modificamos sobre las que están
    if (existingTranslations.length > 0) {
      return Promise.all(existingTranslations.map(async traduccion => {
        const {id} = traduccion // id de la existente para esa clave
        const {value} = traducciones // new value
        await this.traduccionesRepository.updateById(id, {value})
      }))
    } else {
      return this.traduccionesRepository.create(traducciones);
    }
  }

  @get('/traducciones/count')
  @response(200, {
    description: 'Traducciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Traducciones) where?: Where<Traducciones>,
  ): Promise<Count> {
    return this.traduccionesRepository.count(where);
  }

  @get('/traducciones')
  @response(200, {
    description: 'Array of Traducciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Traducciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Traducciones) filter?: Filter<Traducciones>,
  ): Promise<Traducciones[]> {
    return this.traduccionesRepository.find(filter);
  }
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin']})
  @patch('/traducciones')
  @response(200, {
    description: 'Traducciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Traducciones, {partial: true}),
        },
      },
    })
    traducciones: Traducciones,
    @param.where(Traducciones) where?: Where<Traducciones>,
  ): Promise<Count> {
    return this.traduccionesRepository.updateAll(traducciones, where);
  }

  @get('/traducciones/{id}')
  @response(200, {
    description: 'Traducciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Traducciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Traducciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Traducciones>
  ): Promise<Traducciones> {
    return this.traduccionesRepository.findById(id, filter);
  }
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin']})
  @patch('/traducciones/{id}')
  @response(204, {
    description: 'Traducciones PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Traducciones, {partial: true}),
        },
      },
    })
    traducciones: Traducciones,
  ): Promise<void> {
    await this.traduccionesRepository.updateById(id, traducciones);
  }
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin']})
  @put('/traducciones/{id}')
  @response(204, {
    description: 'Traducciones PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() traducciones: Traducciones,
  ): Promise<void> {
    await this.traduccionesRepository.replaceById(id, traducciones);
  }
  @authenticate('jwt')
  @authorize({allowedRoles: ['admin']})
  @del('/traducciones/{id}')
  @response(204, {
    description: 'Traducciones DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.traduccionesRepository.deleteById(id);
  }
}
