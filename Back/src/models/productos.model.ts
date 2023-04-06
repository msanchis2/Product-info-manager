import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pim', table: 'productos'}}})
export class Productos extends Entity {
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
    mysql: {columnName: 'empresa_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  empresaId: number;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  nombre?: string;

  @property({
    type: 'string',
    length: 250,
    mysql: {columnName: 'imagen', dataType: 'varchar', dataLength: 250, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  imagen?: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {columnName: 'categorias', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  categorias?: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {columnName: 'finalizado', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  finalizado?: string;

  @property({
    type: 'string',
    length: 64,
    mysql: {columnName: 'ordenAtributos', dataType: 'varchar', dataLength: 64, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  ordenAtributos?: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {columnName: 'enviarAecoc', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  enviarAecoc?: string;

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

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
