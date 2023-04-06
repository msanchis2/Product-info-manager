import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pim', table: 'atributos'}}})
export class Atributos extends Entity {
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
    generated: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'grupo_atributos_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  grupoAtributosId: number;

  @property({
    type: 'number',
    generated: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'codigo', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  codigo: number;

  @property({
    type: 'string',
    length: 500,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  nombre?: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {columnName: 'UnidadSN', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  unidadSN?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'Unidad', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  unidad?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'UnidadAecoc', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  unidadAecoc?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'TagUOM', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  tagUOM?: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {columnName: 'TipoCampo', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  tipoCampo?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'TagAecoc', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  tagAecoc?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {columnName: 'PosiblesValores', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  posiblesValores?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {columnName: 'PosiblesValoresAecoc', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  posiblesValoresAecoc?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {columnName: 'Categorias', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  categorias?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Atributos>) {
    super(data);
  }
}

export interface AtributosRelations {
  // describe navigational properties here
}

export type AtributosWithRelations = Atributos & AtributosRelations;
