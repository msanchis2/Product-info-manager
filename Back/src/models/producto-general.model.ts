import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'pim', table: 'producto_general'}}
})
export class ProductoGeneral extends Entity {
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
    type: 'string',
    length: 45,
    mysql: {columnName: 'sku', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  sku?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'ean', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  ean?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'marca', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  marca?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'estado_referencia', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  estadoReferencia?: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {columnName: 'descripcion', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  descripcion?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'titulo', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  titulo?: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {columnName: 'descripcion_larga', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  descripcionLarga?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'palabras_clave', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  palabrasClave?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'GLN', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  GLN?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'Dimensiones', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  dimensiones?: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {columnName: 'FormatoRP', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  formatoRP?: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {columnName: 'Color', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  color?: string;

  @property({
    type: 'date',
    mysql: {columnName: 'FechaModificacion', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  fechaModificacion?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProductoGeneral>) {
    super(data);
  }
}

export interface ProductoGeneralRelations {
  // describe navigational properties here
}

export type ProductoGeneralWithRelations = ProductoGeneral & ProductoGeneralRelations;
