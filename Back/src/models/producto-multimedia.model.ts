import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'pim', table: 'producto_multimedia'}}
})
export class ProductoMultimedia extends Entity {
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
    length: 250,
    mysql: {columnName: 'tipo', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  tipo?: string;

  @property({
    type: 'string',
    length: 250,
    mysql: {columnName: 'fichero', dataType: 'varchar', dataLength: 250, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  fichero?: string;

  @property({
    type: 'string',
    length: 250,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  nombre?: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {columnName: 'categoria', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  categoria?: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {columnName: 'PublicoSN', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  publicoSN?: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {columnName: 'PrincipalSN', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  principalSN?: string;

  @property({
    type: 'string',
    length: 30,
    mysql: {columnName: 'Formato', dataType: 'varchar', dataLength: 30, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  formato?: string;

  @property({
    type: 'string',
    length: 30,
    mysql: {columnName: 'Objetivo', dataType: 'varchar', dataLength: 30, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  objetivo?: string;

  @property({
    type: 'string',
    length: 30,
    mysql: {columnName: 'TagAecoc', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  tagAecoc?: string;

  @property({
    type: 'date',
    mysql: {columnName: 'FechaModificacion', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  fechaModificacion?: string;

  @property({
    type: 'date',
    mysql: {columnName: 'fechaCreacion', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  fechaCreacion?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProductoMultimedia>) {
    super(data);
  }
}

export interface ProductoMultimediaRelations {
  // describe navigational properties here
}

export type ProductoMultimediaWithRelations = ProductoMultimedia & ProductoMultimediaRelations;
