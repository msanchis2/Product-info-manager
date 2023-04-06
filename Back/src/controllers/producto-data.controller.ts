import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, HttpErrors, param, response
} from '@loopback/rest';
import {ProductoAtributos, ProductoGeneral, ProductoMultimedia, Productos} from '../models';
import {ProductoAtributosRepository, ProductoGeneralRepository, ProductoMultimediaRepository, ProductosRepository} from '../repositories';

export interface ProductoData extends Productos {
  sku: string,
  ean: string,
  marca: string,
  estadoReferencia: string,
  descripcion: string,
  titulo: string,
  descripcionLarga: string,
  palabrasClave: string,
  atributos: ProductoAtributos[],
  multimedia: ProductoMultimedia[]
}

export class ProductoDataController {
  constructor(
    @repository(ProductosRepository)
    public productosRepository : ProductosRepository,
    @repository(ProductoGeneralRepository)
    public productoGeneralRepository : ProductoGeneralRepository,
    @repository(ProductoAtributosRepository)
    public productoAtributosRepository : ProductoAtributosRepository,
    @repository(ProductoMultimediaRepository)
    public productoMultimediaRepository : ProductoMultimediaRepository,
  ) {}

  @get('/producto-data/{identifier}')
  @response(200, {
    description: 'Combinacion de data del producto',
    content: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'application/json': {
        schema: getModelSchemaRef(Productos),
      },
    },
  })
  async find(
    @param.path.string('identifier') identifier: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    try {
      const filterProdGeneral = {
        where: {
          ['sku']: {eq: identifier}
        }
      }
      const productosGeneral = await this.productoGeneralRepository.find(filterProdGeneral)
      if (productosGeneral.length !== 1) throw new HttpErrors.UnprocessableEntity('Producto no encontrado.')
      const productoGeneral : Omit<ProductoGeneral, "id, productoId"> = productosGeneral[0]
      const id = productoGeneral.productoId

      delete productoGeneral.id
      delete productoGeneral.productoId

      if (id) {
        const producto = await this.productosRepository.findById(id)

        if (producto) {
          const filterProductoId = {
            where: {
              ['productoId']: {eq: id}
            }
          }
          const productoAtributos = await this.productoAtributosRepository.find(filterProductoId)
          const productoMultimedia = await this.productoMultimediaRepository.find(filterProductoId)

          const productoData = {...producto, ...productoGeneral, atributos: productoAtributos, multimedia: productoMultimedia}

          return productoData as ProductoData
        } else {
          throw new HttpErrors.NotFound('Producto no encontrado')
        }
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err?.message || err?.detail
    }

  }

}
