import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pim', table: 'columnasbbdd'}}})
export class Tablas extends Entity {
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
    type: 'string',
    length: 45,
    mysql: {columnName: 'TABLE_NAME', dataType: 'varchar', dataLength: 45, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  nombreTabla: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'column_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  campo: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'is_nullable', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  nullable: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'data_type', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  tipo: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'column_key', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  isKey: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tablas>) {
    super(data);
  }
}

export interface TablasRelations {
  // describe navigational properties here
}

export type TablasWithRelations = Tablas & TablasRelations;
