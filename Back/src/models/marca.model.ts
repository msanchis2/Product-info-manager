import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pim', table: 'marca'}}})
export class Marca extends Entity {
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
    mysql: {columnName: 'empresaId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
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
    length: 5,
    mysql: {columnName: 'codigo', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  codigo?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'color', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  color?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'web', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  web?: string;

  @property({
    type: 'string',
    length: 250,
    mysql: {columnName: 'logo', dataType: 'varchar', dataLength: 250, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  logo?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Marca>) {
    super(data);
  }
}

export interface MarcaRelations {
  // describe navigational properties here
}

export type MarcaWithRelations = Marca & MarcaRelations;
