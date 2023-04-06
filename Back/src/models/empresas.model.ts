import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pim', table: 'empresas'}}})
export class Empresas extends Entity {
  @property({
    type: 'number',
    generated: false,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'codigo', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  codigo?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  nombre?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'GLN', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  GLN?: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {columnName: 'descripcion', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  descripcion?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Empresas>) {
    super(data);
  }
}

export interface EmpresasRelations {
  // describe navigational properties here
}

export type EmpresasWithRelations = Empresas & EmpresasRelations;
