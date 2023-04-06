import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'pim', table: 'grupos_atributos'}}
})
export class GruposAtributos extends Entity {
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
    mysql: {columnName: 'codigo', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  codigo?: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  nombre?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GruposAtributos>) {
    super(data);
  }
}

export interface GruposAtributosRelations {
  // describe navigational properties here
}

export type GruposAtributosWithRelations = GruposAtributos & GruposAtributosRelations;
