import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'pim', table: 'producto_atributos'}}
})
export class ProductoAtributos extends Entity {
  @property({
    type: 'number',
    generated: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 2,
    mysql: {columnName: 'producto_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  productoId: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 2,
    mysql: {columnName: 'atributo_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  atributoId: number;

  @property({
    type: 'string',
    length: 500,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  nombre?: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {columnName: 'valor', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  valor?: string;

  @property({
    type: 'string',
    length: 8,
    mysql: {columnName: 'unidad', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  unidad?: string;

  @property({
    type: 'string',
    length: 3,
    mysql: {columnName: 'ordenEnGrupo', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  ordenEnGrupo?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProductoAtributos>) {
    super(data);
  }
}

export interface ProductoAtributosRelations {
  // describe navigational properties here
}

export type ProductoAtributosWithRelations = ProductoAtributos & ProductoAtributosRelations;
